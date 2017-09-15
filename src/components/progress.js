import React from 'react'
import './progress.less'

let Progress=React.createClass({
	getDefaultProps(){
		return{
			bgc:'#2f9842'
		}
			
		
	},
	changeProgress(e){
		let progressBar=this.refs.progressBar;
		let progress=(e.clientX-progressBar.getBoundingClientRect().left)/ progressBar.clientWidth;
		//判断progressChangeHandler是不是存在 存在的话再去调用 
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},
	render(){
		return(
			<div className="components-progress row" ref="progressBar" onClick={this.changeProgress}>
			  <div className="progress" style={{width:`${this.props.progress}%`,backgroundColor:this.props.bgc}}></div>
			
			 
			</div>
		);
	}
});
export default Progress;
