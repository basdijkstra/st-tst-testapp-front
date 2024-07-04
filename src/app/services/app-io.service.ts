import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DelaUserModel } from '../shared/models/dela-user';
import { ApiConnectorService } from './api-connector.service';

@Injectable({
  providedIn: 'root',
})
export class AppIoService {
  private readonly baseUrl: string = environment.host + '/api/v1/DelaUser';

  constructor(private apiConnectorService: ApiConnectorService) {}

  getDelaUserData(): Observable<DelaUserModel[]> {
    return this.apiConnectorService.getData<DelaUserModel[]>(`${this.baseUrl}`);
  }

  getDelaUser(id: string): Observable<DelaUserModel> {
    return this.apiConnectorService.getData<DelaUserModel>(
      `${this.baseUrl}` + '/' + id
    );
  }

  deleteDelaUser(id: number) {
    return this.apiConnectorService.getData<string>(
      `${this.baseUrl}` + '/delete/' + id
    );
  }

  saveDelaUserData(delaUser: DelaUserModel) {
    this.apiConnectorService
      .postData<DelaUserModel>(`${this.baseUrl}`, delaUser)
      .subscribe((response: any) => {
        if (response !== null) console.log(response);
      });
  }
}
