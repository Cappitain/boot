import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})
export class zoneComponent {    
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/regis']);
  }
  goToZone() {
    this.router.navigate(['/zone']);
  }
  goTomain() {
    this.router.navigate(['']);
  }
}
