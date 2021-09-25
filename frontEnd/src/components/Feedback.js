import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import backEndApi from "../service/api";
import go from "./asset/direction_icon.ico";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import "./components.css";
import ReviewFeedback from "./Moderator";
import Navbar from "./Navbar";
class Feedback extends Component {
	state = {
		pdfFile: null,
		comment: "",
		redirect: false,
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	onChangeFileUpload = (e) => {
		this.setState({
			pdfFile: e.target.files[0],
		});
	};
	onClick = () => {
		this.setState({
			redirect: !this.state.redirect,
		});
	};

	onSubmit = async (e) => {
		const { comment, pdfFile } = this.state;
		const data = { comment, pdfFile };

		e.preventDefault();
		await backEndApi
			.post("/api/v/coming/comment", data)
			.then((data) => {
				console.log(data);
				this.setState({
					comment: "",
					pdfFile: "",
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		if (this.state.redirect) {
			<Router>
				<Switch>
					<Redirect exact from="/feedback" to="/review" />
					<Route path="/review">
						<Navbar />
						<ReviewFeedback />
					</Route>
				</Switch>
			</Router>;
		}
		return (
			<div className="container ">
				<div className="form-div">
					<div style={{ textAlign: "center", padding: "0 10%" }}>
						<p
							className="h2 "
							style={{ fontFamily: '"Times New Roman, Times, serif"' }}>
							{" "}
							Give us your complaint from the below field
						</p>
					</div>
					<form
						onSubmit={this.onSubmit}
						className="stylingContainer height-feedback">
						<div class="form-floating">
							<textarea
								type="text"
								name="comment"
								value={this.state.comment}
								class="form-control"
								
								onChange={this.onChange}
								id="floatingTextarea2"
								style={{ height: "250px" }}></textarea>
							<label for="floatingTextarea2">leave the comment here.</label>
						</div>
						<div class="mb-3">
							<label for="formFile" class="form-label">
								file upload(optional)
							</label>
							<input
								class="form-control"
								name="pdfFile"
								onChange={this.onChangeFileUpload}
								type="file"
								id="formFile"
								accept="application/pdf"
							/>
						</div>
						<input
							type="submit"
							value="Submit"
							className="btn btn-secondary form-control form-group"
						/>
					</form>
				</div>
				<div>
					<img
						src={go}
						alt="not found"
						className="directed-image"
						onClick={this.onClick}
					/>
				</div>
			</div>
		);
	}
}

export default Feedback;
