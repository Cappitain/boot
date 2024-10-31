import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MemberInfo } from '../../model/user.model';
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup ;
  response: any;
  users:Array<MemberInfo>;
  apiEndpoint = 'http://localhost/webapi_finalpro';


  constructor(private data: DataService, private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.users = data.users;
    this.registerForm = this.fb.group({
      titleName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goTomain() {
    this.router.navigate(['']);
  }

  addMember() {

    if (this.registerForm.invalid) {
      alert('register fail!!')
      // ถ้าฟอร์มไม่ถูกต้อง จะไม่ทำอะไร
      return;
    }

    const jsonObj = this.registerForm.value; // ดึงค่าจากฟอร์ม
    console.log("addMembers function called", jsonObj);

    this.http.post(this.data.apiEndpoint + "/register", jsonObj, { observe: 'response' }).subscribe((response: any) => {
      console.log(JSON.stringify(response.status));
      console.log(JSON.stringify(response.body));
      // แสดงผลหรือเปลี่ยนเส้นทางตามต้องการ
      this.router.navigate(['/login']);

    });
  }
}



