import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'person-detail/:id', component: PersonDetailComponent},
    {path: 'add-person', component: AddPersonComponent},
    {path: 'edit-person/:id', component: EditPersonComponent},
    {path: '**', component: PageNotFoundComponent}
];

