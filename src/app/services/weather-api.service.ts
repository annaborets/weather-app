import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WeatherApiResponse } from '../types/response';
import { environment } from 'src/environments/environment';

interface WeatherCacheItem extends WeatherApiResponse {
  updatedAt: Date | string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private readonly apiKey = environment.apiKey;
  private readonly cacheKey = 'weatherCache';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  loadCurrentWeather(city: string): Observable<WeatherCacheItem> {
    const cachedData = this.getCache()?.find((data) => data.name === city);

    if (cachedData) {
      const updatedAt =
        typeof cachedData?.updatedAt === 'string'
          ? new Date(cachedData.updatedAt)
          : cachedData?.updatedAt;
      if (cachedData && !this.shouldUpdateCache(updatedAt)) {
        return of(cachedData);
      }
    }

    return this.http
      .get<WeatherApiResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
      )
      .pipe(
        catchError(
          this.handleError<WeatherApiResponse>('getCurrentWeather', undefined)
        ),
        map((weatherData) => {
          const weatherCacheItem: WeatherCacheItem = {
            ...weatherData,
            updatedAt: new Date(),
          };
          this.updateWeatherData(city, weatherCacheItem);
          return weatherCacheItem;
        })
      );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this._snackBar.open(`${error.error.cod}`, `${error.error.message}`, {
        duration: 3000,
      });
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private updateCache(weatherData: WeatherCacheItem[]): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(weatherData));
  }

  private getCache(): WeatherCacheItem[] | null {
    const cacheData = localStorage.getItem(this.cacheKey);
    return cacheData ? JSON.parse(cacheData) : null;
  }

  private updateWeatherData(city: string, weatherData: WeatherCacheItem): void {
    const cache = this.getCache() || [];
    const existingData = cache.find((data) => data.name === city);

    if (existingData) {
      existingData.weather = weatherData.weather;
      existingData.main = weatherData.main;
      existingData.updatedAt = new Date();
    } else {
      cache.push(weatherData);
    }
    this.updateCache(cache);
  }

  private shouldUpdateCache(updatedAt: Date): boolean {
    const currentDateTime = new Date();
    const cacheDuration = currentDateTime.getTime() - updatedAt.getTime();
    const maxCacheDuration = 3600000;

    return cacheDuration > maxCacheDuration;
  }
}
