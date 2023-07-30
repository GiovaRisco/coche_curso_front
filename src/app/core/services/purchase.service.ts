import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
import { PurchaseRequestDto } from '../dto/purchaseRequestDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private url:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /*Realiza una compra a guardar */
  public registerPurchase(newPurchase: PurchaseRequestDto): Observable<any>{
      return this.http.post(this.url + "/purchases", newPurchase)
  }

  public getAllPurchaseByCustomer(idCustomer : string): Observable<any>{
    return this.http.get( `${this.url}/purchases/customers/${idCustomer}` )
}


}
