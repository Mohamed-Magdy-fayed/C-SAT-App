import { getServices } from './../../store/selectors/feedback.selector';
import { Store } from '@ngrx/store';
import { FeedbackDataService } from './../../services/feedback-data.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminToolService } from 'src/app/services/admin-tool.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Service } from 'src/app/interfaces/Service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'code', 'questions', 'actions'];
  data: Service | undefined
  dataSource: any = []
  selection = new SelectionModel<Service>(true, []);

  constructor(
    private feedback: FeedbackDataService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.feedback.getServices()
    this.store.select(getServices).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<Service>(data)
      }
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Service): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.code + 1}`;
  }
}
