import React from 'react';
import { Link } from 'react-router-dom';

class Carrinho extends React.Component {
  state = {
    produto: [],
  };

  componentDidMount() {
    this.getlocal();
  }

  getlocal = () => {
    const pegarlocal = JSON.parse(localStorage.getItem('produto')) || [];

    this.setState({ produto: pegarlocal });
  };

  soma = (item) => {
    const { produto } = this.state;
    const existe = produto.some((element) => element.id === item.id);
    if (existe) {
      item.amount += 1;
      const index = produto.findIndex((e) => e.id === item.id);
      produto.splice(index, 1);
      produto.push(item);
      localStorage.setItem('produto', JSON.stringify(produto));
    } else {
      item.amount = Number(1);
      produto.push(produto);
      localStorage.setItem('produto', JSON.stringify(localestado));
    }
    this.getlocal();
  };

  sub = (item) => {
    const { produto } = this.state;
    const existe = produto.some((element) => element.id === item.id);
    if (existe) {
      item.amount -= 1;
      const index = produto.findIndex((e) => e.id === item.id);
      produto.splice(index, 1);
      produto.push(item);
      localStorage.setItem('produto', JSON.stringify(produto));
    } if (item.amount <= 0) {
      this.remover(item);
    }
    this.getlocal();
  };

  remover = (item) => {
    const { produto } = this.state;
    const index = produto.findIndex((e) => e.id === item.id);
    produto.splice(index, 1);
    localStorage.setItem('produto', JSON.stringify(produto));
    this.getlocal();
  };

  render() {
    const { produto } = this.state;

    return (
      <div>
        <h1>Carrinho de compras</h1>
        {produto.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          produto.map((element) => (
            <div key={ element.id }>
              <div data-testid="product">
                <p data-testid="shopping-cart-product-name">{element.title}</p>
                <p>{`R$: ${element.price}`}</p>
              </div>
              <p data-testid="shopping-cart-product-quantity">
                {element.amount}
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.soma(element) }
              >
                adicionar
              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.sub(element) }
              >
                diminuir
              </button>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.remover(element) }
              >
                remover
              </button>
            </div>
          ))
        )}
        <Link data-testid="checkout-products" to="/checkout">
          Finalizar compra
        </Link>
      </div>
    );
  }
}
export default Carrinho;
