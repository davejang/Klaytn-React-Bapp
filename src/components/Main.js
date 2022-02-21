import React, { Component } from 'react';
import WalletInfo from './WalletInfo';

import caver from '../klaytn/caver';

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
          txType: null,
          account: '',
          balance: 0,
          network: null,
        }
    }

    //Kaikas Connect
    loadAccountInfo = async () => {
        const { klaytn } = window
    
        if (klaytn) {
          try {
            await klaytn.enable()
            this.setAccountInfo(klaytn)
            klaytn.on('accountsChanged', () => this.setAccountInfo(klaytn))
          } catch (error) {
            console.log('User denied account access')
          }
        } else {
          console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }
    }

    setAccountInfo = async () => {
        const { klaytn } = window
        if (klaytn === undefined) return
    
        const account = klaytn.selectedAddress
        const balance = await caver.klay.getBalance(account)
        this.setState({
          account,
          balance: caver.utils.fromPeb(balance, 'KLAY'),
        })
    }
    
    render(){
        const { account, balance } = this.state
        return (
          <div>
            <button onClick={ this.loadAccountInfo }>Connect Wallet</button>
            <WalletInfo address={account} balance={balance}/>
          </div>
        );
    }
}

export default Main;
