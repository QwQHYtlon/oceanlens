import { useEffect } from 'react';

const SITE_NAME = 'OceanLens 海洋透視鏡';

/**
 * Keeps the browser tab title in sync with the current page.
 * Pass a page-specific title, or an empty string for the site default.
 */
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
