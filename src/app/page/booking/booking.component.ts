import { Component } from '@angular/core';
import { Booth } from '../../model/booth.model';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  booths: Array<Booth>;
  selectedBooth: any;
  userID = parseInt(localStorage.getItem('userID') || '0', 10);
   boothID = localStorage.getItem('boothID')
   boothName = localStorage.getItem('boothName')
   boothSize = localStorage.getItem('boothSize')
   boothStatus = localStorage.getItem('boothStatus')
   boothPrice = localStorage.getItem('boothPrice')
   Product = localStorage.getItem('product')
   isLoggedIn: boolean | undefined;
   isLoggedInAdmin: boolean = true;
  

  constructor(private data: DataService,private fb: FormBuilder ,private http: HttpClient,private dialogRef: MatDialogRef<BookingComponent>) {
    
    this.booths = data.booths;
    this.selectedBooth = data.selectedBooth;
    console.log(this.booths);
    this.isLoggedIn = !!this.userID;

  }
  
  onUpdateStatus(booth: any): void {
    localStorage.setItem('userID', '123');
  localStorage.setItem('boothStatus', 'ว่าง');
    console.log('userID:', this.userID);
    console.log('boothStatus:', this.boothStatus);
    console.log(this.isLoggedIn);
    if (this.boothStatus === "ว่าง" && this.isLoggedIn) {
        const userid = localStorage.getItem('user');
        console.log(userid); // สมมติว่า userid ถูกเก็บใน localStorage
        const updatedData = {
            boothstatus: 'อยู่ระหว่างตรวจสอบ',
            userid: userid,
            boothid: booth.boothID, 
            boothname:booth.boothName,
            product: booth.product,

        };
        const apiEndpoint = 'http://localhost/webapi/boothsstatus';
        this.http.put(apiEndpoint, updatedData, { headers: { 'Content-Type': 'application/json' } }).subscribe(
            (response) => {
                // อัปเดตสำเร็จ
                // booth.boothstatus = 'อยู่ระหว่างตรวจสอบ'; // อัปเดตสถานะใน UI
                alert('บูธถูกจองเรียบร้อยแล้ว!');
            },

        );
    } else if (!this.isLoggedIn) {
        alert('กรุณาเข้าสู่ระบบก่อน!');
    } else {
        alert('บูธนี้ไม่สามารถจองได้');
    }
}
insertBook(booth: any){
  if (this.boothStatus === "ว่าง" && this.isLoggedIn){
  const userid = localStorage.getItem('userID');
  let jsonObj = {
      userid:userid,
      boothid : booth.boothID,
      product : booth.product,
      boothprice:booth.boothPrice,

  }
  let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.data.apiEndpoint + "/bookingbooth", jsonString,
      {observe:'response'}).subscribe((response) =>{
        console.log(JSON.stringify(response.status));
        console.log(JSON.stringify(response.body));

      });
}
}
  save() {
    let jsonObj = {
      boothName: this.boothName,
      boothSize: this.boothSize,
      boothStatus: this.boothStatus,
      boothPrice: this.boothPrice,
      product: this.Product,
      userID:this.userID
    };

    let jsonString = JSON.stringify(jsonObj);
    this.http.post(this.data.apiEndpoint + "/bookingbooth ", jsonString, {
      observe: 'response' 
    }).subscribe((response) => {
      console.log(response.status);
      console.log(response.body);
    });

    this.dialogRef.close();
}

  
  


close(){
  this.dialogRef.close();
}
setParam(booth :any){
  localStorage.setItem('boothID',booth.boothID)
  localStorage.setItem('boothName',booth.boothName)
  localStorage.setItem('boothSize',booth.boothSize)
  localStorage.setItem('boothStatus',booth.boothStatus)
  localStorage.setItem('boothPrice',booth.boothPrice)
  localStorage.setItem('Product',booth.product)
  const boothID = localStorage.getItem('boothID')
  const boothName = localStorage.getItem('boothName')
  const boothSize = localStorage.getItem('boothSize')
  const boothStatus = localStorage.getItem('boothStatus')
  const boothPrice = localStorage.getItem('boothPrice')
  const Product = localStorage.getItem('Product')
  let string ={
    boothID,
    boothName,
    boothSize,
    boothStatus,
    boothPrice,
    Product
  }
  let jsonString = JSON.stringify(string)
  console.log(jsonString)
}
ngOnInit(){
  const boothID = localStorage.getItem('boothID')
  const boothName = localStorage.getItem('boothName')
  const boothSize = localStorage.getItem('boothSize')
  const boothStatus = localStorage.getItem('boothStatus')
  const boothPrice = localStorage.getItem('boothPrice')
  const Product = localStorage.getItem('Product')
  let string ={
    boothID,
    boothName,
    boothSize,
    boothStatus,
    boothPrice,
    Product
  }

  this.boothID = localStorage.getItem('boothID') || '';
  this.boothName = localStorage.getItem('boothName') || '';
  this.boothSize = localStorage.getItem('boothSize') || '';
  this.boothStatus = localStorage.getItem('boothStatus') || '';
  this.boothPrice = localStorage.getItem('boothPrice') || '';
  this.Product = localStorage.getItem('Product') || '';

  const loggedInStatus = localStorage.getItem('isLoggedInAdmin');
  this.isLoggedInAdmin = loggedInStatus === 'true'; // แปลงค่าเป็น boolean
  const email = localStorage.getItem('email');
  console.log(email);
}
}
