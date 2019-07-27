import React, { Component } from 'react';
class RatingComponent extends Component {
          constructor(props){
              super(props);
              this.state={genres:[], rating:[1,2,3,4,5,6,7,8,9,10]}
          }
      
        
  render() {
   return (<div class="styled-select blue semi-square" style={{display: 'flex', marginTop: '20px!important'}}><select defaultValue="3" onChange={this.props.ratingAction}>
      {
                   this.state.rating.map((rating,index)=><React.Fragment key={index}><option value={rating}>{rating}</option></React.Fragment>)
                 }</select></div>);  
  }
}


export default RatingComponent;