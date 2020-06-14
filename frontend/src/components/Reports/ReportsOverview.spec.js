import { createMount } from '@material-ui/core/test-utils';
import { ReportsOverview } from './ReportsOverview';
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
});