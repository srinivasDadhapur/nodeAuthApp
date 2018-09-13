import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpErrorResponse } from '@angular/common/http'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authToken:any;
  public user:any;


  constructor(private http:HttpClient) { }


  registerUser(user){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    // headers.append('Content-Type': 'application/json');

    return this.http.post<any>('http://localhost:8080/users/register',user,{headers:headers})
    .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
}


authenticateUser(user){
  let headers = new HttpHeaders().set('Content-Type','application/json');
    // headers.append('Content-Type': 'application/json');

    return this.http.post<any>('http://localhost:8080/users/authenticate',user,{headers:headers})
    .pipe(catchError(this.errorHandler));
}


loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;

}

getProfile(){
    this.loadToken();
    let headers = new HttpHeaders({'Authorization':this.authToken,'Content-Type': 'application/json'});
    // headers.set('Authorization',this.authToken);
    // headers.set('Content-Type', 'application/json');    
    return this.http.get<any>('http://localhost:8080/users/profile',{headers: headers})
    .pipe(catchError(this.errorHandler));
}

storeUserData(token,user){
  localStorage.setItem('id_token',token);
  localStorage.setItem('user',JSON.stringify(user));
  this.authToken = token;
  this.user = user;
}

loggedIn(){
  return !!localStorage.getItem('id_token');
}

logout(){
  this.authToken=null;
  this.user = null;
  localStorage.clear();
}



}
