import { withStyles } from "@material-ui/core/styles";

const styles = {
    root: {
        marginTop: 60
    }
}

class Container extends React.Component{

    constructor( props ){
        super( props );
    }

    render(){
        const { classes } = this.props;

        return(

            <div className={classes.root}>
                { this.props.children }
            </div>

        )
    }

}

export default withStyles(styles)( Container );