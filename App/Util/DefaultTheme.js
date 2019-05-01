const spacing = 8;

export default {
    typography: {
        useNextVariants: true // Apparently default typography uses features being deprecated soon
    },
    mixins: {
        pageContainer: {
            maxWidth: 900,
            margin: `${spacing * 3}px auto`
        }
    },
    drawerWidth: 220,
    // Have to change Menu Drawer Hidden implementation as well
    isLarge: 'sm',
    pageMaxWidth: 900
};