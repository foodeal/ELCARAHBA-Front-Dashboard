import { findLast } from 'lodash';

export function routeUrlMatcher(urlName: string, args?: Record<string, string>): string {
  const _args: Record<string, string> = args || {};
  let url = urlName || '';
  Object.keys(args || {}).forEach((param) => (url = url.replace(/\s/g, '').replace(new RegExp(`:${param}`, 'gi'), () => _args[param])));

  return url;
}

export function mapUrlToSegments(url: string): string[] {
  return url.split('/').map((segment) => '/' + segment);
}

export function currentSegment(url: string): string | undefined {
  const segments = mapUrlToSegments(url);
  return findLast(segments) ? findLast(segments)?.replace('/', '') : undefined;
}
