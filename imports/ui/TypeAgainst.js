import React, { Component } from 'react';

export default class TypeAgainst extends Component{
  constructor(props){
    super(props);
    this.state = {
      typeDisadvantages: {},
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name != this.props.name){
      console.log(nextProps.types);
      this.state.loading = true;
        let self = this;
        Meteor.call('getTypeAgainst',nextProps.types,
          function(error,result){
            self.setState({
              typeDisadvantages: result,
              loading: false
            });
            console.log(result);
          });
    }
  }

  render(){
    let types = [];
    let damage = [];
    let type;
    for (type in this.state.typeDisadvantages){
      types.push(type.charAt(0).toUpperCase() + type.substr(1));
      damage.push(this.state.typeDisadvantages[type]);
    }

    let typeDisadvantagesObject;
    if(this.state.loading){
      typeDisadvantagesObject =   (
        <div>
          <h4 className="card-header">Damage Against</h4>
          <div className="loader"></div>
        </div>
      );
    } else {
      typeDisadvantagesObject = (
        <div>
        <h4 className="card-header">Damage Against</h4>
          <table className="table-bordered ">
            <thead>
              <tr>
                {types.map(function(type, i){
                   return (
                     <td key={i} font="bold"align="center">
                      {type}
                      </td>
                   )
                 })}
               </tr>
             </thead>
             <tbody>
             <tr>
             {damage.map(function(dmg, i){
                return (
                  <td key={i} align="center">
                   {dmg.toString() + "X"}
                   </td>
                )
              })}
              </tr>
             </tbody>
           </table>


        </div>
      );
    }
    return typeDisadvantagesObject;
  }

}
