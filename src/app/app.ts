import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import localePt from '@angular/common/locales/pt';
import { NgIf, registerLocaleData } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth-guard';

registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    RouterOutlet,
    NgIf
  ],
  providers: [
    provideNgxMask(),
    AuthGuard,
    CookieService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },

  ],
})

export class App {
  menuOpen = false;
  hasToken = false;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  cookieExists(): boolean {
    return this.cookieService.check('token');
  }

  logout() {
    this.cookieService.delete('token');
    this.hasToken = false;
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}