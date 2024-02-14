import { Plugin } from 'vite';

type CloudflarePagesOptions = {
    entry?: string | string[];
    outputDir?: string;
    external?: string[];
    minify?: boolean;
    emptyOutDir?: boolean;
};
declare const defaultOptions: Required<CloudflarePagesOptions>;
declare const cloudflarePagesPlugin: (options?: CloudflarePagesOptions) => Plugin;

export { cloudflarePagesPlugin, defaultOptions };
