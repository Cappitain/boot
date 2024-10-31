import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as zoneCvt, Zone } from '../../model/zone.model';  
import { Convert as boothCvt, Booth } from '../../model/booth.model';
import { Convert as userCvt, MemberInfo} from '../../model/user.model';
import { MatListModule, MatListOption, MatSelectionList } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { NewComponent } from '../new/new.component';
import { NewboothComponent } from '../newbooth/newbooth.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditComponent } from '../edit/edit.component';
import { MatSelectionListChange } from '@angular/material/list';  
import { EditboothComponent } from '../editbooth/editbooth.component';


@Component({
  selector: 'app-zone',
  standalone: true,
  imports: [MatSelectionList,RouterOutlet,MatListModule,CommonModule,MatDialogModule,MatMenuModule],
  templateUrl: './zone2.component.html',
  styleUrl: './zone2.component.scss'
})
export class zone2Component {   
  zones = Array<Zone>(); 
  users = Array<MemberInfo>();
  booths = Array<Booth>();
  events = Array<Event>();
  selectedZone: Zone | undefined;
  selectedBooth: Booth | undefined;
  filteredBooths: Booth[] = []; 
  isLoggedInAdmin: boolean = true;
  isLoggedIn: boolean | undefined;

  constructor(private route: ActivatedRoute,private router: Router,private dataService:DataService, private http:HttpClient, private dialog : MatDialog){
    http.get(dataService.apiEndpoint + "/zone").subscribe((data:any)=>{
      this.zones = zoneCvt.toZone(JSON.stringify(data));
      console.log(this.zones);
    });

    http.get(dataService.apiEndpoint + "/booth").subscribe((data:any)=>{
      this.booths = boothCvt.toBooth(JSON.stringify(data));
      console.log(this.booths);
    });



  }
  
  ngOnInit() {

    const loggedInStatus = localStorage.getItem('isLoggedInAdmin');
    this.isLoggedInAdmin = loggedInStatus === 'true'; // แปลงค่าเป็น boolean
    const email = localStorage.getItem('email');
    console.log(email);

    
  }

  
  countBoothsInZone(zone: Zone): number {
    return this.booths.filter(booth => booth.zoneID === zone.zoneID).length;
  }

  show(option: MatListOption) {
    this.selectedZone = option.value;
    // กรองบูธที่อยู่ในโซนที่เลือก
    this.filteredBooths = this.booths.filter(booth => booth.zoneID === this.selectedZone?.zoneID);
    console.log(this.selectedZone, this.filteredBooths);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/regis']);
  }
  goToZone() {
    this.router.navigate(['/zone']);
  }
  goTomain2() {
    this.router.navigate(['main2']);
  }

  delete(zoneName : string){
    if (confirm("ยืนยันการลบโซนนี้ ?")){
      this.http.delete(this.dataService.apiEndpoint + "/zone/" + zoneName)
      .subscribe((response) =>{
        console.log(response);

      });
    }

  } 
  addNew() {
    this.dataService.zones =this.zones;
    this.dialog.open(NewComponent,{
      minWidth:'300px',
    });
  }
  edit() {
    this.dataService.selectedzones =this.selectedZone;
    this.dataService.zones = this.zones;
    this.dialog.open(EditComponent,{
      minWidth:'300px',
    });
  }
  addBooth(){
    this.dialog.open(NewboothComponent, {
      minWidth: '300px',
    });
  }
  onBoothSelect(event: MatSelectionListChange) {
    // ดึงข้อมูลบูธที่ถูกเลือกในแต่ละครั้ง
    const selectedBooth = event.options[0]?.value;
    this.selectedBooth = selectedBooth;
    console.log("Selected Booth:", this.selectedBooth);
    // เพิ่มการประมวลผลเพิ่มเติมสำหรับบูธที่เลือกได้ที่นี่
}
deletezone(zoneId: number) {
  this.http.delete(`http://localhost/webapi/admin/delZone/${zoneId}`) // แก้ไขที่นี่
  .subscribe(response => {
      console.log('Deleted successfully', response);
  }, error => {
      console.error('Error deleting zone', error);
  });
}
editbooth() {
  this.dataService.selectedBooth =this.selectedBooth;
  this.dataService.booths = this.booths;
  this.dialog.open(EditboothComponent,{
    minWidth:'300px',
  });
}



}

