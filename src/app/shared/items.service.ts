import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BudgetItem } from 'src/app/shared/models/budget-item.model';
import { SortedBudgetItems } from 'src/app/shared/models/sorted-budget-items.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  changeInItems = new Subject<void>();

  itemBeingEdited = new Subject<BudgetItem>();

  sortedItems = new SortedBudgetItems(
    // sortedItems.income
    [{ amount: 900, description: 'Salary' }],
    // sortedItems.expenses
    [{ amount: -245, description: 'Rent' }]
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

  editItem(oldItem: BudgetItem, editedItem: BudgetItem) {
    if (oldItem.amount >= 0) {
      const index = this.sortedItems.income.indexOf(oldItem);
      if (editedItem.amount >= 0) {
        this.sortedItems.income[index] = editedItem;
      } else {
        this.sortedItems.income.splice(index, 1);
        this.sortedItems.expenses.push(editedItem);
      }
    } else {
      const index = this.sortedItems.expenses.indexOf(oldItem);
      if (editedItem.amount < 0) {
        this.sortedItems.expenses[index] = editedItem;
      } else {
        this.sortedItems.expenses.splice(index, 1);
        this.sortedItems.income.push(editedItem);
      }
    }
    this.changeInItems.next();
  }
}
