var ward_singups = {
  '1': 100,
  '2': 200,
  '3': 50
}

var ward_map;

$(document).ready(function(){
  ward_map = $K.map('#ward-map');
  ward_map.loadMap('assets/img/wards.svg', function(){
    ward_map.addLayer('chicago', {});
    doMap();
  });    
});

function doMap(){
  $("path.chicago").each(function(idx, obj){
    $(obj).tooltip({title: idx, 'container': 'body', 'placement': 'left'});
  });  
}