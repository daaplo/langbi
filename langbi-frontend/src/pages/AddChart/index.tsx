import React, { useState} from 'react';
import {genChartByAiUsingPost,} from "@/services/langbi/chartController";
import {Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Spin, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import ReactECharts from "echarts-for-react";


/**
 * 添加表格页面
 * @constructor
 */
const AddChart: React.FC = () => {
 const [chart,setChart] = useState<API.BiResponse>();
 const [option,setOption] = useState<any>();
 const [submitting,setSubmitting] = useState<boolean>(false);


  const onFinish = async (values: any) => {
    if(submitting){
      return;
    }
    //开始提交
    setSubmitting(true);
    setChart(undefined);
    setOption(undefined)
    //后端对接数据
    const params ={
      ...values,
      file:undefined,
    };
    try {
      const res = await genChartByAiUsingPost(params,{},values.file.file.originFileObj);
      if (!res?.data){
        message.error('分析失败！');
      }else {
        message.success('分析成功啦')
        const chartOption = JSON.parse(res.data.genChart ?? '');
        if (!chartOption){
          throw new Error('图表代码解析失败')
        }else{
          setChart(res.data);
          setOption(chartOption);
        }
      }
    }catch (e:any){
        message.error('分析失败！!，'+e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart">
      <Row gutter ={22}>
        <Col span={12}>
          <Card title ="智能数据分析">
      <Form
        name="addChart"
        labelAlign="left"
        labelCol={{span:5}}
        wrapperCol={{span:18}}
        onFinish={onFinish}
        initialValues={{ }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="goal" label="数据分析" rules={[{ required: true, message: '拜托输入要分析的数据' }]}>
          <TextArea placeholder="拜托输入你的数据分析要求, 比如分析饭店营业额的增长情况"/>
        </Form.Item>
        <Form.Item name="name" label="表格名称">
          <Input placeholder="拜托输入表格名称"/>
        </Form.Item>

        <Form.Item
          name="chartType"
          label="图形类型"
        >
          <Select placeholder="请选择你的图表"
            options={[
              {value:'柱状图',label:'柱状图'},
              {value:'折线图',label:'折线图'},
              {value:'基础散点图',label:'基础散点图'},
              {value:'堆叠区域图',label:'堆叠区域图'},
          ]}
          />
          {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
        </Form.Item>


        {/*文件上传*/}
        <Form.Item
          name="file"
          label="初始数据"
        >
          <Upload name="file" maxCount={1} accept={".csv,.xls,.xlsx,.json,.txt,.xml,.sql"}>
            <Button icon={<UploadOutlined />}>上传CSV文件（Excel）</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 21, offset: 5 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
              提交数据
            </Button>
            <Button htmlType="reset">重置数据</Button>
          </Space>
        </Form.Item>
      </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Divider style={{fontWeight:'bold',color:'green'}}>
            可视化图表
          </Divider>
          <Card>
            {option ? (
              <ReactECharts option={option}/>
            ) : (
              <div
              style={{
                color:'red',
                textAlign:'center',
                fontWeight:'bold',
                fontSize:'16px'
              }}
              >
                请在左侧进行提交分析数据！！
              </div>
            )}
            <Spin spinning={submitting} size="large"/>
          </Card>
          <Divider
          style={{fontWeight:'bold',color:'blue'}}
          >
            由上图得出结论
          </Divider>
          <Card>
            {chart?.genResult ?? (
              <div
              style={{
                color:'red',
                textAlign:'center',
                fontWeight:'bold',
                fontSize:'16px'
              }}
              >
                没有可视化图表，无法得出结论！
              </div>
            )}
            <Spin spinning={submitting} size="large"/>
          </Card>
          {/*<Card title="分析结论">*/}
          {/*  {chart?.genResult??<div>拜托请先提交数据！</div>}*/}
          {/*  <Spin tip="Loading.." spinning={submitting}/>*/}
          {/*</Card>*/}
          {/*<Divider/>*/}
          {/*<Card title="可视化图表">*/}
          {/*  {*/}
          {/*    option ?<ReactECharts option={option}/> : <div>拜托请先提交数据！</div>*/}
          {/*  }*/}
          {/*  <Spin spinning={submitting} />*/}
          {/*</Card>*/}
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
