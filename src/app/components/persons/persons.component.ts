import { PersonService } from '../../services/person.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../../vo/person';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  totalBalance: number;
  dtTrigger: Subject<any> = new Subject();
  lang: string;

  constructor(
    public prService: PersonService,
    public translate: TranslateService,
    public authSerivce: AuthService
  ) {
    translate.use(authSerivce.getLanguage());
    this.lang = authSerivce.getLanguage();
    this.getPersons();
  }

  ngOnInit() {
    if (this.lang === 'ar') {
      this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url: 'http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Arabic.json'
        }
      };
    } else {
      this.dtOptions = {
        pagingType: 'full_numbers',
        language: {
          url: 'http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/English.json'
        }
      };
    }
  }

  getPersons() {
    this.prService.getPersons().subscribe(persons => {
      this.persons = persons;
      this.setTotalBalance();
      this.dtTrigger.next();
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
  }

  setTotalBalance() {
    let total = 0;
    for (let i = 0; i < this.persons.length; i++) {
      total += parseFloat(this.persons[i].balance + '');
    }
    this.totalBalance =  total;
  }

}
