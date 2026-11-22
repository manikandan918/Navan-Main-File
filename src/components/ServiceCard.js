import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  ClipboardList,
  FileCheck2,
  Landmark,
  Scale,
  Wallet,
} from 'lucide-react';

// Keep service icons in one place so homepage cards stay consistent.
const serviceIcons = {
  cost: ChartNoAxesCombined,
  boq: ClipboardList,
  tender: FileCheck2,
  loan: Landmark,
  contract: Scale,
  control: Wallet,
};

export default function ServiceCard({ item, index }) {
  const Icon = serviceIcons[item.icon] || ChartNoAxesCombined;

  return (
    <article className="service-card">
      <div className="service-card-top">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <Icon size={25} strokeWidth={1.5} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <Link to="/services" className="text-link">
        Explore service <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}
