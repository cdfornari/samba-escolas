import { PatrociniosTable } from '../../../../components/sponsorships/SponsorshipsTable';

export default function Page({ params }) {
  return <PatrociniosTable escola={params.id} />;
}
