import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {term:''};
	}
	
	render() {
		return (
		<div className="search-bar">
			<div className="form-group">
				<label className="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
					<div className="input-group">
					<div className="input-group-addon btn-xs">Search</div>
					<input className="form-control"
					value={this.state.term}
					onChange={event => this.onInputChange(event.target.value)} />
					</div>
			</div>
		</div>
		);
	}
	
	onInputChange(term){
		this.setState({term});
		this.props.onSearchTermChange(term);
	}
	
}

export default SearchBar;