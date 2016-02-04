var $ = require('jquery');

var peticionsever = function () {
					//este es un ejemplo con ajax para el propio servidor
					//se esta cargando la pagina logo_ajax.html 
	// $.get("logo_ajax.html", function(cualquier){
	// 	$("footer").append(cualquier);
	// });
					//otra forma mas facil y simplificada de hacer lo anterior
			//crear una caja en index con id="logo" para respetar el contenido el footer 
	$("footer #logo").load("./dist/peticion_ajax/logo_ajax.html");

					// otra forma de ingresar por ajax con peticiones a bd
	// $.get("../js/usuario.json", function(info){
	// 	var avatar = new Image();
	// 	avatar.src = info.avatar;
	// 	avatar.title=info.nombre+" "+info.apellido;
	// });

	// $("#avatar").append(avatar);
}
module.exports = peticionsever;