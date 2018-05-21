import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JoinclubAuthService } from '../../../joinclub-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private joinclubAuthService: JoinclubAuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  closeSession() {
    this.joinclubAuthService.signOut();
    this._router.navigate(['/']);
  }

}
