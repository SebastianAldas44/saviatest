$(document).ready(function(){
	const URL_API = "http://localhost:5000/saviatest/backend_php/api/"; //URL PHP
	//const URL_API = "http://localhost:5000/saviatest/backend_symfony/public/"; //URL SYMFONY
	//const URL_API = "http://localhost:8080/personas"; //URL JAVA
	var personas = [];
	var idPersona = 0;

	getPersonas();

	$(document).on("click", '.btn-delete-person', function(e){
		e.preventDefault();
		idPersona = $(this).attr("data-id");
		$("#modalConfirm").modal("show");
	});

	$("#btn-delete-confirm").click(function(e){
		e.preventDefault();
		$("#modalConfirm").modal("hide");
		deletePerson();
	});

	function loadingData(loading)
	{
		if(loading)
		{
			$("#tablePersonas").removeClass('d-block');
			$("#loading").removeClass('d-none');
			$("#tablePersonas").addClass('d-none');
			$("#loading").addClass('d-block');
		}
		else
		{
			$("#tablePersonas").removeClass('d-none');
			$("#loading").removeClass('d-block');
			$("#tablePersonas").addClass('d-block');
			$("#loading").addClass('d-none');
		}
	}

	function getPersonas()
	{
		loadingData(true);
		$.ajax({
			url: URL_API,
			method: "GET",
			dataType: "JSON",
			success: (response) => {
				loadingData(false);
				let html  = '<tr><td colspan="7" class="text-center align-middle">No existe personas</td></tr>';
				if(response.status == "success")
				{
					let personas = response.personas;
					if(personas.length > 0)
					{
						html  = '';
						personas.map((persona, i) => {
							html +=`<tr>
								<td class="align-middle">${persona.nombre}</td>
								<td class="align-middle">${persona.apellidos}</td>
								<td class="align-middle">${persona.email}</td>
								<td class="align-middle">${persona.fechaNacimiento}</td>
								<td class="align-middle">$ ${persona.salario}</td>
								<td class="align-middle">
									<a href="?pag=edit&persona=${persona.id}" class="btn btn-sm btn-primary">Editar</a>
								</td>
								<td class="align-middle">
									<button type="button" class="btn btn-sm btn-danger btn-delete-person" data-id="${persona.id}">Eliminar</button>
								</td>
							</tr>`; 
						});
					}
				}
				$("#tbodyPersonas").html(html);
			},
			error: (error) => {
				loadingData(false);
				console.log(error);
			}
		});
	}

	function deletePerson()
	{
		$.ajax({
			url: URL_API + "?persona=" + idPersona,
			method: "DELETE",
			dataType: "JSON",
			success: (response) => {
				console.log(response);
				if(response.status == "success")
				{
					idPersona = 0;
					getPersonas();
					toastr.success(response.message, 'Correcto');
				}
				else
					toastr.error(response.message, '!Error');
			},
			error: (error) => {
				loadingData(false);
				toastr.error('Por favor revise su conexión de internet y vuelva a intentarlo.', '!Error de Conexión');
			}
		});
	}
});