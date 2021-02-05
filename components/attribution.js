import styled from "@emotion/styled"

export default styled.div`
  padding: 20px;
  color: white;
  font-size: 24px;
  text-align: right;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  background-color: rgb(60, 170, 170);
  border-color: rgba(60, 170, 170, 0);
  border-width: 0 0 6px 6px;
  border-style: solid;
  transition: border-color 0.3s;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  &:hover {
    z-index: 9999;
    border-color: rgba(70, 190, 190, 1);
  }
  a {
    color: white;
    display: block;
    padding: 8px;
    display: block;
    text-align: right;
    &:hover {
      background: rgba(70, 190, 190, 1);
    }
  }
  a:first-of-type {
    margin-top: 24px;
  }
`
