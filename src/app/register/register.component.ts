import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';


  constructor(private authService: AuthService, private router: Router) {}
  isdarkmode=true;
  toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  this.isdarkmode = !this.isdarkmode;
  }

  iraInicio(){
    this.router.navigate(['/login'])
  }

  onRegister() {
    
  // Reinicia aqui los errores
  this.emailError = '';
  this.passwordError = '';
  this.confirmPasswordError = '';

  if (!this.email || !this.password || !this.confirmPassword) {
    if (!this.email) this.emailError = 'Este campo es obligatorio';
    if (!this.password) this.passwordError = 'Este campo es obligatorio';
    if (!this.confirmPassword) this.confirmPasswordError = 'Este campo es obligatorio';
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.confirmPasswordError = 'Las contraseñas no coinciden';
    return;
  }

  this.authService.register(this.email, this.password).subscribe({
    next: user => {
      this.router.navigate(['/login']);
    },
    error: err => {
      if (err.message.includes('contraseña')) {
        this.passwordError = err.message;
      } else {
        this.emailError = err.message;
      }
    }
  });
    
  }
}
