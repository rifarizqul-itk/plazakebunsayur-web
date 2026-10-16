import { createContext } from 'react';
import { MOCK_PAGE_CONTENTS } from '../data/mockData';

export const ContentContext = createContext({
  contents: MOCK_PAGE_CONTENTS,
  getContent: (key, fallback) => fallback,
  getContentImage: (key, fallback) => fallback,
  loading: false,
});
