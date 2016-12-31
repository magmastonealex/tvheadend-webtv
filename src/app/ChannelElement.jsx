import React from 'react';

export default class ChannelsDrawer extends React.Component {
	constructor(props){
		super(props);
		this.handleClick = this.props.clickCallback.bind(this,props.chan["id"]);
	}
	pad(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	render() {
		let z= new Date(this.props.chan["endat"])
		return (
			<ul className="channelListing" onClick={this.handleClick}>
			<table>
				<tbody>
					<tr>
						<td width="30%"><img src={this.props.chan["icon"]}/></td>
						<td width="50%"><b>{this.props.chan["name"]}</b></td>
						<td></td>
					</tr>
					<tr>
						<td colSpan="2"><div className="left">{this.props.chan["current"]}</div></td>
						<td className="right">ends at {(z.getHours()%12 == 0 ? 12 : z.getHours()%12).toString()+":"+this.pad(z.getMinutes(),2)}</td>
					</tr>
					<tr>
						<td colSpan="3">
							<p className="nextInfo">Next: {this.props.chan["next"]}</p>
						</td>
					</tr>
				</tbody>
			</table>
			</ul>
			);
	}
}