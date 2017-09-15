import React from 'react'
import Progress from '../components/progress'
import './player.less'
import {Link } from 'react-router'
import Pubsub from 'pubsub-js'
 //播放页面
let duration=null;
let Player=React.createClass({
	//数据的定义
	getInitialState(){
		return {
			progress:0,
			volume:0,
			isPlay:true,
			syTime:0
		}
	},
	componentDidMount(){
		$("#player").bind($.jPlayer.event.timeupdate,(e)=>{
			//获得音乐播放的总时间长度
			duration=e.jPlayer.status.duration;
			this.setState({
				//e.jPlayer.status.currentPercentAbsolute
				progress:e.jPlayer.status.currentPercentAbsolute,
			    volume:e.jPlayer.options.volume*100,
			    syTime:this.formateTime(duration*(1-e.jPlayer.status.currentPercentAbsolute/100))
			});
		});
	},
	formateTime(time){
		time=Math.floor(time);
		let miniutes=Math.floor(time/60);
		let seconds=Math.floor(time%60);
		seconds=seconds < 10 ?'0${seconds}' :seconds;
		return `${miniutes}:${seconds}`;
	},
	componentWillUnMount(){
		$("#layer").unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler(progress){
		//设置播放时间  触发$.jPlayer.event.timeupdate这个事件  进而会触发this.setState方法  然后导致progress变化  然后更新Progress组件 。。。。
	  $("#player").jPlayer('play',duration*progress);
	},
	voiceChangeHandler(progress){
		$("#player").jPlayer('volume',progress);
	},
	play(){
		if(this.state.isPlay){
			$("#player").jPlayer('pause');
		}else{
			$("#player").jPlayer('play');
		}
		this.setState({
			isPlay:!this.state.isPlay
		})
	},
	//事件派发
	playNext(){
		Pubsub.publish('PLAY_NEXT','a');
	},
	playPrev(){
		Pubsub.publish('PLAY_PREV','b');
	},
	render(){
		debugger;
		return(
		<div className="player-page">
	        <h1 className="caption">
	         <Link to="/list">我的私人音乐坊 &gt;</Link>
	        </h1>
        <div className="mt20 row">
          <div className="controll-wrapper">
            <h2 className="music-title">
              {this.props.currentMusicItem
.title}
            </h2>
            <h3 className="music-artist mt10">
             {this.props.currentMusicItem
.artist}
            </h3>
            <div className="row mt20">
              <div className="left-time -col-auto">{this.state.syTime}</div>
              <div className="volume-container">
                <i className="icon-volume rt" style={{
                  top: 5,
                  left: -5
                }}></i>
                <div className="volume-wrapper">
                 <Progress
                    progress={this.state.volume}
                    onProgressChange={this.voiceChangeHandler}
                    >
                </Progress>
                
                
              </div>
            </div>
            </div>
            <div style={{
              height: 10,
              lineHeight: '10px',
              marginTop: '20px'
            }}>
	              <Progress
	                 progress={this.state.progress}
	                 onProgressChange={this.progressChangeHandler}
	              >
	              
	              </Progress>
            </div>
           
            <div className="mt35 row">
              <div>
                <i className="icon prev" onClick={this.playPrev}></i>
                <i className={`icon ml20 ${this.state.isPlay?'pause':'play'}`}
                  onClick={this.play}>
                
                </i>
                <i  className="icon next ml20" onClick={this.playNext}></i>
              </div>
              <div className="-col-auto">
                <i className="icon repeat-cycle"></i>
              </div>
            </div>
          </div>
          <div className="-col-auto cover">
            <img
              src={this.props.currentMusicItem
.cover}
              alt={this.props.currentMusicItem
.title}/>
          </div>
        </div>
     </div>
		);
	}
});

export default Player
