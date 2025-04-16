import BreadcrumbTrail from '../layout/BreadCrumbTrail';
import PageHeader from '@/components/layout/PageHeader';

export default function ProductsLayout({ children }) {
  return (
    <div>
      <BreadcrumbTrail />
      <PageHeader 
        title="Products" 
        description="Browse our collection of high-quality products" 
      />
      {children}
    </div>
  );
}