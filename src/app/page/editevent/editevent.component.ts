import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

interface Event {
  eventID: number;
  eventName: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-editevent',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.scss']
})
export class EditeventComponent {
  event: Event[];
  selectedevent: Event = { eventID: 0, eventName: '.', startDate: '.', endDate: '.' };

  constructor(private data: DataService, private http: HttpClient, private dialogRef: MatDialogRef<EditeventComponent>) {
    this.event = data.event;
    this.selectedevent = data.selectedevent || this.selectedevent; // Fallback to default value
    console.log(this.selectedevent);
  }

  save(eventName: string, startDate: string, endDate: string, eventID: number) {
    const jsonObj = { eventName, startDate, endDate };
    const jsonString = JSON.stringify(jsonObj);

    this.http.put(this.data.apiEndpoint + "/admin/eventUpdate" + eventID, jsonString, {
      observe: 'response'
    }).subscribe({
      next: (response) => {
        console.log(response.status);
        console.log(response.body);
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
