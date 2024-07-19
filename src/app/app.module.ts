import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { DiceComponent } from './dice/dice.component';
import { TurnIndicatorComponent } from './turn-indicator/turn-indicator.component';
import { PlayerBalanceComponent } from './player-balance/player-balance.component';
import { PlayerInfoComponent } from './player-info/player-info.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DiceComponent,
    TurnIndicatorComponent,
    PlayerBalanceComponent,
    PlayerInfoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
