// Include the axios package for performing HTTP requests (promise based alternative to request)
import axios from "axios";

// Geocoder API
const nytAPI = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper Functions (in this case the only one is runQuery)
const helpers = {

  runQuery: (location) => {

    console.log(location);

    // Figure out the geolocation
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q" + term;

    return axios.get(queryURL).then((response) => {

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
export default helpers;
