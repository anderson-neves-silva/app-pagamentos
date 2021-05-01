import React from 'react';
import axios from 'axios';

export default class User extends React.Component {
  state = {
    persons: []    
  }

  // Obtendo uma promessa usando o “get” que retorna um objeto de resposta lá da API
  componentDidMount() {
    axios.get(`https://www.mocky.io/v2/5d531c4f2e0000620081ddce`)
      .then(response => {
        const persons = response.data;
        console.log(persons);
        this.setState({ persons });
      })
  }

  render() {
    return (
      <>
        <ul>
          { this.state.persons.map(person => ( 
            <div id="container">
              <div>
                <img src={person.img} alt=""/>
              </div>
              <div id="user-data">
                <li> Nome do Usuário: {person.name} </li>
                <li> ID: {person.id} </li>
                <li> Username: {person.username} </li>
              </div>
              <div>
                <button>Pagar</button>
              </div>
            </div>))}
        </ul>
      </>
    )
  }
}