import React from 'react'

const WalletInfo = ({ address, balance }) => {
  return (
    <div>
      <h3>Wallet Information</h3>
        <div>
          <span>Wallet Address : </span>
          {address || 'DISCONNECTED'}
        </div>
        <div>
          <span>Balance : </span>
          {balance || 'DISCONNECTED'}
        </div>
    </div>
  )
}

export default WalletInfo;
