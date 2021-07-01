import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/sevices/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit, OnDestroy {
  public product = new Product('','','','','','');
  private subscription: Subscription;
  public editMode = false;
  private fileToUpload: any;

  constructor(
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] !== 'new';
      if(this.editMode) {
        this.product = this.productService.editableProduct;
      }
    });

  }

  public onSubmit(form: NgForm): void {
    if(this.editMode) {
      this.subscription = this.productService.editProduct(this.product).subscribe(res => {
        this.toastr.success('Product Updated', 'Successfull!');
        this.router.navigate(['product']);
        form.resetForm();
      });
    }
    else {
      this.subscription = this.productService.addProduct(this.product).subscribe(res => {
        this.toastr.success(this.product.title+' added successfull', 'Successfull!');
        this.router.navigate(['product']);
        form.resetForm();
      });
    }
    
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.product.image = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  ngOnDestroy():void {
    if(!!this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
