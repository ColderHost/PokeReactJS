import React, { Component } from 'react'
import axios from 'axios'


import PokemonCard from './PokemonCard'


export default class PokemonList extends Component {
    state = {
        name: [],
        urls:[],
    }
constructor(props){
    super(props);
    this.state = {
        offset:12,
    }
    this.moreLoad = this.moreLoad.bind(this);
}
    
componentDidMount() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=12')
         .then(outside => {
             const nameOfPok = outside.data["results"]
             this.setState({name: nameOfPok});
        })
}


moreLoad = () => {
    this.setState({offset: this.state.offset + 12});
    
    var list1 =`https://pokeapi.co/api/v2/pokemon/?offset=${this.state.offset}&limit=12` ;
    axios.get(list1)
         .then(outside => {
             const nameOfPok = outside.data["results"]
             this.setState({name: nameOfPok});
        })
        
}

    render() {
        
        return (
            <React.Fragment>
                {this.state.name ? (
                
                <div className="row" style={{margin: "0px", width: "100%"}}>
                   {this.state.name.map(name => ( 
                   <PokemonCard
                    key={name.name}
                    name ={name.name.charAt(0).toUpperCase()+ name.name.slice(1)}
                    url = {name.url}
                    />
                    ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <button className='btn btn-primary' style={{
                    display:'flex', justifyContent:'center', marginLeft:'150px',
                    width:'300px', marginBottom:'25px'}} onClick={this.moreLoad}>
                        Load More
                </button>
            </React.Fragment>
        ) 
    }
}
