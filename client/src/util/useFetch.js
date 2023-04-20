import { useState, useEffect } from 'react';

const useFetch = url => {
  /* useState를 이용하여 data, isPending, error를 정의하세요. */
  const [datas, setDatas] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState();
  /* useFetch 안의 중심 로직을 작성해주세요. */
  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          setIsPending(true);
          setDatas(data);
          setError(null);
        })
        .catch(err => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);

  /* return 문을 작성해주세요. */
  return {
    datas,
    setDatas,
    isPending,
    setIsPending,
    error,
    setError,
  };
};

export default useFetch;
