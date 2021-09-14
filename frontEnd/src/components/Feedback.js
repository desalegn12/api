import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import backEndApi from "../service/api";

class Feedback extends Component {
	state = {
		file: "",
		comment: "",
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	jsonParse = (data) => {
		return JSON.parse(data);
	};

	onSubmit = async (e) => {
		const { comment } = this.state;
		const data = { comment };
		console.log(data);
		e.preventDefault();
		await backEndApi
			.post("/api/v/coming/comment", data)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
		this.setState({
			name: "",
			email: "",
			password: "",
		});
	};

	render() {
		return (
			<div className="container">
				<div className="form-div">
					<div style={{ textAlign: "center" }}>
						<p className="h2 ">Give us your complain from the below field</p>
					</div>
					<form onSubmit={this.onSubmit} style={stylingContainer}>
						<div class="form-floating">
							<textarea
								type="text"
								name="comment"
								value={this.state.comment}
								class="form-control"
								placeholder="Leave a comment here"
								onChange={this.onChange}
								id="floatingTextarea2"
								style={{ height: "200px" }}></textarea>
							<label for="floatingTextarea2">Comments</label>
						</div>
						<div class="mb-3">
							<label for="formFile" class="form-label">
								file upload(optional)
							</label>
							<input
								class="form-control"
								name="file"
								value={this.state.file}
								type="file"
								id="formFile"
							/>
						</div>
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

const stylingContainer = {
	padding: "0 10%",
	height: "400px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.05)",
};
export default Feedback;
