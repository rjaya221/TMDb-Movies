

const postReducer = function posts(state = [],action){
    console.log('Action Type::',action.type);
    switch (action.type) {
        /*
      Consider all received data as the initial list of
      todo items
      */
        case 'GET_TODO_DATA_RECEIVED':
          return action.data
        case 'GET_TODO_DATA_ERROR':
          return action.err
        default:
          return state
      }
}
export default postReducer;

