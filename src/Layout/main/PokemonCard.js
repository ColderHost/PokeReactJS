import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './PokemonCard.css'
import styled from 'styled-components';
import axios from 'axios';




const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;


const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };
  
var stateSingle = {
  name: '',
  imageUrl: '',
  pokemonIndex: '',
  imageLoading: true,
  toManyRequests: false,
  description:'',
  types:[],
  stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    eggGroups: '',
    catchRate: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
    themeColor: '#EF5350'
}

export default class Pokemons extends Component {
    

    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        toManyRequests: false,
        description:'',
        types:[],
        types1:[],
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
          },
          height: '',
          weight: '',
          eggGroups: '',
          catchRate: '',
          abilities: '',
          genderRatioMale: '',
          genderRatioFemale: '',
          evs: '',
          hatchSteps: '',
          themeColor: '#EF5350'
};

 async  componentDidMount(){
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    const linkTypes = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    
    axios.get(linkTypes)
         .then(outside => {
             const types = outside.data['types'][0]['type']['name'];
             this.setState({types: types});
        })
    this.setState({ name, imageUrl, pokemonIndex});



    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    // Get Pokemon Information
    const pokemonRes = await axios.get(pokemonUrl);


    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
// eslint-disable-next-line
    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    // Convert Decimeters to Feet... The + 0.0001 * 100 ) / 100 is for rounding to two decimal places :)
    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', ');

    const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');

    // Get Pokemon Description .... Is from a different end point uggh
    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = '';
     // eslint-disable-next-line
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          return 0;
        }
      });
      const femaleRate = res.data['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups']
        .map(group => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      themeColor,
      height,
      weight,
      abilities,
      evs
})}


export = () =>{
    document.getElementById("card_detail").className ="card1 card";
    stateSingle = this.state
    this.forceUpdate(this.showingResult, this.export);
}


showingResult = () =>{
  document.getElementById("name").innerHTML = stateSingle.name;
  document.getElementById("pokemonIndex").innerHTML = stateSingle.pokemonIndex;
  document.getElementById("description").innerHTML = stateSingle.description;
  document.getElementById("hp").innerHTML = stateSingle.stats.hp;
  document.getElementById("attack").innerHTML = stateSingle.stats.attack;
  document.getElementById("defense").innerHTML = stateSingle.stats.defense;
  document.getElementById("specialAttack").innerHTML = stateSingle.stats.specialAttack;
  document.getElementById("specialDefence").innerHTML = stateSingle.stats.specialDefense;
  document.getElementById("speed").innerHTML = stateSingle.stats.speed;
  document.getElementById("height").innerHTML = stateSingle.height;
  document.getElementById("weight").innerHTML = stateSingle.weight;
  document.getElementById("abilities").innerHTML = stateSingle.abilities;
  document.getElementById("evs").innerHTML = stateSingle.evs;
  document.getElementById("genderRatioFemale").innerHTML = stateSingle.genderRatioFemale;
  document.getElementById("genderRatioMale").innerHTML = stateSingle.genderRatioMale;
  document.getElementById("catchRate").innerHTML = stateSingle.catchRate;
  document.getElementById("eggGroups").innerHTML = stateSingle.eggGroups;
  document.getElementById("hatchSteps").innerHTML = stateSingle.hatchSteps;
}

    render() {
        const name = this.state.name;
        const ImgUrl = stateSingle.imageUrl;
        return (
            <div className="col-md-2 col-sm-6 mb-5 cardHolder" > 
                <div class="card cardButton" onClick={this.export}>
                    
                 <h5 class="card-header "> 
             
                       {this.state.pokemonIndex} 
                    
            <Sprite
                    className="card-img-top rounded mx-auto mt-2"
                    src={this.state.imageUrl} 
                    onLoad={() => this.setState({ imageLoading: false })}
                    onError={() => this.setState({ toManyRequests: true })}
                    style={
                        this.state.toManyRequests
                        ? { display: 'none' }
                        : this.state.imageLoading
                        ? null
                        : { display: 'block' }
                    }
                />
             
            </h5>  
            
                    <h5 className="card-body">
                        {name} <br />
                    <span className="badge badge-pill mr-1" style={{backgroundColor: `#${TYPE_COLORS[this.state.types]}`,
                        color: 'white'}}> {this.state.types}</span>
                    </h5>
               </div>
               
            
        <div class="card disabled" id="card_detail">
          <h5 class="card-header">
            <span id="pokemonIndex"></span>
          </h5>          
            <div class="card-body">
              <h5 class="card-title"> <span id="name"></span> 
              </h5>
              <p class="card-text" id="description"></p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Special Attack: <span id="specialAttack"></span></li>
              <li class="list-group-item">Attack: <span id="attack"></span></li>
              <li class="list-group-item" >Health: <span id="hp"></span> </li>
              <li class="list-group-item">Defense: <span id="defense"></span></li>
              <li class="list-group-item">Abilities: <span id="abilities"></span></li>
              <li class="list-group-item">Evs: <span id="evs"></span></li>
              <li class="list-group-item" >Special Defence: <span id="specialDefence"></span> </li>      
              <li class="list-group-item" >Speed: <span id="speed"></span> </li>
              <li class="list-group-item">Height: <span id="height"></span></li>
              <li class="list-group-item">Weight: <span id="weight"></span></li>
              <li class="list-group-item">Gender Ratio Female: <span id="genderRatioFemale"></span></li>
              <li class="list-group-item" >Gender Ratio Male: <span id="genderRatioMale"></span> </li>      
              <li class="list-group-item" >Catch Rate: <span id="catchRate"></span> </li>
              <li class="list-group-item">Egg Groups: <span id="eggGroups"></span></li>
              <li class="list-group-item">Hatch Steps: <span id="hatchSteps"></span></li>
            </ul>
                <div class="card-body">
                    
                </div>
        </div>
        
</div>
        )
    }
}