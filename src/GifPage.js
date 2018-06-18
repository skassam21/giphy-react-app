import React, { Component } from 'react';

class GifPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gif: {}
        }
    }

    componentWillMount() {
        let url = "https://api.giphy.com/v1/gifs/" + 
            this.props.match.params.gifID + "?api_key=piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB";

        return fetch(url, {mode: 'cors'})
        .then((response) => {
            return response.json()
        }).then((response) => {
            this.setState({
                gif: response.data
            })
        });
    }

    render () {
        let data = null;
        if (this.state.gif.images) {
            data = (
                <div>
                <img src={this.state.gif.images.downsized.url} className="gif"/>
                <p className="text-center">{this.state.gif.slug}</p>
                </div>
            );
        }
        return (
            <div>
                {data}
            </div>
        )
    }
}

export default GifPage;