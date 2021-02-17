<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

require_once "./../Controller/PersonaController.php";

$method = $_SERVER['REQUEST_METHOD'];
$personaController = new PersonaController();

switch($method)
{
	case "GET":
			if(isset($_GET["persona"]))
			{
				$params = array("id" => $_GET["persona"]);
				$personas = $personaController->listOne($params);
				echo json_encode($personas);
			}
			else
			{
				$personas = $personaController->list();
				echo json_encode($personas);
			}
		break;

	case "POST":
			$json = null;
			if(isset($_POST["json"]))
				$json = $_POST["json"];

			$parameters = json_decode($json);
			$params = array(
				"nombre" => $parameters->nombre,
				"apellidos" => $parameters->apellidos,
				"email" => $parameters->email,
				"fechaNacimiento" => $parameters->fechaNacimiento,
				"salario" => $parameters->salario
			);
			echo json_encode($personaController->create($params));
		break;

	case "PUT":
			parse_str(file_get_contents("php://input"), $json);
			$parameters = json_decode($json['json']);
			$params = array(
				"id" => $parameters->id,
				"nombre" => $parameters->nombre,
				"apellidos" => $parameters->apellidos,
				"email" => $parameters->email,
				"fechaNacimiento" => $parameters->fechaNacimiento,
				"salario" => $parameters->salario
			);
			echo json_encode($personaController->update($params));
		break;

	case "DELETE":
			$id = 0;
			if(isset($_GET["persona"]))
				$id = $_GET["persona"];
			$params = array("id" => $id);
			echo json_encode($personaController->delete($params));
		break;

	default:
		break;
}

?>