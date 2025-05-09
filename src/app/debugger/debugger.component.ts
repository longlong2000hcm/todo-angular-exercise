import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-debugger',
  imports: [],
  templateUrl: './debugger.component.html',
  styleUrl: './debugger.component.scss'
})
export class DebuggerComponent {
  authService = inject(AuthenticationService)
  log = () => {
    console.log(this.authService.auth.currentUser)
  }
}
