import { Component, OnInit } from '@angular/core';
import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { PurchaseRequestDto } from 'src/app/core/dto/purchaseRequestDto';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public listCarsPurchase: Array<CarsPurchaseDto>;

  public purchaseSaved: boolean = false;

  public numberBill: string;
  constructor(private tokenService: TokenService, private purchaseService: PurchaseService) {
    this.listCarsPurchase = JSON.parse(localStorage.getItem("carsPurchase"));
   }

  ngOnInit(): void {
  }

  /*Registra una compra */
  public registerPurchase(): void {
      let totalItems: number = 0;

      this.listCarsPurchase.forEach(car => totalItems += car.totalPriceCars)

      let newPurchase: PurchaseRequestDto = {
          cardIdCustomer : this.tokenService.getInfoToken().cardId,
          date: new Date(Date.now()),
          carsPurchase: this.listCarsPurchase,
          paymentMethod: "Credito",
          total : totalItems
      }

      this.purchaseService.registerPurchase(newPurchase).subscribe({
        next: value => {
             this.numberBill = value.numberBill;
             this.purchaseSaved = true;
             localStorage.clear();
        }
      })
  }
  
}
