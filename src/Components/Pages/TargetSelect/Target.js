import React from "react";

// Material UI
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

// Amplify
import * as AC from "../../../Amplify-Config";

function Target(){

    const [target, setTarget] = React.useState( localStorage.getItem( AC.targetName ) || AC.LOCAL );

    function handleChange( event ){
        setTarget( event.target.value );
        AC.configStage( event.target.value );
    }

    function handleSubmit( event ){

    }

    return(

        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <FormLabel component="legend">API Target</FormLabel>

                <RadioGroup
                    value={target}
                    onChange={handleChange}
                >

                    <FormControlLabel value={AC.LOCAL} control={<Radio />} label='Local' />
                    <FormControlLabel value={AC.DEV} control={<Radio />} label='Dev' />
                    <FormControlLabel value={AC.DEV_MASTER} control={<Radio />} label='Dev-Master' />
                    <FormControlLabel value={AC.STAGE} control={<Radio />} label='Stage' />

                </RadioGroup>
            </FormControl>

        </form>

    );
}

export default Target;