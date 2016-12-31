import React from 'react';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

export default class Player extends React.Component {
	constructor(props){
		super(props);
		this.state={curChan:null}
	}
	reloadVideo() {
        // When changing a HTML5 video, you have to reload it.
        this.refs.video.load();
        this.refs.video.play();
    }

	componentDidUpdate(prevProps, prevState) {
	  if (prevProps.currentChannel !== this.props.currentChannel) {
	  	console.log("Updating")
	    this.reloadVideo();
	  }
	}
	
	render(){
		if(this.props.currentChannel == null){
			return (<div className="playerHolder"><p>Choose a channel</p></div>)
		}else{
		return(
			<div className="playerHolder">
			<Video width="1366" height="768" ref="video" controls autoPlay>
            	<source src={"/stream/channel/"+this.props.currentChannel+"?profile=webtv-h264-aac-matroska"}/>
        	<Overlay />
            <Controls>
                <Play />
                <Mute />
                <Fullscreen />
            </Controls>
        	</Video>
        	</div>
		);
		}
	}
}