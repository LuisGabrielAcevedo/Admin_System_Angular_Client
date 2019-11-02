import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutAction } from '@app/common/login/store/login.actions';
import { loginSelector } from '@app/common/login/store/login.selectors';
import { LoginState } from '@app/common/login/store/login.state';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ROLES_ACCESS } from './../../../constants/roles.constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private store: Store<LoginState>,
    private router: Router,
    public translate: TranslateService
  ) {}

  public name: string = '';
  public username: string = '';
  public isSimulationEnabled: boolean;
  public isNavbarCollapsed = true;

  ngOnInit() {
    this.store
      .pipe(
        select(loginSelector),
        select(state => state.userData)
      )
      .subscribe(userData => {
        this.name = userData.name;
        this.username = userData.username;
        this.isSimulationEnabled = userData.roles.some(
          role => ROLES_ACCESS.PRE_PROPOSAL.indexOf(role) >= 0
        );
      });
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
  toggleCollapse() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
  Collapse() {
    this.isNavbarCollapsed = true;
  }
}
