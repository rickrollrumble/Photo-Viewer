import React, { Component } from 'react';
import './styles/styles.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Gallery from "./components/gallery.component";
import Navbar from "./components/navbar.component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/login.component';
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: true,
      username: "",
      password: "",
      signedOut: true,
      something: ''
    }
    this.gridToggle = this.gridToggle.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.signedOutToggle = this.signedOutToggle.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    // this.imageUpload = this.imageUpload.bind(this);
  }

  gridToggle(event) {
    this.setState({ grid: !this.state.grid })
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value })
  }

  handleUsernameChange(event) {
    console.log(this.state.username)
    this.setState({ username: event.target.value })
  }

  signedOutToggle(event) {
    this.setState({
      signedOut: !this.state.signedOut,
    })
    this.setState({
      username: this.state.signedOut ? "rrr392" : ""
    })
  }

  onSubmit(e) {
    // This line prevents default HTML form submission behavior
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('http://localhost:5000/users/add', user)
      .then((err,res) => {
        console.log('in App')
        // console.log(this.state);
        // this.setState({
        //   username: res.data.username,
        //   password: res.data.password
        // })
      })
    window.location = `/gallery/${this.state.username}`;
  }

  render() {
    return (
      <Router>
        <div className={'container'}>
          <Navbar appName={'Photo Viewer'}
            username={this.state.username}
            signoutToggleFunc={this.signedOutToggle}
            signedOutFlag={this.state.signedOut} />

          <Route path="/login" exact render={(props) => <Login {...props}
            usernameChange={this.handleUsernameChange}
            passwordChange={this.handlePasswordChange}
            onSubmit={this.onSubmit} />} />

          <Route path="/gallery/:id" exact
            render={(props) => <Gallery {...props}
              username={props.match.params.id}
              galleryStyle={this.state.grid ? 'tile' : 'full'}
              gridToggle={this.gridToggle}
              gridView={this.state.grid} />} />
        </div>
      </Router>);
  }
}

