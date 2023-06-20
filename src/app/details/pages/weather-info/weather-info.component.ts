import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';

import { WeatherApiService } from 'src/app/services/weather-api.service';
import { WeatherApiResponse } from 'src/app/types/response';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit, OnDestroy {
  public weatherInfo!: WeatherApiResponse;
  public isLoading = false;
  public unit: 'kelvin' | 'celsius' = 'kelvin';

  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: WeatherApiService
  ) {}

  ngOnInit(): void {
    this.fetchInfo(this.route.snapshot.params['city']);
  }

  private fetchInfo(city: string): void {
    this.isLoading = true;
    this.subscription = this.service
      .loadCurrentWeather(city)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((item) => {
        this.weatherInfo = item;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
