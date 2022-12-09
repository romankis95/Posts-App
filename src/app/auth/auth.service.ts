import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({
    providedIn: "root"// This is the default value
})
export class AuthService{
    private isAuthenticated = false;
    private token : string;
    private authStatusListener = new Subject<boolean>();


    getToken(){
        return this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();// This is a method that returns an observable
    }

    getIsAuth(){
        return this.isAuthenticated;
    }
    
    constructor(private http: HttpClient ){

    }
createUser(email: string, password: string){
    const authData : AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(response => {
        console.log(response);
    });

}
    loginUser(email: string, password: string){
        const authData : AuthData = {email: email, password: password};
        this.http.post<{token:string}>("http://localhost:3000/api/user/login", authData).subscribe(response => {
          const token = response.token;
            this.token = token;
            if(token){
                this.isAuthenticated = true;

            this.authStatusListener.next(true);//we are emitting a value of true, so any component that is listening to this observable will be notified
    }});




    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
    }
}