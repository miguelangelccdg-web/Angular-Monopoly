import { Component, Output, EventEmitter } from '@angular/core';

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
  rent: number; // Costo de alquiler
  owner: Player | null;
}

interface Card {
  text: string;
  effect: (player: Player) => void;
}

const chanceCards: Card[] = [
  { text: 'Avanza a la casilla de Go.', effect: (player: Player) => { player.position = 0; } },
  { text: 'Avanza a la casilla de Reading Railroad.', effect: (player: Player) => { player.position = 5; } },
  { text: 'Retrocede 3 espacios.', effect: (player: Player) => { player.position = (player.position - 3 + 40) % 40; } },
  // Agrega más cartas de Suerte aquí
];

const communityChestCards: Card[] = [
  { text: 'Recibe $200 por herencia.', effect: (player: Player) => { player.balance += 200; } },
  { text: 'Paga $50 de multa.', effect: (player: Player) => { player.balance -= 50; } },
  { text: 'Recibe $100 por impuestos devueltos.', effect: (player: Player) => { player.balance += 100; } },
  // Agrega más cartas de Caja de Comunidad aquí
];

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent {
  @Output() turnChanged = new EventEmitter<string>();

  diceResult: number = 0;
  currentPlayer: Player | null = null;

  players: Player[] = [
    { name: 'Player 1', isTurn: true, position: 0, balance: 1500, properties: [] },
    { name: 'Player 2', isTurn: false, position: 0, balance: 1500, properties: [] }
  ];

  properties: Property[] = [
    { name: 'Mediterranean Avenue', cost: 60, rent: 2, owner: null },
    { name: 'Baltic Avenue', cost: 60, rent: 4, owner: null },
    { name: 'Reading Railroad', cost: 200, rent: 25, owner: null },
    { name: 'Oriental Avenue', cost: 100, rent: 6, owner: null },
    { name: 'Vermont Avenue', cost: 100, rent: 6, owner: null },
    { name: 'Connecticut Avenue', cost: 120, rent: 8, owner: null },
    { name: 'St. Charles Place', cost: 140, rent: 10, owner: null },
    { name: 'Electric Company', cost: 150, rent: 25, owner: null },
    { name: 'States Avenue', cost: 140, rent: 10, owner: null },
    { name: 'Virginia Avenue', cost: 160, rent: 12, owner: null },
    { name: 'Pennsylvania Railroad', cost: 200, rent: 25, owner: null },
    { name: 'St. James Place', cost: 180, rent: 14, owner: null },
    { name: 'Tennessee Avenue', cost: 180, rent: 14, owner: null },
    { name: 'New York Avenue', cost: 200, rent: 16, owner: null },
    { name: 'Kentucky Avenue', cost: 220, rent: 18, owner: null },
    { name: 'Indiana Avenue', cost: 220, rent: 18, owner: null },
    { name: 'Illinois Avenue', cost: 240, rent: 20, owner: null },
    { name: 'B&O Railroad', cost: 200, rent: 25, owner: null },
    { name: 'Atlantic Avenue', cost: 260, rent: 22, owner: null },
    { name: 'Ventnor Avenue', cost: 260, rent: 22, owner: null },
    { name: 'Water Works', cost: 150, rent: 25, owner: null },
    { name: 'Marvin Gardens', cost: 280, rent: 24, owner: null },
    { name: 'Pacific Avenue', cost: 300, rent: 26, owner: null },
    { name: 'North Carolina Avenue', cost: 300, rent: 26, owner: null },
    { name: 'Pennsylvania Avenue', cost: 320, rent: 28, owner: null },
    { name: 'Short Line', cost: 200, rent: 25, owner: null },
    { name: 'Park Place', cost: 350, rent: 35, owner: null },
    { name: 'Boardwalk', cost: 400, rent: 50, owner: null }
  ];
  

  positions: { name: string, top: number, left: number, effect?: (player: Player) => void, property?: Property, isChance?: boolean, isCommunityChest?: boolean }[] = [
    { name: 'Go', top: 105, left: 72, effect: (player: Player) => player.balance += 200 },
    { name: 'Mediterranean Avenue', top: 105, left: 67, property: this.properties[0] },
    { name: 'Community Chest', top: 105, left: 62, isCommunityChest: true },
    { name: 'Baltic Avenue', top: 105, left: 57, property: this.properties[1] },
    { name: 'Income Tax', top: 105, left: 53, effect: (player: Player) => player.balance -= 200 },
    { name: 'Reading Railroad', top: 105, left: 49, property: this.properties[2] },
    { name: 'Oriental Avenue', top: 105, left: 45, property: this.properties[3] },
    { name: 'Chance', top: 105, left: 40, isChance: true },
    { name: 'Vermont Avenue', top: 105, left: 36, property: this.properties[4] },
    { name: 'Connecticut Avenue', top: 105, left: 31, property: this.properties[5] },
    { name: 'Jail', top: 96, left: 27 },
    { name: 'St. Charles Place', top: 87, left: 27, property: this.properties[6] },
    { name: 'Electric Company', top: 78, left: 27, property: this.properties[7] },
    { name: 'States Avenue', top: 69, left: 27, property: this.properties[8] },
    { name: 'Virginia Avenue', top: 60, left: 27, property: this.properties[9] },
    { name: 'Pennsylvania Railroad', top: 51, left: 27, property: this.properties[10] },
    { name: 'St. James Place', top: 42, left: 27, property: this.properties[11] },
    { name: 'Community Chest', top: 33, left: 27, isCommunityChest: true },
    { name: 'Tennessee Avenue', top: 24, left: 27, property: this.properties[12] },
    { name: 'New York Avenue', top: 15, left: 27, property: this.properties[13] },
    { name: 'Free Parking', top: 15, left: 31 },
    { name: 'Kentucky Avenue', top: 15, left: 36, property: this.properties[14] },
    { name: 'Chance', top: 15, left: 40, isChance: true },
    { name: 'Indiana Avenue', top: 15, left: 45, property: this.properties[15] },
    { name: 'Illinois Avenue', top: 15, left: 49, property: this.properties[16] },
    { name: 'B&O Railroad', top: 15, left: 53, property: this.properties[17] },
    { name: 'Atlantic Avenue', top: 15, left: 57, property: this.properties[18] },
    { name: 'Ventnor Avenue', top: 15, left: 62, property: this.properties[19] },
    { name: 'Water Works', top: 15, left: 67, property: this.properties[20] },
    { name: 'Marvin Gardens', top: 15, left: 72, property: this.properties[21] },
    { name: 'Go to Jail', top: 24, left: 72 },
    { name: 'Pacific Avenue', top: 33, left: 72, property: this.properties[22] },
    { name: 'North Carolina Avenue', top: 42, left: 72, property: this.properties[23] },
    { name: 'Community Chest', top: 51, left: 72, isCommunityChest: true },
    { name: 'Pennsylvania Avenue', top: 60, left: 72, property: this.properties[24] },
    { name: 'Short Line', top: 69, left: 72, property: this.properties[25] },
    { name: 'Chance', top: 78, left: 72, isChance: true },
    { name: 'Park Place', top: 87, left: 72, property: this.properties[26] },
    { name: 'Luxury Tax', top: 96, left: 72 },
    { name: 'Boardwalk', top: 105, left: 72, property: this.properties[27] }
  ];
  

  constructor() {
    this.currentPlayer = this.players.find(player => player.isTurn) || null;
  }

  rollDice(): void {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    this.diceResult = diceRoll;

    if (this.currentPlayer) {
      this.currentPlayer.position = (this.currentPlayer.position + diceRoll) % this.positions.length;

      const currentPosition = this.positions[this.currentPlayer.position];
      if (currentPosition.effect) {
        currentPosition.effect(this.currentPlayer);
      } else if (currentPosition.property) {
        const property = currentPosition.property;
        if (property.owner && property.owner !== this.currentPlayer) {
          this.payRent(property);
        } else if (!property.owner) {
          this.promptPropertyPurchase(property);
        } else {
          this.endTurn();
        }
      } else if (currentPosition.isChance) {
        this.drawChanceCard();
      } else if (currentPosition.isCommunityChest) {
        this.drawCommunityChestCard();
      } else {
        this.endTurn();
      }
    }
  }
  drawChanceCard(): void {
    const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
    alert(`Carta de Suerte: ${card.text}`);
    card.effect(this.currentPlayer!);
    this.endTurn();
  }

  drawCommunityChestCard(): void {
    const card = communityChestCards[Math.floor(Math.random() * communityChestCards.length)];
    alert(`Carta de Caja de Comunidad: ${card.text}`);
    card.effect(this.currentPlayer!);
    this.endTurn();
  }

  promptPropertyPurchase(property: Property): void {
    if (confirm(`¿Quieres comprar ${property.name} por $${property.cost}?`)) {
      if (this.currentPlayer && this.currentPlayer.balance >= property.cost) {
        this.currentPlayer.balance -= property.cost;
        property.owner = this.currentPlayer;
        this.currentPlayer.properties.push(property);
      } else {
        alert('No tienes suficiente dinero para comprar esta propiedad.');
      }
    }
    this.endTurn();
  }
  
  payRent(property: Property): void {
    if (this.currentPlayer && property.owner) {
      const rent = property.rent;
      if (this.currentPlayer.balance >= rent) {
        this.currentPlayer.balance -= rent;
        property.owner.balance += rent;
        alert(`${this.currentPlayer.name} ha pagado $${rent} de alquiler a ${property.owner.name}`);
      } else {
        alert('No tienes suficiente dinero para pagar el alquiler.');
        // Puedes añadir lógica adicional para el caso en que el jugador no pueda pagar
      }
    }
    this.endTurn();
  }
  

  

  endTurn(): void {
    if (this.currentPlayer) {
      this.currentPlayer.isTurn = false;
      const nextPlayerIndex = (this.players.findIndex(player => player === this.currentPlayer) + 1) % this.players.length;
      this.currentPlayer = this.players[nextPlayerIndex];
      this.currentPlayer.isTurn = true;
      this.turnChanged.emit(this.currentPlayer.name);
    }
  }

  getPieceStyle(player: Player): { top: string, left: string } {
    const position = this.positions[player.position];
    return {
      top: `${position.top}%`,
      left: `${position.left}%`
    };
  }
}
