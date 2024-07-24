import { useGetDigitalProduct } from '../../../../hooks/Admin/useAdminConsultant';
import { usePageData } from '../../../../hooks/usePage';
import { IPageData } from '../../../../interfaces/page';
import DigitalProductTable from './DigitalProductTable';
const pageData: IPageData = {
  title: 'View Digital Product',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Admin-Dashboard',
      route: 'dashboard'
    },
    {
      title: 'Add Digital Product'
    }
  ]
};

const ViewDigitalProductPage = () => {

  //   const stat: IDigitalProduct[] = [{
  //     "title": "The “misuse” of the judicial system to attack freedom of expression: trends, challenges and responses",
  //     "author_name": "pp,ju,lo",
  //     "date": "2012-03-02",
  //     "subtitletitle": "sdsdfsdf",
  //     "des": "wew",
  //     "_id":"90877",
  //     "status":1
  // },{
  //   "title": "lop22",
  //   "author_name": "6537ab86207f83ea595825a2",
  //   "date": "2012-03-01",
  //   "subtitletitle": "popoi",
  //   "des": "ajhdj djhdsjf",
  //   "_id":"97",
  //   "status":0
  // }]
  usePageData(pageData);
  const { state, refreshData } = useGetDigitalProduct('digital-product/index');
  return (
    <>
      {/* <DigitalProductTable Type='View' refreshData={refreshData} state={state} /> */}
      <DigitalProductTable Type='View' refreshData={refreshData} state={state} />
    </>
  );
};

export default ViewDigitalProductPage;
