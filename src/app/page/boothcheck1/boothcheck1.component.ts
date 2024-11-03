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
  selector: 'app-boothcheck1',
  standalone: true,
  imports: [CommonModule,HttpClientModule,MatDialogModule,RouterLink,RouterOutlet],
  templateUrl: './boothcheck1.component.html',
  styleUrl: './boothcheck1.component.scss'
})
export class Boothcheck1Component {
  boothchecks = Array<Boothcheck>();
  selectedboothchecks = Array<Boothcheck>();
  users = Array<MemberInfo>();booths = Array<Booth>();
  selectedBoothcheck : any;
  constructor(private router: Router, private dataService:DataService, private http:HttpClient
    ,private dialog:MatDialog) {http.get(dataService.apiEndpoint + "/boothcheck1").subscribe((data:any) =>{
      this.boothchecks = boothcheckCvt.toBoothcheck(JSON.stringify(data));
      this.boothchecks = boothcheckCvt.toBoothcheck(JSON.stringify(data));
      console.log(this.booths)
    });}
  goTomain2() {
    this.router.navigate(['main2']);
  }
}

