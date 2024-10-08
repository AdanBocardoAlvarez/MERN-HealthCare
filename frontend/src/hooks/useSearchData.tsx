import { useEffect, useState } from 'react';
import axios from 'axios';
import { IMenuItem, IMenuItemSub } from '../interfaces/main-menu';

const hasRouting = (item: IMenuItem) => !!item.routing;
const hasSub = (item: IMenuItem) => !!item.sub;

const getOption = (item: IMenuItem | IMenuItemSub) => ({
	label: item.title,
	value: item.layout ? `/${item.layout}/${item.routing}` : item.routing
});

const setSubTitle = (itemTitle: string) => (subItem: IMenuItemSub) => ({
	...subItem,
	title: `${itemTitle} > ${subItem.title}`
});

function parseSearchData(data) {
	const menuItems = data.filter(hasRouting);

	const menuItemsWithSub = data
		.filter(hasSub)
		.map((item: IMenuItem) => ({
			...item,
			sub: item.sub.map(setSubTitle(item.title))
		}))
		.map((item: IMenuItem) => item.sub)
		.flat();

	return [...menuItems, ...menuItemsWithSub].map(getOption);
}

export function useSearchData() {
	const [searchData, setSearchData] = useState([]);

	// useEffect(() => {
	// 	(async function fetchSearchData() {
	// 		const result = await axios('./data/menu.json');
	// 		const searchData = parseSearchData(result.data);
	// 		setSearchData(searchData);
	// 	})()
	// }, []);

	return searchData;
}
