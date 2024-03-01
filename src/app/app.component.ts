import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CellComponent } from "./components/cell/cell.component";
import CellDto from "./code/cell.dto";
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [FormsModule, CommonModule, CellComponent, MatGridListModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  @ViewChildren(CellComponent) cells: QueryList<CellComponent> | undefined;
  @ViewChild("hView", { static: true }) hView?: ElementRef;
  @ViewChild("vView", { static: true }) vView?: ElementRef;
  @ViewChild("lView", { static: true }) lView?: ElementRef;
  @ViewChild("rView", { static: true }) rView?: ElementRef;

  cols: number = 0;
  rows: number = 0;
  limit: number = 0;

  error?: string;

  v: number = 0;
  h: number = 0;
  l: number = 0;
  r: number = 0;

  matrix: number[] = [];

  isDisabled: boolean = true;

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

    this.setError(cell);
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

  private getSelected(cell: CellDto) {
    const cells = this.cells?.toArray();
    const selected: any[] = [];

    let r1 = 0,
      r2 = cell.row,
      r3 = cell.row,
      r4 = cell.row,
      r5 = cell.row;

    let c1 = 0,
      c2 = cell.col,
      c3 = cell.col,
      c4 = cell.col,
      c5 = cell.col;

    let isVisited = false;

    while (true) {
      // pick vertical cells
      if (r1 < this.rows) {
        selected.push({
          ...cells?.find(
            (item) => item.colIdx === cell.col && item.rowIdx === r1
          ),
          dir: "v",
        });

        r1 = r1 + 1;
      }
      // pick horizantal cells
      else if (c1 < this.cols) {
        selected.push({
          ...cells?.find(
            (item) => item.colIdx === c1 && item.rowIdx === cell.row
          ),
          dir: "h",
        });

        c1 = c1 + 1;
      }
      // pick slant-left to top cells
      else if (r2 >= 0 && c2 >= 0) {
        if (!isVisited) {
          isVisited = true;
        }

        selected.push({
          ...cells?.find((item) => item.colIdx === c2 && item.rowIdx === r2),
          dir: "l",
        });

        c2 = c2 - 1;
        r2 = r2 - 1;
      }
      // pick slant-left to bottom cells
      else if (r3 < this.rows && c3 < this.cols) {
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
      }
      // pick slant-right to bottom cells
      else if (r4 >= 0 && c4 < this.cols) {
        if (!isVisited) {
          isVisited = true;
        }

        selected.push({
          ...cells?.find((item) => item.colIdx === c4 && item.rowIdx === r4),
          dir: "r",
        });

        c4 = c4 + 1;
        r4 = r4 - 1;
      }
      // pick slant-right to top cells
      else if (r5 < this.rows && c5 >= 0) {
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
    if (this.getEnabled()) {
      this.setError(cell);
    } else {
      this.getSelected(cell).forEach((item: any) => {
        if (item.rowIdx === cell.row && item.colIdx === cell.col) {
          item?.inputEl?.nativeElement.classList.add("selected-input");
        } else {
          item?.inputEl?.nativeElement.classList.add("over-input");
        }
      });
    }
  }

  onMouseOut(cell: CellDto) {
    if (this.getEnabled()) {
      this.setError(cell);
    } else {
      this.getSelected(cell).forEach((item: any) => {
        if (item.rowIdx === cell.row && item.colIdx === cell.col) {
          item?.inputEl?.nativeElement.classList.remove("selected-input");
        } else {
          item?.inputEl?.nativeElement.classList.remove("over-input");
        }
      });
    }
  }

  setError(cell: CellDto) {
    let error: string = "";
    this.isDisabled = this.getEnabled();
    let selected = [];

    if (this.isDisabled) {
      selected = this.getSelected(cell);
      this.cells?.toArray().forEach((item: any) => {
        item?.inputEl?.nativeElement.classList.remove("selected-input");
        item?.inputEl?.nativeElement.classList.remove("over-input");
      });
    }

    if (this.cols <= 0) {
      error += `Columns - please set greater then zero<br />`;
    }

    if (this.rows <= 0) {
      error += `Rows - please set greater then zero<br />`;
    }

    if (this.limit <= 0) {
      error += `Limit - please set greater then zero<br />`;
    }

    if (this.v > this.limit) {
      error += `Vertical sum ${this.v} greater then limit ${this.limit}<br />`;
      selected
        .filter((item) => item.dir === "v")
        .forEach((item: any) => {
          item?.inputEl?.nativeElement.classList.add("invalid-input");
        });
        this.vView?.nativeElement.classList.add("invalid-input");
    }

    if (this.h > this.limit) {
      error += `Horizontal sum ${this.h} greater then limit ${this.limit}<br />`;
      selected
        .filter((item) => item.dir === "h")
        .forEach((item: any) => {
          item?.inputEl?.nativeElement.classList.add("invalid-input");
        });
        this.hView?.nativeElement.classList.add("invalid-input");
    }

    if (this.l > this.limit) {
      error += `Slant Left sum ${this.l} greater then limit ${this.limit}<br />`;
      selected
        .filter((item) => item.dir === "l")
        .forEach((item: any) => {
          item?.inputEl?.nativeElement.classList.add("invalid-input");
        });
        this.lView?.nativeElement.classList.add("invalid-input");
    }

    if (this.r > this.limit) {
      error += `Slant Right sum ${this.r} greater then limit ${this.limit}<br />`;
      selected
        .filter((item) => item.dir === "r")
        .forEach((item: any) => {
          item?.inputEl?.nativeElement.classList.add("invalid-input");
        });
        this.rView?.nativeElement.classList.add("invalid-input");
    }

    this.error = error;
  }

  getEnabled() {
    return (
      this.cols <= 0 ||
      this.cols <= 0 ||
      this.limit <= 0 ||
      this.v > this.limit ||
      this.h > this.limit ||
      this.l > this.limit ||
      this.r > this.limit
    );
  }

  setEnabled() {
    this.isDisabled = this.getEnabled();
  }
}
