import { Component } from '@angular/core';
import { Zone } from 'zone.js/lib/zone-impl';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule,MatDialogModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  zone:Array<Zone>;
  respose:any;
  constructor(private data:DataService,private dialogRef:MatDialogRef<NewComponent>){
    this.zone = data.zone;
    console.log(this.zone);
  }
  addNew(){

  }
  close(){
    this.dialogRef.close();
  }
  
}
