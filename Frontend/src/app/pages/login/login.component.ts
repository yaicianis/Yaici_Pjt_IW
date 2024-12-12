import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  login() {
    if (!this.authService.login(this.email, this.password)) {
      this.error = "Invalid email or password";
      return;
    }
  
    const user = this.authService.getUser();
    if (!user) return;
  
    const route = user.role === 'client' ? '/dashboard-client' : 
                  user.role === 'professional' ? '/dashboard-professional' : null;
  
    if (route) {
      this.router.navigate([route]);
    }
  }
  
}
