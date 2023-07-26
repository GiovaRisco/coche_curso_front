import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { environment } from 'src/environments/environment';
import { CarDto } from '../dto/carDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  private url:string = environment.apiUrl;

  public getAllCars(): Observable<any[]>{
    return this.http.get<any[]>(this.url + "/cars");
  }

  public registerCar(newCar: CarDto):Observable<CarDto>{
    return this.http.post<CarDto>(this.url + "/cars",newCar);
  }
}
