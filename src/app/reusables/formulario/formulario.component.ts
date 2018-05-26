import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Servicio } from 'app/services/class/servicio.class';
import { ServiciosService } from 'app/services/helper/servicios.service';
import { Subscription } from 'rxjs';
import { Tipo, TiposServicios } from 'app/services/constants/tipos-servicios.constant';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy {

  total: number;
  tipos: Tipo[] = TiposServicios;

  formServicio: FormGroup;
  name: AbstractControl;
  description: AbstractControl;
  tipo: AbstractControl;

  subTotal: Subscription;
  subId: Subscription;

  servicio: Servicio;

  constructor(
    private fb: FormBuilder,
    private service: ServiciosService
  ) { }

  ngOnInit() {
    this.createForm();

    this.subTotal = this.service.getTotalB()
      .subscribe((res: number) => {
        this.total = res;
      }, (err: any) => {
        console.log('err: ', err);
      });

    this.subId = this.service.getId()
      .subscribe((res: number) => {
        this.servicio = this.service.getById(res);
        this.createForm(this.servicio);
      });
  }

  ngOnDestroy(): void {
    if (this.subTotal) this.subTotal.unsubscribe();
    if (this.subId) this.subId.unsubscribe();
  }

  submit(): void {
    if (this.formServicio.valid) {
      if (!this.servicio) {
        let newServicio: Servicio = new Servicio({
          id: (this.total + 1),
          ...this.formServicio.value
        });
        this.service.add(newServicio);
        this.createForm();
      } else {
        let updateServicio: Servicio = new Servicio({
          id: this.servicio.id,
          ...this.formServicio.value
        });
        this.service.update(updateServicio)
        this.servicio = null;
        this.createForm();
      }
    } else {
      this.markAsTouched();
    }
  }

  reset(): void {
    this.servicio = null;
    this.createForm();
  }

  markAsTouched(): void {
    this.name.markAsTouched();
    this.description.markAsTouched();
    this.tipo.markAsTouched();
  }

  createForm(servicio?: Servicio): void {
    this.formServicio = this.fb.group({
      'name': [servicio && servicio.name || '', Validators.required],
      'description': [servicio && servicio.description, Validators.required],
      'tipo': [servicio && servicio.tipo, Validators.required]
    });
    this.name = this.formServicio.controls['name'];
    this.description = this.formServicio.controls['description'];
    this.tipo = this.formServicio.controls['tipo'];
  }

}
