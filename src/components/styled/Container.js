import styled from 'styled-components';
 
const Container = styled.div`
  display: block;
  unicode-bidi: isolate;
  background-color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  max-width: ${(props) => props.maxwidth};
  min-height: 100vh;
  padding: 64px 0;
`;
 
Container.defaultProps = {
  color: '#fff',
  maxwidth: '800px',
  margin: '0 auto',
}
 
export default Container;