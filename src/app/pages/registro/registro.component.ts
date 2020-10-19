import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: Usuario;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.usuario = new Usuario();
    this.usuario.email = 'jvillaordunac@gmail.com';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.registrarUsuario(this.usuario).subscribe((data: any) => {
      console.log(data);
      this.router.navigateByUrl('/home');
    }, (error) => {
      console.log(error.error.error.message);
    });
  }
}
