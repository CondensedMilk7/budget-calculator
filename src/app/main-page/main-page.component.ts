import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BudgetItem } from 'src/app/shared/models/budget-item.model';
import { ItemsService } from '../shared/items.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
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

  onSubmit(newItem: BudgetItem) {
    this.itemsService.addItem(newItem);
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

    return totalIncome + totalExpense;
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
