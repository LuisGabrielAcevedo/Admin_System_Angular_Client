import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MARRIED } from '@app/constants/marital-status.constants';
import { Customer } from '@app/proposal/api';
import { Spouse } from '@app/proposal/api/proposal';
import { ToastService } from '@app/common/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastType } from '@app/common/toast/toast.models';
import { CopyClipboardDirective } from '../../../shared/directives/copy-clipboard.directive';

@Component({
  selector: 'app-legends',
  templateUrl: './legends.component.html',
  styleUrls: ['./legends.component.scss']
})
export class LegendsComponent implements OnChanges, AfterViewInit {
  @Input() owner: Customer;
  @Input() coOwner: Customer;

  @ViewChild('legends')
  public legends: ElementRef;

  public clipboardPayload: string;

  public ownerSpouse: Spouse;
  public coOwnerSpouse: Spouse;
  public coOwnerIsSpouse: boolean = false;
  public coOwnerHasSpouse: boolean = false;
  public ownerSpouseAge: number;
  public coOwnerAge: number;
  public coOwnerSpouseAge: number;

  constructor(
    private toastService: ToastService,
    private translate: TranslateService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.generatePayload();
    }, 0);
  }

  ngOnChanges() {
    if (
      this.owner &&
      this.owner.maritalStatus &&
      this.owner.maritalStatus.id === MARRIED &&
      !this.owner.isMarriedWithCoOwner
    ) {
      this.ownerSpouse = this.owner.nonParticipantSpouse;
      this.ownerSpouseAge = this.calculateAge(this.ownerSpouse.birthDate);
    }
    if (
      this.coOwner &&
      this.coOwner.maritalStatus &&
      this.coOwner.maritalStatus.id === MARRIED &&
      !this.owner.isMarriedWithCoOwner
    ) {
      this.coOwnerHasSpouse = true;
      this.coOwnerSpouse = this.coOwner.nonParticipantSpouse;
      this.coOwnerSpouseAge = this.calculateAge(this.coOwnerSpouse.birthDate);
    }
    if (this.owner.isMarriedWithCoOwner) {
      this.coOwnerIsSpouse = true;
      this.coOwnerAge = this.calculateAge(this.coOwner.birthDate);
    }
    if (this.coOwner && !this.owner.isMarriedWithCoOwner) {
      this.coOwnerAge = this.calculateAge(this.coOwner.birthDate);
    }
  }

  calculateAge(dateStr: string): number {
    const date = new Date();
    date.setDate(+dateStr.substring(0, 2));
    date.setMonth(+dateStr.substring(2, 4));
    date.setFullYear(+dateStr.substring(4, 8));
    if (date) {
      let timeDiff = Math.abs(Date.now() - date.getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }

  generatePayload(): void {
    const items = this.legends.nativeElement.children;
    let payload = '';
    for (const item of items) {
      if (item.className.indexOf('legend__item-body') >= 0) {
        payload += item.innerText;
        payload += '\n\n';
      }
    }
    this.clipboardPayload = payload;
  }

  public isCopied(isCopied: boolean) {
    if (!isCopied) return;
    this.toastService.add(
      this.translate.instant('@Legends Copied to the clipboard'),
      ToastType.info
    );
  }
}
