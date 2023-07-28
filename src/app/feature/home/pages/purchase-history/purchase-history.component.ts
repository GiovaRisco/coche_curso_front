import { Component, OnInit } from '@angular/core';
import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { TokenService } from 'src/app/core/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  public historyPurchases : Array<any>;

  public carsPurchase : Array<any>;

  constructor(private purchaseService: PurchaseService,private tokenService: TokenService) { 
    this.purchaseService.getAllPurchaseByCustomer(this.tokenService.getInfoToken().cardId).subscribe({
      next: value => {
        this.historyPurchases = value;
      }
    });
  }


  public showListCarsPurchase(carsPurchase: Array<CarsPurchaseDto>): void{
    this.carsPurchase = carsPurchase;
  }

  ngOnInit(): void {
  }

}
