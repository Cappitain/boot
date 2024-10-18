import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component'; // ใส่ path ที่ถูกต้องสำหรับหน้า login ของคุณ
import { MainComponent } from './page/main/main.component';
import { RegisterComponent } from './page/register/register.component';
import { zoneComponent } from './page/zone/zone.component';

export const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'regis', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'zone', component: zoneComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
