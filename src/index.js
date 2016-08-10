import _ from 'lodash';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//Add your API Key
const API_KEY = '';


//produces html

class App extends Component {

	constructor(props){
		super(props);

		this.state = {videos: [],
					  selectedVideo: null,
					  nextPageToken:null,
					  prevPageToken:null,
					  currentTerm:null};
		this.videoSearch('');
	}

	videoSearch(term){
		YTSearch({term:term,key:API_KEY},(data) =>{
		this.setState({ videos:data.items,
			selectedVideo:data.items[0],
			nextPageToken:data.nextPageToken?data.nextPageToken:'',
			prevPageToken:data.prevPageToken?data.prevPageToken:'',
			currentTerm:term
			});
		});
	}

	videoSearchPage(token){
		YTSearch({pageToken:token,term:this.state.currentTerm,key:API_KEY},(data) =>{
		this.setState({ videos:data.items,
			selectedVideo:data.items[0],
			nextPageToken:data.nextPageToken?data.nextPageToken:'',
			prevPageToken:data.prevPageToken?data.prevPageToken:''
			});
		});
	}

	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)},300)
	return (
	<div>
	<SearchBar onSearchTermChange={videoSearch}/>
	<div className="col-md-8"></div>
	<div className="col-md-4">
		<button type="button" className="col-md-4 btn btn-sm btn-margin"
		onClick={() => this.videoSearchPage(this.state.prevPageToken)}>Previous</button>
		<div className="col-md-4"></div>
		<button type="button" className="col-md-4 btn btn-sm btn-margin"
		onClick={() => this.videoSearchPage(this.state.nextPageToken)}>Next</button>
	</div>
	<VideoDetail video={this.state.selectedVideo}/>
	<VideoList
	onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
	videos={this.state.videos} />
	</div>
	);
	}
}

//put in the DOM

ReactDOM.render(<App />, document.querySelector('.container'));
