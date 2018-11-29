import { Component, OnInit } from '@angular/core';

import { AfService } from '../../services/af.service';
import { User } from '../../services/user';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  user: User;
  userSince: string;

  constructor(
    public afService: AfService,
  ) {}

  ngOnInit() {
    this.afService.user$.subscribe( value => {
      this.user = value;
      this.userSince = this.getUserSince();
    });
  }

  private getUserSince() {
    var since = new Date(this.user.since);
    var sinceStr = since.toString().split(" ");
    return  sinceStr[0] + ' ' +
            sinceStr[2] + ' of ' +
            sinceStr[1] + ', ' +
            sinceStr[3]

  }

}
