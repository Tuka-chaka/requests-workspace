'use server'

import { promises as fs } from 'fs';
import { redirect } from 'next/navigation'
import { User } from "@/types";
import { createSession } from './lib/session';

export async function signUp(state: string | undefined, formData: FormData) {

  const login = formData.get('login') as string
  const password = formData.get('password') as string

  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);

  if (data.users.some((user: User) => user.name === login && user.password === password)) {
    await createSession(login)
    redirect(`/${login}`)
  }

  else {
    return('Неверный логин или пароль')
  }
}