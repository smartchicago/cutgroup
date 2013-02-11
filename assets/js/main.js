var ward_singups = {
  '1': 100,
  '2': 200,
  '3': 50
}

var ward_map;

$(document).ready(function(){
  ward_map = $K.map('#ward-map');
  ward_map.loadMap('assets/img/wards.svg', function(){
    ward_map.addLayer('chicago', {
      key: "ward",
      styles : {
        'stroke-width': '0.75px',
        fill: "#fff"
      }
    });
    doMap();
  });    
});

function doMap(){
  var hover_color = "#ccc"
  $("path.chicago").each(function(idx, obj){
    $(obj).bind("mouseenter", function(){ console.log("entered " + idx); $(obj).attr("fill", hover_color); });
    $(obj).bind("mouseleave", function(){ console.log("left " + idx); $(obj).attr("fill", "#fff"); });
    $(obj).tooltip({container: 'body', animation: false, placement: 'left', title: "Ward " + idx});
  });  
}