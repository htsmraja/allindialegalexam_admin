/* eslint-disable no-unused-vars */
import CountUp from "react-countup";
import { Card, CardBody, Col, Media } from "reactstrap";
// import { TopDashboardCardsData } from "../../Data/Dashboard";
import { useEffect } from "react";
import { Navigation } from "react-feather";
import { useCommonContext } from "../../helper/CommonProvider";

const TopDashboardCards = () => {
    const { getDashboardCount, dashboardCount } = useCommonContext();

    useEffect(() => {
        getDashboardCount();
    }, []);

    return (
        <>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-danger">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0">Total Sale In This Month</span>
                                <h3 className="mb-0">
                                    ₹{" "}
                                    <CountUp
                                        className="counter"
                                        end={
                                            dashboardCount?.data?.sale?.this_month_sale ?? 100
                                        }
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-warning">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0">Total Sale In Last Six Month</span>
                                <h3 className="mb-0">
                                    ₹{" "}
                                    <CountUp
                                        className="counter"
                                        end={
                                            dashboardCount?.data?.sale?.last_6_month_sale ?? 200

                                        }
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-secondary">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0">Total Sale In Last Year</span>
                                <h3 className="mb-0">
                                    ₹{" "}
                                    <CountUp
                                        className="counter"
                                        end={
                                            dashboardCount?.data?.sale?.last_1_year_sale ?? 300
                                        }
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-info">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0">Total Sale</span>
                                <h3 className="mb-0">
                                    ₹{" "}
                                    <CountUp
                                        className="counter"
                                        end={dashboardCount?.data?.sale?.total_sale ?? 400}
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-secondary">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0"> Total Books</span>
                                <h3 className="mb-0">
                                    <CountUp
                                        className="counter"
                                        end={dashboardCount?.data?.product_count ?? 5000}
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-secondary">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0"> Total Courses</span>
                                <h3 className="mb-0">
                                    <CountUp
                                        className="counter"
                                        end={dashboardCount?.data?.product_count ?? 5000}
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>
            <Col xl="3 xl-50" md="6">
                <Card className=" o-hidden widget-cards">
                    <CardBody className="bg-primary">
                        <Media className="static-top-widget row">
                            <div className="icons-widgets col-4">
                                <div className="align-self-center text-center">
                                    <Navigation className="font-warning" />
                                </div>
                            </div>
                            <Media body className="col-8">
                                <span className="m-0">Total Customer</span>
                                <h3 className="mb-0">
                                    <CountUp
                                        className="counter"
                                        end={dashboardCount?.data?.customer_count ?? 6000}
                                    />
                                    <small> </small>
                                </h3>
                            </Media>
                        </Media>
                    </CardBody>
                </Card>
            </Col>

            {/* <Col xl="3 xl-50" md="6">
        <Card className=" o-hidden widget-cards">
          <CardBody className="bg-danger">
            <Media className="static-top-widget row">
              <div className="icons-widgets col-4">
                <div className="align-self-center text-center">
                  <Navigation className="font-warning" />
                </div>
              </div>
              <Media body className="col-8">
                <span className="m-0"> Pending Order Amount</span>
                <h3 className="mb-0">
                  ₹{" "}
                  <CountUp
                    className="counter"
                    end={dashboardCount?.data?.total_pending_orders_amount}
                  />
                  <small> </small>
                </h3>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </Col> */}
        </>
    );
};

export default TopDashboardCards;
