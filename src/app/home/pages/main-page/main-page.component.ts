import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CITIES } from 'src/app/app.constant';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  public cities = CITIES;

  form = new FormGroup({
    city: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  public redirectToAnotherPage() {
    this.router.navigate([`/details/${this.form.value.city}`]);
  }
}
