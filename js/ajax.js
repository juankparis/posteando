$(function(){
					//este es un ejemplo con ajax para el propio servidor
					//se esta cargando la pagina logo_ajax.html 
	// $.get("logo_ajax.html", function(cualquier){
	// 	$("footer").append(cualquier);
	// });
					//otra forma mas facil y simplificada de hacer lo anterior
			//crear una caja en index con id="logo" para respetar el contenido el footer 
	$("footer #logo").load("logo_ajax.html");

	$.get("js/usuario.json", function(info){
		console.log(info);
	});

});