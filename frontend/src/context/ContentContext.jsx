import React, { useState, useEffect } from 'react';
import { fetchPageContents, fetchNavItems } from '../services/api';
import { MOCK_PAGE_CONTENTS, MOCK_NAV_ITEMS } from '../data/mockData';
import { ContentContext } from './contentContextInstance';

export function ContentProvider({ children }) {
  const [contents, setContents] = useState(MOCK_PAGE_CONTENTS);
  const [navItems, setNavItems] = useState(MOCK_NAV_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.allSettled([fetchPageContents(), fetchNavItems()]).then(([contentsRes, navRes]) => {
      if (!isMounted) return;
      if (contentsRes.status === 'fulfilled' && contentsRes.value && Object.keys(contentsRes.value).length > 0) {
        setContents((prev) => ({ ...prev, ...contentsRes.value }));
      }
      if (navRes.status === 'fulfilled' && navRes.value) {
        setNavItems({
          header: navRes.value.header?.length > 0 ? navRes.value.header : MOCK_NAV_ITEMS.header,
          footer: navRes.value.footer?.length > 0 ? navRes.value.footer : MOCK_NAV_ITEMS.footer,
        });
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const getContent = (key, fallback) => {
    const val = contents[key];
    if (val !== undefined && val !== null && val !== '') {
      return val;
    }
    return fallback;
  };

  const getContentImage = (key, fallback) => {
    const val = contents[key];
    if (val !== undefined && val !== null && val !== '') {
      return val;
    }
    return fallback;
  };

  return (
    <ContentContext.Provider value={{ contents, navItems, getContent, getContentImage, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentProvider;
