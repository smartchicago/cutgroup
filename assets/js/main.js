var ward_signups = {
  '1': 9,
  '2': 4,
  '3': 4,
  '4': 6,
  '5': 9,
  '6': 9,
  '7': 1,
  '8': 7,
  '9': 10,
  '10': 4,
  '11': 1,
  '12': 1,
  '13': 8,
  '14': 10,
  '15': 7,
  '16': 3,
  '17': 1,
  '18': 8,
  '19': 4,
  '20': 8,
  '21': 5,
  '22': 9,
  '23': 6,
  '24': 9,
  '25': 9,
  '26': 8,
  '27': 4,
  '28': 2,
  '29': 10,
  '30': 1,
  '31': 10,
  '32': 6,
  '33': 1,
  '34': 10,
  '35': 2,
  '36': 8,
  '37': 6,
  '38': 7,
  '39': 7,
  '40': 6,
  '41': 1,
  '42': 10,
  '43': 4,
  '44': 5,
  '45': 9,
  '46': 3,
  '47': 10,
  '48': 5,
  '49': 3,
  '50': 4,
}

var color_range = ["#CCFFFF", "#99CCCC", "#669999", "#336666", "#003333"];

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

  // colors!
  ward_map.getLayer('chicago').style({
    fill: function(d){ return color_range[Math.floor(Math.random() * color_range.length)] }
  });

  var hover_color = "#ccc"  
  $("path.chicago").each(function(idx, obj){    
    $(obj).bind("mouseenter", function(){ $(obj).data('previous-fill-color', $(obj).attr('fill')); $(obj).attr("fill", hover_color); });
    $(obj).bind("mouseleave", function(){ $(obj).attr("fill", $(obj).data('previous-fill-color')); });
    $(obj).tooltip({container: 'body', animation: false, placement: 'left', title: "Ward " + $.data(obj,'ward') + ": " +  ($.data(obj,'signups') || '0') + " testers" });
  });  
}