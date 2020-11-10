import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {api.get('/repositories').then(response => setRepositories(response.data))},[])
  console.log(repositories)

  async function handleAddRepository() {
    const response = await api.post('/repositories',{title: `Adicionar ${Date.now()}`})
    setRepositories([...repositories,response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const index = repositories.findIndex(item => item.id === id)
    if(index > -1){
      repositories.splice(index,1)
      setRepositories([...repositories])
    }
  }
  function render(){
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
