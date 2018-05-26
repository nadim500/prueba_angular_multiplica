import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciosService } from 'app/services/helper/servicios.service';
import { Subscribable, Subscription } from 'rxjs';
import { TiposServicios, Tipo } from 'app/services/constants/tipos-servicios.constant';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})

export class FiltrosComponent implements OnInit, OnDestroy {

  subFiltro: Subscription;
  idFiltro: number;

  tipos: Tipo[] = [{ id: null, name: 'Todos' }, ...TiposServicios];

  constructor(
    private service: ServiciosService
  ) { }

  ngOnInit() {
    this.subFiltro = this.service.getFiltroB()
      .subscribe((res: number) => {
        this.idFiltro = res;
      }, (err: any) => {
        console.log('err: ', err)
      });
  }

  ngOnDestroy(): void {
    if (this.subFiltro) this.subFiltro.unsubscribe();
  }

  getByFiltro(id: number): void {
    this.service.getByFilter(id);
  }

}
