import React, {useEffect, useState} from 'react';
import {deleteChartUsingPost, listChartByPageUsingPost,} from "@/services/langbi/chartController";
import {Avatar, Button, Card, Col, Divider, List, message, Modal, Result, Row,} from "antd";
import ReactECharts from "echarts-for-react";
import {useModel} from "@@/exports";
import Search from "antd/es/input/Search";
import {ExclamationCircleOutlined} from "@ant-design/icons";


/**
 * 我的表格页面
 * @constructor
 */
const MyChart: React.FC = () => {

  const  initSearchParams ={
    //默认为第一页
    current:1,
    pageSize:4,
    //设置排序
    sortField: 'createTime',
    sortOrder: 'desc',
  };

  const [searchParams,setSearchParams] =useState<API.ChartQueryRequest>({...initSearchParams});
  const {initialState} = useModel('@@initialState');
  const {currentUser } = initialState ?? {};
  const [chartList,setChartList] = useState<API.Chart[]>();
  const [total,setTotal] = useState<number>(0);

  const [loading,setLoading] = useState<boolean>(true);
  //删除图表
  const handleDelete = (chartId:any) =>{
    Modal.confirm({
      title:'确认删除',
      icon:<ExclamationCircleOutlined />,
      content:'确定要删除这个图表吗？',
      okText:'确认',
      cancelText:'取消',
      onOk:async () =>{
        try{
          const res = await  deleteChartUsingPost({id:chartId});
          //后端返回 boolean值
          console.log("res:",res.data);
          if (res.data){
            message.success('删除成功');
            loadData();
          }else {
            message.error('删除失败');
          }
        }catch (e:any){
          message.error('删除失败'+e.message)
        }
      }
    })
  }
  const  loadData = async () => {
    setLoading(true);
    try {
      const res = await listChartByPageUsingPost(searchParams);
      if(res.data){
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
        if (res.data.records){
          res.data.records.forEach(data => {
            if (data.status === 'succeed'){
              const chartOption = JSON.parse(data.genChart ?? '{}');
              chartOption.title = undefined;
              data.genChart = JSON.stringify(chartOption);
            }
          })
        }
      }else{
        message.error('获取我的图表时失败！！！')
      }

    } catch (e:any) {
      message.error('获取我的图表失败，'+e.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  },[searchParams]);
  return(
    <div className={"my-chart"}>
      {/*搜索框*/}
      <div>
          <Search placeholder="输入图表名称！！" enterButton loading={loading} onSearch={(value) => {
            setSearchParams({
              ...initSearchParams,
              //搜索词
              name:value,
            })
          }}/>
      </div>
      <div className="margin-18"></div>
      <List
        grid = {{
          gutter:16,
          xs:1,
          md:1,
          sm:1,
          lg:2,
          xl:2,
          xxl:2
        }}
       pagination={{
         showTotal:() =>`共${total}条记录`,
         showSizeChanger:true,
         showQuickJumper:true,
         pageSizeOptions:['4','8','12','16'],
         onChange: (page, pageSize) => {
           setSearchParams({
             ...searchParams,
             current: page,
             pageSize,
           })
         },
         current: searchParams.current,
         pageSize: searchParams.pageSize,
         total:total,
       }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <Card style={{width:'100%'}}>
            <List.Item.Meta
              avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
              title={currentUser?.userName}
              // title={item.name}
            />
              <Row justify="end">
                <Col>
                  <Button danger onClick={() => handleDelete(item.id) }>
                    删除
                  </Button>
                </Col>
              </Row>
              <List.Item.Meta
                style={{textAlign:'center',fontWeight:'bold'}}
                description={item.chartType ? '图表类型'+':  ' + item.chartType : undefined}
              />
              <p
                style={{
                  textAlign:'center',
                  fontWeight:'bold',
                  color:'black',
                  fontSize:'16px'
                }}
              >
                {'分析目标:'+ item.goal}
              </p>
              <>
                {
                  //等待状态中
                  item.status === 'wait' && <>
                    <Result
                      status="warning"
                      title="等待图表生成"
                      subTitle={item.execMessage ?? '当前图表生成过于缓慢，等等咯！！！'}/>
                  </>
                }

                {
                  //生成状态中
                  item.status === 'running' && <>
                  <Result
                  status="info"
                  title="图表开始生成中"
                  subTitle={item.execMessage}/>
                  </>
                }
              {
                //成功状态
               item.status === 'succeed' && <>
                  <div style={{ marginBottom:14}}></div>
                  {/*<p>{'分析目标'+':  '+ item.goal}</p>*/}
                  <div style={{ marginBottom:14}}></div>
                  <Divider style={{fontWeight:'bold',color:'blue',fontSize:'16px'}}>
                    智能分析结果
                  </Divider>
                  <ReactECharts option={item.genChart && JSON.parse(item.genChart)}/>
                  <p style={{
                    fontWeight:'bold',
                    color:'#Ob93a1'
                  }}>
                    {item.genResult}
                  </p>
                </>

              }
              {
                //失败状态
                item.status === 'failed' && <>
                <Result
                status="error"
                title="不好意思生成图表失败！！"
                subTitle={item.execMessage}/>
                </>
              }
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
};
export default MyChart;
