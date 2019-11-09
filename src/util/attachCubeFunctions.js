export const AddCardToCube = (cube, card) => {
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

export const RemoveCardFromCube = ( cube, card /* etc. */ ) => {

};

export const AddCardToWorkspace = ( cube, card ) => {
    // TODO
    console.log( 'Adding Card to Workspace', card );
};

export const RemoveCardFromWorkspace = ( cube, card ) => {
    // TODO
    console.log( 'Removing Card from Workspace', card );
};