import { Component } from '@angular/core';
import { faKiwiBird } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'bird-count';
  faKiwiBird: IconDefinition = faKiwiBird;
  isCollapsed = true;
  currentYear = new Date().getFullYear();
}
