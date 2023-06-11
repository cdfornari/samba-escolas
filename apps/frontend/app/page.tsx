import { EscolasTable } from '../components/escolas/EscolasTable';

export default function Page() {
  return (
    <>
      <div className='px-10 pt-10'>
        <h1 className='text-carnival_blue font-bold text-3xl'>Escolas</h1>
      </div>
      <EscolasTable />
    </>
  );
}
