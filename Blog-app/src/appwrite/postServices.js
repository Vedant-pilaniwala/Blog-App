import { Client, Databases, Storage, Query, ID } from "appwrite";
import config from "../config/config";

class postServices {
  Client = new Client();
  databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(config.appwriteUrl).setProject(config.projectId);
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.databaseId,
        config.collectionId,
        ID.unique(),
        {
          title,
          slug,
          content,
          featuredImg,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error(`Appwrite services ::  createPost :: ${error}`);
    }
  }

  async updatePost(postID, { title, slug, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        config.databaseId,
        config.collectionId,
        postID,
        {
          title,
          slug,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      console.error(`Appwrite services :: updatePost :: ${error}`);
    }
  }

  async deletePost(postID) {
    try {
      return await this.databases.deleteDocument(
        config.databaseId,
        config.collectionId,
        postID
      );
    } catch (error) {
      console.error(`Appwrite services :: deletePost :: ${error}`);
    }
  }

  async getPost(postID) {
    try {
      return await this.databases.getDocument(
        config.databaseId,
        config.collectionId,
        postID
      );
    } catch (error) {
      console.error(`Appwrite services :: getPost :: ${error}`);
      return false;
    }
  }

  async getEveryPost() {
    try {
      return await this.databases.listDocuments(
        config.databaseId,
        config.collectionId
      );
    } catch (error) {
      console.error(`Appwrite services :: getEveryPost :: ${error}`);
      return false;
    }
  }

  async getAllPosts() {
    try {
      return await this.databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.error(`Appwrite services :: getAllPosts :: ${error}`);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.bucketId, ID.unique(), file);
    } catch (error) {
      console.error(`Appwrite services :: uploadFile :: ${error}`);
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(config.bucketId, fileID);
      return true;
    } catch (error) {
      console.error(`Appwrite services :: deleteFile :: ${error}`);
      return false;
    }
  }

  getFilePreview(fileID) {
    return this.bucket.getFilePreview(config.bucketId, fileID);
  }
}

const dbServices = new postServices();

export default dbServices;
