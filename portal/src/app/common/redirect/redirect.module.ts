import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [RedirectComponent],
  imports: [CommonModule, NgbModule],
  providers: [NgbActiveModal],
  exports: [RedirectComponent],
  entryComponents: [RedirectComponent]
})
export class RedirectModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: RedirectModule
  ) {
    if (parentModule) {
      throw new Error(
        'RedirectModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RedirectModule,
      providers: []
    };
  }
}
