import { Component } from '@angular/core';
import { Booth } from '../../model/booth.model';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newbooth',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './newbooth.component.html',
  styleUrl: './newbooth.component.scss'
})
export class NewboothComponent {
  booths:Array<Booth>;
  response:any;
  constructor(private data:DataService, private http:HttpClient,
    private dialogRef:MatDialogRef<NewboothComponent>){
      this.booths = data.booths;
      console.log(this.booths);
    }
    addBooth( boothName:string, boothSize:string, boothStatus:string, boothPrice:string, boothPicture:string, product:string, zoneID:number){
      let jsonObj = {

        boothName:boothName,
        boothSize:boothSize,
        boothStatus:boothStatus,
        boothPrice:boothPrice,
        boothPicture:boothPicture,
        product:product,
        zoneID:zoneID
        
      }
      let jsonString = JSON.stringify(jsonObj);
      this.http.post(this.data.apiEndpoint + "/addbooth" , jsonString,
        {observe:'response'}).subscribe((response) =>{
          console.log(JSON.stringify(response.status));
          console.log(JSON.stringify(response.body));
        })
    }
    close(){
      this.dialogRef.close();
    }
}
