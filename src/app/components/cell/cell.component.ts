import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import CellDto from "../../code/cell.dto";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-cell",
  standalone: true,
  imports: [FormsModule],
  styleUrl: "./cell.component.scss",
  template:
    '<input type="text" [(ngModel)]="value" #inputEl (input)="onChange(inputEl.value)" (mouseenter)="onMouseEnter()" (mouseleave)="onMouseOut()" (focus)="onFocus()" class="text-center outline w-8 h-8" />',
})
export class CellComponent {
  @Input() rowIdx: number = 0;
  @Input() colIdx: number = 0;
  value: number = 0;

  @Output() onChangeEvent = new EventEmitter<CellDto>();
  @Output() onFocusEvent = new EventEmitter<CellDto>();
  @Output() onErrorEvent = new EventEmitter<string>();
  @Output() onMouseEnterEvent = new EventEmitter<CellDto>();
  @Output() onMouseOutEvent = new EventEmitter<CellDto>();

  @ViewChild("inputEl", { static: true }) inputEl?: ElementRef;
  constructor(private elementRef: ElementRef) {}

  onChange(value: string) {
    if (value.match(/^\d+$/)) {
      const cell = new CellDto();

      cell.col = this.colIdx;
      cell.row = this.rowIdx;
      cell.value = parseInt(value);

      this.onChangeEvent.emit(cell);
    } else {
      this.value = 0;
      this.onErrorEvent.emit(`Invalid ${value} input - enter degits only!`);
    }
  }

  onMouseEnter() {
    const cell = new CellDto();

    cell.col = this.colIdx;
    cell.row = this.rowIdx;
    cell.value = this.value;

    this.onMouseEnterEvent.emit(cell);
  }

  onMouseOut() {
    const cell = new CellDto();

    cell.col = this.colIdx;
    cell.row = this.rowIdx;
    cell.value = this.value;

    this.onMouseOutEvent.emit(cell);
  }

  onFocus() {
    const cell = new CellDto();

    cell.col = this.colIdx;
    cell.row = this.rowIdx;
    cell.value = this.value;

    this.onFocusEvent.emit(cell);
  }
}
