import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Container,
  Row,
} from 'react-bootstrap';

import Search from './components/Search.js'


function App() {
  return (
    <Container>
      <Row>
        <p>Design for green</p>
      </Row>
      <Row>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ipsum lectus, ultrices in scelerisque sed, volutpat quis dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec posuere nisl et leo consectetur suscipit. Quisque finibus eu magna a tincidunt. Maecenas sem ligula, rutrum vel convallis ac, semper non purus. Vestibulum lectus felis, tristique sed pellentesque quis, mattis id dolor. In dictum aliquet ultricies. Curabitur facilisis accumsan orci id egestas.</p>
      </Row>
      <Search />
    </Container>
  );
}

export default App;
