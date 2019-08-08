import React from "react";

// Material UI
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button, Typography } from "@material-ui/core";

// Amplify
import * as AC from "~/util/amplify/Amplify-Config";

const Target = () => {

    const [target, setTarget] = React.useState( localStorage.getItem( AC.targetName ) || AC.LOCAL );
    const [selectedTarget, setSelectTarget] = React.useState( target );

    function handleChange( event ){
        setSelectTarget( event.target.value );
    }

    function handleSubmit( event ){

        setTarget( selectedTarget );
        AC.configStage( selectedTarget );

        event.preventDefault();

    }

    return(
        <>
            <Typography variant='h5'>
                Current target is: {target}
            </Typography>

            <br />

            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">API Target</FormLabel>

                    <RadioGroup
                        value={selectedTarget}
                        onChange={handleChange}
                    >

                        <FormControlLabel value={AC.LOCAL} control={<Radio />} label='Local' />
                        <FormControlLabel value={AC.DEV} control={<Radio />} label='Dev' />
                        <FormControlLabel value={AC.DEV_MASTER} control={<Radio />} label='Dev-Master' />
                        <FormControlLabel value={AC.STAGE} control={<Radio />} label='Stage' />

                    </RadioGroup>

                    <br />

                    <Button variant='contained' disabled={ target === selectedTarget } type='submit' color='primary'>
                        Submit!
                    </Button>
                </FormControl>
            </form>

        </>

    );
};

export default Target;