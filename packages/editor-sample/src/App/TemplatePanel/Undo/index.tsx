import React, { useEffect } from 'react';

import { UndoOutlined as UndoIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { undo, useCanUndo } from '../../../documents/editor/EditorContext';

export default function Undo() {
  const canUndo = useCanUndo();
  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        undo();
      }
    }

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, []);

  return (
    <>
      <Tooltip title="Undo (Ctrl + Z)">
        <span>
          <IconButton onClick={undo} disabled={canUndo === false}>
            <UndoIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}