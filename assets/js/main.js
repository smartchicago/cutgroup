$(document).ready(function(){
  var ward_map = $K.map('#ward-map');
  ward_map.loadMap('assets/img/wards.svg', function() {
       ward_map.addLayer('chicago');
  });
});