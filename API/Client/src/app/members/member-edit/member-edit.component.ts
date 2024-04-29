import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
<<<<<<< HEAD
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
=======
import { IMember } from 'src/app/_models/imember';
import { IUser } from 'src/app/_models/iuser';
>>>>>>> main
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm: NgForm | undefined;
  @HostListener("window:beforeunload", ["$event"]) unloadNotification($event: any){
    if (this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
<<<<<<< HEAD
  member: Member | undefined;
  user: User | null = null;
=======
  member: IMember | undefined;
  user: IUser | null = null;
>>>>>>> main

  constructor(private accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user => this.user = user
      });
    }
  
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    if (!this.user) return;

    this.membersService.getMember(this.user.username).subscribe({
<<<<<<< HEAD
      next: member => {this.member = member; console.log(member)}
=======
      next: member => this.member = member
>>>>>>> main
    })
  }

  updateMember() {
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success("Se ha actualizado tu perfil");
        this.editForm?.reset(this.member);
      }
    });
  }

}