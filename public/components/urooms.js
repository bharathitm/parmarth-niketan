class URooms extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        items: [
          {}
        ],
      };
    }


  componentDidMount() {
    
    fetch("http://localhost:3000/api/urooms/")
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

            <div><h1>Housekeeping</h1>
                <hr />
                    <ol>
                        {items.map(item => (
                            <li key={item.room_booking_id}><input type="checkbox" />
                            {item.room_no}                         
                            </li>
                        ))}      
                    </ol>
            </div>
          );
        }
      }
    }

    // const element = <URooms />;
    // ReactDOM.render(
    //   element,
    //   document.getElementById('root')
    // );
