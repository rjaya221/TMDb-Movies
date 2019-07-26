import React, {Component} from 'react';

import Photo from './Photo';

class MovieWall extends Component{
    render(){
       
        const moviesList=this.props.moviesList;
       
        return(<div className="photoGrid">
            {moviesList.map((movie)=><div key={movie.id}>
            <figure><Photo url={movie.poster_path}/>
                <figcaption><h5>Title: {movie.title}</h5></figcaption>
                <figcaption><h5>Rating: {movie.vote_average}</h5></figcaption>
                <figcaption><h5>Popularity: {movie.popularity}</h5></figcaption>
                <figcaption><h5>Genre: {movie.genreString}</h5></figcaption>
            </figure>
            </div>)}
        </div>);
    }
}

export default MovieWall;