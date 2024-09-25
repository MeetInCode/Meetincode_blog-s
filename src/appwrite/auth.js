import conf from "../../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client;
  account;

  constructor() {
    this.client = new Client();
    this.account = null; // Initialize `account` as null for now
    this.init(); // Call async init method
  }

  async init() {
    try {
      console.log("Appwrite URL:", conf.appwriteUrl);
      console.log("Project ID:", conf.projectId);

      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
      this.account = new Account(this.client);

      console.log("Initialization successful with Project ID:", conf.projectId);
    } catch (error) {
      console.error("Initialization failed:", error);
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // Automatically log in after signup
        return this.login({ email, password });
      } else {
        return "failure"; // Just in case an error occurs
      }
    } catch (e) {
      console.error(e);
      throw new Error("Failed to create account");
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login successful", session);
      return session;
    } catch (error) {
      console.log("Error during login", error);
      throw new Error("Login failed");
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("Current user:", user);
      return user;
    } catch (error) {
      if (error.type === "AppwriteException" && error.code === 401) {
        console.log("User not authenticated. Please log in.");
      } else {
        console.log("Error fetching current user:", error);
      }
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Successfully logged out");
    } catch (error) {
      console.log("Failed to logout", error);
    }
  }
}

const authservice = new Authservice();
export default authservice;
