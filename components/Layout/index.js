import Head from 'next/head';
import styles from './Layout.module.css';
import React from 'react'

function Layout ({children}) {
    return (
        <React.Fragment>
            <Head>
            <title>Next Weather</title>
            <link rel="stylesheet" href="/static/bootstrap.min.css"/>
            </Head>
            <div className={styles['App']}>
                <div className={styles['App-body']}>
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Layout;