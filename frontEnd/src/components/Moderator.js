import React, { Component } from "react";
import backEndApi from "../service/api";
import "bootstrap/dist/css/bootstrap.min.css";

class ReviewFeedback extends Component {
	state = {
		comment: [],
	};
	componentDidMount() {
		backEndApi.get("/api/v/coming/comment").then((data) => {
			console.log(data);
			this.setState({
				comment: data.data.comments,
			});
		});
	}
	render() {
		//const {comment}=this.state;
		return (
			<div className="table-responsive" style={styling}>
				<table className="table align-middle" style={{ border: "0" }}>
					<thead style={{ border: "0" }}>
						<tr style={{ border: "0" }}>
							<th scope="col">Name</th>
							<th scope="col">Comment</th>
							<th scope="col">PdfComment</th>
						</tr>
					</thead>
					{this.state.comment.map((data) => (
						<tbody key={data.key} style={{ border: "0" }}>
							<tr style={{ border: "0" }}>
								<td>{data.user.name}</td>
								<td>{data.comment}</td>
								<td>{data.pdfComment}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		);
	}
}
const styling = {
	padding: "0 15%",
};

export default ReviewFeedback;
