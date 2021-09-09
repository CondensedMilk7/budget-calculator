import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent implements OnInit {
  @Input() item = new BudgetItem('', null);

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.itemsService.addItem(form.value);
    form.reset();
  }
}
