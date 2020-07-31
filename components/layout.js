import Head from 'next/head';
import { StyleProvider } from 'cf-style-nextjs';
import { createComponent } from 'cf-style-container';
import { Fragment } from 'react'

const Center = createComponent(({ theme }) => ({
  margin: '0px auto',
  margin: theme.space[4]
}));

export default ({ children, title = 'Minesweeper' }) => (
  <Fragment>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
    </Head>
    <StyleProvider>
      <Center>
          <h1>{title}</h1>
          {children}
      </Center>
    </StyleProvider>
  </Fragment>
);
