import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent { 
  title = 'boots';

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
}