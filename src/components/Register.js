import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    AuthService.register(this.state.username, this.state.password).then(
      (response) => {
        this.setState({
          message: response.data.message,
          successful: true,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    return (
      <div className="flex h-screen items-center justify-center bg-[#393955]">
        <div className="flex w-3/5 h-3/5 shadow-2xl">
          <div className="w-1/2 bg-[#33334C] flex flex-col text-white relative">
            <div className="flex w-full justify-center text-lg font-semibold absolute top-12">
              {" "}
              Register{" "}
            </div>
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <div className="flex flex-col w-full h-full items-center justify-center">
              <form className="flex flex-col gap-y-6 ">
                <div className="flex flex-col gap-y-2">
                  <label>Username</label>
                  <input
                    className="outline-none text-black px-3 py-1 rounded-full text-sm"
                    type="text"
                    value={this.state.username}
                    onChange={(e) => this.onChangeUsername(e)}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label>Password</label>
                  <input
                    className="outline-none text-black px-3 py-1 rounded-full text-sm"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.onChangePassword(e)}
                  />
                </div>

                <button
                  className="flex justify-center py-2 bg-gray-600 hover:bg-gray-400 font-semibold shadow-lg rounded-full"
                  onClick={(e) => this.handleRegister(e)}
                >
                  Register
                </button>
              </form>
            </div>
            <Link to="/login">
              <button className="absolute bottom-12 flex w-full justify-center hover:text-gray-200 underline">
                Login Page
              </button>
            </Link>
          </div>
          <div className="w-1/2 bg-white flex justify-center items-center font-semibold text-2xl">
            <span className="py-2 px-8 border-2 border-black">
              Model Editor
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
