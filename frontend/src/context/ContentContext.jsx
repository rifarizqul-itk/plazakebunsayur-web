import React, { useState, useEffect } from 'react';
import { fetchPageContents, fetchNavItems, fetchSiteSettings } from '../services/api';
import { MOCK_PAGE_CONTENTS, MOCK_NAV_ITEMS, MOCK_SITE_SETTINGS } from '../data/mockData';
import { ContentContext } from './contentContextInstance';

export function ContentProvider({ children }) {
  const [contents, setContents] = useState(MOCK_PAGE_CONTENTS);
  const [navItems, setNavItems] = useState(MOCK_NAV_ITEMS);
  const [siteSettings, setSiteSettings] = useState(MOCK_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.allSettled([fetchPageContents(), fetchNavItems(), fetchSiteSettings()]).then(([contentsRes, navRes, settingsRes]) => {
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
      if (settingsRes.status === 'fulfilled' && settingsRes.value && Object.keys(settingsRes.value).length > 0) {
        setSiteSettings((prev) => ({ ...prev, ...settingsRes.value }));
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
    <ContentContext.Provider value={{ contents, navItems, siteSettings, getContent, getContentImage, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentProvider;
