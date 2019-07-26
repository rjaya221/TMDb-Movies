function fetchData(index){
    return {
        type: 'GET_TODO_DATA',
        index: index
    }

}

export default fetchData;