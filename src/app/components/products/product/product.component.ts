import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//services
import { ProductService } from '../../../services/product.service'
import { ToastrService} from 'ngx-toastr';

//Product class
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService, 
    private toaster: ToastrService
    ) { }

  ngOnInit() {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm){
    if(productForm.value.$key == null)
      this.productService.insertProduct(productForm.value);
    else 
      this.productService.updateProduct(productForm.value);
    
    this.resetForm(productForm);    
    this.toaster.success('Succesfull Operation','Succesfull Operation');
  }

  resetForm(productForm?: NgForm){
    if(productForm != null)
      productForm.reset();
      this.productService.selectedProduct = new Product();
  }
}

