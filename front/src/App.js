import {
  Grid,
} from '@material-ui/core';

import Search from './components/Search.js'

function App() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <p>Design for green</p>
      </Grid>
      <Grid item xs={12}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ipsum lectus, ultrices in scelerisque sed, volutpat quis dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec posuere nisl et leo consectetur suscipit. Quisque finibus eu magna a tincidunt. Maecenas sem ligula, rutrum vel convallis ac, semper non purus. Vestibulum lectus felis, tristique sed pellentesque quis, mattis id dolor. In dictum aliquet ultricies. Curabitur facilisis accumsan orci id egestas.</p>
      </Grid>
      <Search />
    </Grid>
  );
}

export default App;
