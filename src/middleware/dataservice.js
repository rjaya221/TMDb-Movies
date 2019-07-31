import request from 'superagent'
import {MOVIE_URL,GENRE_URL} from '../constants/constant'
const dataService  = store =>next => action=> {
  /*
  Pass all actions through by default
  */
  next(action)
  console.log("middleware invoked",action);
  switch (action.type) {
    case 'GET_TODO_DATA':
         /*
          In case we receive an action to send an API request, send the appropriate request
         */

         let url =MOVIE_URL.concat(action.id);
         console.log("URL ::",url)

       request.get(url).end((err, moviesRes) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: 'GET_TODO_DATA_ERROR',
            err
          })
        }
     
        request.get(GENRE_URL).end((err, genreRes) => {
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
            let applicableGenreList = [];
            let applicableGenreKeys = [];
            if(data.results && data.genres){
              //console.log("data::",data.results);
             // console.log("genres::",data.genres);

              var genresMap = new Map(data.genres.map(i => [i.id, i.name]));
              console.log('genresMap::::',genresMap);
                data.results.forEach(movie => {
                //  console.log("movie::",movie);
                  movie = {...movie,genreString:[]};
                 // console.log("new movie object::",movie);
                  movie.genre_ids.map(movieGenre=>{
                    if(!applicableGenreKeys.includes(movieGenre) && applicableGenreList.length!==data.genres.length){



                      console.log(movieGenre," ",applicableGenreList," ",applicableGenreList.includes(movieGenre),"  ",genresMap.get(movieGenre));
                          applicableGenreList.push({id:movieGenre,name:genresMap.get(movieGenre)});
                          applicableGenreKeys.push(movieGenre);
                          console.log(" sss",applicableGenreList);
                        }
                      
                     if(genresMap.get(movieGenre)){
                          movie.genreString.push(genresMap.get(movieGenre),","); 
                              }
                           return movie;
                           });
                         
                          movieList.push(movie);
                       });
                      movieList =  movieList.sort((a,b)=>b.popularity-a.popularity);
                       console.log('data.genres::::',data.genres);
                       console.log('applicableGenreList::::',applicableGenreList);
                      data ={results:movieList,genres:applicableGenreList};
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