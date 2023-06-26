import { TitlesTable } from '../../../../components/titulos/TitlesTable';

export default function Page({ params }) {
  return <TitlesTable escola={params.id} />;
}
