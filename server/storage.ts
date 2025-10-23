import { randomUUID } from "crypto";
import type {
  User,
  InsertUser,
  Project,
  InsertProject,
  Team,
  InsertTeam,
  FacultyProfile,
  InsertFacultyProfile,
  SupervisorRequest,
  InsertSupervisorRequest,
  Evaluation,
  InsertEvaluation,
  Panel,
  InsertPanel,
  Notification,
  InsertNotification,
  Milestone,
  InsertMilestone,
  TeamInvitation,
  InsertTeamInvitation,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUsersByRole(role: string): Promise<User[]>;
  
  getProject(id: string): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  getProjectsByStudent(studentId: string): Promise<Project[]>;
  getProjectsBySupervisor(supervisorId: string): Promise<Project[]>;
  getProjectsByStatus(status: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  getTeam(id: string): Promise<Team | undefined>;
  getTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: string, team: Partial<Team>): Promise<Team | undefined>;
  
  getFacultyProfile(userId: string): Promise<FacultyProfile | undefined>;
  getFacultyProfiles(): Promise<FacultyProfile[]>;
  getAvailableFaculty(): Promise<FacultyProfile[]>;
  createFacultyProfile(profile: InsertFacultyProfile): Promise<FacultyProfile>;
  updateFacultyProfile(userId: string, profile: Partial<FacultyProfile>): Promise<FacultyProfile | undefined>;
  
  getSupervisorRequest(id: string): Promise<SupervisorRequest | undefined>;
  getSupervisorRequestsByStudent(studentId: string): Promise<SupervisorRequest[]>;
  getSupervisorRequestsByFaculty(facultyId: string): Promise<SupervisorRequest[]>;
  createSupervisorRequest(request: InsertSupervisorRequest): Promise<SupervisorRequest>;
  updateSupervisorRequest(id: string, request: Partial<SupervisorRequest>): Promise<SupervisorRequest | undefined>;
  
  getEvaluation(id: string): Promise<Evaluation | undefined>;
  getEvaluationsByProject(projectId: string): Promise<Evaluation[]>;
  getEvaluationsByEvaluator(evaluatorId: string): Promise<Evaluation[]>;
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  updateEvaluation(id: string, evaluation: Partial<Evaluation>): Promise<Evaluation | undefined>;
  
  getPanel(id: string): Promise<Panel | undefined>;
  getPanels(): Promise<Panel[]>;
  createPanel(panel: InsertPanel): Promise<Panel>;
  updatePanel(id: string, panel: Partial<Panel>): Promise<Panel | undefined>;
  deletePanel(id: string): Promise<boolean>;
  
  getNotification(id: string): Promise<Notification | undefined>;
  getNotificationsByUser(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: string, notification: Partial<Notification>): Promise<Notification | undefined>;
  markNotificationAsRead(id: string): Promise<boolean>;
  markAllNotificationsAsRead(userId: string): Promise<boolean>;
  
  getMilestone(id: string): Promise<Milestone | undefined>;
  getMilestonesByProject(projectId: string): Promise<Milestone[]>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
  updateMilestone(id: string, milestone: Partial<Milestone>): Promise<Milestone | undefined>;
  
  getTeamInvitation(id: string): Promise<TeamInvitation | undefined>;
  getTeamInvitationsByInvitee(inviteeId: string): Promise<TeamInvitation[]>;
  getTeamInvitationsByTeam(teamId: string): Promise<TeamInvitation[]>;
  createTeamInvitation(invitation: InsertTeamInvitation): Promise<TeamInvitation>;
  updateTeamInvitation(id: string, invitation: Partial<TeamInvitation>): Promise<TeamInvitation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private teams: Map<string, Team>;
  private facultyProfiles: Map<string, FacultyProfile>;
  private supervisorRequests: Map<string, SupervisorRequest>;
  private evaluations: Map<string, Evaluation>;
  private panels: Map<string, Panel>;
  private notifications: Map<string, Notification>;
  private milestones: Map<string, Milestone>;
  private teamInvitations: Map<string, TeamInvitation>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.teams = new Map();
    this.facultyProfiles = new Map();
    this.supervisorRequests = new Map();
    this.evaluations = new Map();
    this.panels = new Map();
    this.notifications = new Map();
    this.milestones = new Map();
    this.teamInvitations = new Map();
    this.seedData();
  }

  private seedData() {
    const hashedPassword = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";
    
    const studentUser: User = {
      id: "student-1",
      username: "student",
      password: hashedPassword,
      fullName: "John Doe",
      email: "student@fast.edu.pk",
      role: "student",
      rollNumber: "22I-2646",
      department: "Computer Science",
      createdAt: new Date(),
    };

    const facultyUser: User = {
      id: "faculty-1",
      username: "faculty",
      password: hashedPassword,
      fullName: "Dr. Nigar Azhar Butt",
      email: "faculty@fast.edu.pk",
      role: "faculty",
      rollNumber: null,
      department: "Computer Science",
      createdAt: new Date(),
    };

    const committeeUser: User = {
      id: "committee-1",
      username: "committee",
      password: hashedPassword,
      fullName: "Committee Admin",
      email: "committee@fast.edu.pk",
      role: "committee",
      rollNumber: null,
      department: "Computer Science",
      createdAt: new Date(),
    };

    this.users.set(studentUser.id, studentUser);
    this.users.set(facultyUser.id, facultyUser);
    this.users.set(committeeUser.id, committeeUser);

    const facultyProfile: FacultyProfile = {
      id: randomUUID(),
      userId: "faculty-1",
      expertise: ["Machine Learning", "AI", "Data Science"],
      researchInterests: ["Natural Language Processing", "Computer Vision"],
      maxStudents: 5,
      currentStudents: 2,
      bio: "Professor specializing in AI and Machine Learning",
      successRate: 85,
      available: true,
    };

    this.facultyProfiles.set(facultyProfile.userId, facultyProfile);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
      rollNumber: insertUser.rollNumber ?? null,
      department: insertUser.department ?? null,
    };
    this.users.set(id, user);
    return user;
  }

  async getUsersByRole(role: string): Promise<User[]> {
    return Array.from(this.users.values()).filter((user) => user.role === role);
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByStudent(studentId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.studentId === studentId,
    );
  }

  async getProjectsBySupervisor(supervisorId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.supervisorId === supervisorId,
    );
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.status === status,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      submittedAt: new Date(),
      updatedAt: new Date(),
      teamId: insertProject.teamId ?? null,
      supervisorId: insertProject.supervisorId ?? null,
      acceptabilityScore: insertProject.acceptabilityScore ?? null,
      duplicateCheckResult: insertProject.duplicateCheckResult ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(
    id: string,
    projectUpdate: Partial<Project>,
  ): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...projectUpdate, updatedAt: new Date() };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getTeam(id: string): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async getTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = randomUUID();
    const team: Team = { ...insertTeam, id, createdAt: new Date() };
    this.teams.set(id, team);
    return team;
  }

  async updateTeam(
    id: string,
    teamUpdate: Partial<Team>,
  ): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    const updated = { ...team, ...teamUpdate };
    this.teams.set(id, updated);
    return updated;
  }

  async getFacultyProfile(userId: string): Promise<FacultyProfile | undefined> {
    return this.facultyProfiles.get(userId);
  }

  async getFacultyProfiles(): Promise<FacultyProfile[]> {
    return Array.from(this.facultyProfiles.values());
  }

  async getAvailableFaculty(): Promise<FacultyProfile[]> {
    return Array.from(this.facultyProfiles.values()).filter(
      (profile) => profile.available,
    );
  }

  async createFacultyProfile(
    insertProfile: InsertFacultyProfile,
  ): Promise<FacultyProfile> {
    const id = randomUUID();
    const profile: FacultyProfile = {
      ...insertProfile,
      id,
      maxStudents: insertProfile.maxStudents ?? 5,
      currentStudents: insertProfile.currentStudents ?? 0,
      bio: insertProfile.bio ?? null,
      successRate: insertProfile.successRate ?? null,
      available: insertProfile.available ?? true,
    };
    this.facultyProfiles.set(insertProfile.userId, profile);
    return profile;
  }

  async updateFacultyProfile(
    userId: string,
    profileUpdate: Partial<FacultyProfile>,
  ): Promise<FacultyProfile | undefined> {
    const profile = this.facultyProfiles.get(userId);
    if (!profile) return undefined;
    const updated = { ...profile, ...profileUpdate };
    this.facultyProfiles.set(userId, updated);
    return updated;
  }

  async getSupervisorRequest(
    id: string,
  ): Promise<SupervisorRequest | undefined> {
    return this.supervisorRequests.get(id);
  }

  async getSupervisorRequestsByStudent(
    studentId: string,
  ): Promise<SupervisorRequest[]> {
    return Array.from(this.supervisorRequests.values()).filter(
      (request) => request.studentId === studentId,
    );
  }

  async getSupervisorRequestsByFaculty(
    facultyId: string,
  ): Promise<SupervisorRequest[]> {
    return Array.from(this.supervisorRequests.values()).filter(
      (request) => request.facultyId === facultyId,
    );
  }

  async createSupervisorRequest(
    insertRequest: InsertSupervisorRequest,
  ): Promise<SupervisorRequest> {
    const id = randomUUID();
    const request: SupervisorRequest = {
      ...insertRequest,
      id,
      createdAt: new Date(),
      respondedAt: null,
      message: insertRequest.message ?? null,
      matchScore: insertRequest.matchScore ?? null,
    };
    this.supervisorRequests.set(id, request);
    return request;
  }

  async updateSupervisorRequest(
    id: string,
    requestUpdate: Partial<SupervisorRequest>,
  ): Promise<SupervisorRequest | undefined> {
    const request = this.supervisorRequests.get(id);
    if (!request) return undefined;
    const updated = { ...request, ...requestUpdate };
    if (requestUpdate.status && requestUpdate.status !== "pending") {
      updated.respondedAt = new Date();
    }
    this.supervisorRequests.set(id, updated);
    return updated;
  }

  async getEvaluation(id: string): Promise<Evaluation | undefined> {
    return this.evaluations.get(id);
  }

  async getEvaluationsByProject(projectId: string): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).filter(
      (evaluation) => evaluation.projectId === projectId,
    );
  }

  async getEvaluationsByEvaluator(evaluatorId: string): Promise<Evaluation[]> {
    return Array.from(this.evaluations.values()).filter(
      (evaluation) => evaluation.evaluatorId === evaluatorId,
    );
  }

  async createEvaluation(
    insertEvaluation: InsertEvaluation,
  ): Promise<Evaluation> {
    const id = randomUUID();
    const evaluation: Evaluation = {
      ...insertEvaluation,
      id,
      createdAt: new Date(),
      evaluatedAt: null,
      panelId: insertEvaluation.panelId ?? null,
      comments: insertEvaluation.comments ?? null,
    };
    this.evaluations.set(id, evaluation);
    return evaluation;
  }

  async updateEvaluation(
    id: string,
    evaluationUpdate: Partial<Evaluation>,
  ): Promise<Evaluation | undefined> {
    const evaluation = this.evaluations.get(id);
    if (!evaluation) return undefined;
    const updated = { ...evaluation, ...evaluationUpdate };
    if (evaluationUpdate.status === "completed") {
      updated.evaluatedAt = new Date();
    }
    this.evaluations.set(id, updated);
    return updated;
  }

  async getPanel(id: string): Promise<Panel | undefined> {
    return this.panels.get(id);
  }

  async getPanels(): Promise<Panel[]> {
    return Array.from(this.panels.values());
  }

  async createPanel(insertPanel: InsertPanel): Promise<Panel> {
    const id = randomUUID();
    const panel: Panel = {
      ...insertPanel,
      id,
      createdAt: new Date(),
      scheduledDate: insertPanel.scheduledDate ?? null,
      room: insertPanel.room ?? null,
      constraints: insertPanel.constraints ?? null,
      optimizationScore: insertPanel.optimizationScore ?? null,
    };
    this.panels.set(id, panel);
    return panel;
  }

  async updatePanel(
    id: string,
    panelUpdate: Partial<Panel>,
  ): Promise<Panel | undefined> {
    const panel = this.panels.get(id);
    if (!panel) return undefined;
    const updated = { ...panel, ...panelUpdate };
    this.panels.set(id, updated);
    return updated;
  }

  async deletePanel(id: string): Promise<boolean> {
    return this.panels.delete(id);
  }

  async getNotification(id: string): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async getNotificationsByUser(userId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNotification(
    insertNotification: InsertNotification,
  ): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      ...insertNotification,
      id,
      createdAt: new Date(),
      read: insertNotification.read ?? false,
      actionUrl: insertNotification.actionUrl ?? null,
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async updateNotification(
    id: string,
    notificationUpdate: Partial<Notification>,
  ): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    const updated = { ...notification, ...notificationUpdate };
    this.notifications.set(id, updated);
    return updated;
  }

  async markNotificationAsRead(id: string): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;
    notification.read = true;
    this.notifications.set(id, notification);
    return true;
  }

  async markAllNotificationsAsRead(userId: string): Promise<boolean> {
    const userNotifications = await this.getNotificationsByUser(userId);
    userNotifications.forEach((notification) => {
      notification.read = true;
      this.notifications.set(notification.id, notification);
    });
    return true;
  }

  async getMilestone(id: string): Promise<Milestone | undefined> {
    return this.milestones.get(id);
  }

  async getMilestonesByProject(projectId: string): Promise<Milestone[]> {
    return Array.from(this.milestones.values()).filter(
      (milestone) => milestone.projectId === projectId,
    );
  }

  async createMilestone(insertMilestone: InsertMilestone): Promise<Milestone> {
    const id = randomUUID();
    const milestone: Milestone = {
      ...insertMilestone,
      id,
      createdAt: new Date(),
      completedAt: null,
      description: insertMilestone.description ?? null,
      dueDate: insertMilestone.dueDate ?? null,
    };
    this.milestones.set(id, milestone);
    return milestone;
  }

  async updateMilestone(
    id: string,
    milestoneUpdate: Partial<Milestone>,
  ): Promise<Milestone | undefined> {
    const milestone = this.milestones.get(id);
    if (!milestone) return undefined;
    const updated = { ...milestone, ...milestoneUpdate };
    if (milestoneUpdate.status === "completed") {
      updated.completedAt = new Date();
    }
    this.milestones.set(id, updated);
    return updated;
  }

  async getTeamInvitation(id: string): Promise<TeamInvitation | undefined> {
    return this.teamInvitations.get(id);
  }

  async getTeamInvitationsByInvitee(
    inviteeId: string,
  ): Promise<TeamInvitation[]> {
    return Array.from(this.teamInvitations.values()).filter(
      (invitation) => invitation.inviteeId === inviteeId,
    );
  }

  async getTeamInvitationsByTeam(teamId: string): Promise<TeamInvitation[]> {
    return Array.from(this.teamInvitations.values()).filter(
      (invitation) => invitation.teamId === teamId,
    );
  }

  async createTeamInvitation(
    insertInvitation: InsertTeamInvitation,
  ): Promise<TeamInvitation> {
    const id = randomUUID();
    const invitation: TeamInvitation = {
      ...insertInvitation,
      id,
      createdAt: new Date(),
      respondedAt: null,
    };
    this.teamInvitations.set(id, invitation);
    return invitation;
  }

  async updateTeamInvitation(
    id: string,
    invitationUpdate: Partial<TeamInvitation>,
  ): Promise<TeamInvitation | undefined> {
    const invitation = this.teamInvitations.get(id);
    if (!invitation) return undefined;
    const updated = { ...invitation, ...invitationUpdate };
    if (invitationUpdate.status && invitationUpdate.status !== "pending") {
      updated.respondedAt = new Date();
    }
    this.teamInvitations.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
