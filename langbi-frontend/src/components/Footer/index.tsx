import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright="2024 小浪智能数据分析出品"
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/XFxiaolang',
          blankTarget: true,
        },
        {
          key: '小浪智能数据分析',
          title: '小浪智能数据分析',
          href: 'https://github.com/XFxiaolang',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
