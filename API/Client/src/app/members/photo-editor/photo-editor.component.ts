import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { IMember } from 'src/app/_models/imember';
import { IPhoto } from 'src/app/_models/iphoto';
import { IUser } from 'src/app/_models/iuser';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent {
  @Input()member: IMember | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  basUrl = environment.apiUrl;
  user: IUser | undefined;

  constructor(private accounService: AccountService, private memberService: MembersService){
    this.accounService.currentUser$.pipe(
      take(1)
    ).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
  }

  ngOnInit():void{
    this.initializeUploader();
    console.log("hola");
    console.log(this.member);
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: IPhoto){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: () => {
        if (this.user && this.member){
          this.user.photoUrl = photo.url
          this.accounService.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach(p => {
            if (p.isMain) p.isMain = false;
            if (p.id == photo.id) p.isMain = true;
          })
        }
      }
    });
  }

  deletePhoto(photoId:number){
      this.memberService.deletePhoto(photoId).subscribe({
        next: () => {
          if (this.member){
            this.member.photos = this.member.photos.filter(p => p.id !== photoId);
          }
        }
      });
  }
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.basUrl + "users/photo",
      authToken: "Bearer " + this.user?.token,
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }
    
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    }
  }
}
