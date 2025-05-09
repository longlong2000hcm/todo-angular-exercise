import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { CommonModule } from '@angular/common';
import { TodoService } from '../_services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CommonModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthComponent {
  authenticationService = inject(AuthenticationService);
  todoService = inject(TodoService);
  router = inject(Router);
  hideRegister = false;

  login = () => {
    this.authenticationService.login();
    this.todoService.loadTodoList();
  };

  logout = async () => {
    await this.authenticationService.logout();
    this.todoService.clearCache();
    this.router.navigate([''])
  };

  registerClick = () => {
    this.router.navigate(['/register']);
  }
}
