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
  roundAgari: number;
  roundAgariScoreTenfold: number;
  roundAgariScoreTenfoldSquared: number;
  roundFurikomi: number;
  roundFurikomiScoreTenfold: number;
  roundFurikomiScoreTenfoldSquared: number;
  roundRiichi: number;
  roundCalled: number;
  roundCalls: number;
  roundCallsSquared: number;
  constructor() {
    this.matches = 0;
    this.rounds = 0;
    this.matchScoreBeforeUmaTenfold = 0;
    this.matchScoreBeforeUmaTenfoldSquared = 0;
    this.matchScoreAfterUmaRounded = 0;
    this.matchScoreAfterUmaRoundedSquared = 0;
    this.roundAgari = 0;
    this.roundAgariScoreTenfold = 0;
    this.roundAgariScoreTenfoldSquared = 0;
    this.roundFurikomi = 0;
    this.roundFurikomiScoreTenfold = 0;
    this.roundFurikomiScoreTenfoldSquared = 0;
    this.roundRiichi = 0;
    this.roundCalled = 0;
    this.roundCalls = 0;
    this.roundCallsSquared = 0;
  }
}

export type PlayerStats = Record<string, Stats>;
