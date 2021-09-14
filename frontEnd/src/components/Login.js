import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import backEndApi from "../service/api";

class SignIn extends Component {
	state = {
		email: "",
		password: "",
		redirect: false,
		token: "",
		error: "",
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = async (e) => {
		const { email, password } = this.state;
		const data = { email, password };
		e.preventDefault();
		await backEndApi
			.post("/api/v/coming/auth/login", data)
			.then((data) => {
				console.log(data);
				const token = data.data.token;
				localStorage.setItem("token", token);
				this.setState({
					token,
					redirect: !this.state.redirect,
				});
				console.log(this.state.redirect);
			})
			.catch((err) => {
				this.setState({
					error: "Incorrect email or password",
				});
			});
		this.setState({
			email: "",
			password: "",
		});
	};

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/login">
						{this.state.redirect ? (
							<Redirect to="/feedback" />
						) : (
							<Redirect to="/login" />
						)}
					</Route>
				</Switch>
				<Route
					exact
					path="/login"
					render={(props) => (
						<React.Fragment>
							<div className="container">
								<div className="form-div">
									<div style={{ textAlign: "center" }}>
										<p className="h1">Login</p>
									</div>
									<form onSubmit={this.onSubmit} style={stylingContainer}>
										<input
											type="text"
											name="email"
											value={this.state.email}
											placeholder="Email"
											onChange={this.onChange}
											className="form-control form-group"
										/>
										<input
											type="password"
											name="password"
											value={this.state.password}
											placeholder="password"
											onChange={this.onChange}
											className="form-control form-group"
										/>
										<input
											type="submit"
											value="Submit"
											className="btn btn-secondary form-control form-group"
										/>
									</form>
								</div>
							</div>
						</React.Fragment>
					)}
				/>
			</Router>
		);
	}
}

const stylingContainer = {
	padding: "0 10%",
	height: "300px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.05)",
};

export default SignIn;