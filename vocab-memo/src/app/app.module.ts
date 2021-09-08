import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MiddleComponent } from './middle/middle.component';
import { GameSetUpComponent } from './game-set-up/game-set-up.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreDisplayComponent } from './score-display/score-display.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MiddleComponent,
    GameSetUpComponent,
    QuizComponent,
    ScoreDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
