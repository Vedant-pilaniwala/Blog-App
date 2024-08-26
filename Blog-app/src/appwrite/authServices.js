import { Client, Account, ID } from "appwrite";
import config from "../config/config";

class AuthService {
  Client = new Client();
  account;

  constructor() {
    this.Client.setEndpoint(config.appwriteUrl).setProject(config.projectId);
    this.account = new Account(this.Client);
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
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error(`Appwrite services ::  createAccount :: ${error}`);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error(`Appwrite services :: login :: ${error}`);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.error(`Appwrite services :: logout :: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error(`Appwrite services :: getCurrentUser :: ${error}`);
    }
  }
}

const services = new AuthService();

export default services;
