import Caver from 'caver-js'

const caver = new Caver(window.klaytn)

function walletConnect (){
    return caver;
}

export default caver;