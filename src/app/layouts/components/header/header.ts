import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavLinks } from '../nav-links/nav-links';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderState } from '../../services/header-state';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NavLinks,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  showSidenav = signal(false);
  private _headerStateService = inject(HeaderState);

  isMobile = false;

  constructor() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this._headerStateService.toggle();
  }
}
