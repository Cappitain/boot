import { Component } from '@angular/core';
import { Booth } from '../../model/booth.model';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editbooth',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'] // แก้ไขจาก styleUrl เป็น styleUrls
})
export class BookingComponent {
  booths: Array<Booth>;
  selectedBooth: any;

  constructor(private data: DataService, private http: HttpClient,private dialogRef: MatDialogRef<BookingComponent>) {
    this.booths = data.booths;
    this.selectedBooth = data.selectedBooth;
    console.log(this.booths);
  }
  
  save(boothName: string,
    boothSize: string,
    boothStatus: string,
    boothPrice: string,
    boothPicture: string,
    product: string,
    boothID: number ){
    let jsonObj = {
      boothName: boothName,
      boothSize: boothSize,
      boothStatus: boothStatus,
      boothPrice: boothPrice,
      boothPicture: boothPicture,
      product: product,
    };

  let jsonString = JSON.stringify(jsonObj);
  this.http.put(this.data.apiEndpoint + "/boothedit/"+ boothID , jsonString, {
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
}

