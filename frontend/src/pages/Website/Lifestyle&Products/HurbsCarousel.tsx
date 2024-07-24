import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import itemList from './list-data.json';

import image1 from '../../../assets/img/life-hurbs/image-1.png';
import image2 from '../../../assets/img/life-hurbs/image-2.png';
import image3 from '../../../assets/img/life-hurbs/image-3.png';
import image4 from '../../../assets/img/life-hurbs/image-4.png';
import image5 from '../../../assets/img/life-hurbs/image-5.png';
import image6 from '../../../assets/img/life-hurbs/image-6.png';
import image7 from '../../../assets/img/life-hurbs/image-7.png';
import image8 from '../../../assets/img/life-hurbs/image-8.png';
import image9 from '../../../assets/img/life-hurbs/image-9.png';
import image10 from '../../../assets/img/life-hurbs/image-10.png';
import { useTranslation } from "react-i18next";

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

type IList = { title: string, sub_title: string, keys: string[] }

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const HurbsCarousel = () => {
    return (
        <Carousel responsive={responsive} infinite autoPlaySpeed={3000} autoPlay>
            {itemList.map((row: IList, i: number) => <Singleitem key={i} index={i} data={row} />)}
        </Carousel>
    )
}

const Singleitem = ({ data, index }: { data: IList, index: number }) => {
    const { t } = useTranslation();
    return (
        <div className="p-5 text-center h-100">
            <img className="list-image" src={images[index]} alt="" />
            <h2 className="h3 mt-0 mb-1 text-dark">{data.title}</h2>
            <h3 className="h5 mt-0 mb-1 text-dark ls-1">({data.sub_title})</h3>
            <ul className="life-style-list small text-center">
                {data.keys.map((row: string, i: number) => <li key={i}>{t(`lifestyle-product.benefits.${row}`)}</li>)}
            </ul>
        </div>
    )
}

export default HurbsCarousel