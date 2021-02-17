import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/persona';

@Component({
	selector: 'app-edit-persona',
	templateUrl: '../create-persona/create-persona.component.html',
	styleUrls: ['./edit-persona.component.css'],
	providers: [PersonaService]
})
export class EditPersonaComponent implements OnInit {
	public persona: Persona;
	public maxDate: any;

	constructor(
		private _personaService: PersonaService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _toast: ToastrService
	){
		this.persona = new Persona(0, '', '', '', {year: '', month: '', day: ''}, 0);
		this.maxDate = { year: new Date().getFullYear(), month: (new Date().getMonth() + 1), day: new Date().getDate() };
	}

	ngOnInit(): void {
		this._route.params.subscribe(
			params => {
				let id = params['id'];
				this.listPersona(id);
			}
		);
	}

	listPersona(id)
	{
		this._personaService.list(id).subscribe(
			response => {
				if(response.status == "success")
				{
					let person = response.personas;
					let fecha = person.fechaNacimiento.split("-");
					let date = { year: parseInt(fecha[0]), month: parseInt(fecha[1]), day: parseInt(fecha[2]) };
					this.persona = new Persona(person.id, person.nombre, person.apellidos, person.email, date, person.salario);
				}
			},
			error => console.log(error)
		);
	}

	savePerson()
	{
		let fecha = this.persona.fechaNacimiento;
		let date = fecha.year + "-" + fecha.month + "-" + fecha.day;
		this.persona.fechaNacimiento = date;
		this._personaService.update(this.persona).subscribe(
			response => {
				if(response.status == "success")
				{
					this._toast.success(response.message, 'Correcto');
					this._router.navigate(['/']);
				}
				else
				{
					let fechaObj = this.persona.fechaNacimiento.split("-");
					let dateObj = { year: parseInt(fechaObj[0]), month: parseInt(fechaObj[1]), day: parseInt(fechaObj[2]) };
					this.persona.fechaNacimiento = dateObj;
					this._toast.error(response.message, '!Error');
				}
			},
			error => {
				this._toast.error('Por favor revise su conexión de internet y vuelva a intentarlo.', '!Error de Conexión');
				let fechaObj = this.persona.fechaNacimiento.split("-");
				let dateObj = { year: parseInt(fechaObj[0]), month: parseInt(fechaObj[1]), day: parseInt(fechaObj[2]) };
				this.persona.fechaNacimiento = dateObj;
			}
		);
	}
}
