import { AfterViewInit, Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { PeriodicElement } from '../../models/periodic.type';
import { EditComponent } from '../edit/edit.component';
import { RxState } from '@rx-angular/state';
import { GLOBAL_RX_STATE, GlobalState } from '../../states';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatTableModule, MatSortModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends RxState<PeriodicElement[]> implements AfterViewInit {
  columns: string[] = ['position', 'name', 'weight', 'symbol', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  loading: boolean = true;
  filter = new FormControl('');

  private globalState = inject<RxState<GlobalState>>(GLOBAL_RX_STATE);
  private dialog = inject(MatDialog);
  private destoryRef = inject(DestroyRef);

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    super();
    this.connect(
      this.globalState
        .select('elements')
        .pipe(tap((elements) => {
          this.dataSource.data = elements;
          this.loading = false;
        }))
    );

    this.filter.valueChanges
      .pipe(
        takeUntilDestroyed(this.destoryRef),
        debounceTime(2000)
      )
      .subscribe(s => {
        this.dataSource.filter = (s ?? '').trim().toLowerCase();
      })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  clearFilter(): void {
    this.filter.patchValue('');
  }

  edit(value: PeriodicElement, index: number): void {
    const dialogRef = this.dialog.open(EditComponent, {data: value, width: '500px'});
    const subscription = dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe(s => {
        if (!!s) {
          this.dataSource.data[index] = s;
          this.dataSource._updateChangeSubscription();
        }
        subscription.unsubscribe();
      });
  }
}
