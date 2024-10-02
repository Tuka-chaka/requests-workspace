import Image from "next/image";
import styles from "./page.module.scss";
import LoginForm from "@/components/LoginForm/LoginForm";
import { promises as fs } from 'fs';
import { redirect } from 'next/navigation'
import { User } from "@/types";

type LoginProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Home({searchParams} : LoginProps) {

  const login = searchParams!['login'] ?? ''
  const password = searchParams!['password'] ?? ''

  console.log(searchParams)

  if (login && password) {
    console.log('зашло')
    
    const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
    const data = JSON.parse(file);

    if (data.users.some((user: User) => user.name === login && user.password === password)) {
      redirect('/dashboard')
    }
  }

  return (
    <div className={styles.page}>
      <LoginForm/>
    </div>
  );
}
