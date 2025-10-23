import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  rollNumber: text("roll_number"),
  department: text("department"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  domain: text("domain").notNull(),
  keywords: text("keywords").array().notNull(),
  status: text("status").notNull(),
  studentId: varchar("student_id").notNull(),
  teamId: varchar("team_id"),
  supervisorId: varchar("supervisor_id"),
  acceptabilityScore: integer("acceptability_score"),
  duplicateCheckResult: jsonb("duplicate_check_result"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  memberIds: text("member_ids").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const facultyProfiles = pgTable("faculty_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().unique(),
  expertise: text("expertise").array().notNull(),
  researchInterests: text("research_interests").array().notNull(),
  maxStudents: integer("max_students").default(5).notNull(),
  currentStudents: integer("current_students").default(0).notNull(),
  bio: text("bio"),
  successRate: integer("success_rate").default(0),
  available: boolean("available").default(true).notNull(),
});

export const supervisorRequests = pgTable("supervisor_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull(),
  facultyId: varchar("faculty_id").notNull(),
  projectId: varchar("project_id").notNull(),
  status: text("status").notNull(),
  message: text("message"),
  matchScore: integer("match_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  respondedAt: timestamp("responded_at"),
});

export const evaluations = pgTable("evaluations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  evaluatorId: varchar("evaluator_id").notNull(),
  panelId: varchar("panel_id"),
  scores: jsonb("scores").notNull(),
  comments: text("comments"),
  totalScore: integer("total_score").notNull(),
  status: text("status").notNull(),
  evaluatedAt: timestamp("evaluated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const panels = pgTable("panels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  projectIds: text("project_ids").array().notNull(),
  evaluatorIds: text("evaluator_ids").array().notNull(),
  scheduledDate: timestamp("scheduled_date"),
  room: text("room"),
  status: text("status").notNull(),
  constraints: jsonb("constraints"),
  optimizationScore: integer("optimization_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(),
  read: boolean("read").default(false).notNull(),
  actionUrl: text("action_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const milestones = pgTable("milestones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  status: text("status").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamInvitations = pgTable("team_invitations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamId: varchar("team_id").notNull(),
  inviterId: varchar("inviter_id").notNull(),
  inviteeId: varchar("invitee_id").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  respondedAt: timestamp("responded_at"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  submittedAt: true,
  updatedAt: true,
});

export const insertTeamSchema = createInsertSchema(teams).omit({
  id: true,
  createdAt: true,
});

export const insertFacultyProfileSchema = createInsertSchema(facultyProfiles).omit({
  id: true,
});

export const insertSupervisorRequestSchema = createInsertSchema(supervisorRequests).omit({
  id: true,
  createdAt: true,
  respondedAt: true,
});

export const insertEvaluationSchema = createInsertSchema(evaluations).omit({
  id: true,
  createdAt: true,
  evaluatedAt: true,
});

export const insertPanelSchema = createInsertSchema(panels).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertTeamInvitationSchema = createInsertSchema(teamInvitations).omit({
  id: true,
  createdAt: true,
  respondedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;

export type InsertFacultyProfile = z.infer<typeof insertFacultyProfileSchema>;
export type FacultyProfile = typeof facultyProfiles.$inferSelect;

export type InsertSupervisorRequest = z.infer<typeof insertSupervisorRequestSchema>;
export type SupervisorRequest = typeof supervisorRequests.$inferSelect;

export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
export type Evaluation = typeof evaluations.$inferSelect;

export type InsertPanel = z.infer<typeof insertPanelSchema>;
export type Panel = typeof panels.$inferSelect;

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;
export type Milestone = typeof milestones.$inferSelect;

export type InsertTeamInvitation = z.infer<typeof insertTeamInvitationSchema>;
export type TeamInvitation = typeof teamInvitations.$inferSelect;
