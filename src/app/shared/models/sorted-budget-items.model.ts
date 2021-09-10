import { BudgetItem } from './budget-item.model';

export class SortedBudgetItems {
  // Income must contain items with amount >= 0, expenses -- < 0
  constructor(public income: BudgetItem[], public expenses: BudgetItem[]) {}
}
