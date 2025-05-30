import { Component } from '@angular/core';
import { AsideInfoComponent } from '../aside-info/aside-info.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'welcome',
  imports: [
    RouterLink,
    AsideInfoComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
