import { NextPageContext } from 'next';
import NextErrorComponent, { ErrorProps as NextErrorProps } from 'next/error';
import { ReactElement } from 'react';

type ErrorPageProps = {
  statusCode: number;
  children?: ReactElement;
};

type ErrorProps = {
  isReadyToRender: boolean;
} & NextErrorProps;

const ErrorPage = (props: ErrorPageProps) => {
  const { statusCode, children = null } = props;

  return children ?? <NextErrorComponent statusCode={statusCode} />;
};

ErrorPage.getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { res, err } = props;

  const errorInitialProps: ErrorProps = (await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext)) as ErrorProps;

  errorInitialProps.isReadyToRender = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404, isReadyToRender: true };
  }

  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default ErrorPage;
