import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRecipientComponent } from 'src/app/components/add-recipient/add-recipient.component';
import { LoadingService } from 'src/app/services/loading.service';
import { RecipientService } from 'src/app/services/recipient.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss'],
})
export class RecipientsComponent implements OnInit {
  recipients!: any[];
  loading: boolean;
  constructor(
    private ngbModal: NgbModal,
    private recipientService: RecipientService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllRecipients();
  }
  openPopup() {
    const modalRef = this.ngbModal.open(AddRecipientComponent, { size: 'md' });
    modalRef.componentInstance.notifyParent.subscribe((response: any) => {
      this.recipients.push(response.data);
      modalRef.dismiss();
    });
  }
  getAllRecipients() {
    this.recipientService.getAllRecipients().subscribe((data: any) => {
      if (data.success) {
        this.recipients = data.data;
      }
    });
  }

  deleteRecipientHandler(id: number) {
    this.recipientService.deleteRecipient(id).subscribe((response: any) => {
      if (response.success) {
        const filterRecipients = this.recipients.filter(
          (recipient) => recipient._id !== id
        );
        this.recipients = filterRecipients;
        this.getAllRecipients();
        const msg = this.sharedService.translateWord(response.message);
        this.sharedService.successMsg(msg);
      }
    });
  }

  openEditPopup(id: number) {
    const modalRef = this.ngbModal.open(AddRecipientComponent, { size: 'md' });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.notifyParent.subscribe((response: any) => {
      const itemUpdatedIdx = this.recipients.findIndex(
        (rec) => rec._id === response.data._id
      );
      console.log(response);
      this.recipients[itemUpdatedIdx] = response.data;
      modalRef.dismiss();
      const msg = this.sharedService.translateWord(response.message);
      this.sharedService.successMsg(msg);
    });
  }
}
