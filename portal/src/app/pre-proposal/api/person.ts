export interface Person {
  number: number;
  description: string;
}

export interface Persons {
  owner: Person[];
  coOwner: Person[];
}

export interface ParsedPerson extends Person {
  name?: string;
  lastName?: string;
}
