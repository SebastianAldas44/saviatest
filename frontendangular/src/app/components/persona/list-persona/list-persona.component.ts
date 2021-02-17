import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../models/persona';

@Component({
	selector: 'app-list-persona',
	templateUrl: './list-persona.component.html',
	styleUrls: ['./list-persona.component.css'],
	providers: [PersonaService]
})
export class ListPersonaComponent implements OnInit {
	public personas: any[];
	public loading: boolean;
	public idPersona: number;

	constructor(
		private _personaService: PersonaService,
		private _toast: ToastrService,
		private _router: Router,
		private _modalService: NgbModal
	){
		this.loading = false;
		this.personas = [];
		this.idPersona = 0;
	}

	ngOnInit(): void {
		this.listPersonas();
	}

	listPersonas()
	{
		this.loading = true;
		this._personaService.list().subscribe(
			response => {
				this.loading = false;
				console.log(response);
				if(response.status == "success")
					this.personas = response.personas;
			},
			error => {
				console.log(error);
				this.loading = false;
			}
		);
	}

	showModal(id, content)
	{
		this.idPersona = parseInt(id);
		this._modalService.open(content, { size: 'sm', backdrop: 'static' });
	}

	deletePerson()
	{
		this._personaService.delete(this.idPersona).subscribe(
			response => {
				this._modalService.dismissAll();
				if(response.status == "success")
				{
					this._toast.success(response.message, 'Correcto');
					this.listPersonas();
				}
				else
					this._toast.error(response.message, '!Error');
			},
			error => this._toast.error('Por favor revise su conexión a Internet y vuelva a intentarlo', '!Error de Conexión')
		);
	}
}
