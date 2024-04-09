import { Dispatch, SetStateAction } from 'react';

export type Theme = {
  isRtl: boolean;
  setIsRtl: Dispatch<SetStateAction<Theme['isRtl']>>;
  layoutDirection: 'rtl' | 'ltr';
  setLayoutDirection: Dispatch<SetStateAction<Theme['layoutDirection']>>;
  isSidebarExpanded: boolean;
  setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};
