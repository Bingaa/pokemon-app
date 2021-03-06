import React, { Component } from 'react';

export default class Evolution extends Component{

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      evolutionChain: {}
    };
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.evolutionChainIndex != this.props.evolutionChainIndex){
        this.state.loading = true;
        let self = this;

        Meteor.call('getEvolutions', nextProps.evolutionChainIndex,
          function(error, result){
            self.setState({
              loading: false,
              evolutionChain: result
            });
            console.log(result);
        });
      }
  }

  render() {
    let evolutionTree;
    if(this.state.loading){
      evolutionTree =   <div className="loader"></div>;
    } else {
    evolutionTree = (
      <div>
      <h4 className="card-header">Evolution Tree</h4>
        <img onClick={this.props.handleClick} title={this.state.evolutionChain.species} className="imgSprite" style={{height: '125px', width: '125px', display: 'block', margin: 'auto'}} src={this.state.evolutionChain.img}/>
        <table align="center">
        <tbody>
        <tr align="center">
        {this.state.evolutionChain.evolvesTo.map(function(evolDetails, i){
           return (
              <td key={i}align="center">
              <div className="containerImg">
                <img src={evolDetails.evolveMethod} style={{height: '120px', width: '100px', display: 'block', margin: 'auto'}}/>
                 <p style={{color: 'white', fontWeight: 'bold'}}  className="centered">{evolDetails.evolveDetails}</p>
              </div>
                 <img onClick={this.props.handleClick}  title={evolDetails.species} className="imgSprite" align="center" style={{height: '125px', width: '125px', display: 'block', margin: 'auto'}} src={evolDetails.img}/>


             <table align="center">
             <tbody>
             <tr align="center">
            {evolDetails.evolvesTo.map(function(evolDetails, i){
               return (
                 <td key={i}align="center">
                 <div className="containerImg">
                   <img src={evolDetails.evolveMethod}  style={{height: '120px', width: '100px', display: 'block', margin: 'auto'}}/>
                    <p style={{color: 'white', fontWeight: 'bold'}} className="centered">{evolDetails.evolveDetails}</p>
                 </div>
                   <img onClick={this.props.handleClick} title={evolDetails.species} className="imgSprite" style={{height: '125px', width: '125px', display: 'block', margin: 'auto'}} src={evolDetails.img}/>

                 </td>
              )
             }, this)}

             </tr>
             </tbody>
             </table>
              </td>

           )
         }, this)}
         </tr>
         </tbody>
         </table>

      </div>

    );
  }


    return evolutionTree;
  }

}
