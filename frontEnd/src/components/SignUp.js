import "bootstrap/dist/css/bootstrap.min.css";
import "./components.css";

import React, { Component } from "react";
import Feedback from "./Moderator";
import Navbar from "./Navbar";
import Login from "./Login";
import backEndApi from "../service/api";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
const yup = require("yup");

let schema = yup.object().shape({
	name: yup.string().required().min(3),
	password: yup.string().required().min(6),
	email: yup.string().email().required(),
});

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
		(await schema.isValid({
			name,
			email,
			password,
		}))
			? await backEndApi
					.post("/api/v/coming/auth/register", data)
					.then((data) => {
						const token = data.data.token;
						this.props.SetToken(token);
						this.setState({
							token,
							redirect: !this.state.redirect,
						});
						this.setState({
							name: "",
							email: "",
							password: "",
							error: "",
						});
					})
					.catch((err) => {
						this.setState({
							error: "Incorrect email or password you entered.",
						});
					})
			: this.setState({
					error: "Incorrect email or password you entered.",
			  });
	};

	render() {
		if (this.state.redirectToLogin) {
			return (
				<Router>
					<Switch>
						<Redirect exact from="/signup" to="/login" />
						<Route path="/login">
							{/* <Navbar /> */}
							<Login />
						</Route>
					</Switch>
				</Router>
			);
		} else if (this.state.redirect) {
			return (
				<Router>
					<Switch>
						<Redirect exact from="/signup" to="/feedback" />
						<Route path="/feedback">
							<Navbar />
							<Feedback />
						</Route>
					</Switch>
				</Router>
			);
		}

		return (
			<div className="container">
				<div className="form-div">
					<div style={{ textAlign: "center" }}>
						<p className="h1">Signup</p>
					</div>

					<form
						onSubmit={this.onSubmit}
						className="stylingContainer height-signup">
						<span style={{ color: "red" }}>{this.state.error}</span>
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
		);
	}
}

const buttonStyle = {
	background: "white",
	color: "blue",
	textDecoration: "underline",
	border: "none",
};
const lastDivStyle = {
	padding: "0 10%",
	// textAlign: "center",
	display: "flex",
	justifyContent: "center",
};
export default SignUp;
