$(function(){
	//console.log('hola soy ajax');
	$.get("logo_ajax.html", function(cualquier){
		$("footer").append(cualquier);
	});
});