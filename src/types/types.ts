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

export type PlayerStats = Record<string, Record<string, number>>;
