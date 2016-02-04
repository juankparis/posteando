var $ = require('jquery');

var weather = function(lat, lon, datos){
	var base_url = "http://query.yahooapis.com/v1/public/yql?";
	// obtenerGeoInformacion(lat, lon);
}

	function obtenerGeoInformacion(lat, lon){
		console.log(lat+" "+lon);
		var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';
		query = encodeURIComponent(query);

		$.ajax({
			url: base_url+"q="+query,
			dataType : 'jsonp',
			jsonpCallback: 'procesarGeoInfo',
			data: {
				format: 'json'
			}
		});
	}
	//lamada en linea 32
	function procesarGeoInfo(datos) {
		//buscar en resuls (hay se saca la direccion de la linea 43 y la continacion hasta la # 48)
		//console.log(datos);

		var res    = datos.query.results.Result;
		var barrio = res.neighborhood;
		var ciudad = res.city;
		var pais   = res.country;
		//para la llamada a obtenerClima 
		var woeid  = res.woeid;

		$('#geoinfo')
			.prepend('<p><strong>'+barrio+'</strong><br/>'+ciudad+', '+pais+'</p>');

		//llamado a la function 
		obtenerClima(woeid);
	}

	//parecida a obtenerGeoInformacion()
	function obtenerClima(woeid) {
		var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';
		query = encodeURIComponent(query);

		$.ajax({
			url: base_url+"q="+query,
			dataType : 'jsonp',
			jsonpCallback: 'procesarClima',
			data: {
				format: 'json'
			}
		});
	}
	//lamada en linea 65
	function procesarClima(datos) {
		//buscar en resuls (hay se saca la direccion de la linea 75)
		// console.log(datos);
		var clima = datos.query.results.channel;
		var temp  = clima.item.condition.temp;
		var unit  = clima.units.temperature;

		var code  = clima.item.condition.code;
		var img   = new Image();
		img.src   = "http://l.yimg.com/a/i/us/we/52/"+code+".gif"

		//console.log(clima);

		$('#clima')
			.append(img)
			.append(temp+' '+unit+'º');
			//sacar todo
			//.append(clima.item.description);
	}
module.exports = weather;