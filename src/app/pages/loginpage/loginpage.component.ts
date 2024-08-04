import { HTTP_INTERCEPTORS, HttpResponse, provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { response } from 'express';
import { WebReqInterceptor } from '../../webreg.interceptor';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss',
})
export class LoginpageComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    debugger
  }

  onLoginButtonClicked(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (response)=>{
        this.router.navigate(['/lists']);
      },
      (error) => {
        // Handle any errors
        console.error('Login error:', error);
      }
  );
  }
}
