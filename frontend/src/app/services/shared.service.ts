import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private translateService: TranslateService,
    private toaster: ToastrService
  ) {}

  translateWord(word: string): string {
    let translatedWord = '';
    this.translateService.get(word).subscribe((word) => {
      translatedWord = word;
    });
    return translatedWord;
  }

  successMsg(msg: string) {
    this.toaster.success(msg);
  }
}
