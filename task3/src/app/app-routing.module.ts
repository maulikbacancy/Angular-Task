import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'product', pathMatch: 'full'},
  {
    path: "auth",
    loadChildren: () => import("./features/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "product",
    loadChildren: () => import("./components/product-list/product-list.module").then(m => m.ProductListModule)
  },
  {
    path: "cart",
    loadChildren: () => import("./components/cart/cart.module").then(m => m.CartModule)
  },
  {
    path: "product/:id",
    loadChildren: () => import("./components/edit-product/edit-product.module").then(m => m.EditProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
