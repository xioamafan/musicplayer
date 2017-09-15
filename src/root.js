import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musicList'
import { MUSIC_LIST } from '../dist/config/musiclist'
import {Router,IndexRoute,Link,Route,hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'
//这个js只是对页面进行管理
//页面公共的数据放到这里面管理
//http://localhost:3333/#/?_k=04Ibun
let App =React.createClass({
	/**
	 * currentMusicListItem 当前播放的音乐
	 */
	getInitialState(){
		return {
			musicList:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0]
		}
	},
	playMusic(musicItem){
		$("#player").jPlayer('setMedia',{
			mp3:musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem:musicItem
		})
	},
	playNext(type='next'){
		let index=this.findMusicIndex(this.state.currentMusicItem);
		let newIndex=null;
		let musicListLength=this.state.musicList.length;
		if(type==='next'){
			newIndex=(index+1)%musicListLength;
		}else{
			newIndex=(index-1+musicListLength)%musicListLength;
		}
		this.playMusic(this.state.musicList[newIndex]);
		this.setState({
			currentMusicItem:this.state.musicList[newIndex]
		})
	},
	//获得当前播放歌曲在歌曲列表中的位置
	/*findMusicIndex(musicItem){
		return this.state.musicItem.indexOf(musciItem);
	},*/
	findMusicIndex(musicItem){
		return musicItem.id-1;
	},
	componentDidMount(){
		$("#player").jPlayer({
			/*ready:function(){
				$(this).jPlayer('setMedia',{
					//http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3
					mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},*/
			supplied:'mp3',
		    wmode:'window'
		});
		//监听音乐播放完
		$("#player").bind($.jPlayer.event.ended,(e)=>{
			this.playNext();
		});
		this.playMusic(this.state.currentMusicItem);
		//事件订阅器
		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
			
			this.setState({
				musicList:this.state.musicList.filter(item=>{
					return item !==musicItem;
				})
			})
		});
		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
			this.playMusic(musicItem);
		});
		Pubsub.subscribe('PLAY_NEXT',(msg,data)=>{
			debugger;
			this.playNext();
		});
		Pubsub.subscribe('PLAY_PREV',(msg,data)=>{
			this.playNext('prev');
		});
	},
	componentWillUnMount(){
		Pubsub.subscribe('DELETE_MUSIC');
		Pubsub.subscribe('PLAY_MUSIC');
		Pubsub.subscribe('PLAY_PREV');
		Pubsub.subscribe('PLAY_NEXT');
		$("#player").unbind($.jPlayer.event.ended);
	},
	progressChangeHandler(progress){
	
	},
	/**
	 * MusicList接受参数
	 */
	render(){
		debugger;
		var childrenWithProps = React.cloneElement(this.props.children, this.state);
	    return (
		      <div>
		        <Header />
		        {childrenWithProps}
		      </div>
	    );
		
	}
});
let Root=React.createClass({
	
	render(){
		
		return(
			
		<Router history={hashHistory}>
			   <Route path="/" component={App}>
			      <IndexRoute component={Player}/>
			      <Route path="/list" component={MusicList}></Route>
			   </Route>
		</Router>
		)
	}
});
export default Root;
