import React from "react";

// Material UI Util
import { makeStyles } from "@material-ui/styles";

// Material UI
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
    root: {

    }
});

const Cube = () => {
    return(
        <Container maxWidth='lg'>
            <p>
                Cube Page
            </p>
        </Container>
    )
};

export default Cube;