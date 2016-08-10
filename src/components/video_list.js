import React from 'react';
import VideoListitem from './video_list_item';

const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return <VideoListitem 
		onVideoSelect={props.onVideoSelect}
		video={video}
		key={video.etag} />
	});
	return (
		<ul className="col-md-4 list-group">
		{videoItems}
		</ul>
	)
}

export default VideoList;