import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Member } from 'src/app/_models/member';
=======
import { IMember } from 'src/app/_models/imember';
>>>>>>> main

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit{
<<<<<<< HEAD
  @Input() member: Member | undefined
=======
  @Input() member: IMember | undefined
>>>>>>> main
  constructor () {}
  ngOnInit(): void {}
}
