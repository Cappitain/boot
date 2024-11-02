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
  selector: 'app-bookst1',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatDialogModule,RouterLink,RouterOutlet],
  templateUrl: './bookst1.component.html',
  styleUrl: './bookst1.component.scss'
})
export class Bookst1Component {
  users = Array<MemberInfo>();
  constructor(private router: Router, private dataService:DataService, private http:HttpClient
    ,private dialog:MatDialog) {http.get(dataService.apiEndpoint + "/memberInfofliter02").subscribe((data:any) =>{
      this.users = userCvt.toMemberInfo(JSON.stringify(data));
      this.users = userCvt.toMemberInfo(JSON.stringify(data));
      console.log(this.users)
    });}
  goTomain2() {
    this.router.navigate(['main2']);
  }
}

