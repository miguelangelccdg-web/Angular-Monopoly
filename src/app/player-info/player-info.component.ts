import { Component, Input } from '@angular/core';

interface Player {
  name: string;
  isTurn: boolean;
  position: number;
  balance: number;
  properties: Property[];
}

interface Property {
  name: string;
  cost: number;
  owner: Player | null;
}

@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss']
})
export class PlayerInfoComponent {
  @Input() players: Player[] = [];
}
