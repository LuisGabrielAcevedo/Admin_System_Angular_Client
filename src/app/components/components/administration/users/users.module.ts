import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRouting } from './users.routing.module';
import { TableModule } from 'src/app/components/sharedComponents/table/table.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRouting,
    TableModule,
    FlexLayoutModule
  ]
})
export class UsersModule { }
