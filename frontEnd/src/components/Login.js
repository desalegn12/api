import "bootstrap/dist/css/bootstrap.min.css";
import "./components.css";
import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import backEndApi from "../service/api";
import Feedback from "./Moderator";
import Navbar from "./Navbar";
const yup = require("yup");

let schema = yup.object().shape({
	password: yup.string().required().min(6),
	email: yup.string().email().required(),
});

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
		(await schema.isValid({
			email,
			password,
		}))
			? await backEndApi
					.post("/api/v/coming/auth/login", data)
					.then((data) => {
						const token = data.data.token;
						localStorage.setItem("token", token);
						this.setState({
							token,
							redirect: !this.state.redirect,
							email: "",
							password: "",
							error: "",
						});
					})
					.catch((err) => {
						this.setState({
							error: "Incorrect email or password!",
						});
					})
			: this.setState({
					error: "Incorrect email or password!",
			  });
	};

	render() {
		if (this.state.redirect) {
			<Router>
				<Switch>
					<Redirect exact from="/login" to="/feedback" />
					<Route path="/feedback">
						<Navbar />
						<Feedback />
					</Route>
				</Switch>
			</Router>;
		}
		return (
			<div className="container">
				<div className="form-div">
					<div style={{ textAlign: "center" }}>
						<p className="h1">Login</p>
					</div>
					<form
						onSubmit={this.onSubmit}
						className="stylingContainer height-login">
						<span style={{ color: "red" }}>{this.state.error}</span>
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
		);
	}
}

export default SignIn;
