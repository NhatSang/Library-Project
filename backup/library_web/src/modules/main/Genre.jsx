import React, { useEffect, useState } from "react";
import { getGenres } from "./api";
import { Button, Divider, Space, Tooltip } from "antd";

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

      <div className=" bg-white p-3 rounded-md shadow-md">
        <Space wrap>
          {genres?.map((g) => (
            <Tooltip title="prompt text" key={g._id}>
              <Button onClick={() => handleChangeGenres(g._id)}>
                {g.name}
              </Button>
            </Tooltip>
          ))}
        </Space>
      </div>
      <div className="p-3 rounded-md bg-white grid grid-cols-4 gap-4 shadow-md">
        <Button></Button>
        <Button></Button>
        <Button></Button>
        <Button></Button>
      </div>
    </div>
  );
};

export default Genre;
