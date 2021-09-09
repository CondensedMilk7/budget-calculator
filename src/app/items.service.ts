import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { SortedBudgetItems } from 'src/shared/models/sorted-budget-items.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  changeInItems = new Subject<void>();

  sortedItems = new SortedBudgetItems(
    // Income
    [
      { amount: 20, description: 'test1' },
      { amount: 15, description: 'test2' },
      { amount: 200, description: 'test3' },
    ],
    // Expenses
    [
      { amount: -75, description: 'test4' },
      { amount: -20, description: 'test5' },
      { amount: -100, description: 'test6' },
    ]
  );

  addItem(newItem: BudgetItem) {
    if (newItem.amount >= 0) {
      this.sortedItems.income.push(newItem);
    } else {
      this.sortedItems.expenses.push(newItem);
    }
    this.changeInItems.next();
  }

  removeItem(item: BudgetItem) {
    if (item.amount >= 0) {
      this.sortedItems.income.splice(this.sortedItems.income.indexOf(item), 1);
    } else {
      this.sortedItems.expenses.splice(
        this.sortedItems.expenses.indexOf(item),
        1
      );
    }
    this.changeInItems.next();
  }

  editItem(editedItem: BudgetItem) {
    if (editedItem.amount >= 0) {
      const index = this.sortedItems.income.indexOf(editedItem);
      this.sortedItems.income[index] = editedItem;
    } else {
      const index = this.sortedItems.expenses.indexOf(editedItem);
      this.sortedItems.expenses[index] = editedItem;
    }
    this.changeInItems.next();
  }
}
