import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProposalService } from './proposal/proposal.service';
import { logVersion } from '../packageData';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portalsanrio';

  constructor(
    public router: Router,
    public translate: TranslateService,
    private proposalService: ProposalService // used to trigger constructor code
  ) {
    logVersion();
    translate.setDefaultLang('es');
    translate.use('es');
  }
}
