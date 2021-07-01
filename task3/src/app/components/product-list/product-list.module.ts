import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedModule } from "../../core/modules/shared.module";
import { AuthGuard } from "../../core/guard/auth.guard";
import { ProductListComponent } from "./product-list.component";

@NgModule({
    declarations: [
      ProductListComponent
    ],
    imports: [
      NgxPaginationModule,
      Ng2SearchPipeModule,
      SharedModule,
      RouterModule.forChild([{ path: '', component: ProductListComponent, canActivate: [AuthGuard] }])
    ]
  })
  export class ProductListModule {}