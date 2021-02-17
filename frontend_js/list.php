<div class="d100 dcentro overflow-hidden bg-white my-lg-5 my-md-3 my-2 pad20">
	<div class="d100">
		<h2>Listado de personas</h2>
	</div>
	<div class="d100 border border-warning mb-3"></div>
	<div class="d100 d-flex justify-content-end mb-3">
		<a href="?pag=create" class="btn btn-info">Nueva Persona</a>
	</div>
	<div class="d100 d-block table-responsive" id="tablePersonas">
		<table class="table table-bordered">
			<thead class="bg-info">
				<tr>
					<th class="text-center align-middle">Nombre</th>
					<th class="text-center align-middle">Apellidos</th>
					<th class="text-center align-middle">Email</th>
					<th class="text-center align-middle">Fecha de Nacimiento</th>
					<th class="text-center align-middle">Salario</th>
					<th class="text-center align-middle"></th>
					<th class="text-center align-middle"></th>
				</tr>
			</thead>
			<tbody id="tbodyPersonas"></tbody>
		</table>
	</div>
	<div class="d100 dcentro d-none" id="loading">
		<div class="spinner-border text-dark" role="status">
			<span class="sr-only">Loading...</span>
		</div>
	</div>
</div>

<div class="modal" id="modalConfirm" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
	    <div class="modal-content">
	      	<div class="modal-header bg-warning">
		        <h5 class="modal-title">Atención!</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		        	<span aria-hidden="true">&times;</span>
		        </button>
	      	</div>
	      	<div class="modal-body">
	        	<p>¿Está seguro que desea eliminar a la persona seleccionada?</p>
	      	</div>
	      	<div class="modal-footer">
		        <button type="button" class="btn btn-success" id="btn-delete-confirm">Confirmar</button>
		        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
	      	</div>
	    </div>
	</div>
</div>
<script type="text/javascript" src="./resources/js/listado.js"></script>