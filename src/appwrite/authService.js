import {Client,Account,ID} from 'appwrite'
import { conf } from '../config/config'
export class AuthService{
    client=new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID)
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const user= await this.account.create(ID.unique(),email,password,name)
            if(user){
                this.login({email,password})
            }
            
        } catch (error) {
            console.log( `appwrite create accout error: ${error}`);
        }

    }
    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            alert('invalid password')
        }
    }
    async getCurrent(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log( `appwrite current error: ${error}`)
        }
    }
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log( `appwrite logout error: ${error}`)
        }
    }
    
}


const authservice=new AuthService();
export default authservice;