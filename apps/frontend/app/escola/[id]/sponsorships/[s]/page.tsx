import { DonacionesTable } from '../../../../../components/sponsorships/DonacionesTable';

export default function Page({ params }) {
  return <DonacionesTable escola={params.id} patrocinio={params.s} />;
}
