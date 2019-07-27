
import {connect} from 'react-redux';

import Main from './component/Main';
console.log("App.js is called");
function mapStateToProps (state ) {
  console.log("posts which is a props is mapped with state");
  return {
    posts:state
  };
  
};
console.log("App will connect props to main");
const App= connect(mapStateToProps)(Main) ;
console.log("props and main are connected now ");
export default App;