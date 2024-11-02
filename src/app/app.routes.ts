import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component'; // ใส่ path ที่ถูกต้องสำหรับหน้า login ของคุณ
import { MainComponent } from './page/main/main.component';
import { RegisterComponent } from './page/register/register.component';
import { zoneComponent } from './page/zone/zone.component';
import { Main2Component } from './page/main2/main2.component';
import { zone2Component } from './page/zone2/zone2.component';
import { InfoComponent } from './page/info/info.component';
import { EventComponent } from './page/event/event.component';
import { AllmemberComponent } from './page/allmember/allmember.component';
import { BookingComponent } from './page/booking/booking.component';
import { BookstComponent } from './page/bookst/bookst.component';
import { Bookst1Component } from './page/bookst1/bookst1.component';
import { BoothcheckComponent } from './page/boothcheck/boothcheck.component';
import { Boothcheck1Component } from './page/boothcheck1/boothcheck1.component';
import { ForgotpassComponent } from './page/forgotpass/forgotpass.component';
import { Forgotpass2Component } from './page/forgotpass2/forgotpass2.component';

export const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'regis', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'zone', component: zoneComponent },
  { path: 'main2', component: Main2Component},
  { path: 'zone2', component: zone2Component },
  { path: 'info', component: InfoComponent },
  { path: 'event', component: EventComponent},
  { path: 'member', component: AllmemberComponent},
  { path: 'book', component: BookingComponent},
  { path: 'bookst', component: BookstComponent},
  { path: 'bookst1', component: Bookst1Component},
  { path: 'boothck', component: BoothcheckComponent},
  { path: 'boothck1', component: Boothcheck1Component},
  { path: 'forgot', component: ForgotpassComponent},
  { path: 'forgot1', component: Forgotpass2Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
