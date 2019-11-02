import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContractListResponse } from '../../api/contract';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @Input() isPrePledge: boolean = false;
  @Input() contractsList: ContractListResponse;
  @Output() onContractDownload = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  documentDownload(selectedDocument) {
    this.onContractDownload.emit(selectedDocument);
  }
}
