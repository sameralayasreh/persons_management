import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {


  currentUrl: string;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
  }


  ngOnInit() {
  }

  switchLanguage(language: string, $event) {
    this.translate.use(language);
    this.authService.setLanguage(language);
  }

}
