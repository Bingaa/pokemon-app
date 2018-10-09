import React, { Component } from 'react';

import Evolution from './Evolution.js'
export default class Species extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      types: [],
      id: "",
      weight: "",
      height: "",
      baseHappines: "",
      captureRate: "",
      growthRate: "",
      eggGroups: [],
      description: "",
      evolutionChainIndex: ""
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.id != this.props.id){
        this.state.loading = true;
        let self = this;

        Meteor.call('getSpecies', nextProps.id,
          function(error, result){
            self.setState({
              loading: false,
              types: nextProps.types,
              id: nextProps.id,
              weight: nextProps.weight,
              height: nextProps.height,
              baseHappines: result.baseHappiness,
              captureRate: result.captureRate,
              growthRate: result.growthRate,
              eggGroups: result.eggGroups,
              description: result.description,
              evolutionChainIndex: result.evolutionChainIndex
            });
            console.log(result);
        });
      }
  }
  render() {
    return  (
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <td>Pokedex No.</td>
                <td>Type</td>
                <td>Weight</td>
                <td>Height</td>
                <td>Base Happiness</td>
                <td>Capture Rate</td>
                <td>Egg Group</td>
                <td>Description</td>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>{this.state.id}</td>
              <td>

                  {this.state.types.map(function(typeDetails, i){
                     return (
                       <p key={i} className={typeDetails.type.name}>
                         {typeDetails.type.name}
                        </p>
                     )
                   })}

              </td>
              <td>{this.state.weight}</td>
              <td>{this.state.height}</td>
              <td>{this.state.baseHappines}</td>
              <td>{this.state.captureRate}</td>
              <td>
                  {this.state.eggGroups.map(function(egg, i){
                     return (
                       <p key={i}>
                         {egg.name}
                        </p>
                     )
                   })}
              </td>
              <td>{this.state.description}</td>
            </tr>

              </tbody>
          </table>
          <Evolution evolutionChainIndex={this.state.evolutionChainIndex}/>
        </div>
      );

  }
}
