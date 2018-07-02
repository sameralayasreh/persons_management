import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Person } from '../vo/person';


@Injectable()
export class PersonService {

  persons: FirebaseListObservable<Person[]>;
  person: FirebaseObjectObservable<Person>;

  constructor(public db: AngularFireDatabase) {
    this.persons = this.db.list('/persons') as FirebaseListObservable<Person[]>;
    console.log(this.persons);
  }


  getPersons() {
    console.log(this.persons);
    return this.persons;
  }

  newPerson(person: Person) {
    this.persons.push(person);
  }

  getPersonDetail(id: string) {
    this.person = this.db.object('/persons/' + id) as FirebaseObjectObservable<Person>;
    return this.person;
  }

  updatePerson (id: string, person: Person) {
    this.persons.update(id, person);
  }

  deletePerson(id: string) {
    this.persons.remove(id);
  }

}
