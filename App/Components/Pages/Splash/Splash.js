import React from 'react';

// Material UI Utils
import withStyles from '@material-ui/core/styles/withStyles'

// Material UI Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {

	paper: {
		margin: '2vh auto',
		maxWidth: 600,
		textAlign: 'center'
	}

};

class Splash extends React.PureComponent{

	componentDidMount() {
		document.title = 'Hexahedron';
	}

	render(){
		const { classes } = this.props;

		return(

			<Paper className={classes.paper}>
				<Typography>
					Splash Page
				</Typography>
			</Paper>

		)
	}

}

let ws = withStyles( styles )( Splash );
export default ws;