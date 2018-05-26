import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CardServicioModule } from './reusables/card-servicio/card-servicio.module';
import { FormularioModule } from './reusables/formulario/formulario.module';

import { AppComponent } from './app.component';
import { ServiciosComponent } from 'app/componentes/servicios/servicios.component';
import { FiltrosComponent } from 'app/componentes/filtros/filtros.component';
import { ListadoComponent } from 'app/componentes/listado/listado.component';

import { ServiciosService } from 'app/services/helper/servicios.service';

@NgModule({
  declarations: [
    AppComponent,
    ServiciosComponent,
    FiltrosComponent,
    ListadoComponent,
  ],
  imports: [
    BrowserModule,
    CardServicioModule,
    FormularioModule
  ],
  providers: [
    ServiciosService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
