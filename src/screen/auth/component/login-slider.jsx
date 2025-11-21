import { Card, Col, Media } from "reactstrap";
import companyLogo from "../../../assets/keshri.png";

const LoginSlider = () => {
  return (
    <Col md="5" className="p-0 card-left">
      <Card className="bg-primary">
        <div className="svg-icon">
          <Media
            height={78}
            width={200}
            alt=""
            src="/favicon.png"
            className="Img-fluid"
          />
        </div>
        <div>
          <div>
            <h3>Welcome to Keshri Lights</h3>
            <p>
              A one-stop destination for the latest and most reliable electronic gadgets, home appliances, and accessories.
            </p>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default LoginSlider;
