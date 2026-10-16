import { useContext } from 'react';
import { ContentContext } from '../context/contentContextInstance';

/**
 * Hook to consume CMS text content by key with fallback default
 */
export function useContent(key, fallback) {
  const { getContent } = useContext(ContentContext);
  return getContent(key, fallback);
}

/**
 * Hook to consume CMS image URL by key with fallback default
 */
export function useContentImage(key, fallback) {
  const { getContentImage } = useContext(ContentContext);
  return getContentImage(key, fallback);
}

/**
 * Hook to consume CMS navigation items by location ('header' | 'footer')
 */
export function useNavItems(location = 'header') {
  const context = useContext(ContentContext);
  if (!context || !context.navItems) return [];
  return context.navItems[location] || [];
}

/**
 * Hook to access the full content context
 */
export function usePageContents() {
  return useContext(ContentContext);
}

export default useContent;
