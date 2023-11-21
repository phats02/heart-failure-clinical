import {
  Form,
  Typography,
  InputNumber,
  Row,
  Col,
  Switch,
  ConfigProvider,
  Button,
  Space,
} from "antd";
import Zoom from "@mui/material/Zoom";
import "./app.css";
import Result from "./components/Result";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const getRandomElement = (array) => {
  const randomIndex = Math.floor(
    Math.random() * (array.length - 2 - 1 + 1) + 1
  );
  return array[randomIndex];
};

async function fetchCsv() {
  const response = await fetch("/dataset.csv");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder("utf-8");
  const csv = await decoder.decode(result.value);
  return csv;
}

function App() {
  const [isShowResult, setIsShowResult] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [form] = Form.useForm();

  async function getRandomData() {
    const data = Papa.parse(await fetchCsv());
    setRowData(getRandomElement(data.data));
    return data;
  }

  const fillData = (data) => {
    form.setFieldsValue({
      age: data[0],
      anaemia: true,
      diabetes: true,
      creatinine_phosphokinase: data[2],
      ejection_fraction: data[4],
      high_blood_pressure: true,
      platelets: data[6],
      serum_creatinine: data[7],
      serum_sodium: data[8],
      sex: true,
      smoking: true,
      time: data[11],
    });
  };
  useEffect(() => {
    fillData(rowData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowData]);

  useEffect(() => {
    getRandomData();
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "white",
          },
          InputNumber: {
            colorBgContainerDisabled: "gray",
            colorTextDisabled: "white",
          },
        },
      }}
    >
      <div className="bg-cover">
        <div style={{ height: "8vh" }}></div>
        <Zoom in={true}>
          <div
            style={{
              maxWidth: 1000,
              width: "60vw",
              margin: "auto",
            }}
            className={"form-container"}
          >
            <Typography.Title style={{ textAlign: "center", color: "white" }}>
              Heart failure clinical
            </Typography.Title>
            <Form
              labelCol={{
                span: 120,
              }}
              layout="vertical"
              form={form}
              disabled
            >
              <Row justify={"space-around"}>
                <Col span={4}>
                  <Form.Item label="Age" name="age">
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Ejection fraction" name="ejection_fraction">
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Creatinine phosphokinase"
                    name="creatinine_phosphokinase"
                  >
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"space-around"}>
                <Col span={4}>
                  <Form.Item
                    label="Diabetes"
                    name="diabetes"
                    valuePropName={rowData[3] === "1" ? "checked" : ""}
                  >
                    <Switch checkedChildren="Has" unCheckedChildren="Hasn't" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Anaemia"
                    name="anaemia"
                    valuePropName={rowData[1] === "1" ? "checked" : ""}
                  >
                    <Switch checkedChildren="Has" unCheckedChildren="Hasn't" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item
                    label="High Blood Pressure"
                    name="high_blood_pressure"
                    valuePropName={rowData[5] === "1" ? "checked" : ""}
                  >
                    <Switch checkedChildren="Has" unCheckedChildren="Hasn't" />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"space-around"}>
                <Col span={4}>
                  <Form.Item label="Platelets" name="platelets">
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label="Serum creatinine" name="serum_creatinine">
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item label="Serum sodium" name="serum_sodium">
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify={"space-around"}>
                <Col span={4}>
                  <Form.Item
                    label="Sex"
                    name="sex"
                    valuePropName={rowData[9] === "1" ? "checked" : ""}
                  >
                    <Switch checkedChildren="Male" unCheckedChildren="Female" />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Smoking"
                    name="smoking"
                    valuePropName={rowData[10] === "1" ? "checked" : ""}
                  >
                    <Switch checkedChildren="Has" unCheckedChildren="Hasn't" />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item label="Time" name="time">
                    <InputNumber></InputNumber>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Space style={{ margin: "10px 0px", marginLeft: "40%" }}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setIsShowResult(true)}
              >
                Predict
              </Button>
              <Button
                type="link"
                htmlType="submit"
                onClick={async () => {
                  await getRandomData();
                  setIsShowResult(false);
                }}
              >
                Random
              </Button>
            </Space>
            <Result
              value={rowData[13] * 100}
              isShow={isShowResult}
              isDeath={rowData[12] === "1"}
            />
          </div>
        </Zoom>
      </div>
    </ConfigProvider>
  );
}

export default App;
