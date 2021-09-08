import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../language.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() selectedNativeLang: Language = new Language('',[],[]);
  @Input() selectedForeignLangs: Language[] = [];

  isFinished: boolean = false;
  questionNum: number = 1;
  totalQuestionNum: number = 0;
  progressBarPercentage: number = 0;
  randomNum: number = 0;
  askOrder: number[] = [];
  quizWord: string = '';
  foreignGuesses: string[] = [];
  askedWords: string[] = [];
  answers: string[][] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.totalQuestionNum = this.selectedNativeLang.natWords.length;
    this.calculatePercentage();
    this.setUpFirstRun();
  }

  setQuizWord(){
    while(this.askedWords.includes(this.quizWord)){
      this.randomNum = Math.floor(Math.random() * (this.selectedNativeLang.natWords.length));
      this.quizWord = this.selectedNativeLang.natWords[this.randomNum];
    }
    this.askOrder.push(this.randomNum);
    this.askedWords.push(this.quizWord);
  }

  setUpFirstRun(){
    this.randomNum = Math.floor(Math.random() * (this.selectedNativeLang.natWords.length));
    this.quizWord = this.selectedNativeLang.natWords[this.randomNum];
    this.askedWords.push(this.quizWord);
    this.askOrder.push(this.randomNum);
  }
  calculatePercentage(){
    this.progressBarPercentage = this.questionNum / this.totalQuestionNum * 100;
  }

  onSubmitAnswer(){
    this.answers.push(this.foreignGuesses);
    this.foreignGuesses = [];
    if(this.questionNum == this.totalQuestionNum){
      this.isFinished = true;
      return;
    }
    this.setQuizWord();
    this.questionNum++;
    this.calculatePercentage();

    
  }
  

}
