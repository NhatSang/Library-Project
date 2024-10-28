import React, { useEffect, useState } from "react";
import { getGenres } from "./api";
import { Button } from "antd";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetchGenres();
  }, []);
  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      setGenres(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeGenres = (genreId) => {

    
  };
  return (
    <div className="px-5 py-2 space-y-3">
      <div className="grid grid-cols-6 gap-2 bg-white p-3 rounded-md">
        {genres?.map((g) => (
          <Button type="primary" onClick={() => handleChangeGenres(g._id)}>
            {g.name}
          </Button>
        ))}
      </div>
      <div className="p-3 rounded-md bg-white grid grid-cols-4 gap-4">
        <Button></Button>
        <Button></Button>
        <Button></Button>
        <Button></Button>
      </div>
    </div>
  );
};

export default Genre;
