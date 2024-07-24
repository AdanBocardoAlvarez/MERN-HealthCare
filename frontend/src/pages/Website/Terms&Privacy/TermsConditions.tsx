import Header from '../../../layout/website/Header/Header';
import Footer from '../../../layout/website/Footer/Footer';
import { useTermsCondition } from '../../../hooks/Website/useWebsite';

const TermsConditions = () => {
  const [state] = useTermsCondition('term-and-conditions');
  if (state.length <= 0) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <Header />
        <div className='container'>
          <h1 className='text-center'>Terms & Condition</h1>
          <p className=' text-justify'>{state[0].content}</p>
        </div>

        <Footer />
      </>
    );
  }
};

export default TermsConditions;
