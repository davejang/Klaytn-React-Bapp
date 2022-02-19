import React, { Component } from 'react';
import WalletInfo from './WalletInfo';
import caver from '../klaytn/caver';

import jquery from 'jquery';

window.$ = window.jquery = jquery;

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
    
    componentDidMount(){
        this.loadAccountInfo()
        this.setNetworkInfo()
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
    
    setNetworkInfo = () => {
        const { klaytn } = window
        if (klaytn === undefined) return
    
        this.setState({ network: klaytn.networkVersion })
        klaytn.on('networkChanged', () => this.setNetworkInfo(klaytn.networkVersion))
    }
    
    selectTxType = (txType) => this.setState({ txType })
    

    render(){
        const { account, balance } = this.state
        return (
            <WalletInfo address={account} balance={balance} />
        );
    }
}

export default Main;
