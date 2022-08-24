import { AccountService } from './../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isCollapsed = true;

  constructor(public accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user/login');
  }

  showMenu(): boolean {
    return this.router.url != '/user/login';
  }
}
