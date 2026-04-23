import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import V1Editorial from './V1Editorial';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <V1Editorial />
  </StrictMode>,
);
