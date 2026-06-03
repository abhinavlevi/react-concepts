export default function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload

        case 'DECREMENT':
            return state - action.payload

        case 'RESET':
            return 0

        default:
            return state

    }

}