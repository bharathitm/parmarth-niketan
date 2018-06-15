import React from 'react';
import ReactDOM from 'react-dom';

import { Dashboard } from './components/dashboard/Dashboard';

import {Tabs, TabLink, TabContent} from 'react-tabs-redux';
import { Reservations } from './components/reservations/Reservations';

ReactDOM.render(
            
      <Tabs class="tabs">
            <TabLink to="Dashboard">Dashboard</TabLink>
            <TabLink to="Reservations">Reservations</TabLink>
            <TabLink to="Reports">Reports</TabLink>
                  <hr/>
            <TabContent for="Dashboard"><h3>Dashboard</h3><Dashboard/></TabContent>
            <TabContent for="Reservations"><h3>Add a Reservation</h3><Reservations/></TabContent>
            <TabContent for="Reports"><h3>Reports</h3></TabContent>
      </Tabs>,
        document.getElementById('root')
  );