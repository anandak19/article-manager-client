import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderState } from '../../services/header-state';
import { NavLinks } from '../nav-links/nav-links';

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatButtonModule, NavLinks],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private _headerStateService = inject(HeaderState);
  isOpened = this._headerStateService.isSidebarOpen;

  toggle() {
    this._headerStateService.toggle();
  }
}
