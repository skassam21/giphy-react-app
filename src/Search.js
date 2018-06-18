import React, { Component } from 'react';
import './css/Search.css';
import { Link, Route, Switch } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    }

    this.onResult = this.onResult.bind(this);
  }

  onResult(gifs, searchQuery) {
    this.props.history.push('/search/' + searchQuery);
    this.setState({
      gifs: gifs
    });
  }

  render() {
    return (
      <div>
        <Form onResult={this.onResult} search={this.props.match.params.search} />
        <Results gifs={this.state.gifs} />
      </div>
    )
  }
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: this.props.search
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchQuery: event.target.value});
  }

  componentWillMount() {
    if (!!this.state.searchQuery) {
      let url = "https://api.giphy.com/v1/gifs/search?api_key=piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB&q=" + this.state.searchQuery;

      return fetch(url, {mode: 'cors'})
      .then((response) => {
          return response.json()
      }).then((response) => {
        this.props.onResult(response.data, this.state.searchQuery);
      });

    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = "https://api.giphy.com/v1/gifs/search?api_key=piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB&q=" + this.state.searchQuery;

    return fetch(url, {mode: 'cors'})
    .then((response) => {
        return response.json()
    }).then((response) => {
      this.props.onResult(response.data, this.state.searchQuery);
    });
  }


  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col-lg-8 offset-lg-2">
                  <h1>Enter a search query</h1>
                  <form onSubmit={this.handleSubmit} className="search-form needs-validation" name="search-form" noValidate>
                      <div className="form-row">
                          <div className="col-sm-10">
                              <input type="text" onChange={this.handleChange} 
                              className="form-control search-input" value={this.state.searchQuery} name="search" placeholder="Search" required/>
                              <div className="invalid-feedback">
                                  Please enter a search query.
                              </div>
                          </div>
                          <div className="col-sm-2">
                              <button type="submit" id="search" className="btn btn-primary">Search</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
  }

}


class Results extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        {this.props.gifs.map(gif => <Gif obj={gif} key={gif.id} />)}
      </div>
    )
  }
}

class Gif extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="gif-container">
          <Link to={"/gifs/" + this.props.obj.id}>
            <img src={this.props.obj.images.downsized.url} className="gif"/>
            <p className="text-center">{this.props.obj.slug}</p>
          </Link>
          </div>
      </div>  
    )
  } 
}

export default Search;
