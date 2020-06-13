import { createMount } from '@material-ui/core/test-utils';
import { ContentContainer } from './contentContainer';
import { BrowserRouter } from "react-router-dom";
import React from 'react';

describe('<ContentContainer />', () => {
    let mount;
  
    beforeAll(() => {
        mount = createMount();
    });
  
    afterAll(() => {
        mount.cleanUp();
    });
  
    it('can render App Component', () => {
        const wrapper = mount(<BrowserRouter><ContentContainer /></BrowserRouter>);
    });
});