import React from "react";
import Scene from "./Scene";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      color: "#ffffff",
    };
    this.setVisible = this.setVisible.bind(this);
  }

  setVisible() {
    this.setState({ isVisible: true });
  }

  render() {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#33334C]">
        <div className="flex ">
          <div
            className={
              "bg-green-700/50 py-6 rounded-md shadow-lg my-8 " +
              (this.state.isVisible ? "hidden" : "visible")
            }
          >
            <span className="text-white font-semibold text-lg p-8">
              Welcome onboard! You can upload your model by clicking the button
              below.
            </span>
          </div>
        </div>
        <div className="flex gap-x-8">
          <div
            className={
              "flex gap-x-8 py-8 font-semibold text-white " +
              (this.state.isVisible ? "visible" : "hidden")
            }
          >
            <div className="flex gap-x-8 justify-center" id="select-part">
              <span className="flex items-center">Pick a Color:</span>
              <div className="flex flex-col justify-center relative">
                <label className="flex flex-col items-center justify-center rounded-full bg-gray-600 relative p-3 cursor-pointer">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: this.state.color }}
                  ></div>
                  <input
                    className="invisible absolute top-0 bottom-0 z-1"
                    type="color"
                    id="color-picker"
                    onChange={(e) => {
                      this.setState({ color: e.target.value });
                    }}
                  />
                </label>
              </div>

              <span className="flex items-center">Select Texture:</span>
            </div>

            <div className="flex gap-x-8 justify-center ">
              <label className="px-4 py-2 bg-gray-600 shadow-3xl rounded-full text-md hover:bg-gray-500 text-white font-semibold cursor-pointer">
                Upload Texture
                <input id="texture-import-btn" type="file" className="hidden" />
              </label>
            </div>
            <div id="save-project-div"></div>
          </div>
        </div>

        <Scene />
        <div className="flex gap-x-16 py-4">
          <div id="model-button-part" className="flex gap-x-16 "></div>
          <div className="flex items-center gap-x-4 py-1 font-semibold text-white">
            <span className={this.state.isVisible ? "hidden" : "visible"}>
              Upload Model:
            </span>
            <label className="px-4 py-2 bg-gray-600 shadow-3xl rounded-full text-xl hover:bg-gray-500 text-white font-semibold cursor-pointer">
              +
              <input
                id="import-btn"
                type="file"
                className="hidden "
                onChange={this.setVisible}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
