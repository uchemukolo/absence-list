import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fetch = require('node-fetch');
global.fetch = fetch;

require('whatwg-fetch');
