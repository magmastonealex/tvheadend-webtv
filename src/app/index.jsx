import React from 'react';
import {render} from 'react-dom';
import 'whatwg-fetch'

import ChannelsDrawer from './ChannelsDrawer.jsx'
import Player from './Player.jsx'

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {channels: [], curChannel: null};
	}
	componentDidMount() {
		var stateSet = this.setState.bind(this);
		fetch('/api/channel/grid',{credentials: 'same-origin'}).then(function(response){
			return response.json();
		}).then(function(json){
			let allChans = json["entries"];
			allChans.sort(function(a,b) {return (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0);} );

			var channels = [];
			for (var i = 0; i < allChans.length; i++) {
				let chan = allChans[i];
				channels.push({"id":chan["uuid"], "name": chan["name"], "icon":"/"+chan["icon_public_url"], "current": "Loading...", "endat": "0", "next": "Loading..."});

			}
			stateSet({channels: channels});
			for (var i = 0; i < channels.length; i++) {
				fetch('/api/epg/events/grid?channel='+channels[i]["id"]+'&limit=2', {credentials: 'same-origin'}).then(function(response){
					return response.json();
				}).then(function(json){
  				if(json["entries"].length > 0){
  					let cur = json["entries"][0];
  					let cNum = parseInt(cur["channelNumber"])-1;
  					channels[cNum]["current"] = cur["title"]
  					channels[cNum]["endat"] = cur["stop"];
  					if(json["entries"].length > 1){
  						let next = json["entries"][1];
  						channels[cNum]["next"] = next["title"]
  					}	
  				}
  				stateSet({channels: channels});
  			}).catch(function(ex){
  				console.log("program fetch failed", ex);
  			});
  		}
  	}).catch(function(ex){
  		console.log('channel fetch failed', ex);
  	});
  }

  componentWillUnmount() {}


  clickCallback(uuid){
  	console.log(uuid);
  	this.setState({curChannel: uuid})	
  }

  render () {
  	return(
  		<div>
	  		<ChannelsDrawer channels ={this.state.channels} clickCallback={this.clickCallback.bind(this)}/>
	  		<div className="playerContainer">
	  			<Player currentChannel={this.state.curChannel}/>
  			</div>
  		</div>
  		);
  }
}

render(<App/>, document.getElementById('app'));