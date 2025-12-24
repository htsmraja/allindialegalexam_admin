import React from 'react'
import CommonBreadcrumb from '../component/common/bread-crumb'
import { Container, Row } from 'reactstrap'
import TopDashboardCards from '../component/dashboard/TopDashboardCards'

const Home = () => {
    return (
        <>
            <CommonBreadcrumb title="Dashboard" parent="Dashboard" />
            <Container fluid>
                <Row>
                    <TopDashboardCards />
                </Row>
            </Container>
        </>
    )
}

export default Home