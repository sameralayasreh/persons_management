import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Person } from '../../vo/Person';
import { PersonService } from '../../services/person.service';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  id: string;
  person: Person;

  disableBalanceOnEdit = true;

  constructor(
    public personService: PersonService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessage: FlashMessagesService,
    public translate: TranslateService,
    public authSerivce: AuthService
  ) {
    translate.use(authSerivce.getLanguage());
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.personService.getPersonDetail(this.id).subscribe(person => {
      this.person = person;
    });
  }


  onSubmit({value, valid}: {value: Person, valid: boolean}) {
    // if (this.disableBalanceOnAdd) {
    //   value.balance = 0;
    // }
    if (!valid) {
      this.flashMessage.show('Please fill value in red warning!', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/edit-person' + this.id]);
    } else {
      this.personService.updatePerson(this.id, value);
      this.router.navigate(['/person-detail/' + this.id]);
      this.flashMessage.show('Person added successfully', { cssClass: 'alert-success', timeout: 4000 });
    }
  }

}
