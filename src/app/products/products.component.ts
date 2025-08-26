import { CommonModule, NgIf } from '@angular/common';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'description', 'department', 'price', 'status', 'acoes'];
  
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: data => this.dataSource.data = data,
      error: err => this.dataSource.data = []
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  NavigatePage(id : string | null) {
    console.log('Navegando para:', id);
    if(!id){
      this.router.navigate(['/products/new']);
    }
    else{
      this.productsService.getProduct(id).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate([`/products/${id}`]);
        },
        error: (err) => console.error(err)
      });
    }
  }

  excluir(produto: Product) {
    this.productsService.deleteProduct(produto).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(p => p !== produto);
      },
      error: err => console.error(err)
    });
  }
}
