import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { Observable, map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();
  user: User | undefined;
  userParams: UserParams | undefined

  constructor(private http:HttpClient, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user){
          this.userParams = new UserParams(user);
          this.user = user
        }
      }
    });
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params:UserParams){
    this.userParams = params;
  }

  resetUserParams(){
    if (this.user){
      this.userParams = new UserParams(this.user);
      return this.userParams
    }
    return;
  }
  
  getMembers(userParams: UserParams){
    const response = this.memberCache.get(Object.values(userParams).join("-"));

    if (response) return of (response);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append("minAge", userParams.minAge);
    params = params.append("maxAge", userParams.maxAge);
    params = params.append("gender", userParams.gender);
    params = params.append("orderBy", userParams.orderBy);

    return this.getPaginatedResult<Member[]>(this.baseUrl + "users", params).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join("-"), response);
        return response;
      })
    );
    
  }
  getPaginatedResult<T>(url:string, params: HttpParams): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;
    console.log(params);
    return this.http.get<T>(url, {observe: "response", params}).pipe(
      map(response => {
        if(response.body){
          paginatedResult.result = response.body;
          console.log(paginatedResult.result)
        }
        const pagination = response.headers.get("Pagination");
        if(pagination){
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  getMember(username:string){
    const member = [...this.memberCache.values()]
      .reduce((arr,elem) => arr.concat(elem.result), [])
      .find((member: Member) => member.userName === username);
      
    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + "users/" + username)
  }
  
  updateMember(member: Member){
    return this.http.put(this.baseUrl + "users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member};
      })
    )
  }

  setMainPhoto(photoId: number){
    return this.http.put(this.baseUrl + "users/photo/" + photoId, {});
  }

  deletePhoto(photoId: number) : Observable<Object>{
    return this.http.delete(this.baseUrl + "users/photo/" + photoId, {});
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number){
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);
    return params;
  }
}
