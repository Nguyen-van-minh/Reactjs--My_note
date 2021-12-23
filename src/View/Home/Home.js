import { useEffect, useState } from "react";
import { Table } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import axios from "axios";
import moment from "moment";
import './Home.scss'

const Home = () => {

    const [dataCovid, setDataCovid] = useState([]);
    const today = moment().startOf('day').toISOString(true);;
    const priorDate = moment().startOf('day').subtract(10, 'days').toISOString(true);
    // componentDidMount
    useEffect(async () => {
        let res = await axios.get(`https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${today}`, true)
        let data = res && res.data ? res.data : [];
        if (data && data.length > 0) {
            data.map(item => {
                item.Date = moment(item.Date).format('DD/MM/YYYY');
                return item;
            })
        }
        setDataCovid(data)
    }, []);

    return (
        <Container >
            <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <h3>Covid 19 in VietNam</h3>
                    <table >
                        <thead >
                            <tr>
                                <th>Date</th>
                                <th>Confirmed</th>
                                <th>Active</th>
                                <th>Deaths</th>

                            </tr>
                        </thead>
                        <tbody>

                            {dataCovid && dataCovid.length > 0 &&
                                dataCovid.map(item => {
                                    return (
                                        <tr key={item.ID} >
                                            <td>{item.Date}</td>
                                            <td>{item.Confirmed}</td>
                                            <td style={{ color: 'rgb(84, 154, 235)' }}>{item.Active}</td>
                                            <td style={{ color: 'rgb(235, 84, 84)' }}>{item.Deaths}</td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>
                </Col>
            </Row>

        </Container>
    )
}

export default Home;