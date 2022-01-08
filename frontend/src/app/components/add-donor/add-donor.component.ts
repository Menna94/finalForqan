import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DonorService } from 'src/app/services/donor.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.scss'],
})
export class AddDonorComponent implements OnInit {
  donorForm: FormGroup;
  @Output() id!: number;
  notifyParent: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService,
    private sharedService: SharedService,
    private ngbModal: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.id) {
      this.getDonor();
    }
    this.donorForm = this.fb.group({
      donerName: '',
      moneyGiven: '',
      type: '',
      givenFor: this.fb.array([]),
    });
  }
  get list() {
    return this.donorForm.get('givenFor') as FormArray;
  }

  getDonor() {
    this.donorService.getDonor(this.id).subscribe((response: any) => {
      if (response.success) {
        console.log(response.data);
        this.donorForm.patchValue(response.data);
      }
    });
  }

  getDonorValue() {
    const body = {
      donerName: this.donorForm.get('donerName')?.value,
      moneyGiven: this.donorForm.get('moneyGiven')?.value,
      givenFor: this.donorForm.get('givenFor')?.value,
    };
    return body;
  }

  addDonorHandler() {
    this.list.push(this.fb.control(this.donorForm.get('type')?.value));
    const body = this.getDonorValue();
    if (this.id) {
      this.updateDonorHandler();
    } else {
      this.donorService.addDonor(body).subscribe((response: any) => {
        const msg = this.sharedService.translateWord('AddedSuccessfully');
        this.sharedService.successMsg(msg);
        this.notifyParent.emit(response);
        this.ngbModal.dismissAll();
      });

      console.log(this.donorForm.value);
    }
  }
  updateDonorHandler() {
    this.donorService
      .editDonor(this.id, this.donorForm.value)
      .subscribe((response: any) => {
        if (response.success) {
          this.notifyParent.emit(response);
        }
      });
  }
}
