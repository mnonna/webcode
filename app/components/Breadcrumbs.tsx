import { Fragment } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <ChevronRight size={16} className="text-slate-400" />}
          {item.path ? (
            <Link
              href={item.path}
              className="text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              {item.label}
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
