import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/persona';

@Component({
	selector: 'app-create-persona',
	templateUrl: './create-persona.component.html',
	styleUrls: ['./create-persona.component.css'],
	providers: [PersonaService]
})
export class CreatePersonaComponent implements OnInit {
	public persona: Persona;
	public maxDate: any;

	constructor(
		private _personaService: PersonaService,
		private _toast: ToastrService,
		private _router: Router
	){
		this.persona = new Persona(0, '', '', '', {year: '', month: '', day: ''}, 0);
		this.maxDate = { year: new Date().getFullYear(), month: (new Date().getMonth() + 1), day: new Date().getDate() };
	}

	ngOnInit(): void {
	}

	savePerson()
	{
		let fecha = this.persona.fechaNacimiento;
		let date = fecha.year + "-" + fecha.month + "-" + fecha.day;
		this.persona.fechaNacimiento = date;
		this._personaService.create(this.persona).subscribe(
			response => {
				if(response.status == "success")
				{
					this._toast.success(response.message, 'Correcto');
					this._router.navigate(['/']);
				}
				else
					this._toast.error(response.message, '!Error');
			},
			error => this._toast.error('Por favor revise su conexión de internet y vuelva a intentarlo.', '!Error de Conexión')
		);
	}
}
