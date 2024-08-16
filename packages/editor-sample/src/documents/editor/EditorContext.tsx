import { create } from 'zustand';
import debounce from '@mui/material/utils/debounce';
import getConfiguration from '../../getConfiguration';

import { TEditorConfiguration } from './core';

type TValue = {
  document: TEditorConfiguration;

  documentHistory: Array<TEditorConfiguration>,
  documentHistoryIndex: number,

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'json' | 'html';
  selectedScreenSize: 'desktop' | 'mobile';

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
};

const editorStateStore = create<TValue>(() => ({
  document: getConfiguration(window.location.hash),
  documentHistory: [],
  documentHistoryIndex: 0,
  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',
  selectedScreenSize: 'desktop',

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
}));

export function useDocument() {
  return editorStateStore((s) => s.document);
}

export function useSelectedBlockId() {
  return editorStateStore((s) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
  return editorStateStore((s) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
  return editorStateStore((s) => s.selectedMainTab);
}

export function setSelectedMainTab(selectedMainTab: TValue['selectedMainTab']) {
  return editorStateStore.setState({ selectedMainTab });
}

export function useSelectedSidebarTab() {
  return editorStateStore((s) => s.selectedSidebarTab);
}

export function useInspectorDrawerOpen() {
  return editorStateStore((s) => s.inspectorDrawerOpen);
}

export function useSamplesDrawerOpen() {
  return editorStateStore((s) => s.samplesDrawerOpen);
}

export function setSelectedBlockId(selectedBlockId: TValue['selectedBlockId']) {
  const selectedSidebarTab = selectedBlockId === null ? 'styles' : 'block-configuration';
  const options: Partial<TValue> = {};
  if (selectedBlockId !== null) {
    options.inspectorDrawerOpen = true;
  }
  return editorStateStore.setState({
    selectedBlockId,
    selectedSidebarTab,
    ...options,
  });
}

export function setSidebarTab(selectedSidebarTab: TValue['selectedSidebarTab']) {
  return editorStateStore.setState({ selectedSidebarTab });
}

const addDocumentToHistory = debounce(function (document: TValue['document']) {
  let documentHistory = editorStateStore.getState().documentHistory;
  const currentIndex = editorStateStore.getState().documentHistoryIndex;
  if (currentIndex < documentHistory.length - 1) {
    documentHistory = documentHistory.slice(0, currentIndex + 1);
  }
  documentHistory.push(document);
  if (documentHistory.length > 254) {
    documentHistory = documentHistory.slice(1);
  }

  editorStateStore.setState({
    documentHistory,
    documentHistoryIndex: documentHistory.length - 1,
  });
}, 500);

export function resetDocument(document: TValue['document']) {
  addDocumentToHistory(document);
  return editorStateStore.setState({
    document,
    selectedSidebarTab: 'styles',
    selectedBlockId: null,
  });
}

export function setDocument(document: TValue['document']) {
  const originalDocument = editorStateStore.getState().document;
  const mergedDocument = {
    ...originalDocument,
    ...document,
  };
  addDocumentToHistory(mergedDocument);
  return editorStateStore.setState({
    document: mergedDocument,
  });
}

export function useCanUndo() {
  return editorStateStore(s => s.documentHistory.length > 0 && s.documentHistoryIndex > 0);
}

export function useCanRedo() {
  return editorStateStore(s => s.documentHistory.length > 0 && s.documentHistoryIndex < s.documentHistory.length - 1);
}

export function undo() {
  const documentHistory = editorStateStore.getState().documentHistory;
  const currentIndex = editorStateStore.getState().documentHistoryIndex;
  if (documentHistory.length <= 0 || currentIndex <= 0) {
    return;
  }
  const changeToIndex = currentIndex - 1;
  editorStateStore.setState({
    document: documentHistory[changeToIndex],
    documentHistoryIndex: changeToIndex,
  });
}

export function redo() {
  const documentHistory = editorStateStore.getState().documentHistory;
  const currentIndex = editorStateStore.getState().documentHistoryIndex;
  if (documentHistory.length <= 0 || currentIndex >= documentHistory.length - 1) {
    return;
  }
  const changeToIndex = currentIndex + 1;
  editorStateStore.setState({
    document: documentHistory[changeToIndex],
    documentHistoryIndex: changeToIndex,
  });
}

export function toggleInspectorDrawerOpen() {
  const inspectorDrawerOpen = !editorStateStore.getState().inspectorDrawerOpen;
  return editorStateStore.setState({ inspectorDrawerOpen });
}

export function toggleSamplesDrawerOpen() {
  const samplesDrawerOpen = !editorStateStore.getState().samplesDrawerOpen;
  return editorStateStore.setState({ samplesDrawerOpen });
}

export function setSelectedScreenSize(selectedScreenSize: TValue['selectedScreenSize']) {
  return editorStateStore.setState({ selectedScreenSize });
}
