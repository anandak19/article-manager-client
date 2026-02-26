import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderState {
  private _isSidebarOpen = signal<boolean>(false);
  readonly isSidebarOpen = this._isSidebarOpen.asReadonly();

  openSidbar() {
    this._isSidebarOpen.set(true);
  }

  closeSidebar() {
    this._isSidebarOpen.set(false);
  }

  toggle() {
    this._isSidebarOpen.update((value) => !value);
  }
}
