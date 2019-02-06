import { createMuiTheme } from "@material-ui/core/es/styles";

const DefaultTheme = createMuiTheme( {
    typography: {
        useNextVariants: true // Apparently default typography uses features being deprecated soon
    }
});

export default {
    typography: {
        useNextVariants: true // Apparently default typography uses features being deprecated soon
    }
};