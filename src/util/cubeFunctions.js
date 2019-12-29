export const AddCardToCube = (cube, card) => {
    // DEBUG
    console.log( 'Adding Card to Cube', card );

    const newCard = {
        id: card.id,
        data: card
    };

    cube.cubeList.default.push( newCard );

    // TODO Sort
    cube.cubeList.default.sort( (a, b) => {
        if( a.data.name > b.data.name ){
            return 1;
        }
        if( b.data.name > a.data.name ){
            return -1;
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