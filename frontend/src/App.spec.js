import { createMount } from '@material-ui/core/test-utils';
import App from './App';
import React from 'react';

describe('<App />', () => {
    let mount;
  
    beforeAll(() => {
        mount = createMount();
    });
  
    afterAll(() => {
        mount.cleanUp();
    });
  
    it('can render App Component', () => {
        const wrapper = mount(<App />);
    });

    it('renders basic structural components', () => {
        const wrapper = mount(<App />);
        expect(wrapper.find('#navigation').exists()).toBeTruthy();
        expect(wrapper.find('#header').exists()).toBeTruthy();
        expect(wrapper.find('#content').exists()).toBeTruthy();
    });
});