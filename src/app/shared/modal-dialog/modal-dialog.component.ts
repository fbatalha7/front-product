import { HttpClient } from '@angular/common/http';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  animal: string;
}

@Component({
  selector: 'modal-dialog',
  templateUrl: 'modal-dialog.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})

export class ModalDialogComponent {

  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ModalDialogComponent>);

  code = model('');
  description = model('');
  department = model('');
  price = model('');
  status = model('');

  save(): void {
    const formData = {
      code: this.code(),
      description: this.description(),
      department: this.department(),
      price: Number(this.price()),
      status: this.status()
    };

    console.log('Filho enviando:', formData);

    this.data.onSave(formData);
  }
}