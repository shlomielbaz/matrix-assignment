import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  checkVerticle,
  checkHorizontal,
  checkSlantLeft,
  checkSlantRight,
} from './code/matrix';
import { CellComponent } from './components/cell/cell.component';
import CellDto from './code/cell.dto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, CellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'matrix';
  cols: number = 0;
  rows: number = 0;
  limit: number = 0;
  isDisabled: boolean = true;
  isStarted: boolean = false;
  error?: string;

  v: number = 0;
  h: number = 0;
  l: number = 0;
  r: number = 0;

  matrix: number[][] = [];

  gameCreate() {
    console.log('Create Game');
    this.isStarted = true;
    this.matrix = Array.from(Array(this.cols), () =>
      new Array(this.rows).fill(0)
    );
  }

  Rows(): any[] {
    return Array.from({ length: this.rows }, (_, index) => index);
  }

  Cols(): any[] {
    return Array.from({ length: this.cols }, (_, index) => index);
  }

  onKey() {
    this.isDisabled = !(this.cols > 0 && this.rows > 0 && this.limit > 0);
  }

  onChange(cell: CellDto) {

    console.log(cell)

    this.matrix[cell.row][cell.col] = cell.value;

    this.v = checkVerticle(cell.col, this.matrix);
    this.h = checkHorizontal(cell.row, this.matrix);
    this.l = checkSlantLeft(cell.row, cell.col, this.matrix);
    this.r = checkSlantRight(cell.row, cell.col, this.matrix);

    let error: string = '';
    if (this.v > this.limit) {
      error += `Vertical sum ${this.v} greater then limit ${this.limit}`
    }

    if (this.h > this.limit) {
      error += `Horizontal sum ${this.h} greater then limit ${this.limit}`
    }

    if (this.l > this.limit) {
      error += `Slant Left sum ${this.l} greater then limit ${this.limit}`
    }

    if (this.r > this.limit) {
      error += `Slant Right sum ${this.r} greater then limit ${this.limit}`
    }

    this.error = error;
  }

  onError(error: string) {
    this.error = error;
  }

  onMark(cell: CellDto) {
    console.log(cell);
  }

  onFocus(event: Event) {
    console.log('Focus', event, event.target);
  }

  onBlur(event: Event) {
    console.log('Blur', event);
  }

  onInput(event: Event) {
    console.log('Input', event);

    checkVerticle(2, this.matrix);
  }

  ngOnInit() {
    this.matrix = Array.from(Array(this.cols), () =>
      new Array(this.rows).fill(0)
    );
  }

  ngOnChanges() {
    console.log('ngOnChanges()');
  }
}
