export enum ToastType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}

export interface Toast {
  msg: string;
  id: string;
  type?: ToastType;
}
