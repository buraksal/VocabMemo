import { Component } from '@angular/core';
import { Language } from './language.model';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  languages: Language[] = [];
  lang: Language = new Language('',[],[]);

  alreadyAdded = false;
  isLimitReached = false;

  title = 'vocab-memo';

  constructor(private titleService:Title) {
    this.titleService.setTitle("Vocabulary Memorization");
  }

  addNewLang(newLang: string){
    this.lang = new Language(newLang, [], []);
    this.alreadyAdded = this.addedBeforeControl(this.lang);
    if(!this.alreadyAdded){
      this.languages.push(this.lang);
    }     
    this.isLimitReached = this.limitReachedCheck();
  }

  addedBeforeControl(langToCheck: Language){
    for(var i = 0; i < this.languages.length; i++){
      if(this.lang.name == this.languages[i].name){
        return true;
      }
    }
    return false;
  }

  limitReachedCheck(){
    if(this.languages.length > 1){
      return false;
    }
    return true;

  }

}
