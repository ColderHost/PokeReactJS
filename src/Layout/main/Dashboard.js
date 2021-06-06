import React, { Component } from 'react'
import PokemonList from './PokemonList'

import './Dashboard.css'




export default class Dashboard extends Component {
    
    render() {

        return (
            
            <div className="row" style={{width: "80%" }}>
                
                <div className="col" style={{width: "70%"}}>
                   <PokemonList />
                </div>
            </div>
        )
    }
}
