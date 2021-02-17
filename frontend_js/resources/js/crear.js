$(document).ready(function(e){
	const URL_API = "http://localhost:5000/saviatest/backend_php/api/"; //URL PHP
	//const URL_API = "http://localhost:5000/saviatest/backend_symfony/public/"; //URL SYMFONY
	//const URL_API = "http://localhost:8080/personas"; //URL JAVA

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

	$("#formCreate").on("submit", function(e){
		e.preventDefault();
		let params = {
			nombre: $("#nombre").val(),
			apellidos: $("#apellidos").val(),
			email: $("#email").val(),
			fechaNacimiento: $("#fechaNacimiento").val(),
			salario: $("#salario").val()
		};
		savePerson(params);
	});

	function savePerson(json)
	{
		let params = 'json=' + JSON.stringify(json);
		$.ajax({
			url: URL_API,
			data: params,
			method: "POST",
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