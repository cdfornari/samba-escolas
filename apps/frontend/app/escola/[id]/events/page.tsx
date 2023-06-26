import { EventsTable } from '../../../../components/events/EventsTable';

export default function Page({ params }) {
  return <EventsTable escola={params.id} />;
}
