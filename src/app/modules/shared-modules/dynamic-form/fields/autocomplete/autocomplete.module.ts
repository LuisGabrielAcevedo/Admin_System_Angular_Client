import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AutocompleteComponent } from "./autocomplete.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule, MatInputModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormDirectivesModule } from "../../directives/dynamic-form-directives.module";

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    DynamicFormDirectivesModule
  ]
})
export class AutocompleteModule {}
