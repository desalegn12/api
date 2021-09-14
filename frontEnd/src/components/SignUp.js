import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";

import backEndApi from "../service/api";

import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";

class SignUp extends Component {
	state = {
		name: "",
		email: "",
		password: "",

		token: "",
		redirect: false,
		redirectToLogin: false,
		error: "",
	};
	redirect = () => {
		this.setState({
			redirectToLogin: !this.state.redirectToLogin,
		});
	};
	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSelectedChange = (e) => {
		e.preventDefault();
		this.setState({
			role: e.target.value,
		});
	};

	onSubmit = async (e) => {
		const { name, email, password } = this.state;
		const data = { name, email, password };
		console.log(data);
		e.preventDefault();
		await backEndApi
			.post("/api/v/coming/auth/register", data)
			.then((data) => {
				const token = data.data.token;
				this.props.SetToken(token);
				this.setState({
					token,
					redirect: !this.state.redirect,
				});
			})
			.catch((err) => {
				this.setState({
					error: "Incorrect email or password you entered.",
				});
			});
		this.setState({
			name: "",
			email: "",
			password: "",
		});
	};

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/signup">
						{this.state.redirectToLogin ? (
							<Redirect to="/login" />
						) : (
							<Redirect to="/signup" />
						)}
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/signup">
						{this.state.redirect ? (
							<Redirect to="/feedback" />
						) : (
							<Redirect to="/signup" />
						)}
					</Route>
				</Switch>
				<Route
					exact
					path="/signup"
					render={(props) => (
						<React.Fragment>
							<div className="container">
								<div className="form-div">
									<div style={{ textAlign: "center" }}>
										<p className="h1">Signup</p>
									</div>
									<form onSubmit={this.onSubmit} style={stylingContainer}>
										<input
											type="text"
											name="name"
											value={this.state.name}
											placeholder="name"
											onChange={this.onChange}
											className="form-control form-group"
										/>
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
									<div style={lastDivStyle}>
										<p className="h6">
											I already have an account{" "}
											<button
												type="button"
												class="btn btn-secondary"
												style={buttonStyle}
												onClick={this.redirect}>
												SignIn
											</button>
										</p>
									</div>
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
	height: "400px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.05)",
};
const buttonStyle = {
	background: "white",
	color: "blue",
	textDecoration: "underline",
	border: "none",
};
const lastDivStyle = {
	padding: "0 10%",
	textAlign: "center",
	display: "flex",
};
export default SignUp;
