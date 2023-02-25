import type { DialogOptions } from 'vant';
import { useI18n } from '/@/hooks/web/useI18n';
import { showConfirmDialog, showDialog, showSuccessToast, showLoadingToast, showFailToast, showToast } from 'vant';

// 处理参数
const getOptions = (options: DialogOptions) => {
  const { t } = useI18n();
  options.title ?? t('sys.api.Message');
  options.teleport ?? '.Provider';
  return {
    ...options
  };
};

// 确认/取消弹窗
const CreateConfirmDialog = (option: DialogOptions) => {
  const Options = getOptions(option);
  return showConfirmDialog(Options);
};

// 确认弹窗
const CreateAlertDialog = (option: DialogOptions) => {
  const Options = getOptions(option);
  return showDialog(Options);
};

// 成功提示
const CreateSuccessToast = (message: string) => {
  return showSuccessToast(message);
};

// 失败提示
const CreateErrorToast = (message: string) => {
  return showFailToast(message);
};

// 加载提示
const CreateLoadingToast = (message: string) => {
  return showLoadingToast(message);
};

// 自定义提示
const CreateToast = (message: string) => {
  return showToast(message);
};

export const useMessage = () => {
  return {
    CreateConfirmDialog,
    CreateAlertDialog,
    CreateSuccessToast,
    CreateErrorToast,
    CreateLoadingToast,
    CreateToast,
  };
};
