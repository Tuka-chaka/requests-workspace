'use client'

import { signUp } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom'
import styles from './LoginForm.module.scss'

const LoginForm: React.FunctionComponent = () => {

  const [state, action] = useFormState(signUp, undefined)
  return ( 
    <div className={styles.container}>
      <div className={styles.heading}>Вход в сервис</div>
      <form action={action}>
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
        {state && <p>{state}</p>}
        <SubmitButton/>
      </form>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button disabled={pending} type="submit">
      ВОЙТИ
    </button>
  )
}

export default LoginForm;
