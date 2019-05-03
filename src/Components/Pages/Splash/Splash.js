import React, {useEffect} from "react";

// Material UI Utils
import makeStyles from "@material-ui/styles/makeStyles";

// Material UI Components
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	paper: {
		textAlign: 'center'
	}
});

function Splash(){

	const classes = useStyles();

	// Set title in a hook
	useEffect(() => {
		document.title = 'Hexahedron';
	}, [] );

	// TODO Placeholder page
	return(

		<Paper className={classes.paper}>
			<Typography>
				Splash Page
			</Typography>
		</Paper>

	)

}

export default Splash;