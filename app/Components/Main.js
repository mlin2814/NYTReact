import React from "react";

// Import sub-components
import Form from "./children/Form";
import Results from "./children/Results";
import History from "./children/History";

// Helper Function
import helpers from "./utils/helpers";

var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function(){
    return {
      searchTerm: "",
      results: "",
      history: [] /*Note how we added in this history state variable*/
    }
  },  

  // This function allows childrens to update the parent.
  setTerm: function(term){
    this.setState({
      searchTerm: term
    })
  },

  componentDidUpdate: function(prevProps, prevState){

    if(prevState.searchTerm != this.state.searchTerm){
      console.log("UPDATED");

      // Run the query for the address
      helpers.runQuery(this.state.searchTerm)
        .then(function(data){
          if (data != this.state.results)
          {
            console.log("Address", data);

            this.setState({
              results: data
            })

            // After we've received the result... then post the search term to our history. 
            helpers.postHistory(this.state.searchTerm)
              .then(function(data){
                console.log("Updated!");

                // After we've done the post... then get the updated history
                helpers.getHistory()
                  .then(function(response){
                    console.log("Current History", response.data);
                    if (response != this.state.history){
                      console.log ("History", response.data);

                      this.setState({
                        history: response.data
                      })
                    }
                  }.bind(this)) 
              }.bind(this)
            )
          }
        }.bind(this))
        
      }
  },

  setTerm(term) {
    this.setState({
      searchTerm: term
    });
  }

  render: function(){

    return(
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Article Finder!</h2>
            <p className="text-center"><em>Enter a term to search for articles (ex: "Eiffel Tower").</em></p>
          </div>
          <div className="col-md-6">
            <Form setTerm={this.setTerm}/>
          </div>
          <div className="col-md-6">
            <Results articles={this.state.results} />
          </div>
        </div>
        <div className="row">
          <History history={this.state.history}/> 
        </div>
      </div>
    )
  }
});

// Export the componen back for use in other files
module.exports = Main;