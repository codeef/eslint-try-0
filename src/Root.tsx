import { useEffect, useState } from 'react';

const Root: React.FC = () => {
  const [hi, setHi] = useState('');

  useEffect(() => {
    console.log(hi);
    setHi('Hello');
  }, []);

  return (
    <div>
      <h3>Hi There</h3>
    </div>
  );
};

export default Root;
