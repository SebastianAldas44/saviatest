<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
//use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Persona;

class PersonaController extends AbstractController
{
    private function responseJson($data)
    {
        $json = $this->get('serializer')->serialize($data, 'json');
        $response = new Response($json);
        $response->setContent($json);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function list(Request $request)
    {
        $code = 500;
        $status = "error";
        $message = "No existen personas registradas";
        $data = null;
        $id = $request->query->get('persona', null);
        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        
        if($id)
            $personas = $em->getRepository(Persona::class)->find($id);
        else
            $personas = $em->getRepository(Persona::class)->findAll();

        if($personas)
        {
            $code = 200;
            $status = "success";
            $message = "";
            $data = $personas;
        }
        $response = array(
            "code" => $code,
            "status" => $status,
            "message" => $message,
            "personas" => $data
        );
        return $this->responseJson($response);
    }

    public function create(Request $request)
    {
        $code = 500;
        $status = "error";
        $message = "No se ha podido registrar a la persona solicitada";
        $json = $request->get('json', null);
        if($json)
        {
            $params = json_decode($json);
            $nombre = (!empty($params->nombre)) ? $params->nombre : null;
            $apellidos = (!empty($params->apellidos)) ? $params->apellidos : null;
            $email = (!empty($params->email)) ? $params->email : null;
            $fechaNacimiento = (!empty($params->fechaNacimiento)) ? $params->fechaNacimiento : null;
            $salario = (!empty($params->salario)) ? $params->salario : null;

            if($nombre && $apellidos && $email && $fechaNacimiento && $salario)
            {
                $doctrine = $this->getDoctrine();
                $em = $doctrine->getManager();
                $persona = new Persona();
                $persona->setNombre($nombre);
                $persona->setApellidos($apellidos);
                $persona->setEmail($email);
                $persona->setFechaNacimiento(new \Datetime($fechaNacimiento));
                $persona->setSalario($salario);

                $em->persist($persona);
                $em->flush();
                $code = 200;
                $status = "success";
                $message = "La persona ha sido creada de manera exitosa";
            }
        }

        $response = array(
            "code" => $code,
            "status" => $status,
            "message" => $message
        );
        return $this->responseJson($response);
    }

    public function update(Request $request)
    {
        $code = 500;
        $status = "error";
        $message = "No se ha podido actualizar los datos a la persona solicitada";
        $json = $request->get('json', null);
        if($json)
        {
            $params = json_decode($json);
            $id = (!empty($params->id)) ? $params->id : null;
            $nombre = (!empty($params->nombre)) ? $params->nombre : null;
            $apellidos = (!empty($params->apellidos)) ? $params->apellidos : null;
            $email = (!empty($params->email)) ? $params->email : null;
            $fechaNacimiento = (!empty($params->fechaNacimiento)) ? $params->fechaNacimiento : null;
            $salario = (!empty($params->salario)) ? $params->salario : null;

            if($nombre && $apellidos && $email && $fechaNacimiento && $salario)
            {
                $doctrine = $this->getDoctrine();
                $em = $doctrine->getManager();
                $persona = $em->getRepository(Persona::class)->find($id);
                if($persona)
                {
                    $persona->setNombre($nombre);
                    $persona->setApellidos($apellidos);
                    $persona->setEmail($email);
                    $persona->setFechaNacimiento(new \Datetime($fechaNacimiento));
                    $persona->setSalario($salario);
                    $em->persist($persona);
                    $em->flush();
                    $code = 200;
                    $status = "success";
                    $message = "Los datos se han actualizado de manera exitosa";
                }
            }
        }

        $response = array(
            "code" => $code,
            "status" => $status,
            "message" => $message
        );
        return $this->responseJson($response);
    }

    public function delete(Request $request)
    {
        $code = 500;
        $status = "error";
        $message = "No se ha podido eliminar a la persona seleccionada";
        $id = $request->query->get('persona', null);
        if($id)
        {
            $doctrine = $this->getDoctrine();
            $em = $doctrine->getManager();
            $persona = $em->getRepository(Persona::class)->find($id);
            $em->remove($persona);
            $em->flush();
            $code = 200;
            $status = "success";
            $message = "La persona ha sido eliminada de manera correcta";
        }
        $response = array(
            "code" => $code,
            "status" => $status,
            "message" => $message
        );
        return $this->responseJson($response);
    }
}
