import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetChecklistDTO } from '../models/api/get.checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  constructor(private http: HttpClient) {}

  public getChecklist(idProposal: number): Observable<GetChecklistDTO> {
    return this.http.get<GetChecklistDTO>(
      `${environment.modules.checklist}proposal/${idProposal}/checklist/alldocuments`
    );
  }
}
