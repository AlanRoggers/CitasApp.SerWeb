import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
=======
import { Observable } from 'rxjs';
import { IMember } from 'src/app/_models/imember';
>>>>>>> main
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
<<<<<<< HEAD
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [{value: "female", display: "Females"}, {value:"male", display: "Males"}];
  
  constructor(private membersService: MembersService){
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    if(this.userParams) {
      this.membersService.setUserParams(this.userParams);
      this.membersService.getMembers(this.userParams).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

  resetFilters(){
    this.userParams = this.membersService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event:any){
    if (this.userParams && this.userParams?.pageNumber !== event.page){
        this.userParams.pageNumber = event.page;
        this.membersService.setUserParams(this.userParams);
        this.loadMembers();
      }
    }
=======
  members$: Observable<IMember[]> | undefined

  constructor(private membersService: MembersService){}

  ngOnInit(): void {
    this.members$ = this.membersService.getMembers();
  }
>>>>>>> main
}
