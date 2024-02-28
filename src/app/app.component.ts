import {
  Component,
  Inject,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule, DOCUMENT } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CellComponent } from "./components/cell/cell.component";
import CellDto from "./code/cell.dto";
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, CommonModule, CellComponent, MatGridListModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss"
})
export class AppComponent {
  cols: number = 0;
  rows: number = 0;
  limit: number = 0;

  error?: string;

  v: number = 0;
  h: number = 0;
  l: number = 0;
  r: number = 0;

  @ViewChildren(CellComponent) cells: QueryList<CellComponent> | undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  Rows(): any[] {
    return Array.from({ length: this.rows }, (_, index) => index);
  }

  Cols(): any[] {
    return Array.from({ length: this.cols }, (_, index) => index);
  }

  onChange(cell: CellDto) {
    const selected = this.getSelected(cell);
    this.v = selected
      .filter((item) => item.dir === "v")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    this.h = selected
      .filter((item) => item.dir === "h")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    this.l = selected
      .filter((item) => item.dir === "l")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    this.r = selected
      .filter((item) => item.dir === "r")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    let error: string = "";
    if (this.v > this.limit) {
      error += `Vertical sum ${this.v} greater then limit ${this.limit}`;
    }

    if (this.h > this.limit) {
      error += `Horizontal sum ${this.h} greater then limit ${this.limit}`;
    }

    if (this.l > this.limit) {
      error += `Slant Left sum ${this.l} greater then limit ${this.limit}`;
    }

    if (this.r > this.limit) {
      error += `Slant Right sum ${this.r} greater then limit ${this.limit}`;
    }

    this.error = error;
  }

  onError(error: string) {
    this.error = error;
  }

  onFocus(cell: CellDto) {
    const selected = this.getSelected(cell);
    this.v = selected
      .filter((item) => item.dir === "v")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    this.h = selected
      .filter((item) => item.dir === "h")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    this.l = selected
      .filter((item) => item.dir === "l")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);

    this.r = selected
      .filter((item) => item.dir === "r")
      .map((item) => Number(item.value))
      .reduce((a, b) => a + b);
  }

  getSelected(cell: CellDto) {
    const cells = this.cells?.toArray();
    const selected: any[] = [];

    let r1 = 0, r2 = cell.row, r3 = cell.row, r4 = cell.row, r5 = cell.row;
    let c1 = 0, c2 = cell.col, c3 = cell.col, c4 = cell.col, c5 = cell.col;
    let isVisited = false;

    while (true) {
      
      if (r1 < this.rows) {
        const item = selected.push({
          ...cells?.find(
            (item) => item.colIdx === cell.col && item.rowIdx === r1
          ),
          dir: "v",
        });

        r1 = r1 + 1;
      } else if (c1 < this.cols) {

        selected.push({
          ...cells?.find(
            (item) => item.colIdx === c1 && item.rowIdx === cell.row
          ),
          dir: "h",
        });

        c1 = c1 + 1;
      } else if (r2 >= 0 && c2 >= 0) {

        selected.push({
          ...cells?.find((item) => item.colIdx === c2 && item.rowIdx === r2),
          dir: "l",
        });

        c2 = c2 - 1;
        r2 = r2 - 1;

        isVisited = true;
      } else if (r3 < this.rows && c3 < this.cols) {

        if (isVisited) {
          isVisited = false;
        } else {
          selected.push({
            ...cells?.find((item) => item.colIdx === c3 && item.rowIdx === r3),
            dir: "l",
          });
        }

        c3 = c3 + 1;
        r3 = r3 + 1;
      } else if (r4 >= 0 && c4 < this.cols) {
        
        selected.push({
          ...cells?.find((item) => item.colIdx === c4 && item.rowIdx === r4),
          dir: "r",
        });

        c4 = c4 + 1;
        r4 = r4 - 1;

        isVisited = true;
      } else if (r5 < this.rows && c5 >= 0) {

        if (isVisited) {
          isVisited = false;
        } else {
          selected.push({
            ...cells?.find((item) => item.colIdx === c5 && item.rowIdx === r5),
            dir: "r",
          });
        }

        c5 = c5 - 1;
        r5 = r5 + 1;
      } else {
        break;
      }
    }
    return selected;
  }

  onMouseEnter(cell: CellDto) {
    this.getSelected(cell).forEach((item: any) => {
      if (item.rowIdx === cell.row && item.colIdx === cell.col) {
        item?.inputEl?.nativeElement.classList.add("selected-input");
      } else {
        item?.inputEl?.nativeElement.classList.add("over-input");
      }
    });
  }

  onMouseOut(cell: CellDto) {
    this.getSelected(cell).forEach((item: any) => {
      if (item.rowIdx === cell.row && item.colIdx === cell.col) {
        item?.inputEl?.nativeElement.classList.remove("selected-input");
      } else {
        item?.inputEl?.nativeElement.classList.remove("over-input");
      }
    });
  }
}
