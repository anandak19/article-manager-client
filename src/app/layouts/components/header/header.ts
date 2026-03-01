import { Component, DestroyRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavLinks } from '../nav-links/nav-links';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderState } from '../../services/header-state';
import { AuthService } from '@core/service/auth/auth-service';
import { IErrorResponse } from 'app/types/api-response.types';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';

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
export class Header implements OnInit {
  showSidenav = signal(false);
  private _headerStateService = inject(HeaderState);
  _authService = inject(AuthService);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _router = inject(Router);

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

  logout() {
    this._authService.logoutUser().subscribe({
      next: (res) => {
        this._snackbarService.success(res.message);
        this._authService.clearCurrUser();
        this._router.navigate(['/login']);
      },
      error: (err: IErrorResponse) => {
        this._snackbarService.error(err.message);
      },
    });
  }

  navigateHome() {
    this._router.navigate(['/']);
  }

  ngOnInit(): void {
    this._authService.fetchCurrUser().subscribe({
      next: (res) => {
        this._authService.setCurrUser(res.data);
      },
      error: () => {
        this._authService.clearCurrUser();
      },
    });
  }
}
