import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public authSerivce: AuthService
  ) {
    translate.use(authSerivce.getLanguage());
   }

  ngOnInit() {
  }

}
