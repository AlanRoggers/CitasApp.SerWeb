import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
<<<<<<< HEAD
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
=======
>>>>>>> main

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}
<<<<<<< HEAD
  registerForm: FormGroup = new FormGroup({})
  maxDate: Date = new Date();
  validationErrors: string[] | undefined

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb : FormBuilder, private router: Router){}

  ngOnInit():void{
    this.initializeFrom();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeFrom(){
    this.registerForm = this.fb.group({
      gender:["female"],
      username:["", Validators.required],
      knownAs:["", Validators.required],
      dateOfBirth:["", Validators.required],
      city:["", Validators.required],
      country:["", Validators.required],
      password:["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword:["", [Validators.required, this.matchValues("password")]],
    })

    this.registerForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchValues("password")])
    })

    this.registerForm.controls["password"].valueChanges.subscribe({
      next: () => this.registerForm.controls["confirmPassword"].updateValueAndValidity(),
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true};
    }
  }

  register(): void {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};
    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl("/members");
=======

  constructor(private accountService: AccountService, private toastr: ToastrService){}

  ngOnInit():void{

  }

  register(): void {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
>>>>>>> main
      },
      error: error => this.toastr.error(error.error)
    });
  }

  cancel():void{
    this.cancelRegister.emit(false);
  }
<<<<<<< HEAD

  private getDateOnly(dob: string | undefined){
    if (!dob) return;
    let newDob = new Date(dob);
    return new Date(newDob.setMinutes(newDob.getMinutes()-newDob.getTimezoneOffset()))
    .toString().slice(0,10);
  }
=======
>>>>>>> main
}
