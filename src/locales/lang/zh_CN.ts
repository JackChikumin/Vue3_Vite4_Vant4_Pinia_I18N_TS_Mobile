import { genMessage } from '../helper';
import zhCN from 'vant/es/locale/lang/zh-CN';

const modules = import.meta.glob('./zh-CN/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    zhCN,
  },
};
