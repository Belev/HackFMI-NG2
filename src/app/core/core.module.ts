import { NgModule } from '@angular/core';

import { MeService } from './me.service';
import { LogoutService } from './logout.service';
import { MeSeasonResolver } from './me.resolver';
import { SeasonService } from './season.service';
import { SkillsService } from './skills.service';
import { SkillsResolver } from './skills.resolver';
import { ApiUrlsService } from './api-urls.service';
import { SeasonResolver } from './season.resolver';
import { UrlParamsService } from './url-params.service';
import { WebSocketService } from './websocket.service';
import { HandleHttpService } from './handle-http.service';
import { DefaultHttpService } from './default-http.service';
import { SeasonCompetitorInfoService } from './season-competitor-info.service';


@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    MeService,
    LogoutService,
    SkillsService,
    SeasonService,
    ApiUrlsService,
    SeasonResolver,
    UrlParamsService,
    WebSocketService,
    HandleHttpService,
    DefaultHttpService,
    SeasonCompetitorInfoService,

    MeSeasonResolver,
    SkillsResolver,
  ]
})
export class CoreModule { }