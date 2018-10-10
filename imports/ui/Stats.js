import React, { Component } from 'react';

export default class Stats extends Component{

  constructor(props){
    super(props);
        this.state = { 
            baseSpeed: 0, 
            baseSpecialDefense: 0, 
            baseSpecialAttack: 0, 
            baseDefense: 0, 
            baseAttack: 0, 
            baseHP: 0, 


        }

  }



  componentWillReceiveProps(nextProps) {
      if (nextProps.id != this.props.id){
        this.setState({ 
            baseSpeed: nextProps.stats[0].base_stat, 
            baseSpecialDefense: nextProps.stats[1].base_stat, 
            baseSpecialAttack: nextProps.stats[2].base_stat, 
            baseDefense: nextProps.stats[3].base_stat, 
            baseAttack: nextProps.stats[4].base_stat, 
            baseHP: nextProps.stats[5].base_stat, 
        });
      }
  }
  render() {
    return  (
        <div>
        <h4 className="card-header">Stats Calculator</h4>
        <table className="table table-hover">
        <thead>
            <tr>
                <th>Stat</th>
                <th>Value</th>
                <th>Effort Values</th>
                <th>Individual Values</th>
            </tr>
        </thead>
            <tbody>
            <tr>
                <td>HP</td>
                <td>{this.state.baseHP}</td>
                <td><input type="number" min="0" max="255"/></td>
                <td><input type="number" min="0" max="31"/></td>
            </tr>
            <tr>
                <td>Attack</td>
                <td>{this.state.baseAttack}</td>
                <td><input type="number" min="0" max="255"/></td>
                <td><input type="number" min="0" max="31"/></td>
            </tr>
            <tr>
                <td>Defense</td>
                <td>{this.state.baseDefense}</td>
                <td><input type="number" min="0" max="255"/></td>
                <td><input type="number" min="0" max="31"/></td>
            </tr>
            <tr>
                <td>Special Attack</td>
                <td>{this.state.baseSpecialAttack}</td>
                <td><input type="number" min="0" max="255"/></td>
                <td><input type="number" min="0" max="31"/></td>
            </tr>
            <tr>
                <td>Special Defence</td>
                <td>{this.state.baseSpecialDefense}</td>
                <td><input type="number" min="0" max="255"/></td>
                <td><input type="number" min="0" max="31"/></td>
            </tr>
            <tr>
                <td>Speed</td>
                <td>{this.state.baseSpeed}</td>
                <td><input type="number" min="0" max="255"/></td>
                <td><input type="number" min="0" max="31"/></td>
            </tr>

            </tbody>
        </table>
        </div>
      );

  }
}
