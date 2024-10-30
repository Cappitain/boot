import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Convert as userCvt, MemberInfo} from '../../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterOutlet,MatMenuModule,FormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})
export class InfoComponent {
  user: any={};
  users = Array<MemberInfo>();
  isLoggedInAdmin: boolean = true;
  isLoggedIn: boolean | undefined;
  constructor(private router: Router,private dataService:DataService, private http:HttpClient, private dialog : MatDialog) {}
  goTomain2() {
    this.router.navigate(['main2']);
  }
  ngOnInit():void {
    const loggedInStatus = localStorage.getItem('isLoggedInAdmin');
    this.isLoggedInAdmin = loggedInStatus === 'true'; // แปลงค่าเป็น boolean
    const email = localStorage.getItem('email');
    console.log(email);
    this.getUserInfo();
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

// ฟังก์ชันเพื่อเรียกข้อมูลผู้ใช้

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

updateUsers(): void {
  if (!this.user.email || !this.user.userID) {
    alert('กรุณากรอกข้อมูลที่จำเป็น');
    return;
  }

  const jsonObj = {
    userID: this.user.userID,
    titleName: this.user.titleName,
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    telephone: this.user.telephone,
    password: this.user.password
  };

  const apiEndpoint = 'http://localhost/webapi/users/userUpdates2';
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.put(apiEndpoint, jsonObj, { headers: headers, observe: 'response' })
    .subscribe({
      next: (response) => {
        if (response.status === 200) {
          alert('แก้ไขข้อมูลสำเร็จ');
         this.router.navigate(['/main2']).then(() => window.location.reload());
        } else {
          alert('ไม่สามารถแก้ไขข้อมูลได้');
        }
      },
      error: (error) => {
        console.error('Error updating user:', error); // Log ข้อผิดพลาดใน console
        alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
      }
    });
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
