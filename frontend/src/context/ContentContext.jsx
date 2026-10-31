import React, { useState, useEffect } from 'react';
import { fetchPageContents, fetchNavItems, fetchSiteSettings } from '../services/api';
import { MOCK_PAGE_CONTENTS, MOCK_NAV_ITEMS, MOCK_SITE_SETTINGS } from '../data/mockData';
import { ContentContext } from './contentContextInstance';

function hasValidData(res) {
  return res?.status === 'fulfilled' && res.value && Object.keys(res.value).length > 0;
}

function hasValue(val) {
  return val !== undefined && val !== null && val !== '';
}

export function ContentProvider({ children }) {
  const [contents, setContents] = useState(MOCK_PAGE_CONTENTS);
  const [navItems, setNavItems] = useState(MOCK_NAV_ITEMS);
  const [siteSettings, setSiteSettings] = useState(MOCK_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSiteData() {
      const [contentsRes, navRes, settingsRes] = await Promise.allSettled([
        fetchPageContents(),
        fetchNavItems(),
        fetchSiteSettings(),
      ]);

      if (!isMounted) return;

      if (hasValidData(contentsRes)) {
        setContents((prev) => ({ ...prev, ...contentsRes.value }));
      }

      if (navRes.status === 'fulfilled' && navRes.value) {
        const { header, footer } = navRes.value;
        setNavItems({
          header: header?.length ? header : MOCK_NAV_ITEMS.header,
          footer: footer?.length ? footer : MOCK_NAV_ITEMS.footer,
        });
      }

      if (hasValidData(settingsRes)) {
        setSiteSettings((prev) => ({ ...prev, ...settingsRes.value }));
      }

      setLoading(false);
    }

    loadSiteData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getContent = (key, fallback) => {
    const val = contents[key];
    return hasValue(val) ? val : fallback;
  };

  const getContentImage = (key, fallback) => {
    const val = contents[key];
    return hasValue(val) ? val : fallback;
  };

  return (
    <ContentContext.Provider value={{ contents, navItems, siteSettings, getContent, getContentImage, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentProvider;
