import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend-charity';
  private htmlRoot = document.documentElement;

  constructor(
    private translate: TranslateService,
    public loadingService: LoadingService
  ) {
    translate.addLangs(['en', 'ar']);
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem('dir') && localStorage.getItem('lang')) return;
    console.log('test');

    if (this.translate.defaultLang === 'en') {
      localStorage.setItem('lang', 'en');
      localStorage.setItem('dir', 'ltr');
      this.htmlRoot.setAttribute('dir', localStorage.getItem('dir') || '');
      console.log('lang engilist');
    } else {
      localStorage.setItem('lang', 'ar');
      localStorage.setItem('dir', 'rtl');
      this.htmlRoot.setAttribute('dir', localStorage.getItem('dir') || '');
      console.log('lang ar');
    }
  }
}
