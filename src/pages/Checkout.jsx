import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { setLocal } from '../services/api';

class Checkout extends Component {
  state = {
    produto: [],
    fullname: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    adress: '',
    paymant: '',
    redirect: false,
    invalid: false,
  };

  componentDidMount() {
    this.getLocal();
  }

  getLocal = () => {
    const local = JSON.parse(localStorage.getItem('produto')) || [];
    this.setState({
      produto: local,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { fullname, email, phone, cpf, cep, adress, paymant } = this.state;
    if (fullname && email && phone && cpf && cep && adress && paymant) {
      this.setState(
        {
          redirect: true,
        },
        () => {
          setLocal([]);
          this.setState({
            fullname: '',
            email: '',
            phone: '',
            cpf: '',
            cep: '',
            adress: '',
            paymant: '',
          });
        },
      );
    } else {
      this.setState({
        invalid: true,
      });
    }
  };

  render() {
    const {
      produto,
      fullname,
      email,
      phone,
      cpf,
      cep,
      redirect,
      invalid,
      adress,
    } = this.state;

    return (
      <div>
        <div>
          {produto.length === 0 ? (
            <h1>A lista de produtos está vazia</h1>
          ) : (
            produto.map((element) => (
              <div key={ element.id }>
                <div>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p>{element.title}</p>
                  <p>{`Valor: ${element.price}`}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <form>
            <label htmlFor="fullname">
              Nome completo:
              <input
                type="text"
                data-testid="checkout-fullname"
                name="fullname"
                value={ fullname }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                data-testid="checkout-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              <input
                type="text"
                data-testid="checkout-cpf"
                name="cpf"
                value={ cpf }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="phone">
              Telefone:
              <input
                type="text"
                data-testid="checkout-phone"
                name="phone"
                value={ phone }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="cep">
              Cep:
              <input
                type="text"
                data-testid="checkout-cep"
                name="cep"
                value={ cep }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="adress">
              Endereço
              <input
                type="text"
                data-testid="checkout-address"
                name="adress"
                value={ adress }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Boleto">
              Boleto
              <input
                data-testid="ticket-payment"
                type="radio"
                name="paymant"
                value="Boleto"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Visa">
              Visa
              <input
                data-testid="visa-payment"
                type="radio"
                name="paymant"
                value="Visa"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="master-card">
              Master Card
              <input
                data-testid="master-payment"
                type="radio"
                name="paymant"
                value="Master-card"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="Elo">
              Elo
              <input
                data-testid="elo-payment"
                type="radio"
                name="paymant"
                value="Elo"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.handleClick }
            >
              Enviar
            </button>
          </form>
          {redirect && <Redirect to="/" />}
          {invalid && <p data-testid="error-msg">Campos inválidos</p>}
        </div>
      </div>
    );
  }
}
export default Checkout;
