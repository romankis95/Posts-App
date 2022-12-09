import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {// This is a class that implements the HttpInterceptor interface
  constructor(private authService: AuthService) {}// This is a constructor that takes an argument of type AuthService

  intercept(req: HttpRequest<any>, next: HttpHandler) { // This is a method that takes two arguments of type HttpRequest and HttpHandler
    const authToken = this.authService.getToken();// This is a variable that is assigned the value of the return value of the getToken() method of the authService object
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
} 