import React, { Component } from "react";
import Modulator from "./subComp/Modulator";
// import backEndApi from "../service/api";
import "bootstrap/dist/css/bootstrap.min.css";

class ReviewFeedback extends Component {
	state = {
		comment: [
			{
				id: 1,
				name: "name one",
				comment: "here is the comment",
				pdfComment: "pdf comment 1",
			},
			{
				id: 2,
				name: "name one",
				comment: "here is the comment-2",
				pdfComment: "pdf comment -2",
			},
			{
				id: 3,
				name: "name one",
				comment: "here is the comment-3",
				pdfComment: "pdf comment -3",
			},
			{
				id: 4,
				name: "name one",
				comment: "here is the comment-4",
				pdfComment: "pdf comment -4",
			},
		],
	};
	// componentDidMount() {
	// 	backEndApi.get("/api/v/coming/comment").then((data) => {
	// 		console.log(data);
	// 		this.setState({
	// 			comment: data.data.comments,
	// 		});
	// 	});
	// }
	deleteUser = (id) => {
		//the point here is fillter out the data not equil to the id
		this.setState({
			comment: [...this.state.comment.filter((data) => data.id !== id)],
		});
	};
	render() {
		const { comment } = this.state;
		return (
			<div className="table-responsive" style={styling}>
				<table
					className="table align-middle table-striped table-borderless"
					style={{ margin: "0 5%" }}>
					<thead className="table-dark">
						<tr style={{ border: "0" }}>
							<th scope="col">Name</th>
							<th scope="col">Comment</th>
							<th scope="col">PdfComment</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<Modulator comment={comment} delete={this.deleteUser} />
				</table>
			</div>
		);
	}
}
const styling = {
	padding: "0 5%",
	display: "flex",
	margin: "auto",
};

export default ReviewFeedback;
