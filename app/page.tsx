import styles from "./page.module.scss";
import LoginForm from "@/components/LoginForm/LoginForm";

export default async function Home() {

  return (
    <div className={styles.page}>
      <LoginForm/>
    </div>
  );
}
