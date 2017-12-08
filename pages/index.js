import { Component } from 'react'
import PropTypes from 'prop-types'
import Layout from '../client/components/Layout'
import * as Actions from '../client/actions/actions.js'
import ActionBinder from '../lib/ActionBinder'

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...Actions.getInitialState()
		}
	}
	actions(){
		return ActionBinder([Actions], this);
	}
	getChildContext(){
		return {
			actions: this.actions()
		};
	}
	componentDidMount() {
		this.actions().search();
	}
	render(){
		return (
			<Layout>	
				<div className="Index Page">
					<h1>Smashbros.</h1>
					<h2>ALBUM OUT NOW</h2>
					<div className="ImageContainer">
						<img src="/static/images/smash-bros-chop-suey.png" />
					</div>
				</div>
			</Layout>
		);
	}
}

Index.childContextTypes = {
  actions: PropTypes.object
};
