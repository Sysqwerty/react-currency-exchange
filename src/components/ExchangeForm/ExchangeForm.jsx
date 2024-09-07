import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { toastAlert } from 'helpers/toastAlert';
import { getExchangeCurrency } from 'reduxState/currencyOp';

export const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;

    const value = form.elements.request.value;
    if (!value.match(/^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/)) {
      console.log('Wrong format'); /// TODO REMOVE
      return;
    }
    const [amount, from, , to] = value.split(' ');
    console.log(amount, from, to); // TODO REMOVE
    // form.reset();

    dispatch(getExchangeCurrency({ to, from, amount }))
      .unwrap()
      .then(() => {
        toastAlert('Exchange successful', 'info');
      })
      .catch(error => {
        console.log(error); // TODO REMOVE
        toastAlert(error.message, 'error');
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format: 15 USD in UAH"
        name="request"
        className={styles.input}
      />
    </form>
  );
};
