import { AfterViewInit, Component, effect, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderState } from '../../services/header-state';
import { NavLinks } from "../nav-links/nav-links";

@Component({
  selector: 'app-sidebar',
  imports: [MatSidenavModule, MatButtonModule, NavLinks],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements AfterViewInit {
  private _headerStateService = inject(HeaderState);
  isOpened = this._headerStateService.isSidebarOpen

  @ViewChild('drawer') drawer!: MatDrawer;

  toggle() {
    this._headerStateService.toggle();
  }

  ngAfterViewInit(): void {
    effect(() => {
      const isOpen = this._headerStateService.isSidebarOpen();

      if (isOpen) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    });
  }
}
