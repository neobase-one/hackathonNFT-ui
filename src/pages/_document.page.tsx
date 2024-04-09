import { dir } from 'i18next';
import Document, { DocumentContext, DocumentProps, Head, Html, Main, NextScript } from 'next/document';

type DocumentPageProps = DocumentProps & { direction: string };

const DocumentPage = ({ direction, locale }: DocumentPageProps) => {
  return (
    <Html
      dir={direction}
      lang={locale}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

DocumentPage.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  const direction = dir(ctx.locale);

  return { ...initialProps, direction };
};

export default DocumentPage;
