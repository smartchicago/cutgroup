var ward_map;
var ward_signups;

$(document).ready(function(){
  if ($('html.lt-ie9').length != 0){ 
    // for IE8 and below, don't bother with the map
    $("#ward-map-container").remove();
    $("#main-body-copy").removeClass("span6").addClass("span12");
  } else {
    $.get('assets/js/signups.json', function(data) { 
      ward_signups = data;
      ward_map = $K.map('#ward-map');
      ward_map.loadMap('assets/img/merged_001.svg', function(){
        ward_map.addLayer('chicago', {
          styles : {
            'stroke-width': '0.75px',
            fill: "#fff"
          }
        });
        doMap();            
      }); 
    });   
  }
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
    var path = layer.getPaths({ward: ward});
    var node = path[0].svgPath.node;
    jQuery.data(node,"signups", ward_signups[path[0].data.ward]);
    jQuery.data(node,"ward", path[0].data.ward);
    jQuery.data(node,"displaynam", path[0].data.displaynam);    
  }

  // colors!
  ward_map.getLayer('chicago').style({
    fill: function(d){ 
      if(ward_signups[d.ward] == 0){
          return "#ccc";
        } else {
          return color_for_value(ward_signups[d.ward]);
        }
      }
  });

  var hover_color = "#ccc"  
  $("path.chicago").each(function(idx, obj){    
    $(obj).bind("mouseenter", function(){ $(obj).data('previous-fill-color', $(obj).attr('fill')); $(obj).attr("fill", hover_color); });
    $(obj).bind("mouseleave", function(){ $(obj).attr("fill", $(obj).data('previous-fill-color')); });
    
    var number_of_signups = $.data(obj,'signups');
    $(obj).tooltip({container: 'body', animation: false, placement: 'left', title: $.data(obj,'displaynam') + ": " +  (number_of_signups || '0') + " tester" + (number_of_signups == 1 ? '' : 's') });
  });  
}