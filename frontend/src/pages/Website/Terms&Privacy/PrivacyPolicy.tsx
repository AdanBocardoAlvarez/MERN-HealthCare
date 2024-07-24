import Header from '../../../layout/website/Header/Header';
import Footer from '../../../layout/website/Footer/Footer';
import { useTermsCondition } from '../../../hooks/Website/useWebsite';

const PrivacyPolicy = () => {
	const [state] = useTermsCondition('privacy-policy');
	return (
		<>
			<Header />
			<div className='container'>
				<h1 className='text-center'>Privacy Policy</h1>
				{state.map((item) => <p className=' text-justify'>{item.content}</p>)}
			</div>
			<Footer />
		</>
	);
};

export default PrivacyPolicy;
