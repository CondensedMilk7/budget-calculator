import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/items.service';
import { BudgetItem } from 'src/shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss'],
})
export class BudgetItemCardComponent implements OnInit {
  @Input() item: BudgetItem;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}

  onRemoveItem() {
    this.itemsService.removeItem(this.item);
  }

  onCardClicked() {
    this.itemsService.itemBeingEdited.next(this.item);
  }
}
