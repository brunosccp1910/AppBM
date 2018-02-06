import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab5Root = UserPage;

  constructor() {

  }
}
