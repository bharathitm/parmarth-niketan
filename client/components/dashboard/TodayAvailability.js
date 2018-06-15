import React from 'react';

import blocks from '../../constants/blocks';

export class TodayAvailability extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,       
      };
    }


  componentDidMount() {
    
    fetch("http://localhost:3000/api/arooms/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
    }

    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
      return (
        <div> 
            Error: 
            {error.message}
        </div>
        );
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          return (
            <div><h4>Today's Availability</h4>
             <ul className="todayAvailability" style={{overflow: 'auto', listStyleType: 'none'}}>
                 {items.map(item => (
                  <li style={{ float: 'left', margin: 0, border: '1px solid #aaa', padding: '10px'}} key={item.block_id}>
                    <a href="#">
                      {item.count} <br/>
                    {blocks[item.block_id]} 
                    
                    </a>
                  </li>
                ))}
             </ul>
             </div>
          );
        }
      }
    }
/*
    const element = <TodayAvailability />;
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
*/

export default TodayAvailability;