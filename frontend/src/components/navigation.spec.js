import { createMount } from '@material-ui/core/test-utils';
import { Navigation } from './navigation';
import React from 'react';

describe('<Navigation />', () => {
    let mount;
  
    beforeAll(() => {
        mount = createMount();
    });
  
    afterAll(() => {
        mount.cleanUp();
    });
  
    it('can render navigation component', () => {
        const wrapper = mount(<Navigation />);
    });
});