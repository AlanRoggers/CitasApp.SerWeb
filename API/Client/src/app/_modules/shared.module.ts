import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
<<<<<<< HEAD
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from  'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
=======

>>>>>>> main

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-scale-multiple'
    }),
<<<<<<< HEAD
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
=======
>>>>>>> main
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
<<<<<<< HEAD
    NgxSpinnerModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
=======
    NgxSpinnerModule
>>>>>>> main
  ]
})
export class SharedModule { }
