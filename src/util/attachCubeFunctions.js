
// Add the necessary functions onto the Cube object
export default (cube) => {
    cube.addCardToCube = ( card ) => {

        console.log( 'Adding Card to Cube', card );

        // TODO
        cube.lists.cube.push( card );

    };

    cube.addCardToWorkspace = ( card ) => {

        console.log( 'Adding Card to Workspace', card );

        // TODO

    }
}