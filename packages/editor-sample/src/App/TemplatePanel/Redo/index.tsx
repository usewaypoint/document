import React, { useEffect } from 'react';

import { RedoOutlined as RedoIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { redo, useCanRedo } from '../../../documents/editor/EditorContext';

export default function Redo() {
  const canRedo = useCanRedo();
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
      }
    }

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, []);

  return (
    <>
      <Tooltip title="Redo (Ctrl + Y)">
        <span>
          <IconButton onClick={redo} disabled={canRedo === false}>
            <RedoIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}