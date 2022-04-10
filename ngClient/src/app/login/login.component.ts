import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  postId:string;

  constructor(private apiService: ApiService,
    private http: HttpClient,) {
      this.postId =''
     }
  shippingCosts = this.apiService.getShippingPrices();
  ngOnInit(): void {
  //this.apiService.postTypeRequest();
  }





oussama(form: NgForm) {
  console.log("<<<<<<<<<<<<<",form.value);
  let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' });
    let options = { headers: headers };
  const   baseUrl = "http://localhost:5000"
  this.http.post(`${baseUrl}/api/user/registre`,form.value, options).subscribe(data => {
    console.log(data);
})

}

onSubmitt(form: NgForm) {
  console.log("<<<<<<<<<<<<<",form.value);
  let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' });
    let options = { headers: headers };
  const   baseUrl = "http://localhost:5000"
  this.http.post(`${baseUrl}/api/user/login`,form.value, options).subscribe({next:data => {
    localStorage.setItem('auth-token', JSON.stringify(form.value))
    console.log(data);
},
error: error => {

  console.error('There was an error!', error.error);
}

  })

}




}
