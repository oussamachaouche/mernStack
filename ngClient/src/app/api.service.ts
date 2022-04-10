import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {




  constructor(private http: HttpClient) { }



  getShippingPrices() {
    return this.http.get<{
      userId: string,
      id: Number,
      title: string,
      body: string
    }[]>('https://jsonplaceholder.typicode.com/posts');
  }


  postTypeRequest() {
    const   baseUrl = "http://localhost:5000"
    let headers = new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json' });
    let options = { headers: headers };
    let body = {name: "oussama",email:"oussama69@live.com", password:"123456"}
    return  this.http.post<any>(`${baseUrl}/api/user/registre`,body, options).subscribe(data => {
      console.log(data);
  })
  }

}

