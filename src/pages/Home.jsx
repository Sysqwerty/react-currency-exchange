import {
  Container,
  ExchangeForm,
  ExchangeInfo,
  Heading,
  Loader,
  Section,
} from 'components';
import { useSelector } from 'react-redux';
import { selectExchangeInfo, selectIsError } from 'reduxState/currencySlice';

const Home = () => {
  const isLoading = useSelector(state => state.currency.isLoading);
  const isError = useSelector(selectIsError);
  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom={true}
          title="What currencies do you want to exchange?🙂"
        />
        <ExchangeForm />
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}

        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default Home;
