import { Component } from '@angular/core';

@Component({
  selector: 'app-dashborad-list',
  templateUrl: './dashborad-list.component.html',
  styleUrls: ['./dashborad-list.component.css']
})
export class DashboradListComponent {

  isShowPadding: any = false


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
}
