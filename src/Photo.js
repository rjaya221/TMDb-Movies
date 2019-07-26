import React from 'react';

 var Photo=(data)=>{
            return(<div><img className="single-photo" src={"https://image.tmdb.org/t/p/w500/"+data.url}  alt="No Display"/>
            </div>);
}
export default Photo;