import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from "@coreui/react";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { _getGenres } from "../home/apis";
import { Loading } from "../../components";

const AddGenrere = () => {
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState({});
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
        },
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "name",
        }
    ]

    useEffect(() => {
        getGenres();
    }
    , []);

    const getGenres = async () => {
        setLoading(true);
        try {
            const res = await _getGenres();
            if(res.data){
                setGenres(res.data);
                setLoading(false);
            }
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <>
        {
            loading && <Loading/>
        }
        <CRow>
            <CCol xs={12} md={5}>
                <CCard className="mb-4">
                <CCardHeader className='font-weight-bold h4'>Thêm mới thể loại</CCardHeader>
                <CCardBody>
                    <CCol>
                        <CFormInput
                        type="text"
                        placeholder="Nhập tên thể loại"
                        value={genre.name}
                        onChange={(e) => setGenre({ ...genre, name: e.target.value })}
                        />
                    </CCol>
                    <div style={{height:30}}/>
                    <CCol xs="auto">
                        <Button type="primary" className="px-4 py-2 text-dark font-medium rounded disabled-opacity-50">
                        <span className="text-base text-white">Thêm thể loại</span>
                        </Button>
                    </CCol>
                </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} md={7}>
                <Table 
                title={() => (
                    <span className="font-weight-bold h4">Danh sách thể loại</span>
                )}
                scroll={
                    { y: 380 }
                } columns={columns} dataSource={genres} pagination={{pageSize:10}}/>
                </CCol>
            </CRow>
            </>
    )
}
export default AddGenrere;