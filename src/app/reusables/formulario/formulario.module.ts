import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormularioComponent } from './formulario.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FormularioComponent
  ],
  declarations: [
    FormularioComponent
  ]
})
export class FormularioModule { }
