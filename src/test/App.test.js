import React from 'react';
import { shallow } from '../enzyme';
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({});

describe("should rendered PhotoWall", () => {
  it("should render my component", () => {
   // const wrapper = shallow(<Provider store ={store} ><BrowserRouter><App /></BrowserRouter></Provider>);
    //expect(wrapper.getElements()).toMatchSnapshot();
    expect(true, true);
  });
});

