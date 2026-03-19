import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
}

export function useSEO({ title, description }: SEOOptions) {
  useEffect(() => {
    // Save original title and description
    const originalTitle = document.title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    const originalDesc = metaDesc.getAttribute("content");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement("meta");
      ogDesc.setAttribute("property", "og:description");
      document.head.appendChild(ogDesc);
    }

    // Set new tags
    document.title = title;
    if (ogTitle) ogTitle.setAttribute("content", title);
    metaDesc.setAttribute("content", description);
    ogDesc.setAttribute("content", description);

    // Cleanup on unmount (optional, but good for SPA to restore if needed)
    return () => {
      document.title = originalTitle;
      if (ogTitle) ogTitle.setAttribute("content", originalTitle);
      if (metaDesc) metaDesc.setAttribute("content", originalDesc || "");
      if (ogDesc) ogDesc.setAttribute("content", originalDesc || "");
    };
  }, [title, description]);
}
