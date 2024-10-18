import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {    
  constructor(private router: Router) {}

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
