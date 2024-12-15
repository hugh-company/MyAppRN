export enum VerifyCodeType {
  SMS = 'sms',
  EMAIL = 'email',
}

export interface VerifyCodeProps {
  type: VerifyCodeType;
  phone?: string;
}
export interface SelectVerifyProps {
  phone?: string;
}
