import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import UserService from "../../service/user.service";
import "../../App.css";
import "./logup.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Copyright from "../Template/Copyright.component";
import home_route from "../http_route/http-common";
export default class Logup extends Component {
  random_x2y = (x, y) => {
    return Math.floor(Math.random() * y) + x;
  };
  constructor(props) {
    super(props);
    let earned_money = [];
    for (let i = 0; i < 12; i++) {
      earned_money[i] = this.random_x2y(100, 1000);
    }
    this.state = {
      username: "",
      gmail: "",
      password: "",
      description: "",
      type: 1,
      avatar: "",
      earned_money: earned_money, // money make for month
      played_games: [], // list game played
      time_gaming: [], // time game
      tooken: "",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("tooken") != null) {
      window.location = home_route.home_link().baseURL;
    }
  }
  GenerateTooken = () => {
    let length = 40;
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };
  onLogup = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  logup = (e) => {
    e.preventDefault();
    let finalUser = this.state;
    finalUser.tooken = this.GenerateTooken();
    console.log(finalUser);
    UserService.create(finalUser).then((req, res) => {
      toast.success("Đăng ký thành công!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let clear = Object.keys(this.state);
      for (let i = 0; i < clear.length; i++) {
        this.setState({
          [clear[i]]: "",
        });
      }
      finalUser = {};
      console.log(this.state);
    });
  };
  render() {
    return (
      <div>
        <ToastContainer />
        {/* Same as */}
        <ToastContainer />
        <div className="enter"></div>
        <body
          class="img fullheight dark_blue"
          //   style="background-image: url(images/bg.jpg);"
        >
          <div class="container login_form">
            <div class="row border_radius darker_blue">
              <div class="col-lg-12 text_center">
                <h3 class="light_blue">Đăng ký</h3>
                <hr className="blue_dark_hr" />
              </div>
              <div class="col-lg-12">
                <div class="login-wrap p-0">
                  <form onSubmit={this.logup}>
                    <div class="form-group">
                      <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.onLogup}
                        class="form-control input_T"
                        placeholder="Username..."
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="gmail"
                        value={this.state.gmail}
                        onChange={this.onLogup}
                        class="form-control input_T"
                        placeholder="Gmail..."
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        id="password-field"
                        name="password"
                        value={this.state.password}
                        onChange={this.onLogup}
                        type="password"
                        class="form-control input_T"
                        placeholder="Password..."
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="avatar"
                        value={this.state.avatar}
                        onChange={this.onLogup}
                        class="form-control input_T"
                        placeholder="Link your image..."
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.onLogup}
                        class="form-control input_T"
                        placeholder="Description..."
                      />
                    </div>
                    <div class="form-group">
                      <button
                        type="submit"
                        class="form-control btn btn-primary submit px-3"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-12 text_left">
                <p className="p-small statement white_color ">
                  Copyright ©{" "}
                  <a href="/" className="light_blue">
                    envgame
                  </a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}
