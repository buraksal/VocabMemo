import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../language.model';

@Component({
  selector: 'app-game-set-up',
  templateUrl: './game-set-up.component.html',
  styleUrls: ['./game-set-up.component.css']
})
export class GameSetUpComponent implements OnInit {

  @Input() selectedForeignLangs: Language[] = [];
  @Input() selectedNativeLang: Language = new Language('',[],[]);

  clicked: boolean = false;
  validInputs: boolean = false;
  wordsAdded: boolean = false;
  iteration: number = 0;
  natWord: string ='';
  foreWords: string[] =[];
  
  constructor() { }

  ngOnInit(): void {
    this.validInputs = true;
    if(this.selectedNativeLang.natWords.length > 4){
      this.wordsAdded = true;
      this.iteration = this.selectedNativeLang.natWords.length;
    }
  }

  onSubmitWord(){
    this.validInputs = false;
    this.isValidInput();
    if(this.validInputs){
      this.selectedNativeLang.natWords.push(this.natWord);
      this.selectedNativeLang.forWords[this.iteration] = this.foreWords;
      this.iteration++;
      this.natWord = '';
      this.foreWords = [];
    }
    
    if(this.iteration > 4){
      this.wordsAdded = true;
    }
  }

  isValidInput(){
    this.validInputs = false;
    if(this.selectedForeignLangs.length == this.foreWords.length){
      if(this.isValidNative()){
        for(var i = 0; i < this.foreWords.length; i++){
          this.validInputs = false;
          if(/^[a-zA-Z]+$/.test(this.foreWords[i])){
            this.validInputs = true;
          } else {
            break;
          }
        }
      }
    }
  }
  
  isValidNative(): boolean{
    if(/^[a-zA-Z]+$/.test(this.natWord)){
      return true;
    }
    else 
      return false;
  }

  onGameStart(){
    this.clicked = true;
  }

  deleteWord(index: number){
    this.selectedNativeLang.natWords.splice(index,1);
    this.selectedNativeLang.forWords.splice(index,1);
  }
}
