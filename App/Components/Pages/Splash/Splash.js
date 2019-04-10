import { withStyles } from '@material-ui/core/styles'

import {Paper, Typography} from "@material-ui/core";

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