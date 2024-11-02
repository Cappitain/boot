import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { User } from '../../model/users.model';
import { DataService } from '../../service/data.service';

export interface ResFormUpdate {
  status: string;
  message?: string;  // message อาจจะมีหรือไม่มีก็ได้
}
@Component({
  selector: 'app-forgotpass2',
  standalone: true,
  imports: [],
  templateUrl: './forgotpass2.component.html',
  styleUrl: './forgotpass2.component.scss'
})
export class Forgotpass2Component {
  constructor(private http: HttpClient, private router: Router,private dataService:DataService) {}
  updatePass(password:string): void {
    const emails = localStorage.getItem('email')
    const jsonObj = {
      password:password,
      email:emails
    }
    //const apiEndpoint = 'http://localhost/webapi_finalpro/users/userUpdates2';
    console.log(jsonObj)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<ResFormUpdate>(this.dataService.apiEndpoint + "/users/userUpdatesPass", jsonObj, { headers: headers, observe: 'response' })
      .subscribe((response) => {
        if(response.body?.status === 'success'){
          alert('แก้ไขข้อมูลสำเร็จ')
          this.router.navigate(['/login']);
        }else{
          alert('แก้ไขข้อมูลไม่สำเร็จ')
        }
      });
  }
}
