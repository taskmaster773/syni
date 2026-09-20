if (f && dat.internal) {
  if (id === 'settings')     f.srcdoc = getSettingsHTML();
  else if (id === 'files')   f.srcdoc = getPS5EmuHTML();
  else if (id === 'term')    f.srcdoc = getSpotifyHTML();
  else if (id === 'proxy')   f.srcdoc = getProxyBrowserHTML();
  else if (id === 'browser') getBrowserHTML().then(function (html) { f.srcdoc = html; });
}
