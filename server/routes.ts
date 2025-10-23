import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertProjectSchema,
  insertTeamSchema,
  insertFacultyProfileSchema,
  insertSupervisorRequestSchema,
  insertEvaluationSchema,
  insertPanelSchema,
  insertNotificationSchema,
  insertMilestoneSchema,
  insertTeamInvitationSchema,
} from "@shared/schema";
import { z } from "zod";

interface AuthRequest extends Request {
  session: {
    userId?: string;
    role?: string;
  };
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  const hash = hashPassword(password);
  return hash === hashedPassword;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || !verifyPassword(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      (req.session as any).userId = user.id;
      (req.session as any).role = user.role;
      
      res.json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber,
        department: user.department,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/signup", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = hashPassword(userData.password);
      const user = await storage.createUser({ ...userData, password: hashedPassword });

      if (user.role === "faculty") {
        await storage.createFacultyProfile({
          userId: user.id,
          expertise: [],
          researchInterests: [],
        });
      }

      (req.session as any).userId = user.id;
      (req.session as any).role = user.role;

      res.json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber,
        department: user.department,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/auth/me", async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        rollNumber: user.rollNumber,
        department: user.department,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/projects", async (req: AuthRequest, res: Response) => {
    try {
      const { status, studentId, supervisorId } = req.query;
      
      let projects;
      if (studentId) {
        projects = await storage.getProjectsByStudent(studentId as string);
      } else if (supervisorId) {
        projects = await storage.getProjectsBySupervisor(supervisorId as string);
      } else if (status) {
        projects = await storage.getProjectsByStatus(status as string);
      } else {
        projects = await storage.getProjects();
      }

      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/projects/:id", async (req: AuthRequest, res: Response) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/projects", async (req: AuthRequest, res: Response) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      
      const duplicates = await storage.getProjects();
      const similarProjects = duplicates.filter(p => {
        const titleSimilarity = calculateSimilarity(p.title.toLowerCase(), projectData.title.toLowerCase());
        return titleSimilarity > 0.7 && p.id !== projectData.studentId;
      });

      const acceptabilityScore = calculateAcceptabilityScore(projectData);
      
      const project = await storage.createProject({
        ...projectData,
        acceptabilityScore,
        duplicateCheckResult: similarProjects.length > 0 ? {
          hasDuplicates: true,
          similarProjects: similarProjects.map(p => ({ id: p.id, title: p.title, similarity: calculateSimilarity(p.title, projectData.title) }))
        } : null,
      });

      await storage.createNotification({
        userId: projectData.studentId,
        title: "Project Submitted",
        message: `Your project "${projectData.title}" has been submitted successfully.`,
        type: "success",
      });

      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/projects/:id", async (req: AuthRequest, res: Response) => {
    try {
      const project = await storage.updateProject(req.params.id, req.body);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/projects/:id", async (req: AuthRequest, res: Response) => {
    try {
      const success = await storage.deleteProject(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/faculty-profiles", async (req: AuthRequest, res: Response) => {
    try {
      const { available } = req.query;
      const profiles = available === "true" 
        ? await storage.getAvailableFaculty()
        : await storage.getFacultyProfiles();
      
      const profilesWithUsers = await Promise.all(
        profiles.map(async (profile) => {
          const user = await storage.getUser(profile.userId);
          return { ...profile, user };
        })
      );

      res.json(profilesWithUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/faculty-profiles/:userId", async (req: AuthRequest, res: Response) => {
    try {
      const profile = await storage.getFacultyProfile(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Faculty profile not found" });
      }
      
      const user = await storage.getUser(profile.userId);
      res.json({ ...profile, user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/faculty-profiles", async (req: AuthRequest, res: Response) => {
    try {
      const profileData = insertFacultyProfileSchema.parse(req.body);
      const profile = await storage.createFacultyProfile(profileData);
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/faculty-profiles/:userId", async (req: AuthRequest, res: Response) => {
    try {
      const profile = await storage.updateFacultyProfile(req.params.userId, req.body);
      if (!profile) {
        return res.status(404).json({ error: "Faculty profile not found" });
      }
      res.json(profile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/recommendations", async (req: AuthRequest, res: Response) => {
    try {
      const { studentId, projectKeywords } = req.query;
      
      const availableFaculty = await storage.getAvailableFaculty();
      const keywords = (projectKeywords as string)?.split(",") || [];
      
      const recommendations = availableFaculty.map(profile => {
        const matchScore = calculateMatchScore(profile, keywords);
        return { ...profile, matchScore };
      }).sort((a, b) => b.matchScore - a.matchScore);

      const recommendationsWithUsers = await Promise.all(
        recommendations.map(async (profile) => {
          const user = await storage.getUser(profile.userId);
          return { ...profile, user };
        })
      );

      res.json(recommendationsWithUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/supervisor-requests", async (req: AuthRequest, res: Response) => {
    try {
      const { studentId, facultyId } = req.query;
      
      let requests;
      if (studentId) {
        requests = await storage.getSupervisorRequestsByStudent(studentId as string);
      } else if (facultyId) {
        requests = await storage.getSupervisorRequestsByFaculty(facultyId as string);
      } else {
        return res.status(400).json({ error: "studentId or facultyId required" });
      }

      const requestsWithDetails = await Promise.all(
        requests.map(async (request) => {
          const student = await storage.getUser(request.studentId);
          const faculty = await storage.getUser(request.facultyId);
          const project = await storage.getProject(request.projectId);
          return { ...request, student, faculty, project };
        })
      );

      res.json(requestsWithDetails);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/supervisor-requests", async (req: AuthRequest, res: Response) => {
    try {
      const requestData = insertSupervisorRequestSchema.parse(req.body);
      const request = await storage.createSupervisorRequest(requestData);

      await storage.createNotification({
        userId: requestData.facultyId,
        title: "New Supervisor Request",
        message: "You have received a new supervisor request",
        type: "info",
        actionUrl: `/requests`,
      });

      res.json(request);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/supervisor-requests/:id", async (req: AuthRequest, res: Response) => {
    try {
      const request = await storage.updateSupervisorRequest(req.params.id, req.body);
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      if (req.body.status === "accepted") {
        await storage.updateProject(request.projectId, {
          supervisorId: request.facultyId,
          status: "approved",
        });

        await storage.createNotification({
          userId: request.studentId,
          title: "Supervisor Request Accepted",
          message: "Your supervisor request has been accepted!",
          type: "success",
        });
      } else if (req.body.status === "rejected") {
        await storage.createNotification({
          userId: request.studentId,
          title: "Supervisor Request Declined",
          message: "Your supervisor request has been declined.",
          type: "info",
        });
      }

      res.json(request);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/teams", async (req: AuthRequest, res: Response) => {
    try {
      const teams = await storage.getTeams();
      res.json(teams);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/teams", async (req: AuthRequest, res: Response) => {
    try {
      const teamData = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(teamData);
      res.json(team);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/team-invitations", async (req: AuthRequest, res: Response) => {
    try {
      const { inviteeId, teamId } = req.query;
      
      let invitations;
      if (inviteeId) {
        invitations = await storage.getTeamInvitationsByInvitee(inviteeId as string);
      } else if (teamId) {
        invitations = await storage.getTeamInvitationsByTeam(teamId as string);
      } else {
        return res.status(400).json({ error: "inviteeId or teamId required" });
      }

      res.json(invitations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/team-invitations", async (req: AuthRequest, res: Response) => {
    try {
      const invitationData = insertTeamInvitationSchema.parse(req.body);
      const invitation = await storage.createTeamInvitation(invitationData);

      await storage.createNotification({
        userId: invitationData.inviteeId,
        title: "Team Invitation",
        message: "You have been invited to join a team",
        type: "info",
      });

      res.json(invitation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/team-invitations/:id", async (req: AuthRequest, res: Response) => {
    try {
      const invitation = await storage.updateTeamInvitation(req.params.id, req.body);
      if (!invitation) {
        return res.status(404).json({ error: "Invitation not found" });
      }

      if (req.body.status === "accepted") {
        const team = await storage.getTeam(invitation.teamId);
        if (team) {
          await storage.updateTeam(invitation.teamId, {
            memberIds: [...team.memberIds, invitation.inviteeId],
          });
        }
      }

      res.json(invitation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/evaluations", async (req: AuthRequest, res: Response) => {
    try {
      const { projectId, evaluatorId } = req.query;
      
      let evaluations;
      if (projectId) {
        evaluations = await storage.getEvaluationsByProject(projectId as string);
      } else if (evaluatorId) {
        evaluations = await storage.getEvaluationsByEvaluator(evaluatorId as string);
      } else {
        return res.status(400).json({ error: "projectId or evaluatorId required" });
      }

      res.json(evaluations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/evaluations", async (req: AuthRequest, res: Response) => {
    try {
      const evaluationData = insertEvaluationSchema.parse(req.body);
      const evaluation = await storage.createEvaluation(evaluationData);
      res.json(evaluation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/evaluations/:id", async (req: AuthRequest, res: Response) => {
    try {
      const evaluation = await storage.updateEvaluation(req.params.id, req.body);
      if (!evaluation) {
        return res.status(404).json({ error: "Evaluation not found" });
      }
      res.json(evaluation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/panels", async (req: AuthRequest, res: Response) => {
    try {
      const panels = await storage.getPanels();
      res.json(panels);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/panels", async (req: AuthRequest, res: Response) => {
    try {
      const panelData = insertPanelSchema.parse(req.body);
      const panel = await storage.createPanel(panelData);
      res.json(panel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/panels/generate", async (req: AuthRequest, res: Response) => {
    try {
      const { constraints } = req.body;
      const projects = await storage.getProjectsByStatus("approved");
      const faculty = await storage.getAvailableFaculty();
      
      const panels = generatePanels(projects, faculty, constraints);
      
      const createdPanels = await Promise.all(
        panels.map(panel => storage.createPanel(panel))
      );

      res.json(createdPanels);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/panels/:id", async (req: AuthRequest, res: Response) => {
    try {
      const panel = await storage.updatePanel(req.params.id, req.body);
      if (!panel) {
        return res.status(404).json({ error: "Panel not found" });
      }
      res.json(panel);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/panels/:id", async (req: AuthRequest, res: Response) => {
    try {
      const success = await storage.deletePanel(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Panel not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/notifications", async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      const notifications = await storage.getNotificationsByUser(userId);
      res.json(notifications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/notifications", async (req: AuthRequest, res: Response) => {
    try {
      const notificationData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(notificationData);
      res.json(notification);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/notifications/:id/read", async (req: AuthRequest, res: Response) => {
    try {
      const success = await storage.markNotificationAsRead(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Notification not found" });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/notifications/read-all", async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      await storage.markAllNotificationsAsRead(userId);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/milestones", async (req: AuthRequest, res: Response) => {
    try {
      const projectId = req.query.projectId as string;
      if (!projectId) {
        return res.status(400).json({ error: "projectId required" });
      }

      const milestones = await storage.getMilestonesByProject(projectId);
      res.json(milestones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/milestones", async (req: AuthRequest, res: Response) => {
    try {
      const milestoneData = insertMilestoneSchema.parse(req.body);
      const milestone = await storage.createMilestone(milestoneData);
      res.json(milestone);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/milestones/:id", async (req: AuthRequest, res: Response) => {
    try {
      const milestone = await storage.updateMilestone(req.params.id, req.body);
      if (!milestone) {
        return res.status(404).json({ error: "Milestone not found" });
      }
      res.json(milestone);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/users", async (req: AuthRequest, res: Response) => {
    try {
      const { role } = req.query;
      const users = role 
        ? await storage.getUsersByRole(role as string)
        : [];
      
      const usersWithoutPassword = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPassword);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/analytics/overview", async (req: AuthRequest, res: Response) => {
    try {
      const projects = await storage.getProjects();
      const users = await storage.getUsersByRole("student");
      const faculty = await storage.getFacultyProfiles();
      const panels = await storage.getPanels();

      const analytics = {
        totalProjects: projects.length,
        totalStudents: users.length,
        totalFaculty: faculty.length,
        totalPanels: panels.length,
        projectsByStatus: {
          pending: projects.filter(p => p.status === "pending").length,
          approved: projects.filter(p => p.status === "approved").length,
          rejected: projects.filter(p => p.status === "rejected").length,
          completed: projects.filter(p => p.status === "completed").length,
        },
        avgAcceptabilityScore: projects.reduce((sum, p) => sum + (p.acceptabilityScore || 0), 0) / projects.length || 0,
      };

      res.json(analytics);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
}

function calculateAcceptabilityScore(project: any): number {
  let score = 50;
  
  if (project.description && project.description.length > 200) score += 20;
  if (project.keywords && project.keywords.length >= 3) score += 15;
  if (project.title && project.title.length > 20) score += 15;
  
  return Math.min(100, score);
}

function calculateMatchScore(profile: any, keywords: string[]): number {
  if (!keywords.length) return 50;
  
  const allExpertise = [...profile.expertise, ...profile.researchInterests].map(e => e.toLowerCase());
  const matchingKeywords = keywords.filter(k => 
    allExpertise.some(e => e.includes(k.toLowerCase()) || k.toLowerCase().includes(e))
  );
  
  const expertiseScore = (matchingKeywords.length / keywords.length) * 60;
  const availabilityScore = profile.available ? 20 : 0;
  const capacityScore = (profile.maxStudents - profile.currentStudents) / profile.maxStudents * 20;
  
  return Math.round(expertiseScore + availabilityScore + capacityScore);
}

function generatePanels(projects: any[], faculty: any[], constraints: any): any[] {
  const panels = [];
  const projectsPerPanel = constraints?.projectsPerPanel || 5;
  const evaluatorsPerPanel = constraints?.evaluatorsPerPanel || 3;
  
  for (let i = 0; i < projects.length; i += projectsPerPanel) {
    const panelProjects = projects.slice(i, i + projectsPerPanel);
    const panelEvaluators = faculty
      .sort(() => Math.random() - 0.5)
      .slice(0, evaluatorsPerPanel);
    
    panels.push({
      name: `Panel ${panels.length + 1}`,
      projectIds: panelProjects.map(p => p.id),
      evaluatorIds: panelEvaluators.map(e => e.userId),
      status: "draft",
      optimizationScore: Math.floor(Math.random() * 30) + 70,
    });
  }
  
  return panels;
}
