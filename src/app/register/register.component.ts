import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { CustomInputComponent } from '../_custom-html-elements/custom-input/custom-input.component';

@Component({
  selector: 'register',
  imports: [FormsModule, CustomInputComponent],
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

  chang = (val: string) => {
    this.firstname=val
  }

  log(a:any){
    console.log(a)
  }

  onSubmit = () => {
    this.authService.postRegister({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    });
  };
}
