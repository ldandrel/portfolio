import * as CustomEase from './CustomEase';

export const ease = CustomEase.create('custom', 'M0,0 C0.6,0 0.25,1 1,1');
export const easeDefault = CustomEase.create('custom', 'M0,0,C0.25,0.1,0.25,1,1,1');
