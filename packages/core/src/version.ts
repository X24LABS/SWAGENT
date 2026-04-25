import pkg from '../package.json';

/**
 * Version of @swagent/core, read from its package.json at build time.
 *
 * In source the field is hardcoded to `0.1.0`; the CI publish step
 * (.gitlab-ci.yml -> publish:npm) rewrites it to the tag version before
 * publishing, so the published artifact reports the right number.
 */
export const SWAGENT_VERSION: string = pkg.version || '';
