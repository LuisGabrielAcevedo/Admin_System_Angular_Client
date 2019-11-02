export interface Gestor {
  idSellingPoint: number;
  name: string;
  concierges: Concierge[];
}

interface Concierge {
  idConcierges: number;
  name: string;
  city: string;
}
