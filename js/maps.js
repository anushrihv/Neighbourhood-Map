var initialLocations=[
  {
    title:'Garuda Mall',
    lat:12.969978,
    lng:77.609842,
    venueId:'4b643b33f964a52067a52ae3'
  },

  {
    title:'Bangalore Palace',
    lat:12.998697,
    lng:77.592023,
    venueId:'4d81ae5bbaf9a35db0569b21'
  },

  {
    title:'Orion Mall',
    lat:13.010787,
    lng:77.554901,
    venueId:'4f1869c7e4b0ebf9e4ae9134'
  },

  {
    title:'Tippu Sultan Palace',
    lat:12.959583,
    lng:77.574038,
    venueId:'4d561f78611aa35da9963d39'
  },

  {
    title:'Lal Bagh',
    lat:12.950745,
    lng:77.584779,
    venueId:'4b5ee0ccf964a5201b9c29e3'
  },

  {
    title:'RV college',
    lat:12.923709,
    lng:77.498686,
    venueId:'4bb097c7f964a520144e3ce3'
  }
];


var map;
var infowindow;
function initMap() {
  var location;
  var marker;

  var bounds = new google.maps.LatLngBounds();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 12.9715987, lng: 77.5945627},
    zoom: 13
  });

  infowindow = new google.maps.InfoWindow();

  for( var i=0;i<initialLocations.length;i++) {

    location=initialLocations[i];
    var position = new google.maps.LatLng(location.lat, location.lng);
    bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.title,
        animation: google.maps.Animation.DROP,
        venueId:location.venueId
    });

    //document.getElementById('listing').addEventListener("click", infowindowContent,true);
    marker.addListener = google.maps.event.addListener(marker,'click', infowindowContent);
    marker.addListener=google.maps.event.addListener(marker,'click', toggleBounce);
    initialLocations[i].marker = marker;
}
}
//initMap();

var viewModel={
  query:ko.observable(''),
   openInfowindow:function(location){

        map.panTo(location.marker.getPosition());
        google.maps.event.trigger(location.marker,'click');

      }

};

viewModel.initialLocations=ko.dependentObservable(function(){
  var search=this.query().toLowerCase();
  return ko.utils.arrayFilter(initialLocations,function(location){
    var matched=  location.title.toLowerCase().indexOf(search)>=0;
    if(location.marker){
      location.marker.setVisible(matched);
    }
    return matched;
  });
},viewModel);

function infowindowContent(){

  var marker=this;
  marker.tips=[];
  var content;
  var foursquareUrl = 'https://api.foursquare.com/v2/venues/'+marker.venueId+'/tips?sort=recent&limit=3&client_id=JM4ALTWHFZOHRQGJVDRY4LUP5E540HXSOAWLHDEEWTW1PYJ5&client_secret=ZIU1XM0GIOKKOSWS3S3ZZAHU01XG33KSSUJB1ZGIMD2D12AB&v=20170211';
  $.getJSON(foursquareUrl,function(data){

    items=data.response.tips.items;
    for(i=0;i<items.length;i++)
    {

      marker.tips.push(items[i].text);

    }
    infowindow.setContent('<div class="info-window"><h4>'+marker.title+'</h4><ul>foursquaretips<li>'+marker.tips[0]+'</li><br><li>'+marker.tips[1]+'</li><br><li>'+marker.tips[2]+'</li></ul></div>');
    infowindow.open(map,marker);


    }).fail(function(jqXHR, textStatus, errorThrown) {
            infowindow.setContent('<p><b>Error in retrieving comments!!</b></p>');
            infowindow.open(map,marker);
            console.log('getJSON request failed! ' + textStatus);
        });
      //for(i=0;i<items.length;i++)
      //{

      //  marker.tips.push(items[i].text);

    //  }
    //  infowindow.setContent('<div class="info-window"><h4>'+marker.title+'</h4><ul>foursquaretips<li>'+marker.tips[0]+'</li><br><li>'+marker.tips[1]+'</li><br><li>'+marker.tips[2]+'</li></ul></div>');
    //  infowindow.open(map,marker);
}
var currentmarker=null;
function toggleBounce() {
var marker=this;
        if (currentmarker) {
          currentmarker.setAnimation(null);
        }
        currentmarker=marker;
          marker.setAnimation(google.maps.Animation.BOUNCE);

      }

function googleError() {
    alert("google Error");
    console.log("couldn't load the map!")
  }

ko.applyBindings(viewModel);
