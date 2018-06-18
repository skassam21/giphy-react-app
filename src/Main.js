import React, { Component } from 'react';
import Search from './Search';
import About from './About';
import GifPage from './GifPage';
import NotFoundPage from './NotFound';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li><Link to="/">Search</Link></li>
                        <li><Link to="/about">About</Link></li>

                    </ul>
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route path="/search/:search" component={Search} />
                        <Route path="/gifs/:gifID" component={GifPage} />
                        <Route path="/about" component={About} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;