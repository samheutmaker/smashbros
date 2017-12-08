import { Component, PropTypes } from 'react'
import stylesheet from 'client/styles/index.scss'

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render(){
		return (
		  <div className="Layout">
			<style dangerouslySetInnerHTML={{ __html: stylesheet }} />
		    {this.props.children}
		  </div>
		);
	}
}

export default Layout
