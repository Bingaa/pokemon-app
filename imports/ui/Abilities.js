import React, { Component } from 'react';

export default class Abilities extends Component{
  constructor(props){
    super(props);
    this.state = {
      abilities: [],
      loading: true
    };

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.name != this.props.name){
      this.state.loading = true;
        let self = this;
        Meteor.call('getAbilities',nextProps.abilities,
          function(error,result){
            self.setState({
              abilities: result,
              loading: false
            });
            console.log(result);
          });
    }
  }

  render(){
    let abilityObject;
    if(this.state.loading){
      abilityObject = <div>
        <h4 className="card-header">Abilities</h4>
        <div className="loader"></div>
      </div>;
    } else {
      abilityObject = (
        <div>
        <h4 className="card-header">Abilities</h4>
        <table className="table table-hover">
        <thead>

        <tr>
          <th>Name</th>
          <th>Effect</th>
        </tr>
        </thead>
        <tbody>
          {this.state.abilities.map(function(ability, i){
             return (
               <tr key={i}>
               <td>{ability.name.replace("-", " ")}</td>
               <td>{ability.effect}</td>
                </tr>
             )
           })}
           </tbody>
         </table>
        </div>
      );
    }

    return abilityObject;
  }

}
