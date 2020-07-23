const initialState = {
    diner: {

    },
    operator: {
        trucks: [
            {
                menu: [
                    {
                        itemName: '',
                        itemDescription: ''
                    }
                ]
            }
        ]
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}