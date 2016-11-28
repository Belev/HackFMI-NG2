import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth/authHttp.service';
import { ApiUrlsService } from '../core/apiUrls.service';
import { HandleHttpService } from '../core/handleHttp.service';

import { CompetitorInfoForList } from '../core/core.models';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class CompetitorsService {
  constructor(private _authHttp: AuthHttp,
              private _handleHttp: HandleHttpService,
              private _apiUrlsService: ApiUrlsService) { }

  getAllCompetitorsInfo():Observable<CompetitorInfoForList[]> {
    return this._authHttp.get(this._apiUrlsService.competitorsInfoUrl)
                         .map(res => <CompetitorInfoForList[]>res.json())
                         .catch(err => this._handleHttp.handleError(err));
  }
}
