import { Component } from '@angular/core';
import { BuyerService } from './buyer.service';
import { Buyer } from './interfaces/buyer';

@Component({
  selector: 'app-buyer',
  standalone: true,
  imports: [],
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css',
})
export class BuyerComponent {
  constructor(private buyerService: BuyerService) {}
  buyers: Buyer[] = []
  ngOnInit() {
    this.getBuyer();
  }

  getBuyer():any {
    this.buyerService.getBuyer().subscribe((data: any) => {
      this.buyers = data;
    });
  }
}
