'use client'

import { User } from '@/types';
import styles from './LoginForm.module.scss'

interface LoginFormProps {

}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {

  return ( 
    <div className={styles.container}>
      <div className={styles.heading}>Вход в сервис</div>
      <form>
        <input 
        id='login'
        name='login'
        type='login'
        placeholder='Логин' />
        <input 
        id='password'
        name='password'
        type='password'
        placeholder='Пароль' />
        <button>ВОЙТИ</button>
      </form>
    </div>
  );
};

export default LoginForm;
