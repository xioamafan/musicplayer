import React from 'react'
import MusiclistItem from '../components/musiclistItem'
let MusicList=React.createClass({
	//里面接受root传来列表的参数
	//里面的this都是指代MusicList实例
	render(){
		let listEle=null;
		listEle=this.props.musicList.map((item)=>{
			return (
				<MusiclistItem 
				  key={item.id}
				  musicItem={item}
				  focus={item===this.props.currentMusicItem}
				>
				  {item.title}
				</MusiclistItem>
			)
		});
		return(
			<ul>
			   {listEle}
			</ul>
		)
	}
});

export default MusicList;
