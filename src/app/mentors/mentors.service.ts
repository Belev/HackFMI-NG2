import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth/authHttp.service';
import { ApiUrlsService } from '../core/apiUrls.service';


@Injectable()
export class MentorsService {
  constructor(private _authHttp: AuthHttp, private _apiUrlsService: ApiUrlsService) { }

  getMentors():Observable<any> {
    return this._authHttp.get(this._apiUrlsService.membersPublicListUrl)
                          .map(res => res.json())
  }
}