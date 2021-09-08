import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../language.model';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.scss']
})
export class ScoreDisplayComponent implements OnInit {

  @Input() selectedNativeLang: Language = new Language('',[],[]);
  @Input() answers: string[][] = [];
  @Input() askOrder: number[] = [];
  @Input() askedWords: string[] = [];
  @Input() selectedForeignLangs: Language[] = [];

  percentage: number = 0;
  right: number = 0;
  wrong: number = 0;
  returnClicked: boolean = false;

  resultArrayWhole: boolean[][] = [];
  resultArrayTranslation: boolean[] = [];
  resultArrayLanguage: boolean[] = [];

  constructor() { }

  ngOnInit(): void {
    this.checkResults();
  }
  
  checkResults(){
    for(var i = 0; i < this.selectedNativeLang.natWords.length; i++){
      for(var j = 0; j < this.selectedForeignLangs.length; j++){
        if(this.answers[i][j] == this.selectedNativeLang.forWords[this.askOrder[i]][j]){
          this.resultArrayTranslation.push(true);
          this.right++;
        }else {
          this.resultArrayTranslation.push(false);
          this.wrong++;
        }
      }
      this.resultArrayWhole.push(this.resultArrayTranslation);
      if(this.resultArrayTranslation.includes(false)){
        this.resultArrayLanguage.push(false);
      } else {
        this.resultArrayLanguage.push(true);
      }

      this.resultArrayTranslation = [];
    }
    Math.floor(this.percentage = (this.right)/(this.right+this.wrong)*100);
  }

  onReturnButton(){
    this.returnClicked = true;
  }

}
