import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { startWith, map, BehaviorSubject } from 'rxjs';
import { Department, Product } from '../models/product.model';
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { StatusToggleComponent } from '../../shared/status-toggle/status-toggle';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/confirm-dialog/confirm-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  templateUrl: './form-product.html',
  styleUrls: ['./form-product.css'],
  imports: [
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StatusToggleComponent,
    NgxMaskDirective
  ],
  standalone: true,
  providers: [provideNgxMask()],
})
export class FormProductComponent implements OnInit {
  productForm!: FormGroup;
  isEditing: boolean = false; 
  departments: Department[] = [];
  id: string | undefined;

  filteredDepartments = new BehaviorSubject<Department[]>([]);

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  constructor(private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  private populateForm(product: Product) {
  this.productForm.patchValue({
    code: product.code,
    description: product.description,
    price: this.formatPrice(product.price),
    status: product.status,
    department: product.department
  });
}

  formatPrice(value: number): string {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id')?.toString();

    this.isEditing = !!this.id;

    this.productService.getProduct(this.id!).subscribe({
      next: (data) => {
        if (data) {
          this.populateForm(data);
        }
      }
    });

    this.productForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      department: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      status: [true]
    });

    this.departmentService.getDepartments().subscribe(departments => {

      this.departments = departments;

      this.filteredDepartments.next(departments);

      this.productForm.controls['department'].valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.description),
        map(name => name ? this._filterDepartments(name) : this.departments.slice())
      ).subscribe(filtered => {
        this.filteredDepartments.next(filtered);
      });
    });

  }

  onPriceBlur() {
    let value: string = this.productForm.get('price')?.value;

    if (typeof value === 'string') {
      let numericValue = value.replace(/[^0-9,\.]/g, '');

      numericValue = numericValue.replace(',', '.');

      const parsed = parseFloat(numericValue);

      if (!isNaN(parsed)) {
        this.productForm.get('price')?.setValue(parsed);
      } else {
        this.productForm.get('price')?.setValue(null);
      }
    }
  }


  private _filterDepartments(name: string): Department[] {
    const filterValue = name.toLowerCase();
    return this.departments.filter(dept => dept.description.toLowerCase().includes(filterValue));
  }

  displayDeptName(dept: any): string {
    return dept ? dept.description : '';
  }


  onDepartmentSelected(department: Department) {
    this.productForm.patchValue({ department });
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  onSubmit() {
    if (this.productForm.valid) {

      const product: Product = this.productForm.value;

      if (this.id) {
        this.productService.updateProduct(product, this.id).subscribe({
          next: (response) => {
            this.router.navigate(['/products']);
          },
          error: (error) => {
          }
        });
      } else {
        this.productService.createProduct(product).subscribe({
          next: (response) => {
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Erro ao criar produto:', error);
          }
        });
      }
    }
  }
}
