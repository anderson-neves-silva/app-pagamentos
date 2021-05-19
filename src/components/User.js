import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import '../styles/global.css';

function User() {
  // A setPersons irá alterar o valor de persons através do hook, Obs. começa valendo um array vazio
  const [persons, setPersons ]= useState([]);
  // Criando a variável na state que irá mostrar o modal que inicia valendo none
  const [viewModal, setViewModal] = useState("none");
  // Objeto de valor inicial vazio
  const [selectPerson, setSelectPerson] = useState({});
  // Iniciando com valor vazio, Obs. variável que trata o input para envio
  const [searchParam1, setSearchParam1] = useState("");
  const [searchParam2, setSearchParam2] = useState("");
  const [viewModalResposta, setViewModalResposta] = useState("none");
  const [confimacaoPagamento, setConimacaoPagamento] = useState();
 
  let cards = [    
    { // valid card
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },    
    { // invalid card
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    },
  ];

  // Chamando a API, ela fa exibir todas as pessoas na tela, Obs essa chamada devolve uma promise
  useEffect(() => {
    fetch("https://www.mocky.io/v2/5d531c4f2e0000620081ddce") 
      .then((data) => data.json())  // Retorna um dado qualquer e transforma em json
      .then((result) => { // Retornando o resultado
        // console.log(result);
        setPersons(result);
      })
  },[])

  // Função que recebe o objeto no evento click
  const handleClick = (result) => {
    if (selectPerson.id === result.id) {
      // Fechar o modal clicando de novo no mesmo botão do user, mas passando "none" no parêntese
      setViewModal();  
    } else {

      setViewModal("block");  // Se o botão clicado não seja o mesmo ele mostra o nome do user clicado
      setSelectPerson(result);  // Irá mostrar a pessoa selecionada
    } 
  }

  // Mandado informação do input e do objeto para a API, Obs. mas também mandando o parâmetro capturado no input
  const handleSearch = (e) => {
    e.preventDefault();
    let body = JSON.stringify({
      // Card Info
      card_number: cards[searchParam2].card_number,
      cvv: cards[searchParam2].cvv,
      expiry_date: cards[searchParam2].expiry_date,

      // Destination User ID
      destination_user_id: selectPerson.id,

      // Value of the Transaction
      value: searchParam1
    });

    fetch("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989", {
      method: "POST",
      body: body
    })
    .then((data) => data.json())
    .then((result) => { // Retornando o resultado
      // console.log(result);
      if (searchParam2 === "0") {
        setViewModal("none");
        setViewModalResposta("block");
        setSearchParam1("");
        setSearchParam2("");
        setConimacaoPagamento(result.success);
        // console.log(result);

      } else if (searchParam2 === "1") {
          setViewModal("none");
          setViewModalResposta("block");
          setSearchParam1("");
          setSearchParam2("");          
          setConimacaoPagamento(false);
          // console.log(result);
        }    
    }).catch(err => console.log(err));
  }

  const setFecharModal = (e) => {
    e.preventDefault();
    setViewModal("none");
  }

  const setFecharResposta = (e) => {
    e.preventDefault();
    setViewModalResposta("none");
  }

  return (
    <>
      { persons.map(result => {
        return <ul>
          <div className="containerList">
            <div className="picture">
              <img src={result.img} alt=""/>
            </div>
            <div>
              <li> Nome do Usuário: {result.name} </li>
              <li> ID: {result.id} </li>
              <li> Username: {result.username} </li>
            </div>
            <div>
              {/* Função inline mas só que irá retornar o objeto que está sendo capturado via click */}
              <button onClick={() => { handleClick(result) }}>Pagar</button>
            </div>          
          </div>
          </ul>
        })
      }

      {/* Chama a variável que foi definida na state que determina se irá abrir o modal */}
      <div className="modal" style={{display: viewModal}}>
        <div className="modalInterna">
          <form onSubmit={ handleSearch }>
            <div className="cabecalho">
              <h4>Pagamento para <span className="nameUser">{selectPerson.name}</span></h4>
            </div>
            <div>
              {/* Função que cuida da entrada do user, aqui chamamos a variável que está criada lá em cima, Obs. aqui mandamos o evento com o target pegando o valor com o value */}
              <input onChange={(e) => { setSearchParam1(e.target.value) }} min="0.01" step="0.01" type="number" placeholder="R$ 0,00" value={searchParam1} />
            </div>
            <div>
              <select onChange ={(e) => { setSearchParam2(e.target.value) }} requerid>
                <option value="" selected>Selecione um cartão</option>
                {
                  cards.map((cartao, i) => {
                    return <option value={i}>{cartao.card_number.substring(12)}</option>
                  })
                }
              </select>
            </div>
            <div>
              {/* Chamando a função que irá fazer a busca do pagamento */}
              <button type="submit">Pagar</button>
              <button onClick ={setFecharModal} className="buttonClosed">Fechar</button>
            </div>
          </form>         
        </div>       
      </div>

      <div className="containerResposta" style={{display: viewModalResposta}}>
        <div className="modalResposta">
          <div className="cabecalhoModal">
            <h1>Recibo de pagamento</h1>
            <span onClick ={setFecharResposta}>X</span>
          </div>
          <div>
            <p>
              {confimacaoPagamento ? 'O pagamento foi concluido com sucesso.' : 'O pagamento NÃO foi concluido com sucesso.'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default User;