import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import Carrinho from './pages/Carrinho';
import * as api from './services/api';
import Card from './pages/Card';
import Checkout from './pages/Checkout';

class App extends Component {
  state = {
    produtoCategoria: [],
  };

  componentDidMount() {
    const request = async () => {
      const result = await api.getCategories();

      this.setState({
        produtoCategoria: result,
      });
    };
    request();
  }

  render() {
    const { produtoCategoria } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<TelaPrincipal
              { ...props }
              produtoCategoria={ produtoCategoria }
            />) }
          />
          <Route exact path="/carrinho" component={ Carrinho } />
          <Route
            exact
            path="/card/:id"
            component={ Card }
          />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
