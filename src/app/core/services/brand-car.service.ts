import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandCarDto } from '../dto/brandCarDto';
import { environment } from 'src/environments/environment.prod';
const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class BrandCarService {

  //private url:string = environment.apiUrl;
  constructor(private http: HttpClient) {

   }

   public getAllBrandsCar():Observable<BrandCarDto[]>{
    return this.http.get<BrandCarDto[]>(`${apiUrl}/brands-car`);
   }
}
