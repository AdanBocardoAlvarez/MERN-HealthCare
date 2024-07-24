import { Fragment, useState } from 'react';
import { IMenuItem } from '../../../interfaces/main-menu';
import classNames from '../../../utils/class-names';
import { Link } from 'react-router-dom';
import './Menu.scss'

type MenuProps = {
    orientation?: 'vertical' | 'horizontal';
    data?: IMenuItem[];
    children?: any;
    opened?: boolean;
    linking?: 'admin' | 'consultant';
    onCloseSidebar?: () => void;
    className?: string;
};

const MyMenu = ({
    data: menuItems,
    orientation,
    children,
    className,
}: MenuProps | any) => {

    const menuClasses = classNames({
        'main-menu': true,
        horizontal: orientation === 'horizontal'
    });

    return (
        <div className={`${menuClasses} ${!!className && className}`}>
            {children}
            {menuItems.length > 0 && (
                <nav className="main-menu-wrap">
                    <ul className="menu-ul">
                        {menuItems.map((row, i) => {
                            if (row?.routing && row?.sub === undefined) {
                                return <SingleLink key={i} {...row} />
                            } else if (row?.routing === undefined && row?.sub && row.sub.length > 0) {
                                return <MultiLink key={i} {...row} />
                            } else {
                                return <Fragment key={i}></Fragment>;
                            }
                        })}
                    </ul>
                </nav>
            )}
        </div>
    )
}

type ISingleLink = { title: string, routing: string }
type IMultiLink = { title: string, sub: ISingleLink[] }


const SingleLink = ({ title = "", routing = "" }: ISingleLink) => {
    return <li className="menu-item">
        <Link aria-current="page" className="item-link active" to={routing}>
            <span className="link-text">{title} </span>
        </Link>
    </li>
}

const MultiLink = ({ title = "", sub = [] }: IMultiLink) => {

    const [show, setShow] = useState<boolean>(false)

    return <li className={`menu-item has-sub ${show ? 'active' : ''}`} onMouseLeave={() => setShow(false)}>
        <span className="item-link"
            onClick={() => setShow(!show)}
            onMouseEnter={() => setShow(true)}
        >
            <span className="link-text">{title}</span>
            <span className="link-caret icofont icofont-thin-right"></span>
        </span>
        <ul className="sub" style={{
            opacity: (show ? 1 : 0),
            height: (show ? 'auto' : 0),
        }}>
            {sub.map((inn, j) => (
                <li key={j} className="menu-item">
                    <Link className="item-link" to={inn?.routing}>
                        <span className="link-text">{inn?.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </li>
}

export default MyMenu