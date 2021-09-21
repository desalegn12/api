import React, { Component } from "react";
import Delete from "../asset/trash.svg";
class Modulator extends Component {
	render() {
		return this.props.comment.map((data) => (
			<tbody key={data.key} style={{ border: "none " }}>
				<tr style={{ border: "none" }}>
					<td>{data.name}</td>
					<td>{data.comment}</td>
					<td>{data.pdfComment}</td>
					<td>
						<img
							src={Delete}
							alt="file not found"
							width="40px"
							height="40px"
							onClick={this.props.delete.bind(this, data.id)}
						/>
					</td>
				</tr>
			</tbody>
		));
	}
}

export default Modulator;
