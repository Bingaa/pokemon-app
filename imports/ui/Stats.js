import React, { Component } from 'react';

export default class Stats extends Component{

  constructor(props){
    super(props);
        this.state = { 
            speed: {
                base: 0, 
                ev: 0, 
                iv: 0
            }, 
            specialDefense: { 
                base: 0, 
                ev: 0, 
                iv: 0
            },
            specialAttack: { 
                base: 0, 
                ev: 0, 
                iv: 0
            },
            defense: { 
                base: 0, 
                ev: 0, 
                iv: 0
            },
            attack: { 
                base: 0, 
                ev: 0, 
                iv: 0
            },
            hp: { 
                base: 0, 
                ev: 0, 
                iv: 0
            }, 
            availableEVs: 508, 
            level: 1
        };
        this.updateStat = this.updateStat.bind(this);
        this.updateLevel = this.updateLevel.bind(this);
        this.calculateStat = this.calculateStat.bind(this);
  }



  componentWillReceiveProps(nextProps) {
      if (nextProps.id != this.props.id){
        this.setState({ 
            speed: {
                base: nextProps.stats[0].base_stat, 
                ev: 0, 
                iv: 0
            }, 
            specialDefense: { 
                base: nextProps.stats[1].base_stat, 
                ev: 0, 
                iv: 0
            },
            specialAttack: { 
                base: nextProps.stats[2].base_stat, 
                ev: 0, 
                iv: 0
            },
            defense: { 
                base: nextProps.stats[3].base_stat, 
                ev: 0, 
                iv: 0
            },
            attack: { 
                base: nextProps.stats[4].base_stat, 
                ev: 0, 
                iv: 0
            },
            hp: { 
                base: nextProps.stats[5].base_stat, 
                ev: 0, 
                iv: 0
            }
        });
      }
  }
  calculateStat(stat){ //TODO: Implement nature into calculation
    let nature = 1; 
    let result; 
    if (stat == 'hp'){ 
        result =  Math.round(((((2*this.state.hp.base) + this.state.hp.iv + (this.state.hp.ev/4))*this.state.level)/100) + this.state.level + 10); 
    } else { 
        result = Math.round((((((2*this.state[stat].base) + this.state[stat].iv + (this.state[stat].ev/4))*this.state.level)/100) + 5)*nature);
    }
    console.log(stat);
    console.log((2*this.state[stat].base) + this.state[stat].iv + (this.state[stat].ev/4)*this.state.level);
    return result; 
  }
  updateStat(stat, value, event){ 
      let numVal = event.target.valueAsNumber;
      if(value == 'iv' && numVal > 31){ 
          numVal = 31; 
      } 
      if(value == 'ev' && numVal > 255){ 
          numVal = 255;
      } 
      this.state[stat][value] = numVal; 
      this.setState({...this.state[stat], value: numVal});
  }
  updateLevel(event){ 
    let numVal = event.target.valueAsNumber;
    if(numVal > 100){ 
        numVal = 100; 
    }
    this.setState({level: numVal});
  }
  render() {
    return  (
        <div>
        <h4 className="card-header">Stats Calculator</h4>
        <div className="center">
            <p>Level: </p>
            <input type="number" min="1" max="100" value={this.state.level} onChange={this.updateLevel}/>
            <p>Nature: </p>
            <input type="text" min="1" max="100"/>
        </div>
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
                <td>{this.calculateStat('hp')}</td>
                <td><input type="number" min="0" max="255" value={this.state.hp.ev} onChange={(event) => this.updateStat('hp','ev', event)}/></td>
                <td><input type="number" min="0" max="31" value={this.state.hp.iv} onChange={(event) => this.updateStat('hp','iv', event)}/></td>
            </tr>
            <tr>
                <td>Attack</td>
                <td>{this.calculateStat('attack')}</td>
                <td><input type="number" min="0" max="255" value={this.state.attack.ev} onChange={(event) => this.updateStat('attack','ev', event)}/></td>
                <td><input type="number" min="0" max="31"value={this.state.attack.iv} onChange={(event) => this.updateStat('attack','iv', event)}/></td>
            </tr>
            <tr>
                <td>Defense</td>
                <td>{this.calculateStat('defense')}</td>
                <td><input type="number" min="0" max="255" value={this.state.defense.ev} onChange={(event) => this.updateStat('defense','ev', event)}/></td>
                <td><input type="number" min="0" max="31" value={this.state.defense.iv} onChange={(event) => this.updateStat('defense','iv', event)}/></td>
            </tr>
            <tr>
                <td>Special Attack</td>
                <td>{this.calculateStat('specialAttack')}</td>
                <td><input type="number" min="0" max="255" value={this.state.specialAttack.ev} onChange={(event) => this.updateStat('specialAttack','ev', event)}/></td>
                <td><input type="number" min="0" max="31" value={this.state.specialAttack.iv} onChange={(event) => this.updateStat('specialAttack','iv', event)}/></td>
            </tr>
            <tr>
                <td>Special Defense</td>
                <td>{this.calculateStat('specialDefense')}</td>
                <td><input type="number" min="0" max="255" value={this.state.specialDefense.ev} onChange={(event) => this.updateStat('specialDefense','ev', event)}/></td>
                <td><input type="number" min="0" max="31" value={this.state.specialDefense.iv} onChange={(event) => this.updateStat('specialDefense','iv', event)}/></td>
            </tr>
            <tr>
                <td>Speed</td>
                <td>{this.calculateStat('speed')}</td>
                <td><input type="number" min="0" max="255" value={this.state.speed.ev} onChange={(event) => this.updateStat('speed','ev', event)}/></td>
                <td><input type="number" min="0" max="31" value={this.state.speed.iv} onChange={(event) => this.updateStat('speed','iv', event)}/></td>
            </tr>

            </tbody>
        </table>
        </div>
      );

  }
}
