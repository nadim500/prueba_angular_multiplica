import { Component, OnInit, OnDestroy } from '@angular/core';
import { Servicio } from 'app/services/class/servicio.class';
import { ServiciosService } from 'app/services/helper/servicios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})

export class ListadoComponent implements OnInit, OnDestroy {

  servicios: Servicio[];

  subServicio: Subscription;
  subFiltro: Subscription;

  constructor(
    private service: ServiciosService
  ) { }

  ngOnInit() {
    this.subServicio = this.service.getServicioB()
      .subscribe((res: Servicio[]) => {
        this.servicios = [...res];
      }, (err: any) => {
        console.log('err: ', err);
      });
  }

  ngOnDestroy() {
    if (this.subServicio) this.subServicio.unsubscribe();
    if (this.subFiltro) this.subFiltro.unsubscribe();
  }

}
