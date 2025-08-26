import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule, 
    MatInputModule
  ]
})
export class LoginComponent {
  form: FormGroup;
  showPassword = false;
  authError = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService) {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {

    const { username, password } = this.form.value;

    if (username === 'teste' && password === 'teste') {
      this.authError = false;

      const token = btoa(`${username}:${password}`);

      this.cookieService.set('token', token, 1);

      this.router.navigate(['/products']);
    } else {
      this.authError = true;
    }
  }
}