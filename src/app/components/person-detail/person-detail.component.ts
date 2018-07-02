import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Person } from '../../vo/Person';
import { PersonService } from '../../services/person.service';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  id: string;
  person: Person;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    public personService: PersonService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public translate: TranslateService,
    public authSerivce: AuthService
  ) {
    translate.use(authSerivce.getLanguage());
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.personService.getPersonDetail(this.id).subscribe(person => {
      if (person.balance > 0) {
        this.hasBalance = true;
      } else {
        this.hasBalance = false;
      }
      this.person = person;
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete client with id' + id + '?')) {
      this.personService.deletePerson(this.id);
      this.router.navigate(['/']);
      this.flashMessagesService.show('Delete Success', {cssClass: 'alert-success', timeout: 3000});
    }
  }

  updateBalance(id: string) {
    this.personService.updatePerson(this.id, this.person);
    this.flashMessagesService.show('Update Balance Success', {cssClass: 'alert-success', timeout: 3000});
    // this.router.navigate(['/client-detail/' + this.id]);
    this.showBalanceUpdateInput = false;
  }

}
