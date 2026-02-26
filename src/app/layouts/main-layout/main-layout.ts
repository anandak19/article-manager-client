import { Component } from '@angular/core';
import { Header } from "../components/header/header";
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../components/sidebar/sidebar";

@Component({
  selector: 'app-main-layout',
  imports: [Header, RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {

}
