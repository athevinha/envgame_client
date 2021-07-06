import "./App.css";
import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Template from "./components/Template/Template.component";
import Games from "./components/Game/Games.component";
import CreateGame from "./components/Admin/Create-game.admin";
import ReadGame from "./components/Admin/Read-game.admin";
import UpdateGame from "./components/Admin/Update-game.admin";
import DeleteGame from "./components/Admin/Delete-game.admin";
import logoImg from "./components/Template/images/favicon.png";
import GameService from "./service/game.service";
import userService from "./service/user.service";
import Login from "./components/Login/login";
import Logup from "./components/Logup/logup";
import home_link from "./components/http_route/http-common";
import UserPage from "./components/Userpage/user.page";
import Game from "./components/Game/Game.component";
import Cookie from "./components/Cookies/Cookies.js";
// import * as Scroll from "react-scroll";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      users: [],
      user_current: [],
      theposition: window.pageYOffset,
    };
    GameService.getAll().then((res) => {
      console.log(res.data);
      this.setState({ games: res.data });
    });
    this.login = React.createRef();
    this.user_in4 = React.createRef();
    this.hover_side = React.createRef();
    this.ip11 = React.createRef();
  }
  componentDidMount() {
    let users = [];
    userService.getAll().then((req) => {
      users = req.data;
      let user_tooken = localStorage.getItem("tooken");
      this.show_side_bar();
      setTimeout(() => {
        this.hide_side_bar();
      }, 3000);
      if (user_tooken == null) {
        this.login.current.className = "nav-item";
      } else {
        this.login.current.className = "nav-item hidden";
        users.map((user, id) => {
          if (user_tooken == user.tooken) this.setState({ user_current: user });
        });
      }
      this.setState({ users: users });
    });
  }

  hide_side_bar = () => {
    this.user_in4.current.classList.add("hide_side");
    this.user_in4.current.classList.remove("show_side");
  };
  show_side_bar = () => {
    this.user_in4.current.classList.add("show_side");
    this.user_in4.current.classList.remove("hide_side");
  };
  render() {
    return (
      <div className="App dark_blue">
        <Cookie />
        <div
          class="w3-sidebar w3-light-black w3-bar-block ip11"
          onMouseOver={this.show_side_bar}
          onMouseOut={this.hide_side_bar}
          ref={this.ip11}
        ></div>
        <div
          class="w3-sidebar w3-light-info w3-bar-block width20 hide_side"
          ref={this.user_in4}
          onMouseOver={this.show_side_bar}
          onMouseOut={this.hide_side_bar}
        >
          <h3 class="w3-bar-item">
            {localStorage.tooken != null
              ? this.state.user_current.username
              : "Hãy đăng nhập"}
          </h3>
          <hr className="blue_dark_hr" />
          <div
            className="grid-item-image avatar_show"
            style={{
              backgroundImage: `url(${this.state.user_current.avatar})`,
              backgroundColor: `rgb(0, 17, 51)`,
            }}
          ></div>
          <hr className="blue_dark_hr" />
          <p class="w3-bar-item">{this.state.user_current.gmail}</p>
          {/* <p class="w3-bar-item">{this.state.user_current.earned_money}</p>
          <p class="w3-bar-item">{this.state.user_current.played_games}</p> */}
          <hr className="blue_dark_hr" />
          <p class="w3-bar-item">
            <b>Description: </b>
            {this.state.user_current.description}
          </p>
          <hr className="blue_dark_hr" />
          <p class="w3-bar-item">
            <b>User ID: </b>
            <Link to={`./users/${this.state.user_current._id}`}>
              {this.state.user_current._id}
            </Link>
          </p>
        </div>
        {/* ==========================================================
        *                       Nav Bar                           *
        ========================================================== */}
        <nav class="navbar navbar-expand-sm navbar-dark nav_custom">
          {/* =================================== */}
          <Link to={"/"}>
            <img
              src={logoImg}
              alt="alternative"
              className=" navbar-brand logo"
            />
          </Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link id="home" className="nav-link nav_link_custom" to={"/"}>
                  Giới thiệu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav_link_custom" to={"/Games"}>
                  Chơi game
                </Link>
              </li>
              <li className="nav-item" ref={this.login}>
                <Link className="nav-link nav_link_custom" to={"/Login"}>
                  Đăng nhập
                </Link>
              </li>
            </ul>
            <form className="form-inline search_nav_bar">
              <input
                className="form-control mr-sm-2 input_N"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-info my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
        <Switch>
          <Route
            exact
            path={["/", "/Home"]}
            render={(pr) => <Template className="width75" />}
          />
          <Route
            exact
            path="/Games"
            render={(pr) => (
              <Games className="width75" user={this.state.user_current} />
            )}
          />
          <Route
            exact
            path="/Admin/Games/Create"
            render={(pr) => <CreateGame />}
          />
          <Route exact path="/Admin/Games/Read" render={(pr) => <ReadGame />} />
          <Route
            exact
            path="/Admin/Games/Update"
            render={(pr) => <UpdateGame />}
          />
          <Route
            exact
            path="/Admin/Games/Delete"
            render={(pr) => <DeleteGame />}
          />
          <Route exact path="/Logup" render={(pr) => <Logup />} />
          <Route exact path="/Login" render={(pr) => <Login />} />
          {this.state.games.map((game, id) => {
            return (
              <Route
                exact
                path={`/Games/${game.title}`}
                render={(pr) => (
                  <Game game={game} user={this.state.user_current} />
                )}
              />
            );
          })}
          {this.state.users.map((user, id) => {
            console.log(user);
            return (
              <Route
                exact
                path={`/Users/${user._id}`}
                render={(pr) => <UserPage user={user} />}
              />
            );
          })}
        </Switch>
      </div>
    );
  }
}

export default App;
