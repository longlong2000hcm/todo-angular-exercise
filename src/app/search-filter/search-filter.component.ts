import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ObservablesService } from '../_services/observables.service';
import { MuiTextFieldComponent } from '../_material-components/mui-text-field/mui-text-field.component';

@Component({
  selector: 'search-filter',
  imports: [FormsModule, MuiTextFieldComponent],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {
  observablesService = inject(ObservablesService);
}
