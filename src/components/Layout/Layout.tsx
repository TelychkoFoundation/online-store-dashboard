import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header.tsx';
import Sidebar from '../Sidebar/Sidebar.tsx';
import styles from './Layout.module.css';

const Layout: FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.header}>
        <Header />
      </div>

      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
