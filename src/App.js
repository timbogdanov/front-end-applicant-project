import React, { useState, useEffect, useRef } from 'react';

import { colorsList } from './index';
import styles from './App.module.css';

const App = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(colorsList);
  const [input, setInput] = useState('');

  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleOffClick);
    document.addEventListener('keydown', handleOnKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOffClick);
      document.removeEventListener('keydown', handleOnKeyDown);
    };
  }, []);

  const handleOffClick = (e) => {
    const { current: wrap } = wrapperRef;

    if (wrap && !wrap.contains(e.target)) {
      setShowOptions(false);
    }
  };

  const handleOnKeyDown = () => {
    setShowOptions(true);
  };

  const setOption = (option) => {
    setInput(option);
    setShowOptions(false);
  };

  return (
    <div>
      <div className={styles.bodyWrapper}>
        <div className={styles.inputWrapper}>
          <form autocomplete='off'>
            <input
              type='text'
              placeholder='Type to search...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>

          {showOptions && (
            <div ref={wrapperRef} className={styles.optionsWrapper}>
              {options
                .filter((option) =>
                  option.toLowerCase().includes(input.toLocaleLowerCase())
                )
                .map((value, index) => {
                  return (
                    <div
                      onClick={() => setOption(value)}
                      className={styles.option}
                      key={index}
                      tabIndex='0'
                    >
                      <span>{value}</span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
