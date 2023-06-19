'use client';
import { useQuery } from '@apollo/client';
import { Loading } from '@nextui-org/react';
import { PlaceForm } from '../../../components/places/PlaceForm';
import { LUGAR } from '../../../graphql';
import { Place } from '../../../interfaces';

export default function Page({ params }) {
  const { data, loading, error } = useQuery<{
    lugar: Place;
  }>(LUGAR, {
    variables: {
      id: Number(params.id),
    },
    fetchPolicy: 'network-only',
  });
  if (loading) return <div className='w-full h-full flex justify-center items-center'>
    <Loading />
  </div>;
  if (error) return <p>Error</p>;
  return <PlaceForm action={async (data) => {}} initialValues={data?.lugar} />;
}
