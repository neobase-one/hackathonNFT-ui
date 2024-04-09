import { dir } from 'i18next';
import { useRouter } from 'next/router';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Theme } from '~common/types';
import { ThemeContext } from '~contexts';

type ThemeProviderProps = PropsWithChildren<{}>;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { locale } = useRouter();

  const [
    isRtl,
    setIsRtl,
  ] = useState<Theme['isRtl']>(false);
  const [
    isSidebarExpanded,
    setIsSidebarExpanded,
  ] = useState(false);
  const [
    layoutDirection,
    setLayoutDirection,
  ] = useState<Theme['layoutDirection']>('ltr');
  const themeState = useMemo<Theme>(() => {
    return {
      isRtl,
      setIsRtl,
      layoutDirection,
      setLayoutDirection,
      isSidebarExpanded,
      setIsSidebarExpanded,
    };
  }, [
    isRtl,
    layoutDirection,
    isSidebarExpanded,
  ]);

  useEffect(() => {
    const layoutDir: Theme['layoutDirection'] = dir(locale);
    const isLayoutRtl: Theme['isRtl'] = layoutDir === 'rtl';

    setIsRtl(isLayoutRtl);
    setLayoutDirection(layoutDir);
  }, [locale]);

  return (
    <ThemeContext.Provider
      value={themeState}
      {...props}
    />
  );
};
