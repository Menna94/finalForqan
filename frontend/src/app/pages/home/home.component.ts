import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDonorComponent } from 'src/app/components/add-donor/add-donor.component';
import { AddRecipientComponent } from 'src/app/components/add-recipient/add-recipient.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private ngbMdule: NgbModal) {}
  faCoffee: any;
  ngOnInit(): void {}
  addPopup(name: string) {
    if (name === 'recipient') {
      this.ngbMdule.open(AddRecipientComponent, { size: 'lg' });
    } else {
      this.ngbMdule.open(AddDonorComponent, { size: 'md' });
    }
  }
}
