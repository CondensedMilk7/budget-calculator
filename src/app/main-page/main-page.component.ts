import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  income: BudgetItem[];
  expenses: BudgetItem[];

  calculatedBudget: number;

  itemsSub = new Subscription();

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.income = this.itemsService.sortedItems.income;
    this.expenses = this.itemsService.sortedItems.expenses;

    this.itemsSub = this.itemsService.changeInItems.subscribe(() => {
      this.calculatedBudget = this.calcBudget();
    });
    this.calculatedBudget = this.calcBudget();
  }

  calcBudget() {
    let totalIncome = 0;
    for (let item of this.income) {
      totalIncome += item.amount;
    }

    let totalExpense = 0;
    for (let item of this.expenses) {
      totalExpense += item.amount;
    }

    console.log(`${totalIncome} + ${totalExpense}`);

    return totalIncome + totalExpense;
  }
}
