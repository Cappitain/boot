import { Component,NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../service/data.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatMenuModule,CommonModule,NgIf],
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.scss']
})
export class Main2Component { 
  title = 'boots';
  isLoggedInAdmin: boolean = true;
  user: any={};
  isLoggedIn: boolean | undefined;

  constructor(private router: Router,private dataService:DataService, private http:HttpClient, private dialog : MatDialog) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToMember() {
    this.router.navigate(['/member']);
  }
  goToRegister() {
    this.router.navigate(['/regis']);
  }
  goToZone2() {
    this.router.navigate(['/zone2']);
  }
  goToInfo() {
    this.router.navigate(['/info']);
  }
  goToEvent() {
    this.router.navigate(['/event']);
  }
  goTomain() {
    this.router.navigate(['']);
  }
  goTobookst() {
    this.router.navigate(['/bookst']);
  }
  goTobookst1() {
    this.router.navigate(['/bookst1']);
  }
  goTobtck() {
    this.router.navigate(['/boothck']);
  }
  goTobtck1() {
    this.router.navigate(['/boothck1']);
  }

  
  ngOnInit() {

    const loggedInStatus = localStorage.getItem('isLoggedInAdmin');
    this.isLoggedInAdmin = loggedInStatus === 'true'; // แปลงค่าเป็น boolean
    const email = localStorage.getItem('email');
    console.log(email);
    this.getUserInfo()
    const userID = localStorage.getItem('userID');
    console.log(userID)

    
  }

  logout() {
  
  this.isLoggedIn = false;
  localStorage.clear();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('isLoggedInAdmin'); // ลบค่าออกจาก localStorage
    setTimeout(() => {
      this.router.navigate(['/']).then(() => {window.location.reload(); });
  }, 100);
  alert('Logout Success!!')
}
getUserInfo(): void {
  const email = localStorage.getItem('email'); // ดึงอีเมลจาก local 
  console.log(email)    // const apiEndpoint = 'https://wtg11.bowlab.net/webapi_finalpro/users/getUserByEmail';
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const jEmail = {email};
  const apiEndpoint='http://localhost/webapi/users/getUserByEmail';
  let jsonString = JSON.stringify(email);
  this.http.post<ApiResponse>(apiEndpoint, jEmail, { headers: headers,
    observe:'response'}).subscribe((response) =>{
      console.log(typeof email);
      console.log( email);
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
      const body = response.body;
      if (body && body.status === 'success' && body.userInfo) {  // ตรวจสอบว่า body ไม่ใช่ null และ userInfo มีอยู่
        const userInfoArray = body.userInfo;
        if (userInfoArray.length > 0) {
          this.user = userInfoArray[0]; // เก็บข้อมูลผู้ใช้ในตัวแปร user
          localStorage.setItem('userID', this.user.userID);
          const userid = localStorage.getItem('userID');
          console.log(userid);
        } else {
          console.error('User information not found');
          alert('ไม่พบข้อมูลผู้ใช้');
        }
      } else {
        console.error('Error fetching user info:', body?.message);
        alert('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
      }

    })
}
}
export interface ApiResponse {
  status: string;
  userInfo: user[];
  message?: string;  // message อาจจะมีหรือไม่มีก็ได้
}

export interface user {
  userID: string;
  titleName: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  password: string;
}