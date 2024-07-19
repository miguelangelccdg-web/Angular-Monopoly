// player-balance.component.ts
import { Component, Input } from '@angular/core';

interface Player {
  name: string;
  balance: number;
}

@Component({
  selector: 'app-player-balance',
  templateUrl: './player-balance.component.html',
  styleUrls: ['./player-balance.component.scss']
})
export class PlayerBalanceComponent {
  @Input() players: Player[] = [];
}
