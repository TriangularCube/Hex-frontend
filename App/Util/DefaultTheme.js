const spacing = 8;

export default {
    spacing: {
        unit: spacing
    },
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
    isLarge: 'sm',
    pageMaxWidth: 900
};