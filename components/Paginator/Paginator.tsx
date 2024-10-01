'use client'
import styles from './Paginator.module.scss'
import { useRouter, useSearchParams } from 'next/navigation'
import ReactPaginate from 'react-paginate'

interface IAppProps {
  pages: number;
}

const Paginator: React.FunctionComponent<IAppProps> = ({pages}) => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get('page') ?? '0')
  const orderBy = searchParams.get('orderBy') ?? 'Номер'
  const isAscending = searchParams.get('isAscending') ?? 'true'

  if (pages < 2) {
    return <></>
  }

  return(
    <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(selected) => router.push(`/dashboard/?orderBy=${orderBy}&isAscending=${isAscending}&page=${selected.selected}`)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pages}
        previousLabel="<"
        renderOnZeroPageCount={null}
        initialPage={page}
        disableInitialCallback={true}
        containerClassName={styles.paginator}
        previousClassName={styles.hidden}
        nextClassName={styles.hidden}
        pageClassName={styles.page}
        pageLinkClassName={styles.pageLink}
        activeClassName={styles.activePage}
        breakClassName={styles.break}
      />
  );
};

export default Paginator;
