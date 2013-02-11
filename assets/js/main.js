var ward_signups = {
  '1': 5,
  '2': 5,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 1,
  '7': 2,
  '8': 1,
  '9': 1,
  '11': 4,
  '12': 1,
  '17': 1,
  '21': 1,
  '25': 3,
  '26': 3,
  '27': 5,
  '28': 1,
  '29': 2,
  '30': 4,
  '32': 6,
  '33': 4,
  '35': 6,
  '38': 1,
  '39': 4,
  '40': 5,
  '41': 4,
  '42': 3,
  '43': 6,
  '44': 5,
  '45': 15,
  '46': 5,
  '47': 10,
  '48': 1,
  '49': 3,
  '50': 1,
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

function color_for_value(val){
  var color_range = ["#CCFFFF", "#99CCCC", "#669999", "#336666", "#003333"];    // colors for map, in increasing darkness

  var counts = _.sortBy(_.uniq(_.values(ward_signups)), function(a){ return a; } );
  if(counts[0] == 0 ){ counts.shift() } // pop zeros, will plot as blank regions
  
  index_of_val = _.indexOf(counts, val);  
  color_index = Math.floor((index_of_val / counts.length) * color_range.length);
  return color_range[color_index];
}

function doMap(){
  layer = ward_map.getLayer('chicago');

  for(ward in ward_signups){
    // console.log("looking for " + ward)
    var path = layer.getPaths({ward: ward});
    // console.log("got path: %o", path);

    var node = path[0].svgPath.node;
    jQuery.data(node,"signups", ward_signups[path[0].data.ward]);
    jQuery.data(node,"ward", path[0].data.ward);    
    // console.log("%o --> ward %o, signups %o", node, path[0].data.ward, ward_signups[path[0].data.ward]);
    // console.log("data: %o", jQuery.data(node));
  }

  // colors!
  ward_map.getLayer('chicago').style({
    fill: function(d){ 
      if(ward_signups[d.ward] == 0){
          return "#fff";
        } else {
          return color_for_value(ward_signups[d.ward]);
        }
      }
  });

  var hover_color = "#ccc"  
  $("path.chicago").each(function(idx, obj){    
    $(obj).bind("mouseenter", function(){ $(obj).data('previous-fill-color', $(obj).attr('fill')); $(obj).attr("fill", hover_color); });
    $(obj).bind("mouseleave", function(){ $(obj).attr("fill", $(obj).data('previous-fill-color')); });
    $(obj).tooltip({container: 'body', animation: false, placement: 'left', title: "Ward " + $.data(obj,'ward') + ": " +  ($.data(obj,'signups') || '0') + " testers" });
  });  
}