import React, { Component} from "react";
import axios from "axios";


export default class PlantList extends Component {
  constructor(props)  {
    super(props);
 
  // add state with a property called "plants" - initialize as an empty array
    this.state = {
      plants: [],
      plantType: "all"
    }
  }

  componentWillMount() {
    axios
      .get(`http://localhost:3333/plants`)
      .then( res => {
        console.log(this.props);
        
        this.setState({...this.state, plantType: this.props.plantType});

        if(this.state.plantType === "all"){
          this.setState({plants: res.data.plantsData});
        }else{
          const newPlants = res.data.plantsData.filter((plant)=>{
            return plant.light === this.props.plantType;
          })

          this.setState({plants: newPlants});
        }


        
      })
      .catch(err => console.log(err)
      , [this.state.plantType]);

      //this.setState({plants: res});

  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.plantType !== this.state.plantType) {
      console.log(this.state.plantType);
    }
  }


  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  render() {
    return (
      
      <main className="plant-list">
        
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
