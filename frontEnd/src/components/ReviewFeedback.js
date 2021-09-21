import React, { Component } from "react";
import "../components/components.css";
import backEndApi from "../service/api";
import { Document, Page } from "react-pdf";
import "bootstrap/dist/css/bootstrap.min.css";

class ReviewFeedback extends Component {
	state = {
		enable: false,
	};
	//here is submitting what we have change
	onSubmit = () => {
		//here we need to call the axios with put request
	};
	onClick = () => {
		this.setState({
			enable: !this.state.enable,
		});
		console.log(this.state.enable);
		document.getElementsByName("comment")[0].disabled = this.state.enable;
	};
	render() {
		return (
			<div
				className="container"
				style={{
					display: "grid",
					gridTemplateColumns: "2fr 1fr",
					gridGap: "20px",
				}}>
				<form onSubmit={this.onSubmit}>
					<textarea
						name="comment"
						className="form-control"
						style={{ height: "150px" }}
						id="floatingTextarea2"
						value="the hardCode value for now, we would like to change after a while "
						disabled></textarea>
				</form>
				<form onSubmit={this.onSubmit}>
					<div>
						<embed
							src="/home/oem/Documents/certeficats/s.pdf"
							type="application/pdf"
							width="100%"
							height="100px"
						/>
						<div class="mb-3">
							<label for="formFileDisabled" class="form-label"></label>
							<input
								class="form-control"
								type="file"
								id="formFileDisabled"
								disabled
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default ReviewFeedback;
