import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBrand } from './brand';
import { BrandService } from './brands.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  brands: IBrand[] = [];
  sub!: Subscription;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.sub = this.brandService.getBrands().subscribe({
      next: (brands) => (this.brands = brands),
      error: (errMsg) => (this.errorMessage = errMsg),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
