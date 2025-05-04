/* eslint-env jest */
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder/TextDecoder to the global object
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Use globalThis which is available in modern JavaScript environments
// and provides a standard way to access the global object
const globalObject = typeof window !== 'undefined' ? window : globalThis;

// Mock localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock fetch API using window and globalThis
if (typeof window !== 'undefined') {
  window.fetch = jest.fn();
} else if (typeof globalThis !== 'undefined') {
  globalThis.fetch = jest.fn();
}