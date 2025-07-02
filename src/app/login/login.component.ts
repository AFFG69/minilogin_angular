import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';
  formError: string = ''; 
  constructor(private router: Router, private authService: AuthService) {}


onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

irARegistro() {
  this.router.navigate(['/register']);
}
onValidaregistro() {

  this.emailError = '';
  this.passwordError = '';

  let existerror = false;

   if (!this.email) {
    this.emailError = 'Este campo es obligatorio';
    existerror = true;
  }

  if (!this.password) {
    this.passwordError = 'Este campo es obligatorio';
    existerror = true;
  }
  if (existerror) {
    return;
  }

 
    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        //alert('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']); 
      },
      error: err => {
      if (err.message.includes('Contraseña')) {
        this.passwordError = err.message;
      } else {
        this.emailError = err.message;
      }
    }
    });
  }
isdarkmode= true;
toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  this.isdarkmode = !this.isdarkmode;
}

}
