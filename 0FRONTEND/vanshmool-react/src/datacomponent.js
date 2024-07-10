// DisplayComponent.js
import React from 'react';
import useDataFetcher from './datafetcher';

function DisplayComponent() {
  const { data, loading, error } = useDataFetcher('http://localhost:8000/get-data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Data Display</h1>
      {data.image_url && <img src={data.image_url} alt="Generated" />}
      <p>{data.promptfordalle}</p>
    </div>
  );
}

export default DisplayComponent;
