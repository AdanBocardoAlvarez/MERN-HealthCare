import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Metatags } from "../../utils/main-page-utils";

export default function ScrollToTop() {

    const { pathname } = useLocation();
    useEffect(() => {

        let title: HTMLMetaElement = document.querySelector('meta[name="title"]');
        let description: HTMLMetaElement = document.querySelector('meta[name="description"]');
        let canonical: HTMLLinkElement = document.querySelector('link[rel="canonical"]');

        let meta = Metatags.find(row => row.link === pathname) || Metatags.find(row => true);
        if (meta) {
            document.title = meta.title;
            if (title) title.setAttribute('content', meta.title);
            if (description) description.setAttribute('content', meta.description);
            if (canonical) canonical.setAttribute('href', `${process.env.REACT_APP_BASEURL}${pathname}`)
        }

        return window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}