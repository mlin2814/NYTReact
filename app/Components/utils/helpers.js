// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
var nytAPI = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

  runQuery: function(term){

    console.log(term);

    // Figure out the geolocation
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q" + term;

    return axios.get(queryURL).then(function(response) {

      console.log(response);
      return response.data.results[0].formatted;
    });

  },

  getHistory: function(){
		return axios.get('/api')
			.then(function(response){
				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(term){
		return axios.post('/api', {title: term})
			.then(function(results){
				console.log("Posted to MongoDB");
				return(results);
			})
	}
};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
