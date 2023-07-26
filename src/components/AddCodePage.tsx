import React, { useState } from 'react'
import { useLocalObservable } from 'mobx-react-lite';
import authStore from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';

const AddCodePage = () => {
  const localStore = useLocalObservable(() => authStore);
  const [codeName, setCodeName] = useState('');
  const navigate = useNavigate();

  const handleAddCode = () => {
    if (codeName.trim() !== '') {
      localStore.addMfaCode(codeName);
      navigate('/');
    }
  };
  return (
    <div className="container">
      <h2>Add New 2FA Code</h2>
      <input
        type="text"
        value={codeName}
        onChange={(e) => setCodeName(e.target.value)}
        placeholder="Enter Code Name"
        maxLength={6}
      />
      <button onClick={handleAddCode}>Add</button>
    </div>
  )
}

export default AddCodePage