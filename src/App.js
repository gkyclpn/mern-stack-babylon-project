import React from "react";
import * as BABYLON from "babylonjs";
import 'babylonjs-loaders';
import SceneComponent from "./SceneComponent"; // uses above component in same directory
//import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./index.css";
//import countryTexture from './country.env';
import axios from 'axios';
import Scene from './components/Scene'
import Login from './components/Login'




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: false,
        color: '#ffffff'
    }
    this.setVisible = this.setVisible.bind(this);
  }

  setVisible() {
    this.setState({isVisible: true});
  }


  render() {
    return(
      <Login />
    )
  }
}

export default App;

