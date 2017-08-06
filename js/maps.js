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
    title:'ISCKON',
    lat:13.009629,
    lng:77.551068,
    venueId:'52f4be16498e7e49d438c652'
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
        venueId:location.venueId
    });

    
    document.getElementById('listing').addEventListener("click", infowindowContent,true);
    marker.addListener = google.maps.event.addListener(marker,'click', infowindowContent);


    function infowindowContent(){

      var marker=this;
      marker.tips=[];
        var content;
        var foursquareUrl = 'https://api.foursquare.com/v2/venues/'+marker.venueId+'/tips?sort=recent&limit=3&client_id=JM4ALTWHFZOHRQGJVDRY4LUP5E540HXSOAWLHDEEWTW1PYJ5&client_secret=ZIU1XM0GIOKKOSWS3S3ZZAHU01XG33KSSUJB1ZGIMD2D12AB&v=20170211';
        $.getJSON(foursquareUrl,function(data){
        //  console.log(data);
          items=data.response.tips.items;
          for(i=0;i<items.length;i++)
          {
            //console.log(items[i].text);

            marker.tips.push(items[i].text);
          //  var article=articles[i];
          //  content='<h3>'+marker.title+'</h3><br><br><ul><li>'+items.text+'</li></ul>';
          };
          infowindow.setContent('<div class="info-window"><h4>'+marker.title+'</h4><ul>foursquaretips<li>'+marker.tips[0]+'</li><br><li>'+marker.tips[1]+'</li><br><li>'+marker.tips[2]+'</li></ul></div>');
          openInfowindow(marker);

        });//.error(function(){
        //  infowindow.setContent('<h3>'+marker.title+'</h3><br><br><p>could not load the item</p>');
        //  openInfowindow(marker);
        //});//json ends here


     };


//specify parameter for infowindowcontent
     function openInfowindow(marker){


       //for (var i=0; i < locationsModel.locations.length; i++)
       //{
        // locationsModel.locations[i].infowindow.close();
        //}
     			map.panTo(marker.getPosition())

     			infowindow.open(map,marker);
     		};





}
}
initMap();


var viewModel={
  query:ko.observable('')
};

viewModel.initialLocations=ko.dependentObservable(function(){
  var search=this.query().toLowerCase();
  return ko.utils.arrayFilter(initialLocations,function(location){
    return location.title.toLowerCase().indexOf(search)>=0;
  });
},viewModel);

ko.applyBindings(viewModel);
