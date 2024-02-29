import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { useDocument } from '../../documents/editor/EditorContext';
import ReaderBlock from '../../documents/reader/ReaderBlock';
import { ReaderProvider } from '../../documents/reader/ReaderContext';

import TextEditorPanel from './helper/TextEditorPanel';

export default function HtmlPanel() {
  const document = useDocument();

  const string = React.useMemo(() => {
    return renderToStaticMarkup(
      <html>
        <head></head>
        <body>
          <ReaderProvider value={document}>
            <ReaderBlock id="root" />
          </ReaderProvider>
        </body>
      </html>
    );
  }, [document]);

  return <TextEditorPanel type="html" value={string} />;
}
