import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]); //utilização do useState para variáveis se estado

  useEffect(() => {api.get('/repositories').then(response => setRepositories(response.data))},[])
  console.log(repositories) //useEffect para disparar a função api.get

  async function handleAddRepository() { //para adicionar um novo repositório
    const response = await api.post('/repositories',{title: `Adicionar ${Date.now()}`}) 
    setRepositories([...repositories,response.data])//respeitar o conceito de imutabilidade
  }

  async function handleRemoveRepository(id) { //remover um repositório
    await api.delete(`/repositories/${id}`) //primeiro removo do backend
    const index = repositories.findIndex(item => item.id === id) //procuro o repositório dentro do array no frontend
    if(index > -1){ //verifico se ele existo 
      repositories.splice(index,1) //apago do repositorio
      setRepositories([...repositories])//crio um novo array
    }
  }
  function render(){ //função para renderizar um codigo em html
    return (
      repositories.map(item => (<li key={item.id}>
        {item.title} 
        <button onClick={() => handleRemoveRepository(item.id)}>
          Remover
        </button>
      </li>))
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {render()}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
