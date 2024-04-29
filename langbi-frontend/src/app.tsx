import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import {history} from '@umijs/max';
import { errorConfig } from './requestErrorConfig';
import {getLoginUserUsingGet} from "@/services/langbi/userController";
import {defaultSettings} from "@ant-design/pro-layout/es/defaultSettings";


const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.LoginUserVO;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await getLoginUserUsingGet();
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;



  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    //如果不是登录页面就获取当前登录信息
    return {
      currentUser,
    };
  }
  //否则就不返回
  return {
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: 'https://pic.imgdb.cn/item/66232e9c0ea9cb1403e70eb4.jpg',
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      title: '小浪智能数据分析',
      src: initialState?.currentUser?.userAvatar,
      iconfontUrl: 'https://github.com/XFxiaolang',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },

    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return (
        <>
          {children}
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
               settings={defaultSettings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
        </>
      );
    },
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  baseURL:'http://localhost:8001',
  withCredentials:true,
  ...errorConfig,
};
