var ward_signups = {
  '1': 100,
  '2': 200,
  '3': 50
}

var ward_map;

$(document).ready(function(){
  ward_map = $K.map('#ward-map');
  ward_map.loadMap('assets/img/wards.svg', function(){
    ward_map.addLayer('chicago', {
      styles : {
        'stroke-width': '0.75px',
        fill: "#fff"
      }
    });
    
    doMap();
  });    
});

function doMap(){
  layer = ward_map.getLayer('chicago');

  for(ward in ward_signups){
    console.log("looking for " + ward)
    var path = layer.getPaths({ward: ward});
    console.log("got path: %o", path);

    var node = path[0].svgPath.node;
    jQuery.data(node,"signups", ward_signups[path[0].data.ward]);
    jQuery.data(node,"ward", path[0].data.ward);    
    console.log("%o --> ward %o, signups %o", node, path[0].data.ward, ward_signups[path[0].data.ward]);
    console.log("data: %o", jQuery.data(node));
  }


  var hover_color = "#ccc"  
  $("path.chicago").each(function(idx, obj){    
    $(obj).bind("mouseenter", function(){ console.log("entered " + idx); $(obj).attr("fill", hover_color); });
    $(obj).bind("mouseleave", function(){ console.log("left " + idx); $(obj).attr("fill", "#fff"); });
    $(obj).tooltip({container: 'body', animation: false, placement: 'left', title: "Ward " + $.data(obj,'ward') + ": " +  ($.data(obj,'signups') || '0') + " testers" });
  });  
}