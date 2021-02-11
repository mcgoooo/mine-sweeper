import Document, { Head, Main, NextScript } from "next/document"
import Attribution from "../components/attribution"

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
               `,
            }}
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Courier+Prime"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Attribution>
            Minesweeper 95 made by Mcgoooo 🚀
            <a href="https://github.com/mcgoooo/mine-sweeper" target="_blank">
              Source code
            </a>
            <a href="https://github.com/mcgoooo" target="_blank">
              Github
            </a>
            <a href="https://linkedin.com/in/mcgoooo" target="_blank">
              LinkedIn
            </a>
            <a href="https://instagram.com/mcgoooo" target="_blank">
              Instagram
            </a>
          </Attribution>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
