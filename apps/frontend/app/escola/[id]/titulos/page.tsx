import { IntegranteHistoriesTable } from '../../../../components/integrantes/IntegranteHistoryTable';

export default function Page({ params }) {
  return <IntegranteHistoriesTable escola={params.id} />;
}
