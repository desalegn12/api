import "./App.css";
import React from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Feedback from "./components/Moderator";
import ReviewFeedback from "./components/Moderator";
import EditContent from "./components/ReviewFeedback";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

class App extends React.Component {
	state = {
		isRegistered: false,
	};
	toRegister = () => {
		this.setState({
			isRegistered: !this.state.isRegistered,
		});
	};
	render() {
		if (this.state.isRegistered) {
			return (
				<Router>
					<Switch>
						<Redirect exact from="/" to="/signup" />
						<Route path="/signup">
							<Navbar />
							<SignUp />
						</Route>
					</Switch>
				</Router>
			);
		}
		return (
			<div className="App">
				<Router>
					<Navbar />
					<Route
						exact
						path="/"
						render={(props) => (
							<React.Fragment>
								<div style={paragraphStyling}>
									<p className="h4">
										Welcome to the Addis Ababa citizens complaint/ideas receiver
										website. it intended to receive complaints of of Addis Ababa
										City resident. The complaint related to roads such as
										parking problems, manhole, public property abuse, road
										defects and so on. For that{" "}
										<button
											type="button"
											class="btn btn-secondary"
											style={buttonStyle}
											onClick={this.toRegister}>
											Register here
										</button>
									</p>
								</div>
							</React.Fragment>
						)}
					/>

					<Route
						path="/login"
						render={(props) => (
							<React.Fragment>
								<Login />
							</React.Fragment>
						)}
					/>

					<Route
						path="/signup"
						render={(props) => (
							<React.Fragment>
								<SignUp />
							</React.Fragment>
						)}
					/>
					<Route
						path="/feedback"
						render={(props) => (
							<React.Fragment>
								<Feedback />
							</React.Fragment>
						)}
					/>
					<Route
						path="/review"
						render={(props) => (
							<React.Fragment>
								<ReviewFeedback />
							</React.Fragment>
						)}
					/>
					<Route
						path="/edit"
						render={(props) => (
							<React.Fragment>
								<EditContent />
							</React.Fragment>
						)}
					/>
				</Router>
			</div>
		);
	}
}
const paragraphStyling = {
	padding: "5% 10%",
	lineHeight: "1.5",
	fontFamily: "Times New Roman, Times, serif",
};
const buttonStyle = {
	background: "white",
	color: "blue",
	textDecoration: "underline",
	border: "none",
};
export default App;
