export interface Rooms {
  [key: string]: Room;
}

export interface Room {
  name: string;
  bet: string;
  players: Player[];
  isFull: boolean;
}

export interface Player {
  id: string;
  isReady: boolean;
  currentRoom: string;
}
