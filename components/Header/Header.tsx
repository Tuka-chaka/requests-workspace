import { BsPatchExclamationFill } from "react-icons/bs";
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
      <BsPatchExclamationFill/>
      itilium
      </div>
    </header>
  )
}

export default Header
