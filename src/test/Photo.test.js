import React from 'react';
import { shallow } from '../enzyme';
import Photo from '../Photo';

describe("should rendered Photo", () => {
  it("should render my component", () => {
    
    const wrapper = shallow(<Photo url="/dzBtMocZuJbjLOXvrl4zGYigDzh.jpg"/>);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
