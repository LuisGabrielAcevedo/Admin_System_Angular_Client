import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '@app/shared/pipes';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import {
  NgbModule,
  NgbDateParserFormatter,
  NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { CommentsDetailComponent } from './panel-detail/comments-detail/comments-detail.component';
import { FinanceDetailComponent } from './panel-detail/finance-detail/finance-detail.component';
import { PanelDetailHeaderComponent } from './panel-detail/panel-detail-header/panel-detail-header.component';
import { PanelDetailComponent } from './panel-detail/panel-detail.component';
import { ParticipantDetailComponent } from './panel-detail/participant-detail/participant-detail.component';
import { VehicleDetailComponent } from './panel-detail/vehicle-detail/vehicle-detail.component';
import { PanelRoutingModule } from './panel-routing.module';
import { ProposalGroupComponent } from './proposals/proposal-group/proposal-group.component';
import { ProposalListComponent } from './proposals/proposal-list/proposal-list.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalStatusStateModule } from './state/proposal-status/proposal.status.state.module';
import { ProposalListStateModule } from './state/proposal-list/proposal.list.state.module';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../shared/directives/directives.module';
import { ProposaFilterStateModule } from './state/proposal-filter/proposal.filter.state.module';
import { ProposalSellingStateModule } from './state/proposal-selling/proposal.selling.state.module';
import { NgbDateMomentParserFormatter } from './date.parser';
import { CustomDatepickerI18n } from './i18n.date.service';
import { ChecklistModule } from '@app/shared/checklist/checklist.module';
import { DocumentsDetailComponent } from './panel-detail/documents-detail/documents-detail.component';
@NgModule({
  declarations: [
    PanelDetailComponent,
    ProposalsComponent,
    ProposalListComponent,
    ProposalGroupComponent,
    ParticipantDetailComponent,
    VehicleDetailComponent,
    FinanceDetailComponent,
    CommentsDetailComponent,
    PanelDetailHeaderComponent,
    DocumentsDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxCurrencyModule,
    NgxMaskModule,
    NgxChartsModule,
    NgbModule,
    UiComponentsModule,
    ProposaFilterStateModule,
    PipesModule,
    ProposalStatusStateModule,
    ProposalListStateModule,
    ProposalSellingStateModule,
    TranslateModule.forChild(),
    DirectivesModule,
    ChecklistModule
  ],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: NgbDateMomentParserFormatter
    },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
  ]
})
export class PanelModule {}
