import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Convert as userCvt, MemberInfo } from '../../model/user.model';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-allmember',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatDialogModule,RouterLink,RouterOutlet],
  templateUrl: './allmember.component.html',
  styleUrl: './allmember.component.scss'

})
export class AllmemberComponent {
  users = Array<MemberInfo>();
  constructor(private router: Router, private dataService:DataService, private http:HttpClient
    ,private dialog:MatDialog) {http.get(dataService.apiEndpoint + "/memberInfo").subscribe((data:any) =>{
      this.users = userCvt.toMemberInfo(JSON.stringify(data));
      console.log(this.users)
    });}
  goTomain2() {
    this.router.navigate(['main2']);
  }
}
