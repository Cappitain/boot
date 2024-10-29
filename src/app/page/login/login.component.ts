import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

interface LoginResponse {
  status: string;
  userInfo?: Array<{
    titlename: string;
    firstname: string;
    lastname: string;
    telephone: string;
    email: string;
  }>;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {    
  @Output() loginSuccess = new EventEmitter<{email: string; userInfo: any}>();
  constructor(private http: HttpClient,private router: Router) {}
  public isLoggedIn: boolean = false;

  login(email : string, password : string){
    let jsonObj = {
      email:email,
      password:password
    }
    let jsonString = JSON.stringify(jsonObj);
    const apiEndpoint = 'http://localhost/webapi/visitorLogin';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<LoginResponse>(apiEndpoint , jsonString, { headers: headers,
      observe:'response'}).subscribe((response) =>{
        if (response.body?.status === 'success') {
          console.log({email});
          localStorage.setItem('email', email);
          localStorage.setItem('password', password); 
          this.loginSuccess.emit({ email, userInfo: response.body.userInfo });
          alert('Login Success!!')
          if(email==='admin@gmail.com'){
            localStorage.setItem('isLoggedInAdmin', 'true');
            this.router.navigate(['/main2']).then(() => {window.location.reload(); });
            localStorage.setItem('isLoggedIn', 'true');
          }else{
            this.router.navigate(['/main2']).then(() => {window.location.reload(); });
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isLoggedInAdmin', 'false');
          }
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));
        }else{
          console.log(JSON.stringify(response.status));
          console.log(JSON.stringify(response.body));
          alert('Email or Password has Invalid!!!');
        }
      })
  }
  goTomain() {
    this.router.navigate(['']);
  }
  goToRegister() {
    this.router.navigate(['/regis']);
  }
  goTomain2() {
    this.router.navigate(['main2']);
  }
}
