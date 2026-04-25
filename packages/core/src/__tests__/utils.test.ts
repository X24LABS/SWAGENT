import { describe, it, expect } from 'vitest';
import { estimateTokens, tagToSlug } from '../core/utils.js';

describe('estimateTokens', () => {
  it('returns 0 for empty string', () => {
    expect(estimateTokens('')).toBe(0);
  });

  it('returns 1 for 4-char string', () => {
    expect(estimateTokens('test')).toBe(1);
  });

  it('returns 2 for 8-char string', () => {
    expect(estimateTokens('testtest')).toBe(2);
  });

  it('returns 3 for 9-char string (ceiling)', () => {
    expect(estimateTokens('testtests')).toBe(3);
  });

  it('returns ~250 for typical llms.txt string (~1000 chars)', () => {
    const text = 'a'.repeat(1000);
    expect(estimateTokens(text)).toBe(250);
  });
});

describe('tagToSlug', () => {
  it('lowercases single-word tags', () => {
    expect(tagToSlug('Pets')).toBe('pets');
  });

  it('replaces spaces with hyphens', () => {
    expect(tagToSlug('User Accounts')).toBe('user-accounts');
  });

  it('strips accents via NFKD normalization', () => {
    expect(tagToSlug('Búsqueda')).toBe('busqueda');
    expect(tagToSlug('Gestión de Usuarios')).toBe('gestion-de-usuarios');
  });

  it('collapses non-alphanumeric runs into a single hyphen', () => {
    expect(tagToSlug('auth / tokens (v2)')).toBe('auth-tokens-v2');
  });

  it('trims leading and trailing hyphens', () => {
    expect(tagToSlug('  hello world  ')).toBe('hello-world');
    expect(tagToSlug('--pets--')).toBe('pets');
  });

  it('falls back to "group" for empty or all-symbol tags', () => {
    expect(tagToSlug('')).toBe('group');
    expect(tagToSlug('###')).toBe('group');
  });
});
