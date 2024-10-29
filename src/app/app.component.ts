/*import { Component } from '@angular/core';
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
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}
*/
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MainComponent } from './page/main/main.component';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, HttpClientModule,MatDialogModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'project';

  constructor(private router: Router, private http:HttpClient) {
     this.getZone();
     console.log('start');
      let url = 'http://localhost/webapi/zone';
      let obs = this.http.get(url).subscribe((data:any) => {
       console.log(data[0]);
       console.log('complete');
      });
      console.log('continue');
      setTimeout(() => {
       obs.unsubscribe();
       console.log("unsubscribe");
      }, 2500);
  }

   async getZone(){
     console.log('start');
     let url = 'http://localhost/webapi/zone';
     let data:any = await lastValueFrom(this.http.get(url));
     console.log(data[0]);
     console.log('complete');

     console.log('continue');
   }



}