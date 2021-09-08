import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Language } from '../language.model';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css']
})
export class MiddleComponent implements OnInit {
  @Output() newLangEvent = new EventEmitter<string>();
  
  @Input() langs: Language[] = [];
  @Input() alreadyExist: boolean = false;
  @Input() limitReached: boolean = false;
  @Output() clicked='';

  maxSizeReached: boolean = false;
  validInput: boolean = false;
  lengthCheck: boolean = false;
  nativeSelected: boolean = false;
  selectedNativeLang: Language = new Language('',[], []);
  foreignSelected: boolean = false;
  selectedForeignLangs: Language[] = [];
  alreadySelected: boolean = false;
  newLang: string = '';

  constructor() { }

  ngOnInit(): void {
    this.limitReached = false;
    this.validInput = true;
  }

  addNewLang(newLang: string) {
    this.validInput = this.isValidControl(newLang);
    this.lengthCheck = this.lengthControl(newLang);
    if(this.validInput && !this.lengthCheck){
      this.newLangEvent.emit(newLang);
    }
    this.checkLangsSize();
    this.newLang = '';
  }

  isValidControl(newLang: string) {
    if(/^[a-zA-Z]+$/.test(newLang)){
      return true;
    }
    return false;
  }

  lengthControl(stringToCheck: string){
    if(stringToCheck.length < 3){
      return true;
    } else{
      return false;
    }
  }

  onTestStart(){
    if(this.nativeSelected && this.selectedForeignLangs.length > 0){
      this.clicked = 'true';
    }  
    
  }

  checkLangsSize(){
    if(this.langs.length == 4){
      this.maxSizeReached = true;
    }
  }

  deleteLang(index: number){
    if(this.langs[index].name == this.selectedNativeLang.name){
      this.nativeSelected= false;
      this.selectedNativeLang = new Language('',[],[]);
    }
    if(this.selectedForeignLangs.includes(this.langs[index])){
      this.selectedForeignLangs.splice(this.selectedForeignLangs.indexOf(this.langs[index]),1);
      if(this.selectedForeignLangs.length == 0){
        this.foreignSelected = false;
      }
    }
    this.langs.splice(index,1);
    
  }

  selectNativeLang(index: number){
    this.alreadySelected = false;
    if(this.selectedForeignLangs.includes(this.langs[index])){
      this.alreadySelected = true;
      return;
    }
    this.selectedNativeLang = this.langs[index];
    this.nativeSelected = true;
  }

  selectForeignLang(index: number){
    this.alreadySelected = false;
    if(this.langs[index] == this.selectedNativeLang){
      this.alreadySelected = true;
      return;
    }
    this.selectedForeignLangs.push(this.langs[index]);
    this.foreignSelected = true;
  }

}
