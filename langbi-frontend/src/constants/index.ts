import logo from "@@/plugin-layout/Logo";

/**
 * @author
 *  全局变量
 */
export const IMAGES = [
  import('../../public/catImage/3.jpg'),
  import('../../public/catImage/1.jpg'),
  import('../../public/catImage/2.jpg'),
  import('../../public/catImage/4.jpg'),
  import('../../public/catImage/5.jpg'),
  import('../../public/catImage/6.jpg'),
  import('../../public/catImage/7.jpg'),
  import('../../public/catImage/8.jpg'),
  import('../../public/catImage/9.jpg'),
  import('../../public/catImage/10.jpg'),
  import('../../public/catImage/image1.jpg'),
  import('../../public/catImage/image2.jpg'),
  import('../../public/catImage/image3.jpg'),
  import('../../public/catImage/image4.jpg'),
  import('../../public/catImage/image5.jpg'),
  import('../../public/catImage/image6.jpg'),
];

export const SYSTEM_LOGO = logo;

export const WELCOME = 'https://s3.bmp.ovh/imgs/2023/11/19/f5263e6c9cafbc0a.jpeg';



/**
 * 默认头像
 */
export const DEFAULT_AVATAR_URL =
  'https://s3.bmp.ovh/imgs/2023/11/19/f5263e6c9cafbc0a.jpeg';

export const selectGender = [
  { value: '男', label: '男' },
  { value: '女', label: '女' },
];
export const selectUserStatus = [
  { value: 0, label: '正常' },
  { value: 1, label: '注销' },
];
export const selectUserRole = [
  { value: 'user', label: '普通用户' },
  { value: 'admin', label: '管理员' },
  { value: 'ban', label: '封号' },
];
export const selectAvatarUrl = [
  {
    value:
      'https://s3.bmp.ovh/imgs/2023/11/19/f5263e6c9cafbc0a.jpeg',
    label: '默认头像',
  },
  {
    value:
        'https://pic.imgdb.cn/item/66232de60ea9cb1403e5c44b.jpg\n',
    label: '小水獭',
  },
  { value: 'https://pic.imgdb.cn/item/66232e100ea9cb1403e61024.jpg', label: '小山羊' },
  {
    value:
          'https://pic.imgdb.cn/item/66232e560ea9cb1403e68db4.jpg',
    label: '小白狗',
  },
  {
    value:
          'https://pic.imgdb.cn/item/66232e6b0ea9cb1403e6aeb6.jpg',
    label: '小仓鼠',
  },
  {
    value:
          'https://pic.imgdb.cn/item/66232e800ea9cb1403e6dd79.jpg',
    label: '哈士奇',
  },
  {
    value:
        'https://pic.imgdb.cn/item/66232e9c0ea9cb1403e70eb4.jpg',
    label: '胖狗狗',
  },
  {
    value:
          'https://pic.imgdb.cn/item/662330450ea9cb1403ec4ff9.jpg',
    label: '小猫咪',
  },
  {
    value:
          'https://pic.imgdb.cn/item/662330d80ea9cb1403ed64d8.jpg',
    label: '小浣熊',
  },
];
