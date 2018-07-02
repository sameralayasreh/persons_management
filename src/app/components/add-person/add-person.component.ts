import { Router } from '@angular/router';
import { Person } from '../../vo/person';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { PersonService } from '../../services/person.service';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person: Person = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd = false;

  constructor(
    public flashMessage: FlashMessagesService,
    public personService: PersonService,
    public router: Router,
    public translate: TranslateService,
    public authSerivce: AuthService
  ) {
    translate.use(authSerivce.getLanguage());
  }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Person, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessage.show('Please fill value in red warning!', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/add-person']);
    } else {
      this.personService.newPerson(value);
      this.router.navigate(['/']);
      this.flashMessage.show('Person added successfully', { cssClass: 'alert-success', timeout: 4000 });
    }
  }

}
