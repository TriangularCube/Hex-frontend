// Material UI
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Button, Typography } from "@material-ui/core";

// Config
import { targetName, setConfig } from "../../../util/config";
import { targets } from "../../../util/constants";

const Target = () => {

    const [target, setTarget] = React.useState( localStorage.getItem( targetName ) );
    const [selectedTarget, setSelectTarget] = React.useState( target );

    function handleChange( event ){
        setSelectTarget( event.target.value );
    }

    function handleSubmit( event ){

        event.preventDefault();

        setTarget( selectedTarget );

        const configObject = Object.values( targets )
            .find( config => config.stage === selectedTarget );
        setConfig( configObject );

    }

    return(
        <div>
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

                        <FormControlLabel value='local' control={<Radio />} label='Local' />
                        <FormControlLabel value='dev' control={<Radio />} label='Dev' />
                        <FormControlLabel value='dev-master' control={<Radio />} label='Dev-Master' />
                        <FormControlLabel value='staging' control={<Radio />} label='Staging' />

                    </RadioGroup>

                    <br />

                    <Button variant='contained' disabled={ target === selectedTarget } type='submit' color='primary'>
                        Submit!
                    </Button>
                </FormControl>
            </form>

        </div>

    );
};

export default Target;