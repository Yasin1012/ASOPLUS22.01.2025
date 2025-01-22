import { account, ID } from "./appwrite-config";
import { Models } from "appwrite";

export class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<Models.User<Models.Preferences>> {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
  }

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<Models.User<Models.Preferences>> {
    try {
      
      const user = await account.create(ID.unique(), email, password, name);

      const session = await account.createEmailPasswordSession(email, password);
      
      const currentUser = await account.get();
      

      return currentUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout() {
    return await account.deleteSession("current");
  }

  async getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
