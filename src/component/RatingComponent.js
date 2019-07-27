import React, { Component } from 'react';
class RatingComponent extends Component {
          constructor(props){
              super(props);
              this.state={genres:[], rating:[0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10]}
          }
      
        
  render() {
   return (<div className="styled-select blue semi-square" style={{display: 'flex', marginTop: '20px!important'}}><select defaultValue="3" onChange={this.props.ratingAction}>
      {
                   this.state.rating.map((rating,index)=><React.Fragment key={index}><option value={rating}>{rating}</option></React.Fragment>)
                 }</select></div>);  
  }
}


export default RatingComponent;