import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderState } from '../../services/header-state';

@Component({
  selector: 'app-nav-links',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-links.html',
  styleUrl: './nav-links.scss',
})
export class NavLinks implements OnInit {
  private isMobile = signal(false);
  private _headerStateService = inject(HeaderState);
  close() {
    if (this.isMobile()) {
      this._headerStateService.toggle();
    }
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile.set(window.innerWidth < 768 ? true : false);
  }

  ngOnInit(): void {
    this.checkScreen();
  }
}
