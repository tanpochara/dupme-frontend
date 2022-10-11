export interface Rooms {
  [key: string]: Room;
}

export interface Players {
  [key: string]: Player;
}

export interface Room {
  name: string;
  bet: string;
  players: Player[];
  isFull: boolean;
  currentRound: number;
}

export interface Player {
  id: string;
  isReady: boolean;
  currentRoom: string;
  points: number;
  name: string;
}

export interface GameParams {
  playerPlaying: Player;
  round: number;
  time: number;
}
