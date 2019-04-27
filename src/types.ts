export class Element {
  name: string;
  id: number;
  attrs: Record<string, string[]>;
  constructor(name: string, id: number, attrs: Record<string, string[]>) {
    this.name = name;
    this.id = id;
    this.attrs = attrs;
  }
}

export class Stats {
  matches: number;
  rounds: number;
  matchScoreBeforeUmaTenfold: number;
  matchScoreBeforeUmaTenfoldSquared: number;
  matchScoreAfterUmaRounded: number;
  matchScoreAfterUmaRoundedSquared: number;
  constructor() {
    this.matches = 0;
    this.rounds = 0;
    this.matchScoreBeforeUmaTenfold = 0;
    this.matchScoreBeforeUmaTenfoldSquared = 0;
    this.matchScoreAfterUmaRounded = 0;
    this.matchScoreAfterUmaRoundedSquared = 0;
  }
}

export type PlayerStats = Record<string, Stats>;
