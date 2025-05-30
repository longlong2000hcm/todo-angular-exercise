import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './_services/authentication.service';
import { AuthComponent } from './authentication/authentication.component';
import { TodoService } from './_services/todo.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    AuthComponent,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  authenticationService = inject(AuthenticationService);
  todoService = inject(TodoService);
  hideRegister = true;
  info = false;
  showDebugger = false;
  
  constructor() {
    console.log('production environment:', environment.production);
  }

  get isLoggedIn() {
    return this.authenticationService?.auth?.currentUser;
  }
}
