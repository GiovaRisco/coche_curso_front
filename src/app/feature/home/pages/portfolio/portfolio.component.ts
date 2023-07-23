import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  public listCarsPortfolio: any[];

  constructor(private carService: CarService) {
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    })
   }

  ngOnInit(): void {
  }

}
