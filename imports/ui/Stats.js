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
            level: 1, 
            increased: "",
            decreased: ""
        };
        this.updateStat = this.updateStat.bind(this);
        this.updateLevel = this.updateLevel.bind(this);
        this.availableEVs = this.availableEVs.bind(this);
        this.calculateStat = this.calculateStat.bind(this);
        this.updateNature = this.updateNature.bind(this);
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
    if (this.state.increased == stat){ 
        nature = 1.1;
    } else if (this.state.decreased == stat){ 
        nature = 0.9;
    }
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
      if(value == 'ev'){ 
          if(numVal > 252){ 
            numVal = 252;
          }
          if(numVal - this.state[stat][value] > this.availableEVs()){ 
            numVal = this.availableEVs() + this.state[stat][value];
          }
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
  availableEVs(){ 
    let usedEVs = this.state.hp.ev + this.state.speed.ev + this.state.attack.ev + this.state.defense.ev + this.state.specialAttack.ev + this.state.specialDefense.ev; 
    return 508 - usedEVs; 
  }

  updateNature(event){ 
    let natureStringList = event.target.value.split(","); 
    this.setState({
        increased: natureStringList[0].substr(1), 
        decreased: natureStringList[1].substr(1)
    });
  }

  render() {
    return  (
        <div>
        <h4 className="card-header">Stats Calculator</h4>
        <div className="center">
            <p>Level: </p>
            <input type="number" min="1" max="100" value={this.state.level} onChange={this.updateLevel}/>
              <div className="form-group">
                <select className="custom-select" onChange={this.updateNature}>
                    <option defaultValue="">Nature</option>
                    <option value="">Hardy</option>
                    <option value="+attack,-defense">Brave (+Attack, -Defense)</option>
                    <option value="+attack,-speed">Adamant (+Attack, -Speed)</option>
                    <option value="+attack,-specialAttack">Naughty (+Attack, -Special Attack)</option>
                    <option value="+attack,-specialDefense">Lonely (+Attack, -Special Defense)</option>
                    <option value="">Docile</option>
                    <option value="+defense,-attack">Bold (+Defense, -Attack)</option>
                    <option value="+defense,-speed">Relaxed (+Defense, -Speed)</option>
                    <option value="+defense,-specialAttack">Impish (+Defense, -Special Attack)</option>
                    <option value="+defense,-specialDefense">Lax (+Defense, -Special Defense)</option>
                    <option value="">Serious</option>
                    <option value="+speed,-attack">Timid (+Speed, -Attack)</option>
                    <option value="+speed,-defense">Hasty (+Speed, -Defense)</option>
                    <option value="+speed,-specialAttack">Jolly (+Speed, -Special Attack)</option>
                    <option value="+speed,-specialDefense">Naive (+Speed, -Special Defense)</option>
                    <option value="">Bashful</option>
                    <option value="+specialAttack,-attack">Modest (+Special Attack, -Attack)</option>
                    <option value="+specialAttack,-defense">Mild (+Special Attack, -Defense)</option>
                    <option value="+specialAttack,-speed">Quiet (+Special Attack, -Speed)</option>
                    <option value="+specialAttack,-specialDefense">Rash (+Special Attack, -Special Defense)</option>
                    <option value="">Quirky</option>
                    <option value="+specialDefense,-attack">Calm (+Special Defense, -Attack)</option>
                    <option value="+specialDefense,-defense">Gentle (+Special Defense, -Defense)</option>
                    <option value="+specialDefense,-speed">Sassy (+Special Defense, -Speed)</option>
                    <option value="+specialDefense,-specialAttack">Careful (+Special Defense, -Special Attack)</option>
                </select>
            </div>
            <p>Available EVs: {this.availableEVs()}</p>
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
