import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }


  setLanguage(lang) {
    localStorage.setItem('lang', lang);
  }

  getLanguage() {
    return localStorage.getItem('lang');
  }

}
