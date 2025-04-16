import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfoCardComponent } from '../info-card/info-card.component';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, TranslateModule,
    InfoCardComponent,
    UserPreferencesComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}

