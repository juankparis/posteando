$(function(){
	var geo = navigator.geolocation;
	//console.log(geo);
	var opciones = {};

	function geo_error() {
		console.log("HHhmm... no puedo saber donde estas.");
	}

	function geo_exito(posicion) {
		//console.log(posicion);
		var lat  = posicion.coords.latitude;
		var lon  = posicion.coords.longitude;
		var mapa = new Image();
		//quitando maptype=hybrid sale en mapa de google maps
		mapa.src = "http://maps.googleapis.com/maps/api/staticmap?
		maptype=hybrid&zoom=15&size=320x280&sensor=false&center="+lat+","+lon;
		$('#geo').append(mapa);

		obtenerGeoInformacion(lat, lon);
	}

	geo.getCurrentPosition(geo_exito, geo_error, opciones);
});