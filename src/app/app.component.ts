import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { AuthComponent } from './authentication/authentication.component';
import { TodoService } from './_services/todo.service';
import { AsideInfoComponent } from './aside-info/aside-info.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    AuthComponent,
    AsideInfoComponent,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  authenticationService = inject(AuthenticationService);
  todoService = inject(TodoService);
  hideRegister = true;
  
  constructor() {
    console.log('production environment:', environment.production);
  }

  get isLoggedIn() {
    return this.authenticationService?.auth?.currentUser;
  }
}
