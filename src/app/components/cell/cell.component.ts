import { Component, EventEmitter, Input, Output } from '@angular/core';
import CellDto from '../../code/cell.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [FormsModule],
  template:
    '<input type="text" [(ngModel)]="value" #cell (keyup)="onChange(cell.value)" (focus)="onFocus()" class="text-center outline w-8 h-8" />',
})
export class CellComponent {
  @Input() rowIdx: number = 0;
  @Input() colIdx: number = 0;
  value: number = 0;
  @Output() onChangeEvent = new EventEmitter<CellDto>();
  @Output() onFocusEvent = new EventEmitter<CellDto>();
  @Output() onErrorEvent = new EventEmitter<string>();

  onChange(value: string) {
    const cell = new CellDto();

    cell.col = this.colIdx;
    cell.row = this.rowIdx;
    cell.value = parseInt(value);

    this.onChangeEvent.emit(cell);
    // if (value.match(/^\d+$/)) {}
    // else {
    //   this.value = 0;
    //   this.onErrorEvent.emit('Invalid input - enter degits only!');
    // }
  }

  onFocus() {
    const cell = new CellDto();

    cell.col = this.colIdx;
    cell.row = this.rowIdx;
    cell.value = 0;

    this.onFocusEvent.emit(cell);
  }
}
