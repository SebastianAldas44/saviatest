$(document).ready(function(e){
	const URL_API = "http://localhost:5000/saviatest/backend_php/api/"; //URL PHP
	//const URL_API = "http://localhost:5000/saviatest/backend_symfony/public/"; //URL SYMFONY
	//const URL_API = "http://localhost:8080/personas"; //URL JAVA
	var id = 0;

	$("#fechaNacimiento").datepicker({
		dateFormat: "yy-mm-dd",
		changeMonth: true,
        changeYear: true,
        maxDate: 'today',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
		'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
		'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
	});

	getPersona();

	$("#formEdit").on("submit", function(e){
		e.preventDefault();
		let params = {
			id: id,
			nombre: $("#nombre").val(),
			apellidos: $("#apellidos").val(),
			email: $("#email").val(),
			fechaNacimiento: $("#fechaNacimiento").val(),
			salario: $("#salario").val()
		};
		savePerson(params);
	});

	function getParameterByName(name)
	{
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function getPersona()
	{
		$.ajax({
			url: URL_API + "?persona=" + getParameterByName("persona"),
			method: "GET",
			dataType: "JSON",
			success: (response) => {
				if(response.status == "success")
				{
					id = response.personas.id;
					$("#nombre").val(response.personas.nombre);
					$("#apellidos").val(response.personas.apellidos);
					$("#fechaNacimiento").val(response.personas.fechaNacimiento);
					$("#email").val(response.personas.email);
					$("#salario").val(response.personas.salario);
				}
			},
			error: (error) => {
				console.log(error);
			}
		});
	}

	function savePerson(json)
	{
		let params = 'json=' + JSON.stringify(json);
		$.ajax({
			url: URL_API,
			data: params,
			method: "PUT",
			dataType: "JSON",
			success: (response) => {
				if(response.status == "success")
				{
					window.location = "./";
					toastr.success(response.message, 'Correcto');
				}
				else
					toastr.error(response.message, '!Error');
			},
			error: (error) => {
				console.log(error);
				toastr.error('Por favor revise su conexión de internet y vuelva a intentarlo.', '!Error de Conexión');
			}
		});
	}
});