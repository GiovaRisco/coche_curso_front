import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppModule } from 'src/app/app.module';

import { environment } from 'src/environments/environment.prod';
import { CarDto } from '../dto/carDto';
import { CarsPurchaseDto } from '../dto/carsPurchaseDto';

@Injectable({
  providedIn: 'root'
})
export class CarService {
 
  private numberProducts = new BehaviorSubject(0) ;
  public readonly getFilesAdded: Observable<any> = this.numberProducts.asObservable();

  constructor(private http:HttpClient) { 
    this.setNumberProducts();
  }

  private url:string = environment.apiUrl;

  public getAllCars(): Observable<CarDto[]>{
    return this.http.get<CarDto[]>(this.url + "/cars");
  }

  public registerCar(newCar: CarDto):Observable<CarDto>{
    return this.http.post<CarDto>(this.url + "/cars",newCar);
  }

  public setNumberProducts(): void{
    let count: number = 0;
    let carsPurchase: Array<CarsPurchaseDto> = JSON.parse(localStorage.getItem("carsPurchase"));
    if(!carsPurchase){
      this.numberProducts.next(0);
      return
    }
    carsPurchase.forEach(car => count += car.cuantityCars );
    this.numberProducts.next(count);
  }


}
