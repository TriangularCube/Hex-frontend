import React, {useEffect} from "react";

// Material UI Utils
import { makeStyles } from "@material-ui/styles";

// Material UI Components
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
	paper: {
		textAlign: 'center'
	}
});

const Splash = () => {

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

};

export default Splash;