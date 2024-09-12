import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PeriodicElement } from '../../models/periodic.type';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  formGroup = new FormGroup({
    position: new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/)]),
    name: new FormControl('', [Validators.required]),
    weight: new FormControl(0, [Validators.required, Validators.min(0)]),
    symbol: new FormControl('', [Validators.required])
  });

  private dialogRef = inject(MatDialogRef<EditComponent>);
  private data = inject<PeriodicElement>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.formGroup.patchValue(this.data);
  }

  onSubmit(): void {
    this.dialogRef.close(this.formGroup.value);
  }
}
