import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ตรวจสอบให้แน่ใจว่า RouterOutlet อยู่ใน array imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boots';

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/page/login.component.html']);
  }
}