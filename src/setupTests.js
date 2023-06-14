import '@testing-library/jest-dom';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    media: '',
    onchange: null,
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() { return false; }
  };
};
