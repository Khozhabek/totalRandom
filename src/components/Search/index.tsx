import { useState, useRef, useCallback } from 'react';
import styles from './Search.module.scss';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  const onChangeInput = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const handleOnChange = (event: any) => {
    setValue(event.target.value);
    onChangeInput(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        data-name="Livello 1"
        id="Livello_1"
        viewBox="0 0 128 128">
        <path d="M127.11,122.87l-48.45-48A45,45,0,0,0,45,0,44.7,44.7,0,0,0,13.18,13.18h0A45,45,0,0,0,45,90,44.65,44.65,0,0,0,74.38,79.07l48.51,48.06a3,3,0,1,0,4.22-4.26ZM17.42,72.58a39,39,0,0,1,0-55.15h0A39,39,0,1,1,72.58,72.58a39,39,0,0,1-55.15,0Z" />
      </svg>
      <input
        ref={inputRef}
        onChange={handleOnChange}
        type="text"
        className={styles.input}
        placeholder="Поиск пиццы ..."
        value={value}
      />
      {value && (
        <svg
          className={styles.closeBtn}
          onClick={handleOnClear}
          height="18px"
          version="1.1"
          viewBox="0 0 14 14"
          width="18px">
          <path
            d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
            id="Shape"
          />
        </svg>
      )}
    </div>
  );
};
