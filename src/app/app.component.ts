import { Component } from '@angular/core';

interface Player {
  name: string;
  isTurn: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  players: Player[] = [
    { name: 'Player 1', isTurn: false },
    { name: 'Player 2', isTurn: false },
    // Agrega más jugadores según sea necesario
  ];

  currentPlayerIndex: number = 0;

  constructor() {}

  // Método para cambiar al siguiente jugador
  nextTurn(): void {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.resetTurns(); // Reinicia los turnos de todos los jugadores
    // Activa el turno del jugador actual
    this.players[this.currentPlayerIndex].isTurn = true;
  }

  // Método para reiniciar los turnos de todos los jugadores
  resetTurns(): void {
    this.players.forEach(player => player.isTurn = false);
  }
}
