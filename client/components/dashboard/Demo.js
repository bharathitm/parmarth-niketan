import React from 'react';

//import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

export class Demo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
       // fruits: ['apple','watermelon']
        fruits: []
      };
    }
   
   
    render() {
      // the checkboxes can be arbitrarily deep. They will always be fetched and
      // attached the `name` attribute correctly. `value` is optional
      return (
        <div></div>
        // <CheckboxGroup
        //   checkboxDepth={3} // This is needed to optimize the checkbox group
        //   name="fruits"
        //    value={this.state.fruits}
        //   onChange={this.fruitsChanged}>
   
        //   <label><Checkbox value="apple"/> Apple</label>
        //   <label><Checkbox value="orange"/> Orange</label>
        //   <label><Checkbox value="watermelon"/> Watermelon</label>
        // </CheckboxGroup>
      );
    }
    
    fruitsChanged = (newFruits) => {
      this.setState({
        fruits: newFruits
      }, () => {
        for (var i =0; i <this.state.fruits.length; i++)
        {  
          alert(this.state.fruits[i]);
        }

      });      
    }
    
  };

  export default Demo;