import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Convert as userCvt, MemberInfo } from '../../model/user.model';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { Convert as boothCvt, Booth } from '../../model/booth.model';
import { Convert as boothcheckCvt, Boothcheck } from '../../model/boothcheck.model';

@Component({
  selector: 'app-boothcheck',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatDialogModule,RouterLink,RouterOutlet],
  templateUrl: './boothcheck.component.html',
  styleUrl: './boothcheck.component.scss'
})
export class BoothcheckComponent {
  boothchecks = Array<Boothcheck>();
  selectedboothchecks = Array<Boothcheck>();
  users = Array<MemberInfo>();
  selectedBoothcheck : any;
  constructor(private router: Router, private dataService:DataService, private http:HttpClient
    ,private dialog:MatDialog) {http.get(dataService.apiEndpoint + "/boothcheck").subscribe((data:any) =>{
      this.boothchecks = boothcheckCvt.toBoothcheck(JSON.stringify(data));
      this.boothchecks = boothcheckCvt.toBoothcheck(JSON.stringify(data));
      console.log(this.boothchecks)
    });}
  goTomain2() {
    this.router.navigate(['main2']);
  }
}
