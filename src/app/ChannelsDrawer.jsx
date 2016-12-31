import React from 'react';

import ChannelElement from './ChannelElement.jsx'

export default class ChannelsDrawer extends React.Component {
  render() {
    let chanElements = [];

    let channels =  this.props.channels;
    for (var i = 0; i < channels.length; i++) {
      chanElements.push(<ChannelElement key={channels[i]["id"]} clickCallback={this.props.clickCallback} chan={channels[i]} />);
    }

    return (
      <div className="channelsdrawer">
        {chanElements}
      </div>
    );
  }
}