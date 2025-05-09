import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MuiTextFieldComponent } from '../_material-components/mui-text-field/mui-text-field.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  imports: [MuiTextFieldComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthenticationService);
  firstname = '';
  lastname = '';
  email: any = '';

  ngOnInit() {
    if (this.authService.emailAutofill) {
      this.email = history.state['emailParam'];
    }
  };

  onSubmit = () => {
    this.authService.postRegister({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    });
  };
}
