import React, { useState} from 'react';
import { genChartByAsyncUsingPost,} from "@/services/langbi/chartController";
import {Button, Card,  Form, Input, message,  Select, Space,  Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useForm} from "antd/es/form/Form";



/**
 * 添加表格页面(异步)
 * @constructor
 */
const AddChartAsync: React.FC = () => {
 const [form] = useForm();
 const [submitting,setSubmitting] = useState<boolean>(false);


  const onFinish = async (values: any) => {
    if(submitting){
      return;
    }
    setSubmitting(true);
    //后端对接数据
    const params ={
      ...values,
      file:undefined,
    };
    try {
      const res = await genChartByAsyncUsingPost(params,{},values.file.file.originFileObj);
      if (!res?.data){
        message.error('分析失败！');
      }else {
        message.success('分析成功啦,请移动到我的图表页面查看')
        form.resetFields();
      }
    }catch (e:any){
        message.error('分析失败！!，'+e.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-chart-async">
      <Card title="智能数据分析">
      <Form
        form ={form}
        name="addChart"
        labelAlign="left"
        labelCol={{span:5}}
        wrapperCol={{span:18}}
        onFinish={onFinish}
        initialValues={{ }}
      >
        <Form.Item name="goal" label="数据分析" rules={[{ required: true, message: '拜托输入要分析的数据' }]}>
          <TextArea placeholder="拜托输入你的数据分析要求, 比如分析饭店营业额的增长情况"/>
        </Form.Item>
        <Form.Item name="name" label="表格名称">
          <Input placeholder="拜托输入表格名称"/>
        </Form.Item>

        <Form.Item
          name="chartType"
          label="图形名称"
        >
          <Select placeholder="请选择你的图表"
                  options={[
                    {value:'柱状图',label:'柱状图'},
                    {value:'折线图',label:'折线图'},
                    {value:'基础散点图',label:'基础散点图'},
                    {value:'堆叠区域图',label:'堆叠区域图'},
                  ]}
          />
        </Form.Item>

        {/*文件上传*/}
        <Form.Item
          name="file"
          label="初始数据"
        >
          <Upload name="file" maxCount={1}>
            <Button icon={<UploadOutlined />}>上传CSV文件(Excel)</Button>
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
    </div>
  );
};
export default AddChartAsync;
