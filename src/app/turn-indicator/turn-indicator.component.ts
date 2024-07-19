import { Component, Input } from '@angular/core';

interface Player {
  name: string;
  isTurn: boolean;
}

@Component({
  selector: 'app-turn-indicator',
  templateUrl: './turn-indicator.component.html',
  styleUrls: ['./turn-indicator.component.scss']
})
export class TurnIndicatorComponent {
  @Input() players: Player[] = [];
  
  getCurrentPlayerName(): string {
    const currentPlayer = this.players.find(player => player.isTurn);
    return currentPlayer ? currentPlayer.name : '';
  }
}
