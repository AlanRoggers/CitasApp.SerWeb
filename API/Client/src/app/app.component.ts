import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { User } from './_models/user';
=======
import { IUser } from './_models/iuser';
>>>>>>> main
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Client';
  
  constructor(private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.setCurrentUser()
  }
  setCurrentUser():void{
    const userString = localStorage.getItem("user")
    if (!userString) return;
<<<<<<< HEAD
    const user : User = JSON.parse(userString);
=======
    const user : IUser = JSON.parse(userString);
>>>>>>> main
    this.accountService.setCurrentUser(user);
  }
}
