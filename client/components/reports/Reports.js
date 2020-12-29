import React from 'react';
import ErrorBoundary from '../ErrorBoundary';
import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';
import {getFormattedDate} from '../../utils/helpers';
import {Suspense, lazy} from 'react';

export class Reports extends React.Component {

    constructor(props) {
      super(props);

       this.state = {
            error: null,
            isLoaded: false,
            renderView: null
        };

        this.reportStore = {
            startDate: moment(),
            endDate: moment()
        };
    }

    updateReportStore(update) {
        this.reportStore = {
          ...this.reportStore,
          ...update,
        }
      }

    handleReservations(){
        this.setState({renderView: 1});       
    }

    handleCheckIns(){
        this.setState({renderView: 2});     
    }

    handleCheckOuts(){
        this.setState({renderView: 3});  
    }

    handleKathas(){
        this.setState({renderView: 4});  
    }

    handleGridCheckIns(){
        this.setState({renderView: 5});  
    }
    
    render() {   
        switch (this.state.renderView) {            
            case 1:
                const ReservationReport = lazy(() => import('../subcomponents/ReservationReport'));

                return (<Suspense fallback={<div id="loader" class="loaderCenter"></div> }>
                    <ReservationReport setRenderView={i => this.setState({renderView: i})}
                            startDate = {getFormattedDate(this.reportStore.startDate).toString()}
                            endDate = {getFormattedDate(this.reportStore.endDate).toString()} />
                            </Suspense>
                ); 
            case 2:
                const CheckInReport = lazy(() => import('../subcomponents/CheckInReport'));

                return (<Suspense fallback={<div id="loader" class="loaderCenter"></div> }>
                    <CheckInReport setRenderView={i => this.setState({renderView: i})}
                            startDate = {getFormattedDate(this.reportStore.startDate).toString()}
                            endDate = {getFormattedDate(this.reportStore.endDate).toString()} />
                            </Suspense>
                 );
            case 3:
                const CheckOutReport = lazy(() => import('../subcomponents/CheckOutReport'));

                return (<Suspense fallback={<div id="loader" class="loaderCenter"></div> }>
                <CheckOutReport setRenderView={i => this.setState({renderView: i})}
                        startDate = {getFormattedDate(this.reportStore.startDate).toString()}
                        endDate = {getFormattedDate(this.reportStore.endDate).toString()} />
                        </Suspense>
                );
            case 4:
                const KathaReport = lazy(() => import('../subcomponents/KathaReport'));
    
                return (<Suspense fallback={<div id="loader" class="loaderCenter"></div> }>
                        <KathaReport setRenderView={i => this.setState({renderView: i})}
                                startDate = {getFormattedDate(this.reportStore.startDate).toString()}
                                endDate = {getFormattedDate(this.reportStore.endDate).toString()} />
                                </Suspense>
                );
            case 5:
                const GridCheckInReport = lazy(() => import('../subcomponents/GridCheckInReport'));
    
                return (<Suspense fallback={<div id="loader" class="loaderCenter"></div> }>
                        <GridCheckInReport setRenderView={i => this.setState({renderView: i})} />
                        </Suspense>
                );
          }

          return (   
              <div className="divError">
                    <ErrorBoundary>   
                        <DatePeriodPicker
                                handleReservations={() => (this.handleReservations())}
                                handleCheckIns={() => (this.handleCheckIns())}
                                handleCheckOuts={() => (this.handleCheckOuts())}
                                handleKathas={() => (this.handleKathas())}
                                handleGridCheckIns={() => (this.handleGridCheckIns())}
                                updateReportStore={(u) => {this.updateReportStore(u)}} />
                    </ErrorBoundary>
                </div>
            );
          }
 }

export default Reports;
