import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/core/dto/carDto';
import { CarsPurchaseDto } from 'src/app/core/dto/carsPurchaseDto';
import { CarService } from 'src/app/core/services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  public listCarsPortfolio: CarDto[];

  public carsPurchase: CarsPurchaseDto[] ;

  constructor(private carService: CarService) {
    this.carsPurchase = [];
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
        console.log(this.listCarsPortfolio)
      }
    })
  }

  //Agrega un coche al carrito
  public addCarShoppingCart(carNew: CarDto): void {


    let added: boolean = false;

    if (this.carsPurchase.length > 0) {

      for (let i: number = 0; i < this.carsPurchase.length && !added; i++) {
        let car: CarsPurchaseDto = this.carsPurchase[i]
        if (car.codeCar == carNew.codeCar) {
          if ((car.cuantityCars + 1) > carNew.stock) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se puede exceder el stock del producto'
            });
            added = true;
          } else {
            car.cuantityCars += 1;
            car.totalPriceCars += carNew.price;
            added = true;
          }
        }
      }
    }

    if (!added) {
      let carPurchase: CarsPurchaseDto = {
        codeCar: carNew.codeCar,
        cuantityCars: 1,
        totalPriceCars: carNew.price
      };
      this.carsPurchase.push(carPurchase)
    }

    console.log("Coche agregado" , this.carsPurchase)
    localStorage.setItem('carsPurchase', JSON.stringify(this.carsPurchase));

  }



  //Elimina un coche del carrito
  public deleteCarShoppingCart(carNew: CarDto): void {
     let carActual: CarsPurchaseDto =  this.carsPurchase.find(car => car.codeCar == carNew.codeCar);
     let deleted = false;
     
     if(carActual == null){
        Swal.fire({
          icon: "info",
          title: "Eliminar el carrito",
          text:"No has agregadi ninguna unidad a este coche"
        })
      } else {
        for (let i: number = 0; i < this.carsPurchase.length && !deleted; i++) {
          let car: CarsPurchaseDto = this.carsPurchase[i];
          if (car.codeCar == carNew.codeCar){
            if ((car.cuantityCars - 1) == 0) {
              this.carsPurchase.splice(i, 1);
            } else {
              car.cuantityCars -= 1;
              car.totalPriceCars -= carNew.price;
              deleted = true;
            }
          }
        }
      }

      console.log("Coche eliminado" ,  this.carsPurchase);
      
    localStorage.setItem('carsPurchase', JSON.stringify(this.carsPurchase));

  }

  ngOnInit(): void {
  }

}
