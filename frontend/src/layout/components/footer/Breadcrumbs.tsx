import React from 'react';
import { NavLink } from 'react-router-dom';
import { IBreadcrumb } from '../../../interfaces/page';

type Props = {
	breadcrumbs: IBreadcrumb[];
	layout: string;
	routerView: string;
};

const Breadcrumb = ({ route, title, routerView }) => {
	return (
		<li className='item'>
			{route ? <NavLink className='link' replace to={`/${routerView}/${route}`}>{title}</NavLink> : <span>{title}</span>}
		</li>
	);
};

const Breadcrumbs = ({ breadcrumbs = [], layout, routerView }: Props) => {
	const breadcrumbList = breadcrumbs.map(({ title, route }: IBreadcrumb, index) => (
		<React.Fragment key={index}>
			<Breadcrumb title={title} route={route} routerView={routerView} />
			{index < breadcrumbs.length - 1 && <li><i className='separator icofont icofont-thin-right' /> </li>}
		</React.Fragment>
	));

	return <ul className='page-breadcrumbs'>{breadcrumbList}</ul>;
};

export default Breadcrumbs;
