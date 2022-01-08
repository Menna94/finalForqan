import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddDonorComponent } from 'src/app/components/add-donor/add-donor.component';
import { DonorService } from 'src/app/services/donor.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.scss'],
})
export class DonorsComponent implements OnInit {
  donors!: any[];
  constructor(
    private ngbModal: NgbModal,
    private donorService: DonorService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllDonors();
  }
  openPopup() {
    const modalRef = this.ngbModal.open(AddDonorComponent, { size: 'md' });
    modalRef.componentInstance.notifyParent.subscribe((response: any) => {
      this.donors.push(response.data);
      modalRef.dismiss();
    });
  }

  getAllDonors() {
    this.donorService.getAllDonors().subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.donors = data.data;
        console.log(data.data);
      }
    });
  }

  deleteRecipientHandler(id: number) {
    this.donorService.deleteDonor(id).subscribe((response: any) => {
      if (response.success) {
        const filterdonors = this.donors.filter(
          (recipient) => recipient._id !== id
        );
        this.donors = filterdonors;
        this.getAllDonors();
        const msg = this.sharedService.translateWord(response.message);
        this.sharedService.successMsg(msg);
      }
    });
  }

  openEditPopup(id: number) {
    console.log(id);
    const modalRef = this.ngbModal.open(AddDonorComponent, { size: 'md' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.notifyParent.subscribe((response: any) => {
      const itemUpdatedIdx = this.donors.findIndex(
        (rec) => rec._id === response.data._id
      );
      console.log(response);
      this.donors[itemUpdatedIdx] = response.data;
      modalRef.dismiss();
      const msg = this.sharedService.translateWord(response.message);
      this.sharedService.successMsg(msg);
    });
  }
}
