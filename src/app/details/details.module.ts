import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { WeatherInfoComponent } from './pages/weather-info/weather-info.component';
import { TemperatureConversionPipe } from './pipes/temperature-conversion.pipe';

@NgModule({
  declarations: [WeatherInfoComponent, TemperatureConversionPipe],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatButtonToggleModule,
    FormsModule,
  ],
})
export class DetailsModule {}
