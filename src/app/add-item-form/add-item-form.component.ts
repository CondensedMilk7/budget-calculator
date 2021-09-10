import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss'],
})
export class AddItemFormComponent implements OnInit {
  @Output() formSubmitter = new EventEmitter<BudgetItem>();
  @Input() item;

  isNewItem: boolean;
  btnTxt: string;

  constructor() {}

  ngOnInit() {
    if (this.item) {
      this.isNewItem = false;
      this.btnTxt = 'Save';
    } else {
      this.isNewItem = true;
      this.item = new BudgetItem('', null);
      this.btnTxt = 'Add';
    }
  }

  onSubmit(form: NgForm) {
    this.formSubmitter.emit(form.value);
    form.reset();
  }
}
