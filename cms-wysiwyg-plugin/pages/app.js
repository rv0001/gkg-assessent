// /pages/_app.js (Next.js Entry Point)
import { useEffect } from 'react';
import PluginManager from '../lib/pluginManager';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const pluginManager = new PluginManager('./plugins');
    pluginManager.loadPlugins();
  }, []);

  return <Component {...pageProps} />;
}
