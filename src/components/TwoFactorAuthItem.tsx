import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import authStore from '../store/AuthStore';
import Google from '../google.svg';

interface TwoFactorAuthItemProps {
  code: string;
}

const TwoFactorAuthItem: React.FC<TwoFactorAuthItemProps> = observer(({ code }) => {
  const [isExpired, setIsExpired] = useState(false);
  const regeneratedCodeRef = useRef<string | null>(null);

  const handleComplete = () => {
    setIsExpired(true);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const regenerateCode = () => {
      authStore.removeMfaCode(code);
      const newCode = authStore.generateRandomCode();
      regeneratedCodeRef.current = newCode!;
      setIsExpired(false);
    };

    if (isExpired) {
      intervalId = setInterval(() => {
        regenerateCode();
      }, 60000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [code, isExpired]);

  return (
    <div className={`auth-code-item ${isExpired ? 'regenerating' : ''}`}>
      <img src={Google} alt='icon'/>
      <span>{regeneratedCodeRef.current || code}</span>
      {!isExpired ? (
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[40, 30, 20, 10]}
            onComplete={handleComplete}
            size={50}
            strokeWidth={5}
          >
            {({ remainingTime }) => (
              <span style={{ fontSize: '20px'}}>{(remainingTime )}</span>
            )}
          </CountdownCircleTimer>
      ) : (
        <span className="regenerating-text">Regenerating...</span>
      )}
    </div>
  );
});

export default TwoFactorAuthItem;
