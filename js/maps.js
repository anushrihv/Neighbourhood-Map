var initialLocations=[
  {
    title:'Garuda Mall',
    lat:12.969978,
    lng:77.609842,
    venueId:'4b5ee0ccf964a5201b9c29e3'
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
