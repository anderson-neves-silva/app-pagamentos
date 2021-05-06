import React from 'react';
import { useState } from 'react';

import '../styles/global.css';

function User() {
  // Criando uma variável e a função que irá alterar o valor dela através do hook, e ela começa valendo um array vazio
  const [persons, setPersons] = useState([]);
  // Criando a variável na state que irá mostrar o modal que inicia valendo none
  const [mostraModal, setMostraModal] = useState("none"); 

  // Chamando a API, Obs essa chamada devolve uma promise
  fetch("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
  .then((data) => data.json())  // Retorna um dado qualquer e transforma em json
  .then((result) => { // Retornando o resultado
    // console.log(result);
    setPersons(result);
  })

  // Função que recebe o objeto no evento click
  const handleClick = (objeto) => {
    // alert(JSON.stringify(objeto.name));
    // Irá abrir o modal ao ser clicado
    setMostraModal("block");
  }
      
  return (
    <>
      { persons.map(objeto => {
        return <ul>
          <div className="container">
            <div className="picture">
              <img src={objeto.img} alt=""/>
            </div>
            <div>
              <li> Nome do Usuário: {objeto.name} </li>
              <li> ID: {objeto.id} </li>
              <li> Username: {objeto.username} </li>
            </div>
            <div>
              {/* Função feita aqui inline mas só que ela irá retornar o objeto que está sendo capturado via click */}
              <button onClick={(event) => {handleClick(objeto)}}>Pagar</button>
            </div>          
          </div>                                                                                           
        </ul>
        })
      }

      {/* Chama a variável que foi definida na state que determina se irá abrir o modal */}
      <div className="modal" style={{display:mostraModal}}>
       <div className="modalInterna">
         <form action="#" method="post">
           <div className="cabecalho">
             <h4>Pagamento para  </h4>
           </div>
           <div>
             <input min="0.01" step="0.01" type="number" placeholder="R$ 0,00" />
           </div>
           <div>
             <select name="cards" id="cards">
               <option value="card1" selected>Selecione um cartão</option>
               <option value="card2">1111</option>
               <option value="card3">1234</option>                 
             </select>
           </div>
           <div>
             <button type="submit">Pagar</button>
             <button id="botaoVoltar">Voltar</button>
           </div>
         </form>
       </div>
     </div>
    </>
  )
}

export default User;