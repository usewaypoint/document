import { create } from 'zustand';

import EMPTY_EMAIL_MESSAGE from '../../getConfiguration/sample/empty-email-message';

import { TEditorConfiguration } from './core';

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'data' | 'html';

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
};

const useEditorState = create<TValue>(() => ({
  document: EMPTY_EMAIL_MESSAGE,
  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
}));

export function useDocument() {
  return useEditorState((s) => s.document);
}

export function useSelectedBlockId() {
  return useEditorState((s) => s.selectedBlockId);
}

export function useSelectedMainTab() {
  return useEditorState((s) => s.selectedMainTab);
}

export function useSelectedSidebarTab() {
  return useEditorState((s) => s.selectedSidebarTab);
}

export function useInspectorDrawerOpen() {
  return useEditorState((s) => s.inspectorDrawerOpen);
}

export function useSamplesDrawerOpen() {
  return useEditorState((s) => s.samplesDrawerOpen);
}

export function setEditorState(state: Partial<TValue>) {
  useEditorState.setState({ ...state });
}
