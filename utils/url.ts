export const handleSignupClick = () => {
  const url = new URL('https://app.rediredi.com/es/signup');
  const params = new URLSearchParams(window.location.search);
  
  let hasUtm = false;
  params.forEach((_, key) => {
    if (key.startsWith('utm_')) {
      hasUtm = true;
    }
  });

  if (!hasUtm) {
    params.set('utm_source', 'organic_lp');
  }

  url.search = params.toString();

  // Push GTM dataLayer event before navigation so the trigger fires reliably.
  // GTM's {{Click URL}} variable only reads the `href` attribute of <a> tags,
  // so it is always empty for <button> elements — hence triggers that check
  // "Click URL contains signup" never match. Using a custom dataLayer event
  // is the correct pattern for programmatic navigations.
  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({
      event: 'signup_click',
      signup_url: url.toString(),
    });
  }

  window.open(url.toString(), '_blank');
};
