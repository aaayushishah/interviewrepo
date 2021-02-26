import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdetails } from 'src/app/models/userdetails';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userdetails = new Userdetails();
  formdata = new FormData();
  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  logmein() {
    this.formdata.set('Email', this.userdetails.email);
    this.formdata.set('Password', this.userdetails.password);
    this.authservice.login(this.formdata).subscribe(data => {
      if (data.success == 1) {
        alert(data.message);
        sessionStorage.setItem('userdata', JSON.stringify(data.data[0]));
        this.router.navigate(['blogs']);
      } else {
        alert(data.message);
      }
    });
  }
  clearmeup() {
    this.userdetails = new Userdetails();
  }
}
