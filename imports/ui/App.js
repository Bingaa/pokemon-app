import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Abilities from './Abilities.js';
import Moves from './Moves.js';
import TypeAgainst from './TypeAgainst.js';
import Species from './Species.js';
import Stats from './Stats.js';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPokedexEntries = this.getPokedexEntries.bind(this);
    this.handleChildChange = this.handleChildChange.bind(this); 
    this.state = {
      pokeId: "Charizard",
      pokemonName: "",
      imageFront: "",
      imageFrontShiny: "",
      abilities: [],
      moves: [],
      types: [],
      type: "",
      id: "",
      weight: "",
      height: "",
      pokedexEntries: [],
      stats: []
    };
    this.handleSubmit();
    this.getPokedexEntries();
}
getPokedexEntries(){
  let self = this;
  Meteor.call('getPokedex',
  function(error,result){
    console.log(result);
    self.setState({
      pokedexEntries: result
    });
  });

}

handleChange(event) {
  this.setState({pokeId: event.target.value.charAt(0).toUpperCase() + event.target.value.substr(1)});
}
handleChildChange(pokemonName){ 
  this.state.pokeId = pokemonName;
  this.handleSubmit(); 
}
handleSubmit(event) {
  if(event){
    event.preventDefault();
  }
  let self = this;
  Meteor.call('getPokemonAPI',this.state.pokeId.toLowerCase(), "pokemon",
    function(error,result){
      console.log(result);
      self.setState({
        pokemonName: result.data.name,
        imageFront: result.data.sprites.front_default,
        imageFrontShiny: result.data.sprites.front_shiny,
        abilities: result.data.abilities,
        moves: result.data.moves,
        types: result.data.types,
        id: result.data.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/",""),
        weight: result.data.weight/10 + 'lb',
        height: result.data.height/10 + 'm',
        stats: result.data.stats
      });
    });

}

  render() {
    return (
      <div className="center">
      <form onSubmit={this.handleSubmit}>
      <div className="form-group has-success">
        <div className="row">
          <input type="text" value={this.state.pokeId} onChange={this.handleChange} className="form-control is-valid" id="inputInvalid"/>
          <input type="submit" value="Search Pokemon" className="btn btn-info" />
          
      </div>

              )
            })}
          </select>
        </div>
        })}


        <h2 className="card-header">{this.state.pokemonName}</h2>
        <div className="card-body">
          <div className="row">
              <img className="imgSprite" style={{height: '13%', width: '13%', display: 'block'}} src={this.state.imageFront} alt=""/>
          </div>
        </div>
        <Species types={this.state.types} weight={this.state.weight} height={this.state.height} id={this.state.id} onSpriteClick={this.handleChildChange} />
        <Abilities abilities={this.state.abilities} name={this.state.pokemonName} />
        <TypeAgainst types={this.state.types} name={this.state.pokemonName}/>
        <Stats stats={this.state.stats} name={this.state.pokemonName}/>
        <Moves moves={this.state.moves} name={this.state.pokemonName} />
      </div>
    );
  }
}
