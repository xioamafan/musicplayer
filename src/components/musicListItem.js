import React  from 'react';
import './musicListItem.less';
import Pubsub from 'pubsub-js'
let MusiclistItem=React.createClass({
	playMusic(musicItem){
		Pubsub.publish('PLAY_MUSIC',musicItem);
	},
	deleteMusic(musicItem,e){
		e.stopPropagation();
		Pubsub.publish('DELETE_MUSIC',musicItem);
	},
	render(){
		let musicItem=this.props.musicItem;
		return(
			<li  className={`components-musiclistitem row ${this.props.focus ? ' focus' :''}`}>
			    <p onClick={this.playMusic.bind(this,musicItem)}><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
			    <p className="-col-auto delete" onClick={this.deleteMusic.bind(this,musicItem)}></p>
			</li>
		)
	}
});


export default MusiclistItem;
