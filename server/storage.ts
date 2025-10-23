import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.seedUsers();
  }

  private seedUsers() {
    const seedData: InsertUser[] = [
      {
        username: "student1",
        password: "password123",
        role: "student",
        fullName: "John Doe",
      },
      {
        username: "faculty1",
        password: "password123",
        role: "faculty",
        fullName: "Dr. Sarah Ahmed",
      },
      {
        username: "committee1",
        password: "password123",
        role: "committee",
        fullName: "Prof. Muhammad Khan",
      },
    ];

    seedData.forEach((userData) => {
      const id = randomUUID();
      const user: User = { ...userData, id };
      this.users.set(id, user);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
