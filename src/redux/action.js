const fetchDataAction=function fetchData(index){
    return {
        type: 'GET_TODO_DATA',
        id: index
    }

}

export default fetchDataAction;