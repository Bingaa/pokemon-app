import React, { Component } from 'react';

export default class Moves extends Component{
  constructor(props){
    super(props);
    this.state = {
      levelMoves: [],
      tutorMoves: [],
      eggMoves: [],
      machineMoves: [],
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.name != this.props.name){
        this.state.loading = true;
        let self = this;
        Meteor.call('getLevelMoves', nextProps.moves,
        function(error, result){
          self.setState({
            levelMoves: result.levelMoves,
            machineMoves: result.machineMoves,
            eggMoves: result.eggMoves,
            tutorMoves: result.tutorMoves,
            loading: false
          });
        });
      }
  }

  render(){
    let movesObject;
    if(this.state.loading){
      movesObject = <div>
        <h4 className="card-header">Sun & Moon Level</h4>
          <div className="loader"></div>
      </div>;
    } else {
      movesObject = (
        <div>
          <h4 className="card-header">Sun & Moon Level Up Moves</h4>
        <table className="table table-hover">
        <thead>
        <tr>
          <th>Level Learned</th>
          <th>Move</th>
          <th>Type</th>
          <th>Damage Type</th>
          <th>Attack Damage</th>
          <th>Accuracy</th>
          <th>PP</th>
          <th>Effect %</th>
          <th>Effect</th>
        </tr>
        </thead>
        <tbody>
          {this.state.levelMoves.map(function(moveDetails, i){
             return (
               <tr key={i}>
                 <td>{moveDetails.levelLearned}</td>
                 <td>{moveDetails.name.replace("-", " ")}</td>
                 <td>{moveDetails.type}</td>
                 <td>{moveDetails.damageClass}</td>
                 <td>{moveDetails.power}</td>
                 <td>{moveDetails.accuracy}</td>
                 <td>{moveDetails.pp}</td>
                 <td>{moveDetails.effectChance}</td>
                 <td>{moveDetails.effect}</td>
                </tr>

             )
           })}
           </tbody>
         </table>
         <h4 className="card-header">Egg Moves</h4>
       <table className="table table-hover">
       <thead>
       <tr>
         <th>Move</th>
         <th>Type</th>
         <th>Damage Type</th>
         <th>Attack Damage</th>
         <th>Accuracy</th>
         <th>PP</th>
         <th>Effect %</th>
         <th>Effect</th>
       </tr>
       </thead>
       <tbody>
         {this.state.eggMoves.map(function(moveDetails, i){
            return (
              <tr key={i}>
                <td>{moveDetails.name.replace("-", " ")}</td>
                <td>{moveDetails.type}</td>
                <td>{moveDetails.damageClass}</td>
                <td>{moveDetails.power}</td>
                <td>{moveDetails.accuracy}</td>
                <td>{moveDetails.pp}</td>
                <td>{moveDetails.effectChance}</td>
                <td>{moveDetails.effect}</td>
               </tr>

            )
          })}
          </tbody>
        </table>
        <h4 className="card-header">TM Moves</h4>
      <table className="table table-hover">
      <thead>
      <tr>
        <th>Move</th>
        <th>Type</th>
        <th>Damage Type</th>
        <th>Attack Damage</th>
        <th>Accuracy</th>
        <th>PP</th>
        <th>Effect %</th>
        <th>Effect</th>
      </tr>
      </thead>
      <tbody>
        {this.state.machineMoves.map(function(moveDetails, i){
           return (
             <tr key={i}>
               <td>{moveDetails.name.replace("-", " ")}</td>
               <td>{moveDetails.type}</td>
               <td>{moveDetails.damageClass}</td>
               <td>{moveDetails.power}</td>
               <td>{moveDetails.accuracy}</td>
               <td>{moveDetails.pp}</td>
               <td>{moveDetails.effectChance}</td>
               <td>{moveDetails.effect}</td>
              </tr>

           )
         })}
         </tbody>
       </table>
       <h4 className="card-header">Tutor Moves</h4>
     <table className="table table-hover">
     <thead>
     <tr>
       <th>Move</th>
       <th>Type</th>
       <th>Damage Type</th>
       <th>Attack Damage</th>
       <th>Accuracy</th>
       <th>PP</th>
       <th>Effect %</th>
       <th>Effect</th>
     </tr>
     </thead>
     <tbody>
       {this.state.tutorMoves.map(function(moveDetails, i){
          return (
            <tr key={i}>
              <td>{moveDetails.name.replace("-", " ")}</td>
              <td>{moveDetails.type}</td>
              <td>{moveDetails.damageClass}</td>
              <td>{moveDetails.power}</td>
              <td>{moveDetails.accuracy}</td>
              <td>{moveDetails.pp}</td>
              <td>{moveDetails.effectChance}</td>
              <td>{moveDetails.effect}</td>
             </tr>

          )
        })}
        </tbody>
      </table>
         </div>
      );
    }
    return movesObject;
  }
}
