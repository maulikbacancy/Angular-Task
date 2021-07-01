import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
      LoadingSpinnerComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule
    ],
    exports: [
      LoadingSpinnerComponent,
      CommonModule,
      FormsModule,
      HttpClientModule
    ]
  })
  export class SharedModule {}