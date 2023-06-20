import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './home/pages/main-page/main-page.component';
import { WeatherInfoComponent } from './details/pages/weather-info/weather-info.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'details/:city', component: WeatherInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
