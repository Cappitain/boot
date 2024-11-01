import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { NewboothComponent } from '../newbooth/newbooth.component';

@Component({
  selector: 'app-newevent',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './newevent.component.html',
  styleUrl: './newevent.component.scss'
})
export class NeweventComponent {
  event : Array<Event> ;
  response : any;
  constructor(private data:DataService, private http:HttpClient,
    private dialogRef:MatDialogRef<NeweventComponent>){
      this.event = data.event;
    }
    close(){
      this.dialogRef.close();
    }
    addNew(eventName: string , startDate: string, endDate: string){
      let jsonObj = {
        eventName: eventName,
        startDate: startDate,
        endDate: endDate
      };
  
      this.http.post(this.data.apiEndpoint + "/event", jsonObj, {
        headers: { 'Content-Type': 'application/json' },
        observe: 'response'
      }).subscribe((response) => {
        console.log(response.status);
        console.log(response.body);
        this.dialogRef.close();
      });
    }
    
}
