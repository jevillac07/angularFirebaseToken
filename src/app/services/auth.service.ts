import { Usuario } from './../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private key = 'AIzaSyAnOLMS3XscXhvNK1ih1IXN3MH9sZw5piA';
  private idToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  registrarUsuario(usuario: Usuario) {
    const usuarioFirebase = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http.post(`${this.url}signUp?key=${this.key}`, usuarioFirebase).pipe(map((rpta: any) => {
      this.almacenarToken(rpta['idToken']);
      return rpta;
    }));
  }

  iniciarSersion(usuario: Usuario) {
    const usuarioFirebase = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.key}`, usuarioFirebase)
    .pipe(map((rpta: any) => {
      this.almacenarToken(rpta['idToken']);
      return rpta;
    }));
  }

  private almacenarToken(idToken: string) {
    const token = {
      t: idToken
    };

    localStorage.setItem('token', JSON.stringify(token));
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.idToken = JSON.parse(localStorage.getItem('token')).t;
    } else {
      this.idToken = null;
    }
  }

  obtenerAutenticacion(): boolean {
    return (this.idToken) ? true : false;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
  }
}
