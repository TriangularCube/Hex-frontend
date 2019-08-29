import React, {useEffect} from "react";

// Material UI Utils
import { makeStyles } from "@material-ui/styles";

// Material UI Components
import { Paper, Typography, Container } from "@material-ui/core";

const useStyles = makeStyles({
	paper: {
		textAlign: 'center',
		flex: 1,
		width: '100%'
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
		<Container maxWidth='md'>
			<Paper className={classes.paper}>
				<Typography>
					Splash Page
				</Typography>
			</Paper>
		</Container>
	)

};

export default Splash;