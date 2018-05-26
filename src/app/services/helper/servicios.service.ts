import { Injectable } from '@angular/core';
import { Servicio } from 'app/services/class/servicio.class';
import { BehaviorSubject, Subject } from 'rxjs';

interface LocalServicio {
  servicios: Servicio[];
  filtro: number;
  total: number
}

@Injectable()
export class ServiciosService {

  currentFiltro: number;
  currentFiltroB: BehaviorSubject<number>;
  servicios: Servicio[];
  serviciosB: BehaviorSubject<Servicio[]>;
  total: number;
  totalB: BehaviorSubject<number>;
  id: Subject<number> = new Subject<number>();

  constructor() {
    this.init();
  }

  init(): void {
    let servicios = localStorage.getItem('servicios');
    if (!!servicios) {
      this.servicios = JSON.parse(servicios).servicios;
      this.serviciosB = new BehaviorSubject<Servicio[]>(this.servicios);
      this.currentFiltro = JSON.parse(servicios).filtro;
      this.currentFiltroB = new BehaviorSubject<number>(this.currentFiltro);
      this.total = JSON.parse(servicios).total;
      this.totalB = new BehaviorSubject<number>(this.total);
      this.getByFilter(this.getFiltro());
    } else {
      this.servicios = [];
      this.serviciosB = new BehaviorSubject<Servicio[]>(this.servicios);
      this.currentFiltro = null;
      this.currentFiltroB = new BehaviorSubject<number>(this.currentFiltro);
      this.total = 0;
      this.totalB = new BehaviorSubject<number>(this.total);
    }
  }

  get(): Servicio[] {
    return this.servicios;
  }

  getFiltro(): number {
    return this.currentFiltro;
  }

  getTotal(): number {
    return this.total;
  }

  getId(): Subject<number> {
    return this.id;
  }

  getServicioB(): BehaviorSubject<Servicio[]> {
    return this.serviciosB;
  }

  getFiltroB(): BehaviorSubject<number> {
    return this.currentFiltroB;
  }

  getTotalB(): BehaviorSubject<number> {
    return this.totalB;
  }

  add(servicio: Servicio): void {
    let servicios: Servicio[] = [...this.get(), servicio];
    let total = this.total + 1;
    this.set(servicios, total, this.getFiltro());
  }

  getById(id: number): Servicio {
    let servicios: Servicio[] = [...this.get()];
    let index = servicios.map((obj: Servicio) => obj.id).indexOf(id);
    let newObj: any = Object.assign({}, servicios[index]);
    return new Servicio(newObj);
  }

  getByFilter(id: number): void {
    let servicios: Servicio[] = [...this.get()];
    if (!!id) servicios = [...this.get()].filter((obj: Servicio) => obj.tipo === id);
    this.currentFiltro = id;
    this.getFiltroB().next(id);
    this.getServicioB().next(servicios);
    let newObj: LocalServicio = {
      servicios: this.get(),
      filtro: this.getFiltro(),
      total: this.getTotal()
    }
    localStorage.setItem('servicios', JSON.stringify(newObj));
  }

  update(servicio: Servicio): void {
    let servicios = [...this.get()];
    let index: number = servicios.map((obj: Servicio) => obj.id).indexOf(servicio.id);
    let beforeServicio: Servicio = servicios[index];
    let newServicios: Servicio[] = [...servicios.slice(0, index), servicio, ...servicios.slice(index + 1)];
    this.set(newServicios, this.total, this.getFiltro());
  }

  delete(id: number): void {
    let servicios: Servicio[] = [...this.get()];
    let index = servicios.map((obj: Servicio) => obj.id).indexOf(id);
    servicios.splice(index, 1);
    this.set([...servicios], this.total, this.getFiltro());
  }


  set(servicios: Servicio[], total: number, filtro: number): void {
    this.servicios = [...servicios];
    this.total = total;
    this.totalB.next(this.total);
    this.getByFilter(filtro);
  }

}
