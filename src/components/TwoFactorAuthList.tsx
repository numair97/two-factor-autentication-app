
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useLocalObservable } from 'mobx-react-lite';
import TwoFactorAuthItem from './TwoFactorAuthItem';
import authStore from '../store/AuthStore';
import { Link } from 'react-router-dom';
import Plus  from '../plus.svg';

const TwoFactorAuthList: React.FC = observer(() => {
  const localStore = useLocalObservable(() => authStore);

  return (
    <div>
      <Link to={'/add'}>
        <img src={Plus} alt='plus'/>
      </Link>
      {localStore.mfaCodes.map((code) => (
        <TwoFactorAuthItem key={code} code={code} />
      ))}
    </div>
  );
});

export default TwoFactorAuthList;
