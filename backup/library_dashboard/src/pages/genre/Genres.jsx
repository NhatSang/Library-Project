import { useEffect, useState } from "react";
import { _getGenres } from "../home/apis";
import { Button, Col, Space, Table } from "antd";
import { CCol } from "@coreui/react";
import Search from "antd/es/transfer/search";

const Genres = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const column = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
        },
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "name",
        },
        {
            title:"Hành động",
            render: (value, item) => (
                <Space>
                    <Button onClick={()=>{}} type="primary">
                      Sửa
                    </Button>
                    <Button onClick={()=>{}} type="primary" danger>
                      Xoá
                    </Button>
                </Space>
              ),
        }
    ]

    useEffect(() => {
        getGenres();
    }, []);

    const getGenres = async () => {
        setLoading(true);
        try {
            const res = await _getGenres();
            if(res.data){
                setGenres(res.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleSearch = (value) => {
        if(value){
            const filter = genres.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
            setGenres(filter);
        } else {
            getGenres();
        }
    }
    
    return (
        <div>
            <CCol style={{padding:20}}>
        <Search placeholder="Nhập từ khóa" onChange={(e) => handleSearch(e.target.value)} />
        </CCol>
            <Table title={()=>{
          return (
            <Col>
              <h3>Danh sách thể loại</h3>
            </Col>
          )
        }}  dataSource={genres} columns={column} loading={loading} rowKey="id" pagination={{pageSize:5}}/>
        </div>
    );
}

export default Genres;