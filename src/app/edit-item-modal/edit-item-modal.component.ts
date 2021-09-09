import { Component, Input, OnInit } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
})
export class EditItemModalComponent implements OnInit {
  @Input() item: BudgetItem;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}

  onSubmit(form) {
    const item = form.value;
    console.log(form);
    console.log(item);
    this.itemsService.editItem(item);
  }
}
