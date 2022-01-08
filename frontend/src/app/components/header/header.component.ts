import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private htmlRoot = document.documentElement;
  currentLang!: string;
  mobileMenuHideClass!: string;
  mobileMenu!: boolean;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target) || !this.mobileMenu)
      return;
    this.hideMenuHandler();
  }

  constructor(private translate: TranslateService, private eRef: ElementRef) {}

  ngOnInit(): void {
    this.getLang();
    this.mobileMenu = false;
    this.mobileMenuHideClass = '';
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
  changeLang() {
    if (this.translate.defaultLang === 'en') {
      localStorage.setItem('lang', 'ar');
      localStorage.setItem('dir', 'rtl');
      this.translate.setDefaultLang('ar');
      this.htmlRoot.setAttribute('dir', localStorage.getItem('dir') || '');
      this.currentLang = 'ar';
      console.log('lang engilist');
    } else if (this.translate.defaultLang === 'ar') {
      localStorage.setItem('lang', 'en');
      localStorage.setItem('dir', 'ltr');
      this.translate.setDefaultLang('en');
      this.htmlRoot.setAttribute('dir', localStorage.getItem('dir') || '');
      this.currentLang = 'en';
      console.log('lang ar');
    }
  }
  getLang() {
    this.translate.defaultLang === 'en' ? (this.currentLang = 'en') : 'ar';
  }
  toggleMenu() {
    if (this.mobileMenu) {
      this.hideMenuHandler();
    } else {
      this.showMenuHandler();
    }
  }
  hideMenuHandler() {
    this.mobileMenuHideClass = 'mobile-menu-hide';
    setTimeout(() => {
      this.mobileMenu = !this.mobileMenu;
    }, 350);
  }
  showMenuHandler() {
    this.mobileMenu = !this.mobileMenu;
    this.mobileMenuHideClass = '';
  }
}
