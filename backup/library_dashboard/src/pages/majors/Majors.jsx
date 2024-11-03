import { useEffect, useState } from "react";
import { _getGenres } from "../home/apis";
import { Button, Col, Space, Table } from "antd";
import { CCol } from "@coreui/react";
import Search from "antd/es/transfer/search";
import { _getMajors } from "../user/apis";

const Majors = () => {
    const [majors, setMajors] = useState([]);
    const [loading, setLoading] = useState(false);
    const column = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
        },
        {
            title: "Tên chuyên ngành",
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
        getMajors();
    }, []);

    const getMajors = async () => {
        setLoading(true);
        try {
            const res = await _getMajors();
            if(res.data){
                setMajors(res.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleSearch = (value) => {
        if(value){
            const filter = majors.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
            setMajors(filter);
        } else {
            getMajors();
        }
    }
    
    return (
        <div>
            <CCol style={{padding:20}}>
        <Search placeholder="Nhập từ khóa" onChange={(e) => handleSearch(e.target.value)} />
        </CCol>
            <Table 
            title={()=>{
          return (
            <Col>
              <h3>Danh sách chuyên ngành</h3>
            </Col>
          )
        }}  dataSource={majors} columns={column} loading={loading} rowKey="id" pagination={{pageSize:5}}/>
        </div>
    );
}

export default Majors;