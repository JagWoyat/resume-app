import { useEffect, useState } from "react";

export default function Details({ type, id }) {
  const [details, setDetails] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://98.71.35.179/api/${type}/${id}`);
      if (!res.ok) {
        return;
      }
      const bgs = await res.json();
      setDetails(bgs);
    }

    fetchData();
  }, []);
  return (
    <div>
      {details ? <h2>{`${type}: ${details.name}`}</h2> : <p>Loading...</p>}
    </div>
  );
}
