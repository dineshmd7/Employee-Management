import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Http,Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';

import 'rxjs/Rx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  token:any;  errors:any; username:any; password:any;showloader:any
  
  constructor(private http: Http,private router: Router){
    this.showloader = 'false';
   console.log("dineshhhhhhhh",this.showloader);
  }
  tokens =[];

  
  ngOnInit() {
    
  }

  

  onSubmitForm(f: NgForm) {
    this.showloader = 'true';
    console.log("dineshhh77777777",this.showloader);
    const values = { grant_type: 'password', client_id: '2',client_secret:'ZteAdXQbKLfFDfn0riZIY0lg5fQEvH5BUSQ63iz1',scope:'*' };
    console.log("User valuessss",values);
    var formdata = f.value;
     console.log("User formmmm",formdata);
    var merged = Object.assign(values, formdata);
    console.log("User mergedddd",merged);
    let headers = new Headers({ 'Content-Type':'application/json','Accept': 'application/json' });
    console.log("User headersss",headers);
    let options = new RequestOptions({ headers: headers });
    console.log("User optionsss",options);
    this.http.post('http://localhost/rest/oauth/token', JSON.stringify(merged), options).map(res => res.json())
    .subscribe((data)=>{
      if(data.access_token){
        window.localStorage.setItem('auth_key',data.access_token);
        this.showloader = 'false';
        this.router.navigateByUrl('/dashboard');
      }
    },
    err => {
      this.errors = "Username password not matched";
      this.showloader = 'false';
    });
    
    
  }

}
