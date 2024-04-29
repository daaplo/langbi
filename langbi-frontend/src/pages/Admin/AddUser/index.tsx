import Footer from '@/components/Footer';
import {
  selectAvatarUrl,
  selectGender,
  selectUserRole,
  selectUserStatus,
   WELCOME,
} from '@/constants';
import { addUserUsingPost, getLoginUserUsingGet } from '@/services/langbi/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {LoginForm,  ProFormText} from '@ant-design/pro-components';
import { ProFormSelect } from '@ant-design/pro-form/lib';

import { Helmet, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, {useState} from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';
import {createStyles} from "antd-style";
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    //https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://pic.imgdb.cn/item/660d7e6d9f345e8d03a64693.jpg')",
      backgroundSize: '100% 100%',

    },
  };
});


const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const fetchUserInfo = async () => {
    const userInfo = await getLoginUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s): any => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    try {
      // 添加用户
      const res = await addUserUsingPost(values);
      if (res.code === 0) {
        const defaultLoginSuccessMessage = '新增用户成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        location.reload();
        return;
      } else {
        message.error(res.message);
      }
    } catch (error) {
      const defaultLoginFailureMessage = '新增用户失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        {'新增用户'}- {Settings.title}
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="小浪智能数据分析"
          subTitle={
            <a href={WELCOME} target="_blank">
              小浪智能数据分析
            </a>
          }
          submitter={{
            searchConfig: {
              submitText: '添加新用户',
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs centered activeKey={'account'}>
            <Tabs.TabPane key={'account'} tab={'添加新用户信息'} />
          </Tabs>
          {
            <>
              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder="用户名"
                rules={[
                  {
                    required: true,
                    message: '用户名不能为空!',
                  },
                ]}
              />

              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder="用户账户 "
                rules={[
                  {
                    required: true,
                    message: '用户账户不能为空!',
                  },
                  {
                    min: 4,
                    message: '用户账户长度不小于4位',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                  {
                    min: 8,
                    message: '密码长度不得小于8',
                  },
                ]}
              />
              <ProFormSelect
                name="userAvatar"
                fieldProps={{
                  size: 'large',
                }}
                options={selectAvatarUrl}
                placeholder={'请选择用户头像 '}
                rules={[
                  {
                    required: true,
                    message: '请输入选择用户头像!',
                  },
                ]}
              />
              <ProFormSelect
                name="userRole"
                fieldProps={{
                  size: 'large',
                }}
                options={selectUserRole}
                placeholder={'选择用户角色'}
                rules={[
                  {
                    required: true,
                    message: '请选择用户角色',
                  },
                ]}
              />
              <ProFormSelect
                name="gender"
                fieldProps={{
                  size: 'large',
                }}
                options={selectGender}
                placeholder={'请选择用户性别 '}
                rules={[{}]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请输入用户邮箱 '}
              />
              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                }}
                placeholder={'请输入用户手机号码 '}
              />
              <ProFormSelect
                name="userStatus"
                fieldProps={{
                  size: 'large',
                }}
                options={selectUserStatus}
                placeholder={'请选择用户当前状态 '}
              />
            </>
          }
          <div
            style={{
              marginBlockEnd: 24,
            }}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
