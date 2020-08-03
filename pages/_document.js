import Document, { Head, Main, NextScript } from 'next/document';
import styled from '@emotion/styled'
const Attirbution = styled.div`
  padding: 20px;
  color: white;
  font-size: 24px;
  float: right;
  text-align: right;
  overflow: hidden;
  a {
    color: white;
    display: block;
    padding: 8px;
    display: block;
    text-align: right;
    &:hover {
      background: rgba(255, 255, 255, 0.2)
    }
  }
  a:first-of-type {
    margin-top: 24px;
  }
`
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                *{ box-sizing: border-box; }
                body { margin: 0; }
                html {
                  padding-left:100px;
                  font-family: 'Microsoft Sans Serif', 'Open Sans', sans-serif;
                  background-color: rgb(60, 170, 170);
                }
               `
            }}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Courier+Prime"
            rel="stylesheet">
          </link>
        </Head>
        <body>
          <Attirbution>
            Minesweeper 95 made by Mcgooo
            <a href="https://github.com/mcgoooo/mine-sweeper" target="_blank">minesweeper 95 source code</a>
            <a href="https://github.com/mcgoooo" target="_blank">Github</a>
            <a href="https://linkedin.com/in/mcgoooo" target="_blank">linked in</a>
            <a href="https://instagram.com/mcgoooo" target="_blank">instagram</a>
          </Attirbution>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
