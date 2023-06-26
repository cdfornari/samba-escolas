import { PatrociniosTable } from '../../../../components/sponsoships/SponsorshipsTable';

export default function Page({ params }) {
  return <PatrociniosTable escola={params.id} />;
}
