import React, { useEffect, useState } from 'react';
import './styles/index.scss'
import Success from './components/Success';
import { Users } from './components/Users';


function App() {

  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(this);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch("https://reqres.in/api/users")
    .then((res) => res.json())
    .then((json) => {
        setUsers(json.data)
    })
    .catch((err) => {
      console.warn(err);
      alert("Ошибка при получении пользователей");
    })
    .finally(() => setLoading(false))
    
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onCliclInvite = (id) => {
    if(invites.includes(id)){
      setInvites((prev) => prev.filter((_id) => _id != id));
    }else{
      setInvites((prev) => [...prev, id]);
    }
  }

  const onClickSuccess = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      {success ? 
      <Success invites={invites}/> : 
      <Users 
        onChangeSearchValue={onChangeSearchValue} 
        searchValue={searchValue} 
        items={users} 
        isLoading={isLoading}
        onCliclInvite={onCliclInvite}
        invites={invites}
        onClickSuccess={onClickSuccess}
      />}
      
    </div>
  );
}

export default App;