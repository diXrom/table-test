import Table from 'widgets/Table';
import { IKeysColumn } from './lib/types';
import 'app/lib/style.css';
import useApp from './model/useApp';

const App = () => {
  const data = useApp('data.json');
  if (!data.length) return null;

  return (
    <div className='container flex flex-col items-center justify-center h-screen'>
      <h1 className='mb-2 text-2xl font-bold'>React table</h1>
      <Table data={data} columns={Object.keys(data[0]) as IKeysColumn[]} />
    </div>
  );
};

export default App;
