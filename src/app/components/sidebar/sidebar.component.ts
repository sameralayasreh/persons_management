import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public authSerivce: AuthService
  ) {
    translate.use(authSerivce.getLanguage());
   }

  ngOnInit() {
  }

}
