import React from 'react';
import '@fontsource/roboto';
import PropTypes from 'prop-types'; 

export const metadata = {
  title: 'Crypto Dashboard',
  description: 'Track the top cryptocurrencies',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
