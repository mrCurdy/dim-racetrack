import { Component } from '@angular/core';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ToolbarComponent,
    RouterOutlet,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
