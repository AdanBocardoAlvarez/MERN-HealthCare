export interface IPageData {
  title?: string;
  loaded?: boolean;
  subTitle?: string;
  breadcrumbs?: IBreadcrumb[];
  fulFilled?: boolean;
}

export interface IBreadcrumb {
  title: string;
  route?: string;
}
