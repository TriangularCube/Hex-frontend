import React from "react";

// Material UI
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Amplify
import * as AC from "~/Amplify-Config";

function Target(){

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
}

export default Target;