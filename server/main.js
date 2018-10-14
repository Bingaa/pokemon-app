import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.methods({
  'getPokemonAPI'(id, type) {

    let URL = 'https://pokeapi.co/api/v2/' + type + '/' + id + '/';
    try {
      const result = HTTP.call('GET',URL, {});
      return result;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return false;
    }

  },

  'getPokedex'() { 
    let retrievePokedexList = { 
      'Kanto': 2, 
      'Johto': 3, 
      'Hoenn': 4, 
      'Sinnoh': 6, 
      'Unova': 9, 
    }
    let pokedexList = []; 

    for (var region in retrievePokedexList){ 
      pokedexList.push(Meteor.call('getPokemonAPI',retrievePokedexList[region], 'pokedex')); 
    }

    return pokedexList; 

  },

  'getEvolutions'(index){
    let evolutionChain = Meteor.call('getPokemonAPI', index, 'evolution-chain').data.chain;
    let response  = {
      species: evolutionChain.species.name,
      img: Meteor.call('getPokemonAPI',evolutionChain.species.name,'pokemon').data.sprites.front_default,
      evolveMethod: null,
      evolveDetails: null,
      evolvesTo: []
    };

    evolutionChain = evolutionChain.evolves_to;
    for(var i = 0; i < evolutionChain.length; i++){
        let details = Meteor.call('getEvolutionMethod', evolutionChain[i].evolution_details[0]);
        response.evolvesTo.push({
          species: evolutionChain[i].species.name,
          img:Meteor.call('getPokemonAPI',evolutionChain[i].species.name,'pokemon').data.sprites.front_default,
          evolveMethod: details[1],
          evolveDetails: details[0],
          evolvesTo: []
        });

        for (var j = 0; j < evolutionChain[i].evolves_to.length; j++){
          details = Meteor.call('getEvolutionMethod', evolutionChain[i].evolves_to[j].evolution_details[0]);
          response.evolvesTo[i].evolvesTo.push({
            species:evolutionChain[i].evolves_to[j].species.name,
            img:Meteor.call('getPokemonAPI',evolutionChain[i].evolves_to[j].species.name,'pokemon').data.sprites.front_default,
            evolveMethod: details[1],
            evolveDetails: details[0],
            evolvesTo: []
          });

        }

      }
    return response;

  },

  'getEvolutionMethod'(evolutionDetails){
    let details, evolveMethod;
    console.log(evolutionDetails);
    if (evolutionDetails.item != null){
      details = evolutionDetails.item.name.replace("-", " ");;
    } else if (evolutionDetails.location != null){
      details = evolutionDetails.location.name.replace("-", " ");
    } else if(evolutionDetails.time_of_day != ''){
      details = evolutionDetails.time_of_day;
    } else if(evolutionDetails.min_happiness != null){
      details = "Max. Happiness";
    } else if(evolutionDetails.min_level != null){
      details = evolutionDetails.min_level;
    } else if(evolutionDetails.known_move != null){
      details = evolutionDetails.known_move;
    } else if(evolutionDetails.known_move_type != null){
      details = evolutionDetails.known_move_type.name + " type move";
    } else if(evolutionDetails.held_item != null){
      details = evolutionDetails.held_item.name;
    } else if (evolutionDetails.gender != null){
      if(evolutionDetails.gender == '2'){
        details = "male";
      } else {
        details = "female";
      }
    }

    evolveMethod = evolutionDetails.trigger.name + '.png';

    console.log(details);

    return [details, evolveMethod];
  },

  'getSpecies'(id) {

      let result = Meteor.call('getPokemonAPI', id, 'pokemon-species');
      let speciesReturn = {
        baseHappiness: result.data.base_happiness,
        captureRate: result.data.capture_rate,
        growthRate: result.data.growth_rate.name,
        eggGroups: result.data.egg_groups,
        evolutionChainIndex: result.data.evolution_chain.url.replace("https://pokeapi.co/api/v2/evolution-chain/", "").replace("/", ""),
      };

      for (var i = 0; i < result.data.flavor_text_entries.length; i++){
        if(result.data.flavor_text_entries[i].language.name == 'en'){
          speciesReturn.description = result.data.flavor_text_entries[i].flavor_text;
          break;
        }
      }
      let forms = []; 
      for(var i = 0; i < result.data.varieties.length; i++){ 
        if(result.data.varieties[i].is_default == false){ 
          console.log("look");
          console.log(result.data.varieties[i].pokemon.name);
          forms.push({
            name: result.data.varieties[i].pokemon.name,
            img: Meteor.call('getPokemonAPI',result.data.varieties[i].pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/",""), "pokemon").data.sprites.front_default
          });

        }
      }
      speciesReturn.forms = forms; 

      return speciesReturn;
  },

  'getTypeAgainst'(types){
    let typeDisadvantages = {
      'normal': 1,
      'fire': 1,
      'water': 1,
      'grass': 1,
      'electric': 1,
      'ice': 1,
      'fighting': 1,
      'poison': 1,
      'ground': 1,
      'flying': 1,
      'psychic': 1,
      'bug': 1,
      'rock': 1,
      'ghost': 1,
      'dragon': 1,
      'dark': 1,
      'steel': 1,
      'fairy': 1
    };
    let typeResults;
    for (var i = 0; i < types.length; i++){
      typeResults = Meteor.call('getPokemonAPI', types[i].type.name, 'type');

      for(var j = 0; j < typeResults.data.damage_relations.double_damage_from.length; j++){
        typeDisadvantages[typeResults.data.damage_relations.double_damage_from[j].name] *= 2;
      }
      for(var j = 0; j < typeResults.data.damage_relations.half_damage_from.length; j++){
        typeDisadvantages[typeResults.data.damage_relations.half_damage_from[j].name] *= 0.5;
      }
      for(var j = 0; j < typeResults.data.damage_relations.no_damage_from.length; j++){
        typeDisadvantages[typeResults.data.damage_relations.no_damage_from[j].name] *= 0;
      }

    }
    return typeDisadvantages;
  },

  'getAbilities'(abilities){
    let abilityDetails = [];
    let abilityResults;
    for (var i = 0; i < abilities.length; i++){
      abilityResults = Meteor.call('getPokemonAPI',abilities[i].ability.name, 'ability');
      abilityDetails.push({
        name: abilities[i].is_hidden == true ?  abilities[i].ability.name + " (Hidden)" : abilities[i].ability.name,
        effect: abilityResults.data.effect_entries[0].effect
      });

    }
    return abilityDetails;
  },

  'getLevelMoves'(moves) {
    let movesObject = {
      levelMoves: [],
      machineMoves: [],
      tutorMoves: [],
      eggMoves: []
    };
    let moveType;
    let moveDetail, version_group_details, moveName, moveResults;
    for (var i = 0; i < moves.length; i++){
      moveName = moves[i].move.name;
      for(var j = 0; j < moves[i].version_group_details.length; j++){
        if(moves[i].version_group_details[j].version_group != "undefined" && moves[i].version_group_details[j].version_group.name == "sun-moon"){
          moveResults = Meteor.call('getPokemonAPI',moveName, 'move');
          if(moves[i].version_group_details[j].move_learn_method.name == "level-up" ){
            moveType = "levelMoves";
          } else if (moves[i].version_group_details[j].move_learn_method.name == "egg" ){
            moveType = "eggMoves";
          } else if (moves[i].version_group_details[j].move_learn_method.name == "tutor"){
            moveType = "tutorMoves";
          } else if (moves[i].version_group_details[j].move_learn_method.name == "machine"){
            moveType = "machineMoves";
          }
          movesObject[moveType].push({
              name: moveName,
              levelLearned: moves[i].version_group_details[j].level_learned_at,
              accuracy: moveResults.data.accuracy !=null? moveResults.data.accuracy:"-",
              effectChance: moveResults.data.effect_chance != null? moveResults.data.effect_chance:"-" ,
              effect: moveResults.data.flavor_text_entries[2].flavor_text,
              type: moveResults.data.type.name,
              damageClass: moveResults.data.damage_class.name,
              power: moveResults.data.power != null ? moveResults.data.power : "-",
              pp: moveResults.data.pp,
            });

        }
      }
    }
    movesObject["levelMoves"] = movesObject["levelMoves"].sort(function(a,b){return a.levelLearned - b.levelLearned })
    return movesObject;
  }
});
