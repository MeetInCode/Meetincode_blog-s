import conf from "../../conf/conf.js";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
  client;
  database;
  storage;

  constructor() {
    this.client = new Client();
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.projectId);
    this.databases = new Databases(this.client);
    console.log("Databases initialized:", this.databases); // Check if this is defined
    this.storage = new Storage(this.client);
  }

  async createBlogPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      console.log("Creating blog post with data:", {
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
      });

      if (!this.databases) {
        throw new Error("Databases is not initialized");
      }

      const document = await this.databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        slug,
        { title, slug, content, featuredImage, status, userId }
      );

      console.log("Document created successfully:", document);
      return document;
    } catch (error) {
      console.error("Error in createBlogPost:", error);
      throw new Error("Failed to create blog post");
    }
  }
  //2 parameter is updatepost 1 is slug which is uniqe id types and other is object of data
  async updatepost(slug, { title, content, featuredImage, status }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId, // databaseId
        conf.collectionId, // collectionId
        slug, // documentId
        { title, content, featuredImage, status } // data
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update blog post");
    }
  }

  async deleteblogpost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseId, // databaseId
        conf.collectionId, // collectionId
        slug // documentId
      );
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete blog post");
    }
  }

  async getoneblogpost(slug) {
    try {
      console.log(slug, "slugggggggggggggg");
      const document = await this.databases.getDocument(
        conf.databaseId, // databaseId
        conf.collectionId, // collectionId
        slug // documentId
      );
      console.log(document); // Check what is returned here
      return document; // Ensure `data` exists
    } catch (error) {
      console.error("Error fetching document:", error);
      throw new Error("Failed to get blog post");
    }
  }

  //to query status we need to add status in indexes in apwrite
  async getAllblogpost() {
    try {
      const documents = await this.databases.listDocuments(
        conf.databaseId, // databaseId
        conf.collectionId // collectionId
      );
      console.log("Documents fetched:", documents); // Log the entire documents object
      return documents.documents; // Return an empty array if data is undefined
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw new Error("Failed to get all blog posts");
    }
  }
  async getAllblogpost2(queries = [Query.equal("status", "active")]) {
    try {
      const documents = await this.databases.listDocuments(
        conf.databaseId, // databaseId
        conf.collectionId, // collectionId
        queries // query conditions
      );
      console.log("Documents fetched:", documents); // Log the entire documents object
      return documents.documents; // Return an empty array if data is undefined
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw new Error("Failed to get all blog posts");
    }
  }

  ////////////////////////////////////////////////////////////////
  //file upload service

  async uploadFile(file) {
    try {
      const fileId = await this.storage.createFile(
        conf.bucketId, // bucketId
        ID.unique(),
        file // file object
      );
      return fileId;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload file");
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        conf.bucketId, // bucketId
        fileId // fileId
      );
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete file");
    }
  }

  async getfilepreview(fileId) {
    if (!fileId) {
      throw new Error('Missing required parameter: "fileId"');
    }

    try {
      const filePreview = await this.storage.getFilePreview(
        conf.bucketId,
        fileId
      );
      console.log("File preview111111111111:", filePreview); // Log the entire filePreview object
      return String(filePreview.href);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get file preview");
    }
  }
}
const service = new Service(); //service is object of class Service

export default service;
