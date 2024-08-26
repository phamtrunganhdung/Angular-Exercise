import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { UserPage } from '../interface';
import { ListUserService } from '../service/list-user.service';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-user.component.html',
})
export class ListUserComponent {
  userPage!: UserPage | undefined;
  activePage: number = 1;
  columns: string[] = ['ID', 'First name', 'Last name', 'Email', 'Avatar'];

  constructor(private listUserService: ListUserService) {}
  ngOnInit(): void {
    this.listUserService
      .getListUserByPage(this.activePage)
      .subscribe((data: UserPage) => (this.userPage = data));
  }

  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
  isActivePage(page: number) {
    return this.userPage?.page == page;
  }
  changePage(page: number) {
    this.activePage = page;
    this.listUserService
      .getListUserByPage(this.activePage)
      .subscribe((data: UserPage) => (this.userPage = data));
  }
}
