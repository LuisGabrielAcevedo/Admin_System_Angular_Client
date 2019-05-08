import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule} from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';
import { SnackbarModule } from 'src/app/components/sharedComponents/snackbar/snackbar.module';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    SnackbarModule
  ]
})
export class LoginModule { }
