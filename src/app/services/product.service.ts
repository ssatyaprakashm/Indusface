import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]>{
    return this.http.get<any[]>("https://mocki.io/v1/63579f45-9acf-44cd-8fda-668945d30329");
  }
}
