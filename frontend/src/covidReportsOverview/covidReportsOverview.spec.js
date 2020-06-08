import { createMount } from '@material-ui/core/test-utils';
import { ReportsOverview } from './covidReportsOverview';
import Typography from '@material-ui/core/Typography';
import React from 'react';

describe('<ReportsOverview />', () => {
    let mount;
  
    beforeAll(() => {
        mount = createMount();
    });
  
    afterAll(() => {
        mount.cleanUp();
    });
  
    it('can render overview component', () => {
        const wrapper = mount(<ReportsOverview />);
    });

    it('shows the introductory message', () => {
        const wrapper = mount(<ReportsOverview />);
        expect(wrapper.find(Typography).text()).toEqual('');
    });
});