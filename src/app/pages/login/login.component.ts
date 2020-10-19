import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor(private authService: AuthService,
              private router: Router) {
    this.usuario = new Usuario();
    this.usuario.email = 'jvillaordunac@gmail.com';
  }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.iniciarSersion(this.usuario).subscribe((data: any) => {
      console.log('data: ' + data);
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error.error.error.message);
    });
  }
}
