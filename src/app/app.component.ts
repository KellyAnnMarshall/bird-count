import { Component } from '@angular/core';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'bird-count';
  faKiwiBird: {} = faKiwiBird;
  isCollapsed: boolean = true;
  currentYear: number = new Date().getFullYear();

  constructor() {}
}
