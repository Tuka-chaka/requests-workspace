'use client'
import styles from './TicketCard.module.scss'
import { Ticket } from "@/types";
import { FaCircle } from "react-icons/fa";
import { FaChevronDown, FaChevronUp} from "react-icons/fa6";
import { IconContext } from "react-icons";
import { getStatusColor } from '@/helpers';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface TicketCardProps {
    ticket: Ticket
}

const TicketCard: React.FunctionComponent<TicketCardProps> = ({ticket}) => {

  const router = useRouter()

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button onClick={() => router.back()} className={styles.backButton}>НАЗАД</button>
      </div>
      <div className={styles.card}>
        <div className={styles.contentColumn}>
          <div className={styles.date}>{`Обращение № ${ticket.id.padStart(10, '0')} от ${ticket.opened}`}</div>
          <div className={styles.label}>{ticket.label}</div>
          <div className={styles.description}>{ticket.description}</div>
        </div>
        <div className={styles.detailsColumn}>
          <div className={styles.status}><FaCircle style={{color: getStatusColor(ticket.status), marginRight: '0.5em'}} size='0.6em'/>
          <span className={styles.nowrap}>{ticket.status}</span>
          </div>
          <div className={styles.detailName}>Крайний срок</div>
          <div className={styles.detail}>{ticket.deadline}</div>
          <div className={styles.detailName}>Решение</div>
          <div className={styles.detail}>{ticket.solution ? ticket.solution : '-'}</div>
          {isExpanded? <>
            <div className={styles.detailName}>Услуга</div>
            <div className={styles.detail}>{ticket.service}</div>
            <div className={styles.detailName}>Состав услуги</div>
            <div className={styles.detail}>{ticket.service_details}</div>
          </> : <></>}
        </div>
      </div>
      <div  className={styles.expand} onClick={() => setIsExpanded(isExpanded => !isExpanded)}>
        <IconContext.Provider value={{style:{color: 'grey'}}}>
        {isExpanded ? <FaChevronUp/> : <FaChevronDown/> }
        </IconContext.Provider>
      </div>
    </div>
  )
};

export default TicketCard;
