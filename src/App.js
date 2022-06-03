import React from "react";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import SceneComponent from "./SceneComponent"; // uses above component in same directory
//import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
import "./index.css";
//import countryTexture from './country.env';
import axios from "axios";
import Scene from "./components/Scene";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import AuthService from "./services/auth.service";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentUser: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render() {
    return (
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
