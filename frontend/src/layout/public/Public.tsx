import { ReactNode } from 'react';
import './Public.scss';
import WebLogo from '../components/logo/WebLogo';

type Props = { children: ReactNode; bgImg?: string; transparent?: boolean };

const PublicLayout = ({ children, bgImg, transparent = false }: Props) => (
	<div className='public-layout' style={{ backgroundImage: `url(${bgImg})` }}>
		<div className={`content-box ${transparent ? 'transparent' : null}`}>
			<div className='content-header px-3'><WebLogo /></div>
			<div className='content-body'>{children}</div>
		</div>
	</div>
);

export default PublicLayout;
