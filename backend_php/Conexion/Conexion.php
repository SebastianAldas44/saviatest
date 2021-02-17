<?php

class Conexion
{
	private $conn;
	private static $instance;

	public function __construct()
	{
		$this->conn = mysqli_connect("localhost", "root", "", "saviatest", "3306") or die(mysql_error());
	}

	public function getConexion()
	{
		return $this->conn;
	}

	public static function getInstance()
	{
		if(!self::$instance)
			self::$instance = new self();
		
		return self::$instance;
	}
}

?>