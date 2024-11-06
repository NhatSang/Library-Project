import { CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from "@coreui/react";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { _getGenres } from "../home/apis";
import { Loading } from "../../components";
import { _getMajors } from "../user/apis";

const AddMajors = () => {
    const [majors, setMajors] = useState([]);
    const [major, setMajor] = useState({});
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
        },
        {
            title: "Tên chuyên ngành",
            dataIndex: "name",
            key: "name",
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

    return (
        <>
        {
            loading && <Loading/>
        }
        <CRow>
            <CCol xs={12} md={5}>
                <CCard className="mb-4">
                <CCardHeader className='font-weight-bold h4'>Thêm mới chuyên ngành</CCardHeader>
                <CCardBody>
                    <CCol>
                        <CFormInput
                        type="text"
                        placeholder="Nhập tên chuyên ngành"
                        value={major.name}
                        onChange={(e) => setMajor({ ...major, name: e.target.value })}
                        />
                    </CCol>
                    <div style={{height:30}}/>
                    <CCol xs="auto">
                        <Button type="primary" className="px-4 py-2 text-dark font-medium rounded disabled-opacity-50">
                        <span className="text-base text-white">Thêm chuyên ngành</span>
                        </Button>
                    </CCol>
                </CCardBody>
                </CCard>
            </CCol>

            <CCol xs={12} md={7}>
                <Table 
                title={() => (
                    <span className="font-weight-bold h4">Danh sách chuyên ngành</span>
                )}
                scroll={
                    { y: 380 }
                } columns={columns} dataSource={majors} pagination={{pageSize:10}}/>
                </CCol>
            </CRow>
            </>
    )
}
export default AddMajors;