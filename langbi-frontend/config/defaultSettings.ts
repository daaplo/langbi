import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  // navTheme: "light",
  // layout: "top",
  // contentWidth: "Fixed",
  // fixedHeader: false,
  // fixSiderbar: true,
  // colorPrimary: "#722ED1",
  // splitMenus: false,
  "navTheme": "light",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": false,
  "fixSiderbar": true,
  "colorPrimary": "#52C41A",
  "splitMenus": false,
  siderMenuType: "group",
  title: '小浪智能数据分析',
  pwa: true,
  logo: 'https://s3.bmp.ovh/imgs/2023/11/19/f5263e6c9cafbc0a.jpeg',
  iconfontUrl: 'https://github.com/XFxiaolang',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};
{

}
export default Settings;
