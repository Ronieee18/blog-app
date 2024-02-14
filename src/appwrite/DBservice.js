import { conf } from "../config/config";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class DBservice{
    client= new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectID)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    
    async createPost({title,slug,content,featuredImage,status,userID=""}){
        try {
            if (!userID) {
                console.log('Missing required attribute "userID"');
            }
            return await this.databases.createDocument(conf.appwriteDBID,conf.appwriteCollectionID,slug,{
                title,
                content,        
                featuredImage,  
                status,
                userID,
            })
            
        } catch (error) {
            console.log(`error : ${error}`)
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDBID,conf.appwriteCollectionID,slug,{
                title,
                content,
                featuredImage,
                status
            })
            
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(conf.appwriteDBID,conf.appwriteCollectionID,slug)
              alert('deleted successfully');
             return true;
        } catch (error) {
            console.log(`error: ${error}`)
            return false;
        }

    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDBID,conf.appwriteCollectionID,slug)
            
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
    async getPosts(queries=[Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(conf.appwriteDBID,conf.appwriteCollectionID,queries)
            
        } catch (error) {
            console.log(`error: ${error}`)
            return false
        }
    }

    // Bucket Services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketID,ID.unique(),file)
        } catch (error) {
            console.log(`error: ${error}`)
            return false
        }
    }
    async deleteFile(fileID){
        try {
             await this.bucket.deleteFile(conf.appwriteBucketID,fileID)
             return true;
            
        } catch (error) {
            console.log(`error: ${error}`)
            return false
        
        }
    }
    getFilePreview(fileID){
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketID,fileID)
        } catch (error) {
            console.log(`error ${error}`)
        }
    }
}
const dbservice=new DBservice()
export default dbservice