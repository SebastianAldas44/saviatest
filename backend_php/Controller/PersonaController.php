<?php

require_once "./../Conexion/Conexion.php";

class PersonaController
{
	private $conn;

	public function __construct()
	{
		$this->conn = Conexion::getInstance()->getConexion();
	}

	public function list()
	{
		$code = 500;
		$status = "error";
		$message = "No existen personas registradas";
		$sql = "select id, nombre, apellidos, email, fecha_nacimiento, salario from personas";
		$data = array();
		$result = $this->conn->query($sql);
		if($result && $result->num_rows > 0)
		{
			$code = 200;
			$status = "success";
			$message = "";
			while($info = mysqli_fetch_array($result))
			{
				$data[] = array(
					"id" => $info[0],
					"nombre" => $info[1],
					"apellidos" => $info[2],
					"email" => $info[3],
					"fechaNacimiento" => $info[4],
					"salario" => $info[5]
				);
			}
		}

		$response = array(
			"code" => $code,
			"status" => $status,
			"message" => $message,
			"personas" => $data
		);

		$result->close();
		$this->conn->next_result();
		return $response;
	}

	public function listOne($params)
	{
		$code = 500;
		$status = "error";
		$message = "No se ha encontrado la persona que busca";
		$data = array();
		$sql = "select id, nombre, apellidos, email, fecha_nacimiento, salario from personas where id = ".$params['id'];
		$result = $this->conn->query($sql);
		if($result && $result->num_rows > 0)
		{
			$code = 200;
			$status = "success";
			$message = "";
			while($info = mysqli_fetch_array($result))
			{
				$data = array(
					"id" => $info[0],
					"nombre" => $info[1],
					"apellidos" => $info[2],
					"email" => $info[3],
					"fechaNacimiento" => $info[4],
					"salario" => $info[5]
				);
			}
		}
		$response = array(
			"code" => $code,
			"status" => $status,
			"message" => $message,
			"personas" => $data
		);
		$result->close();
		$this->conn->next_result();
		return $response;
	}

	public function create($params)
	{
		$code = 500;
		$status = "error";
		$message = "No se ha podido registrar a la persona solicitada";
		if($params && count($params) > 0)
		{
			$nombre = (!empty($params['nombre'])) ? "'".$params['nombre']."'" : null;
			$apellidos = (!empty($params['apellidos'])) ? "'".$params['apellidos']."'" : null;
			$email = (!empty($params['email'])) ? "'".$params['email']."'" : null;
			$fechaNacimiento = (!empty($params['fechaNacimiento'])) ? "'".$params['fechaNacimiento']."'" : null;
			$salario = (!empty($params['salario'])) ? $params['salario'] : null;

			if($nombre && $apellidos && $email && $fechaNacimiento && $salario)
			{
				$sql = "insert into personas (nombre, apellidos, email, fecha_nacimiento, salario) values (".$nombre.", ".$apellidos.", ".$email.", ".$fechaNacimiento.", ".$salario.")";
				$result = $this->conn->query($sql);
				if($result)
				{
					$code = 200;
					$status = "success";
					$message = "La persona ha sido creada de manera exitosa";
				}
				$this->conn->next_result();
			}
		}
		$response = array(
			"code" => $code,
			"status" => $status,
			"message" => $message
		);
		return $response;
	}

	public function update($params)
	{
		$code = 500;
		$status = "error";
		$message = "No se ha podido actualizar los datos a la persona solicitada";
		if($params && count($params) > 0)
		{
			$id = (!empty($params['id'])) ? $params['id'] : null;
			$nombre = (!empty($params['nombre'])) ? "'".$params['nombre']."'" : null;
			$apellidos = (!empty($params['apellidos'])) ? "'".$params['apellidos']."'" : null;
			$email = (!empty($params['email'])) ? "'".$params['email']."'" : null;
			$fechaNacimiento = (!empty($params['fechaNacimiento'])) ? "'".$params['fechaNacimiento']."'" : null;
			$salario = (!empty($params['salario'])) ? $params['salario'] : null;

			if($id && $nombre && $apellidos && $email && $fechaNacimiento && $salario)
			{
				$sql = "update personas set 
				nombre = ".$nombre.",
				apellidos = ".$apellidos.",
				email = ".$email.",
				fecha_nacimiento = ".$fechaNacimiento.",
				salario = ".$salario." 
				where id = ".$id;
				$result = $this->conn->query($sql);
				if($result)
				{
					$code = 200;
					$status = "success";
					$message = "Los datos se han actualizado de manera exitosa";
				}
				$this->conn->next_result();
			}
		}
		$response = array(
			"code" => $code,
			"status" => $status,
			"message" => $message
		);
		return $response;
	}

	public function delete($params)
	{
		$code = 500;
		$status = "error";
		$message = "No se ha podido eliminar a la persona seleccionada";
		if($params && count($params) > 0)
		{
			$id = (!empty($params['id'])) ? $params['id'] : null;
			if($id)
			{
				$sql = "delete from personas where id = ".$id;
				$result = $this->conn->query($sql);
				if($result)
				{
					$code = 200;
					$status = "success";
					$message = "La persona ha sido eliminada de manera correcta";
				}
				$this->conn->next_result();
			}
		}
		$response = array(
			"code" => $code,
			"status" => $status,
			"message" => $message
		);
		return $response;
	}
}

?>