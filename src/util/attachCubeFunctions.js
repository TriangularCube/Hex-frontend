
// Add the necessary functions onto the Cube object
export default (cube) => {
    cube.addCardToCube = ( card ) => {

        // DEBUG
        console.log( 'Adding Card to Cube', card );

        cube.lists.cube.push( card );
        // TODO Sort

        cube.lists.cube.sort( (a, b) => {
            if( a.name > b.name ){
                return -1;
            }
            if( b.name > a.name ){
                return 1;
            }
            return 0;
        });

    };

    cube.addCardToWorkspace = ( card ) => {

        console.log( 'Adding Card to Workspace', card );

        // TODO

    };

    cube.removeCardFromCube = ( index ) => {

    };
}