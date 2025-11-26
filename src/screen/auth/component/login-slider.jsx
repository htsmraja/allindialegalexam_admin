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
            src="/logo.jpg"
            className="Img-fluid"
          />
        </div>
        <div>
          <div>
            <h3>Welcome to All India Legal Exam</h3>
            <p>
              Your complete digital platform for learning, practicing, and mastering the law—anytime, anywhere.            </p>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default LoginSlider;
