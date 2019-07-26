import request from 'superagent'

const dataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
    case 'GET_TODO_DATA':
      /*
    In case we receive an action to send an API request, send the appropriate request
    */
      request.get('https://api.themoviedb.org/3/movie/now_playing?api_key=fa39a67213a167e55b22d949a1df5022&language=en-US&page=1').end((err, moviesRes) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: 'GET_TODO_DATA_ERROR',
            err
          })
        }
        request.get('https://api.themoviedb.org/3/genre/movie/list?api_key=fa39a67213a167e55b22d949a1df5022&language=en-US').end((err, genreRes) => {
            if (err) {
              /*
              in case there is any error, dispatch an action containing the error
              */
              return next({
                type: 'GET_TODO_DATA_ERROR',
                err
              })
            }
    
            let data = {results:JSON.parse(moviesRes.text).results,genres:JSON.parse(genreRes.text).genres}
            let movieList=[];
            if(data.results && data.genres){
                data.results.forEach(movie => {
                    movie = {...movie,genreString:[]};
                    data.genres.forEach(genre=>{
                     
                      movie.genre_ids.forEach(movieGenre=>{
                        if(Number(genre.id)===Number(movieGenre)){
                           // console.log(genre.id,'   ',movieGenre);
                              movie.genreString.push(genre.name,","); 
                            }
                          })
                        });
                        
                        movieList.push(movie);
                      });
                      movieList =  movieList.sort((a,b)=>b.popularity-a.popularity);
                      data ={results:movieList,genres:data.genres};


                    }

        
        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */
        next({
          type: 'GET_TODO_DATA_RECEIVED',
          data
        })
         })
      })
      break
    /*
  Do nothing if the action does not interest us
  */
    default:
      break
  }
}

export default dataService