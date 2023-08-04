import Router from 'next/router';

export function redirectTo(segments: string[], queryParams?: { [key: string]: string }): Promise<boolean> {
  return queryParams ? Router.push({ pathname: segments.join('/'), query: { rdv: 'confirmed' } }) : Router.push(segments.join('/'));
}
