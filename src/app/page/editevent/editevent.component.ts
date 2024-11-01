import { Component } from '@angular/core';
import { Zone } from 'zone.js/lib/zone-impl';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editevent',
  standalone: true,
  imports: [],
  templateUrl: './editevent.component.html',
  styleUrl: './editevent.component.scss'
})
export class EditeventComponent {
  event : Array<Event> ;
  selectedevent: any;
  constructor(private data:DataService,private http:HttpClient,
    private dialogRef:MatDialogRef<EditeventComponent>){
    this.event = data.event;
    this. selectedevent = data.selectedevent;
    console.log(this.event);
  }
  save(eventName: string , startDate: string, endDate: string,eventID: number){
    let jsonObj = {
      eventName: eventName,
      startDate: startDate,
      endDate: endDate
    };

  let jsonString = JSON.stringify(jsonObj);
  this.http.put(this.data.apiEndpoint + "/admin/zoneUpdate/"+ eventID , jsonString, {
    observe: 'response'
  }).subscribe((response) => {
    console.log(response.status);
    console.log(response.body);
    this.dialogRef.close();
    
  });
}

close(){
  this.dialogRef.close();
}
}

