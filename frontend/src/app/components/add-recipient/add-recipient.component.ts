import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MaritalStatus } from 'src/app/modal/enum/maritalStatus';
import { RecipientService } from 'src/app/services/recipient.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-recipient',
  templateUrl: './add-recipient.component.html',
  styleUrls: ['./add-recipient.component.scss'],
})
export class AddRecipientComponent implements OnInit {
  recipientForm!: FormGroup;
  status = Object.values(MaritalStatus);
  @Output() id!: number;
  notifyParent: EventEmitter<string> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private recipientService: RecipientService,
    private sharedService: SharedService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    console.log(this.id);
    if (this.id) {
      this.getRecipient();
    }
    this.recipientForm = this.fb.group({
      recipientName: ['', Validators.required],
      recipientNationalID: ['', Validators.required],
      recipientPhone: ['', Validators.required],
      recipientChildren: ['', Validators.required],
      recipientMaritalStatus: ['', Validators.required],
      moneyRevieved: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: 'Domyat',
        country: 'EGYPT',
      }),
      // month: '',
    });
  }
  addRecipientHandler() {
    if (this.id) {
      this.updateRecipientHandler();
    } else {
      this.recipientService
        .addRecipient(this.recipientForm.value)
        .subscribe((data: any) => {
          if (data.success) {
            const msg = this.sharedService.translateWord('AddedSuccessfully');
            this.sharedService.successMsg(msg);
            this.notifyParent.emit(data);
            this.ngbModal.dismissAll();
          }
        });

      console.log(this.recipientForm.value);
    }
  }

  updateRecipientHandler() {
    this.recipientService
      .editRecipient(this.id, this.recipientForm.value)
      .subscribe((response: any) => {
        if (response.success) {
          this.notifyParent.emit(response);
        }
      });
  }
  getRecipient() {
    this.recipientService.getRecipient(this.id).subscribe((response: any) => {
      if (response.success) {
        this.recipientForm.patchValue(response.data);
      }
    });
  }
}
