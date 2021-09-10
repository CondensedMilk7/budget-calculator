import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BudgetItem } from 'src/app/shared/models/budget-item.model';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';
import { ItemsService } from '../shared/items.service';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss'],
})
export class BudgetItemListComponent implements OnInit {
  @Input() income: BudgetItem[];
  @Input() expenses: BudgetItem[];

  editSub = new Subscription();

  constructor(private itemsService: ItemsService, public dialog: MatDialog) {}

  ngOnInit() {
    this.editSub = this.itemsService.itemBeingEdited.subscribe((itemToEdit) => {
      this.onCardClicked(itemToEdit);
    });
  }
  onCardClicked(item: BudgetItem) {
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result: BudgetItem
      if (result) {
        this.itemsService.editItem(item, result);
      }
    });
  }
}
