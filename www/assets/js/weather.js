$(function () {
  $("#tiempo").hide();
  $("#search").hide();

  let titulo =
    "<div class='row position-absolute top-50 start-50 translate-middle mx-auto'>" +
    "<div id='titulo' class='text-center'>" +
    "<h1>OpenWeather</h1>" +
    "<span>By Asier Elorza</span>" +
    "</div>" +
    "</div>";
  $("#contenedorTit").html(titulo);

  function getImg(main) {
    if (main == "Clouds") {
      return "./assets/Image/cloud.png";
    } else if (main == "Clear") {
      return "./assets/Image/sol.png";
    } else if (main == "Snow") {
      return "./assets/Image/snow.png";
    } else if (main == "Rain") {
      return "./assets/Image/rain.png";
    } else if (main == "Drizzle") {
      return "./assets/Image/drizzle.png";
    } else if (main == "Thunderstorm") {
      return "./assets/Image/Truenos.png";
    }
  }
  function getTemp(lon, lat) {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly&units=metric&lang=es&appid=6a59cda06d896a96b71e06c939253e4b";
    $.get(apiUrl, function (temp) {
      // var resultado =
      //   "<div class='col-5 col-sm-5 col-md-2'>" +
      //     "<img src= >" +
      //   "</div>" +
      //   "<div class='col-5 col-sm-4 col-md-3 mt-2 ms-3'>" +
      //     "<h1 id='ciudad'></h1>" +
      //   "</div>" +
      //   "<div  class='col-4 col-sm-2 col-md-2 mt-2 ms-3'>" +
      //     "<h1 id='temperatura'></h1>" +
      //   "</div>" +
      //   "<div class='row col-8 col-ms-4 col-md-3 mt-2'>" +
      //     "<div class='col-12'>" +
      //       "<span id='min' class='col-6'>Temp min: "  + temp.daily[0].temp.min + "</span>" +
      //       "<span id='max'class='col-6'>Temp max: " + temp.daily[0].temp.max + "</span>" +
      //     "</div>" +
      //   "</div>";
      //   $("#tiempo").html(resultado);
      //   $("#temperatura").html(temp.current.temp + "º");
      // $("#cajaImg").html("<img src="+getImg(temp.daily[0].weather[0].main)+">");

      $("#cajaImg").html(
        "<img src=" + getImg(temp.daily[0].weather[0].main) + ">"
      );
      $("#temperatura").html(temp.current.temp + "º");
      $("#min").html("Temp min: " + temp.daily[0].temp.min + "º");
      $("#max").html("Temp max: " + temp.daily[0].temp.max + "º");
      let tabla = "";
      let contador = 0;
      temp.daily.forEach((e) => {
        if (contador <= 3) {
          tabla +=
            "<td class='col-3 col-ms-1 '>" +
            "<span id='tiempo1'>" +
            e.temp.day +
            "º</span>" +
            "<img src=" +
            getImg(e.weather[0].main) +
            " style='width: 50px;'>" +
            "</td>";
        }

        contador += 1;
      });
      console.log(contador);
      $("#tr").html(tabla);
    });
  }
  function getNameCityCord(lat, lon) {
    var apiCord =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=6a59cda06d896a96b71e06c939253e4b";
    $.get(apiCord, function (city) {
      $("#ciudad").html(city.name);
      getTemp(lon, lat)
      
    });
  }
  
  function getCity(cityName) {
    var apiCord =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=6a59cda06d896a96b71e06c939253e4b";
    $.get(apiCord, function (city) {
      var lon = city.coord.lon;
      var lat = city.coord.lat;
      getNameCityCord(lat, lon);
    });
  }
  

  var onSuccess = function (position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat);
    console.log(lon)
    getNameCityCord(lat, lon);
  };
  function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
  var contador = 0;
  $("#home").click(function (event) {
    contador = 0;
    $("#tiempo").hide();
    $("#search").hide();
    $("#titulo").show();
    $("#contenedorTit").html(titulo);
  });

  $("#lupa").click(function (event) {
    $("#search").show();
    var titulo =
      "<div class='row mt-4'>" +
      "<div id='titulo' class='text-center'>" +
      "<h1>OpenWeather</h1>" +
      "<span>By Asier Elorza</span>" +
      "</div>" +
      "</div>";
    if (contador >= 1 && $("#form1").val() != "") {
      $("#tiempo").show();
      getCity($("#form1").val());
      $("#titulo").hide();
      $("#contenedorTit").html(titulo);
    }
    contador += 1;
  });
  $("#location").click(function (event) {
    var titulo =
      "<div class='row mt-4'>" +
      "<div id='titulo' class='text-center'>" +
      "<h1>OpenWeather</h1>" +
      "<span>By Asier Elorza</span>" +
      "</div>" +
      "</div>";
    $("#tiempo").show();
    $("#titulo").hide();
    $("#contenedorTit").html(titulo);
    navigator.geolocation.getCurrentPosition(onSuccess);
  });
});
