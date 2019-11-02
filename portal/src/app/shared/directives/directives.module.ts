import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChassisMaskDirective } from './chassis-mask.directive';
import { DomainMaskDirective } from './domain-mask.directive';
import { EmailMaskDirective } from './email-mask.directive';
import { EngineMaskDirective } from './engine-mask.directive';
import { NameMaskDirective } from './name-mask.directive';
import { OnlyAlphanumericMaskDirective } from './only-alphanumeric-mask.directive';
import { OnlyNumbersMaskDirective } from './only-numbers-mask.directive';
import { RemoveCharBlurDirective } from './remove-char-blur.directive';
import { RemoveCharsDirective } from './remove-chars.directive';
import { StreetMaskDirective } from './street-mask.directive';
import { UppercaseMaskDirective } from './uppercase-mask.directive';
import { CopyClipboardDirective } from './copy-clipboard.directive';

@NgModule({
  declarations: [
    UppercaseMaskDirective,
    RemoveCharsDirective,
    NameMaskDirective,
    EmailMaskDirective,
    StreetMaskDirective,
    RemoveCharBlurDirective,
    OnlyNumbersMaskDirective,
    OnlyAlphanumericMaskDirective,
    ChassisMaskDirective,
    EngineMaskDirective,
    DomainMaskDirective,
    CopyClipboardDirective
  ],
  imports: [CommonModule],
  exports: [
    UppercaseMaskDirective,
    RemoveCharsDirective,
    NameMaskDirective,
    EmailMaskDirective,
    StreetMaskDirective,
    OnlyNumbersMaskDirective,
    OnlyAlphanumericMaskDirective,
    ChassisMaskDirective,
    EngineMaskDirective,
    DomainMaskDirective,
    RemoveCharBlurDirective,
    CopyClipboardDirective
  ]
})
export class DirectivesModule {}
