import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from 'app/services/class/servicio.class';
import { ServiciosService } from 'app/services/helper/servicios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-servicio',
  templateUrl: './card-servicio.component.html',
  styleUrls: ['./card-servicio.component.css']
})

export class CardServicioComponent implements OnInit {

  @Input() servicio: Servicio;

  subService: Subscription;

  constructor(
    private service: ServiciosService
  ) { }

  ngOnInit() { }

  delete(): void {
    this.service.delete(this.servicio.id);

  }

  update(): void {
    this.service.getId().next(this.servicio.id);
  }

}
