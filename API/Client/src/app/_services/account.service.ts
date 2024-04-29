import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
<<<<<<< HEAD
import { User } from '../_models/user';
=======
import { IUser } from '../_models/iuser';
>>>>>>> main
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
<<<<<<< HEAD
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }
  login(model:User){
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
=======
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }
  login(model:IUser){
    return this.http.post<IUser>(this.baseUrl + "account/login", model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user))
          this.currentUserSource.next(user);
>>>>>>> main
        }
      })
    )
  }
<<<<<<< HEAD
  setCurrentUser(user: User){
    localStorage.setItem("user", JSON.stringify(user))
    this.currentUserSource.next(user);
  }
  register(model:any){
    return this.http.post<User>(this.baseUrl + "account/register", model).pipe(
=======
  setCurrentUser(user: IUser){
    this.currentUserSource.next(user);
  }
  register(model:any){
    return this.http.post<IUser>(this.baseUrl + "account/register", model).pipe(
>>>>>>> main
      map(user => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  logout(){
    localStorage.removeItem("user");
    this.currentUserSource.next(null)
  }
}
