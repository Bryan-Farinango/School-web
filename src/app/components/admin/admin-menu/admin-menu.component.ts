import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class AdminMenuComponent implements OnInit {
  public subDashboard = false;
  public transporteDashboard = false;
  constructor() {}

  ngOnInit(): void {}
}
