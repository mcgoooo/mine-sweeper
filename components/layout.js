import Head from 'next/head';
import { Fragment } from 'react'

export default ({ children, title = 'Minesweeper' }) => (
  <Fragment>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      <Head>
      <title>{title}</title>
    </Head>
    </Head>
      <Fragment>
        {children}
      </Fragment>
  </Fragment>
);
