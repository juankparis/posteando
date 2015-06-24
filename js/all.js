
var $form = $("#formulario"),
	$titulo= $("#titulo"),
	$url = $("#url"),
	$tag = $("#tag"),
	$autor = $("#autor"),
	$boton = $("#mostrar-form"),
	$list = $("#contenido"),
	$post = $(".item").first(),
	$video =$("#video");

$(document).on("ready", function inicio () {
	//eventos 
	$boton.on( "click", mostrarFormulario);
	$form.on("submit", agregarpost);

	////////////local storage ///////////
	///localStorage.autosave="1" ///en consola//
	if (localStorage.getItem('autosave')) {
		//si la variable existe ponga lo de sessionS.. en 
		$titulo.val(sessionStorage.getItem('titulo'));
		$url.val(sessionStorage.getItem('url'));
		$tag.val(sessionStorage.getItem('tag'));
		$autor.val(sessionStorage.getItem('autor'));
	}

	var id = setInterval(function(){
		sessionStorage.setItem('titulo', $titulo.val());
		sessionStorage.setItem('url', $url.val());
		sessionStorage.setItem('tag', $tag.val());
		sessionStorage.setItem('autor', $autor.val());
	}, 1000);
});

function mostrarFormulario () {
	//forma fara ocultar el formulario
	$form.slideToggle("slow");
	//esconder todos los post
	$list.slideToggle("slow");
	//esconder el video que sale en resoluciones altas
	$video.slideToggle("slow");
	//para que no se salte la pagina 
	return false;
}
function agregarpost () {
	//e.preventDefault();
	//e.stopPropagation();
	var url = $url.val(),
		titulo = $titulo.val(),
		tag = $tag.val(),
		autor = $autor.val(),
		$clone = $post.clone();
	
	$clone.find(".titulo_item a")
		.text(titulo)
		.attr("href", url);

	$clone.find(".datos_item a")
		.text(tag)
		.attr("href", url);

	$clone.find(".autor_item a").text(autor).attr("href", url);
	// esconder clone como en css
	$clone.hide();
	// agregacion
	$list.prepend($clone);
	// animacion al clone
	$clone.fadeIn();
	//vover a mostrar los post (escondidos arriba)
	mostrarFormulario ();
	//borra o setea los campos
	$titulo.val('');
	$url.val('');
	$tag.val('');
	$autor.val('');
	return false;
}
