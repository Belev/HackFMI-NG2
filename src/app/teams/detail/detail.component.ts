import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Me } from '../../core/core.models';
import { MeService } from '../../core/me/me.service';
import { InvitesService } from '../../invites/invites.service';

import { PrivateTeam } from '../teams.models';
import { TeamsService } from '../teams.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  meDetails: Me;
  teamDetails: PrivateTeam;
  inviteInfo = {competitor_email: ''}
  roomNumber: number|string;
  roomFormVisible:boolean = false;

  constructor(private _router: Router,
              private _meService: MeService,
              private _route: ActivatedRoute,
              private _teamsService: TeamsService,
              private _toastService: ToastsManager,
              private _invitesService: InvitesService) { }

  ngOnInit() {
    this._route.data.subscribe((data: {meDetails:Me}) => this.meDetails = data.meDetails);
    this._route.data.subscribe((data: {teamDetails:PrivateTeam}) => {
                                                                     this.teamDetails = data.teamDetails;
                                                                     this.setRoomNumber(data.teamDetails)
                                                                    });
  }

  setRoomNumber(team: PrivateTeam):void {
    if (!!team.updated_room){
      this.roomNumber = team.updated_room;
    } else {
      this.roomNumber = team.room;
    }
  }

  changeRoomFormIsVisible(): void {
    this.roomFormVisible = !this.roomFormVisible;
  }

  competitorInTeam():boolean {
    if (!this.meDetails.team) return false;

    return this.meDetails.team.id == this.teamDetails.id;
  }

  isTeamLeader():boolean {return this.meDetails.competitor_info.id == this.teamDetails.leader_id;}

  updateTeam():void {this._router.navigate(['teams', this.teamDetails.id, 'edit']);}

  leaveTeam(): void {
    var leave:boolean = confirm("Сигурен ли си, че искаш да напуснеш отбора?");

    if (this.competitorInTeam() && leave) {
      var teamMembershipId = this.meDetails.team_membership_id;

      this._teamsService.leaveTeam(teamMembershipId)
                        .subscribe(data => this._handleSuccessfulTeamLeaving());
      }
  }

  inviteMember():void {
    this._invitesService.inviteMember(this.inviteInfo)
                        .subscribe(data => this._handleSuccessfulInvitation());
  }

  changeRoom(): void {
    var teamId = this.teamDetails.id

    this._teamsService.editTeam(teamId, this.teamDetails)
                      .subscribe(data => this._handleSuccessfulChangeRoom(data));
  }

  private _handleSuccessfulChangeRoom(team: PrivateTeam) {
    this._router.navigate(['teams', team.id]);
    this._toastService.success('Your team is now located in room ' + this.teamDetails.updated_room + '.');
    this.roomNumber = this.teamDetails.updated_room;
    this.changeRoomFormIsVisible();
  }

  private _handleSuccessfulInvitation() {
    var email = this.inviteInfo.competitor_email;
    this.inviteInfo.competitor_email = '';
    this._toastService.success('Invitation email was sent to ' + email);
  }

  private _handleSuccessfulTeamLeaving() {
    this._meService.clearCurrentMeInfo();
    this._router.navigate(['teams']);
  }
}
