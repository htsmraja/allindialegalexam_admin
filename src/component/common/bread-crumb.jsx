/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { Home } from "react-feather";
import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";

const CommonBreadcrumb = ({ title, parent, subtitle }) => {
  return (
    <Container fluid>
      <div className="page-header">
        <Row>
          <Col lg="6">
            <div className="page-header-left">
              <h3 className="text-white">
                {title}
                {
                  subtitle ? <small> {subtitle}</small> : <small>Keshrilighthouse Admin panel</small>
                }

              </h3>
            </div>
          </Col>
          <Col lg="6">
            <Breadcrumb className="pull-right">
              <BreadcrumbItem>
                <Link to="/">
                  <Home />
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem className=" active text-white">{title}</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default CommonBreadcrumb;
