import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatMenuModule],
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.scss']
})
export class Main2Component { 
  title = 'boots';
  isLoggedInAdmin: boolean = true;
  isLoggedIn: boolean | undefined;

  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/regis']);
  }
  goToZone2() {
    this.router.navigate(['/zone2']);
  }
  goTomain() {
    this.router.navigate(['']);
  }
  ngOnInit() {

    const loggedInStatus = localStorage.getItem('isLoggedInAdmin');
    this.isLoggedInAdmin = loggedInStatus === 'true'; // แปลงค่าเป็น boolean
    const email = localStorage.getItem('email');
    console.log(email);
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
}