import { Card, Statistic, Row, Col } from "antd";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import Grow from "@mui/material/Grow";

const formatter = (value) => (
  <CountUp
    end={value}
    duration={1}
    decimal="."
    decimals={2}
    separator=","
    enableScrollSpy
  />
);

const getColorValue = (value) => {
  if (value > 50) return "red";
  return "green";
};

const Result = (props) => {
  return (
    <Row gutter={16}>
      <Grow in={props.isShow} unmountOnExit>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Predicted"
              value={props.value}
              precision={2}
              formatter={formatter}
              valueStyle={{
                color: getColorValue(props.value),
                fontWeight: "bold",
              }}
              suffix="%"
            />
          </Card>
        </Col>
      </Grow>
      <Grow
        in={props.isShow}
        {...(props.isShow ? { timeout: 1000 } : {})}
        unmountOnExit
      >
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Actual"
              valueStyle={{
                fontSize: 16,
                backgroundColor: props.isDeath ? "red" : "green",
                padding: "6px",
                color: "white",
                fontWeight: 800,
                textAlign: "center",
              }}
              value={props.isDeath ? "DEATH" : "ALIVE"}
              precision={2}
            />
          </Card>
        </Col>
      </Grow>
    </Row>
  );
};

Result.propTypes = {
  value: PropTypes.number.isRequired,
  isDeath: PropTypes.bool.isRequired,
  isShow: PropTypes.bool.isRequired,
};

export default Result;
