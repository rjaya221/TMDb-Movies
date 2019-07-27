import React, { Component } from 'react';
import '../App.css';
import '../index.css';
import MovieWall from './MovieWall';
import fetchDataAction from '../redux/action'
import RatingComponent from './RatingComponent';

console.log("Main is invoked");

class Main extends Component {
  constructor(props){
    super(props);
    console.log("Inside constructor ",props);
    this.state = {moviesList:[],genres:[],genreFilter:[],checked:3,filteredMovies:[],selectedFilterType:"-1",isConfirmed:false};
    console.log("state initialized in main ");
  }
  componentDidUpdate(){
    console.log("componentDidUpdate")
  }
  componentWillUpdate(){
    console.log("componentWillUpdate")
  }
  componentDidMount(){
    console.log("componentDidMount");
    this.props.dispatch(fetchDataAction("6"));
  }
componentWillMount(){
  console.log("componentWillMount")
}


  filterTypeChange=(e)=> {
    console.log(" changeFilterType called",e.target.value);
    this.setState({selectedFilterType:e.target.value});

    this.setState({filteredMovies:this.props.posts.results});
    this.setState({moviesList:this.props.posts.results});

    if(e.target.value === 'Rating'){
       let movieList =this.state.moviesList;
           movieList =movieList.filter(movie=>Number(movie.vote_average) >= Number(3));
           console.log("filteredMovies  ",movieList);
           this.setState({filteredMovies:movieList});
        }else{
           
            console.log("before updating the genre in state",this.props.posts);
            this.setState({genres:this.props.posts.genres});
            

        }
   }
   
  componentWillUnmount(){
    console.log("componentWillUnmount")
  }

  genreChangeListener=(e)=>{
      console.log("this.selectedFilterType", this.state.selectedFilterType);
      let genres = this.state.genres;
      let genreFilter = this.state.genreFilter;
     
      genres.forEach(element => {
        if (element.id === Number(e.target.value)) {
          if (e.target.checked) {
            console.log("got 1 data to push")
            genreFilter.push(e.target.value);
          } else {
            if (this.state.genreFilter.includes(e.target.value)) {
              let index = genreFilter.indexOf(e.target.value);
              if (index > -1) {
                genreFilter.splice(index, 1);
              }
          }}}
      });
      genreFilter = genreFilter.sort((a,b)=>a-b);
      this.setState({genreFilter});

      //console.log("genreFilter ::::",genreFilter);

    let movieList =  this.state.moviesList;
   
    let selectedMovies = [];
     movieList.forEach(movie=>{
         let isallGenrePresent = true;
        // console.log("movie.genre_ids ::::",movie.genre_ids);
        genreFilter.forEach(genre=>{
          //  console.log("movie.includes ::::",movie.genre_ids.toString().includes(genre));
                if(!movie.genre_ids.toString().includes(genre)){
                    isallGenrePresent =false;
                }
         })
         //adding movie object when condition matching
         if(isallGenrePresent){
            selectedMovies.push(movie);
         }
        
      })
      //console.log("filteredMovies  ",selectedMovies);
      this.setState({filteredMovies:selectedMovies});

  }


ratingChangeListener=(e)=>{
          console.log("selected rating ::",e.target.value);
          let movieList =this.state.moviesList;
          movieList =movieList.filter(movie=>Number(movie.vote_average) >= Number(e.target.value));
        //  console.log("filteredMovies  ",movieList);
          this.setState({filteredMovies:movieList});
  }
  buttonClicked=()=>{
    this.setState({isConfirmed:true});
    this.setState({filteredMovies:this.props.posts.results});
    this.setState({moviesList:this.props.posts.results});
  }
  
  render() {
  
  return (
    <div>
    {!this.state.isConfirmed? 
    <div><h1>Welcome to TMDb Movies</h1>
    <div style={{position: 'relative',left: '630px'}}>
   <h2>Please Press the Confirm button to Continue. </h2>
   <button style={{marginLeft: '130px', marginTop: '20px'}}  className="ui button" onClick={this.buttonClicked}>Confirm</button>
   </div>
   </div>:
   <div>
   <h1>TMDb Movies</h1>

  

 
<div style={{display:'flex'}}>
    {this.props.isLoading?<p><h1>Loading…</h1></p>:""}
         <div style={{position:'relative',left:'100px'}}>
             <div style={{width: '440px', alignItems: 'center'}}>
                 <label><h3>Select Filter: </h3></label>
                 <div className="styled-select blue semi-square">

                    <select onChange={this.filterTypeChange}>
                        <option value="-1">Select</option>
                        <option value="Genre">Genre</option>
                        <option value="Rating">Rating</option>
                 </select></div>
                 </div>
            {this.state.selectedFilterType==='Rating'? <RatingComponent checked={this.props.checked} ratingAction={(e)=>this.ratingChangeListener(e)}/>: this.state.selectedFilterType==='Genre'?
                    <div onChange={this.genreChangeListener} >
                    { 
                        this.state.genres.map((genre,index)=><div key={index}><input style={{marginRight:'10px'}} type="checkbox" value={genre.id}/><label>{genre.name}</label><br/></div>)
                    }
                    </div>:<div></div>}
        </div>
        <div style={{display:'flex'}}>
            <MovieWall moviesList={this.state.filteredMovies}/>
        </div>

    </div></div>
    }

</div>);  
  }
}


export default Main;