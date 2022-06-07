//Seçilen elipsoiti ayarlar.
function setElpsd()
{
   var i= document.getElementById("elpsd").value;
   i=i*1.;
   selectdatum(i);
}

//Harita türleri.
var street =
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=FnG60vXiCtgScZVxKTuI',{
tileSize: 512,
zoomOffset: -1,
minZoom: 1,
attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\"target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003cahref=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; HackEJDER\u003c/a\u003e",crossOrigin: true
 }),
   satellite =
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=FnG60vXiCtgScZVxKTuI',{
tileSize: 512,
zoomOffset: -1,
minZoom: 1,
attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\"target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003cahref=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy;OSM\u003c/a\u003e",crossOrigin: true
 });
var map = L.map('map', {
layers: [street]
 })
.setView([38.02, 32.5], 5);

var basemaps = {
"Street": street,
"Uydu": satellite 
};
 


L.control.layers(null, basemaps).addTo(map);


//Haritaya marker ekler.
var marker = L.marker([,]);
map.on('click', function (e){if (marker){
    map.removeLayer(marker);
     }
    marker = new L.Marker(e.latlng).addTo(map);
     });
    
//Haritada tıklanılan yerin değerlerini kutulara yazar.
map.addEventListener("click", e => {

     document.getElementById('fi').value = e.latlng.lat.toFixed(9);
     document.getElementById('lamda').value = e.latlng.lng.toFixed(9);
                                     });
                                     
                                     
//Harita üzerinde fare hareketiyle koordinat yazar.
let Position = L.Control.extend({ 
    _container: null,
    options: {
    position: 'bottomleft'
             },   
    onAdd: function (map) {
          var latlng = L.DomUtil.create('div', 'mouseposition');
          this._latlng = latlng;
          return latlng;
                          },
          updateHTML: function(lat, lng) {
                        var latlng = lat + " " + lng;
                        this._latlng.innerHTML = "Enlem: " + lat + "   Boylam: " + lng;
                                         }
                               });
this.position = new Position();
this.map.addControl(this.position);

//Harita üzerinde fare hareketiyle koordinat yazar.
this.map.addEventListener('mousemove', (event) => {
    let lat = Math.round(event.latlng.lat * 100000) / 100000;
    let lng = Math.round(event.latlng.lng * 100000) / 100000;
    this.position.updateHTML(lat, lng); 
                                                  });
        
//Girilen değerlerin bulunduğu yeri haritada gösterir.
function show(){
    var lat = document.getElementById('fi').value;
    var lng = document.getElementById('lamda').value;        
    if(lat > 0){
    marker.setLatLng([lat, lng]).update();
    marker.addTo(map);
    map.setView(new L.LatLng(lat, lng), 11);
               }
               } 
//Haritaya ölçek ekler.         
L.control.scale({position: 'bottomright'}).addTo(map);

//Haritayı ve girilen değerleri sıfırlar.  
function resetMap()
               {
    map.setView([38.02, 32.5], 5);
    map.removeLayer(marker);      
    document.getElementById("fi").value="";
    document.getElementById("lamda").value="";
    document.getElementById("dom").value="";
    document.getElementById("utmx").value="";
    document.getElementById("utmy").value="";
    document.getElementById("tmx").value="";
    document.getElementById("tmy").value="";
               }      
                  

           