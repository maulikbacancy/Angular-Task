import { NgModule } from '@angular/core';
import { EditProductComponent } from './edit-product.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guard/auth.guard';
import { SharedModule } from '../../core/modules/shared.module';



@NgModule({
  declarations: [
    EditProductComponent
],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: EditProductComponent, canActivate: [AuthGuard] }])
  ]
})
export class EditProductModule { }
