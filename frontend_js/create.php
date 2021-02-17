<div class="d100 dcentro overflow-hidden my-5 my-md-3 my-2">
	<div class="col-lg-8 overflow-hidden px-0 border border-dark bg-white">
		<div class="d100 bg-info py-3 px-3">
			<h2>Registrar Persona</h2>
		</div>
		<div class="d100 px-3 border border-bottom border-warning mb-3"></div>
		<form id="formCreate" class="d100 px-3 pb-3">
			<div class="d100 dcentro">
				<div class="col-md-2 text-sm-right form-group">
					<strong>Nombre:</strong>
				</div>
				<div class="col-md-4 form-group">
					<input type="text" class="form-control" name="nombre" id="nombre" required />
				</div>
				<div class="col-md-2 text-sm-right form-group">
					<strong>Apellidos:</strong>
				</div>
				<div class="col-md-4 form-group">
					<input type="text" class="form-control" name="apellidos" id="apellidos" required />
				</div>
			</div>
			<div class="d100 dcentro">
				<div class="col-md-2 text-sm-right form-group">
					<strong>Email:</strong>
				</div>
				<div class="col-md-4 form-group">
					<input type="email" class="form-control" name="email" id="email" required />
				</div>
				<div class="col-md-2 text-sm-right form-group">
					<strong>Fecha de Nacimiento:</strong>
				</div>
				<div class="col-md-4 form-group">
					<input type="text" class="form-control" name="fechaNacimiento" id="fechaNacimiento" required />
				</div>
			</div>
			<div class="d100 dcentro-v">
				<div class="col-md-2 text-sm-right form-group">
					<strong>Salario:</strong>
				</div>
				<div class="col-md-4 form-group">
					<input type="number" class="form-control" name="salario" id="salario" min="1" required />
				</div>
			</div>
			<div class="d100 d-flex justify-content-end">
				<button type="submit" class="btn btn-dark">Crear</button>
			</div>
		</form>
	</div>
</div>

<script type="text/javascript" src="./resources/js/crear.js"></script>