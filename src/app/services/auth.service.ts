import { Injectable } from '@angular/core';
import { Observable,of,throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  
  login(email: string, password: string): Observable<any> {
    const datosGuardados = localStorage.getItem('users');
    if (!datosGuardados) {
      return throwError(() => new Error('No hay usuarios registrados todavía'));
    }

    const usuariosRegistrados = JSON.parse(datosGuardados);

    const usuarioEncontrado = usuariosRegistrados.find((usuario: any) =>
      usuario.email === email && usuario.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
      return of(usuarioEncontrado);
    } else {
      const usuarioSoloEmail = usuariosRegistrados.find((usuario: any) =>
        usuario.email === email
      );

      if (!usuarioSoloEmail) {
        return throwError(() => new Error('No se encuentra registrado'));
      } else {
        return throwError(() => new Error('Contraseña incorrecta'));
      }
    }
  }

  register(email: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some((u: any) => u.email === email);
    if (userExists) {
      return throwError(() => new Error('El usuario ya existe'));
    }
    if (password.length < 6) {
      return throwError(() => new Error('La contraseña debe tener al menos 6 caracteres'));
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return of(newUser);
  }

}