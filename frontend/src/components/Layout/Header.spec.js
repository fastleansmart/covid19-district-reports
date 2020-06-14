import { createMount } from '@material-ui/core/test-utils';
import { Header } from './Header';
import Typography from '@material-ui/core/Typography';
import React from 'react';

describe('<Header />', () => {
    let mount;
  
    beforeAll(() => {
        mount = createMount();
    });
  
    afterAll(() => {
        mount.cleanUp();
    });
  
    it('can render overview component', () => {
        const wrapper = mount(<Header />);
    });

    it('shows the introductory message', () => {
        const wrapper = mount(<Header />);
        expect(wrapper.find('#introductory-text').exists()).toBeTruthy();
    });
});