import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Userdetails } from 'src/app/models/userdetails';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }
  userdetails = new Userdetails();
  formdata = new FormData();
  ngOnInit(): void {

  }
  signmeup() {
    this.formdata.set('Firstname', this.userdetails.firstname);
    this.formdata.set('Lastname', this.userdetails.lastname);
    this.formdata.set('Email', this.userdetails.email);
    this.formdata.set('Password', this.userdetails.password);
    this.formdata.set('DOB', this.userdetails.dob);
    this.formdata.set('Role', this.userdetails.role);
    this.authservice.registeruser(this.formdata).subscribe(data => {
      if (data.success == 1) {
        alert(data.message);
        this.router.navigate(['']);
      } else {
        alert(data.message);
      }
    });
  }
  clearmeup() {
    this.userdetails = new Userdetails();
  }
}
