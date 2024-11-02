import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
interface checkMailResponse {
  status: string;
  message: string;
}
@Component({
  selector: 'app-forgotpass',
  standalone: true,
  imports: [],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.scss'
})
export class ForgotpassComponent {
  constructor(private http: HttpClient,private router: Router,private dataService:DataService) {

  }
  checkemail(email : string){
    let jsonObj = {
      email:email,
    }
    let jsonString = JSON.stringify(jsonObj);
    console.log(jsonString)
    //const apiEndpoint = 'http://localhost/webapi_finalpro/users/userLogin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<checkMailResponse>(this.dataService.apiEndpoint + "/guest/checkMail" , jsonString, { headers: headers,
      observe:'response'}).subscribe((response) =>{
        if(response.body?.status === 'success'){
          alert('พบข้อมูลผู้ใช้งานของท่าน โปรดกรอกรหัสผ่านเพื่อรีเซต')
          this.router.navigate(['/forgot1']);
          localStorage.setItem('email',email)
        }else{
          alert('ไม่พบข้อมูลผู้ใช้งานอีเมลล์นี้')
        }
      })
  }
}
