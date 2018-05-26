export class Servicio {
  id: number;
  name: string;
  description: string;
  tipo: number;
  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.description = obj && obj.description || null;
    this.tipo = obj && obj.tipo || null;
  }
}
