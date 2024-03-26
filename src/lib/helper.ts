type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
};

export function openGraph({
  siteName,
  templateTitle,
  description,
}: OpenGraphType): string {
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  return `https://hypeandplay.com/api/general?siteName=${ogSiteName}&description=${ogDesc}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const scrollToComponent = (id: string) => {
  const element = document.getElementById(id);
  element?.scrollIntoView({
    behavior: 'smooth',
  });
};
