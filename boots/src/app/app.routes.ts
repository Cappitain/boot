import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component'; // ใส่ path ที่ถูกต้องสำหรับหน้า login ของคุณ

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // เปลี่ยนเป็นหน้า default ของคุณ
  { path: 'login', component: LoginComponent },
  // เพิ่มหน้าอื่นๆ ที่ต้องการ
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
