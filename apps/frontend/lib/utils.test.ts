import { cn } from './utils';

jest.mock('clsx', () => ({
  __esModule: true,
  clsx: (...args: any[]) =>
    args
      .flat(Infinity)
      .filter(Boolean)
      .flatMap(arg => {
        if (typeof arg === 'object' && !Array.isArray(arg)) {
          return Object.keys(arg).filter(key => !!arg[key]);
        }
        return arg;
      })
      .join(' ')
}));


jest.mock('tailwind-merge', () => ({
  twMerge: (classes: any) => classes.replace(/\s+/g, ' '),
}));

describe('cn', () => {
  it('retorna uma string vazia se nada for passado', () => {
    expect(cn()).toBe('');
  });

  it('une múltiplas classes simples', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('remove falsy values', () => {
    expect(cn('a', false, null, undefined, '', 'b')).toBe('a b');
  });

  it('funciona com arrays', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c');
  });

  it('funciona com objetos estilo clsx', () => {
    expect(cn({ a: true, b: false }, 'c')).toContain('a');
    expect(cn({ a: true, b: false }, 'c')).not.toContain('b');
  });
});
