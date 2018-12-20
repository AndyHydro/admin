import React, { useState } from 'react'
import { useWeb3Context, useAccountBalance } from 'web3-react/hooks'
import { getEtherscanLink } from 'web3-react/utilities'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

const token = {
                // address: '0x4959c7f62051D6b2ed6EaeD3AAeE1F961B145F20',
                address: '0xEBBdf302c940c6bfd49C6b165f457fdb324649bc',
                ABI: [{"constant":true,"inputs":[],"name":"raindropAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"},{"name":"_challenge","type":"uint256"},{"name":"_partnerId","type":"uint256"}],"name":"authenticate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_raindrop","type":"address"}],"name":"setRaindropAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressList","type":"address[]"},{"name":"_amounts","type":"uint256[]"}],"name":"setBalances","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]
              }

let members = [
               '0x8062E69aF89430d0749697ceDE9614Cda80325e0',
               '0x067ca205aaF09A8B724Cadd2f70A38f9AF2d150A',
               '0x1141f603a7bb27e57bade4a87b924d03622bde86',
               '0x4BA7D463ffe4D3562c8eF4671Ba280bEaF41E54C',
               '0xB59Cdc85Cacd15097ecE4C77ed9D225014b4D56D',
               '0x0aCe3318E257E2B2639500C978D567943Cd9eC5A',
               '0x5ffc0c1c055488c22fE6616B73e4eC720E0edf61',
               '0x6527F3A2Ec247572c4b1611267A858455e617A07',
               '0x1fa3265E18cfD69017FB0cf45282759621AB6f9F',
               '0x7e89a94fFD4B09575103706b90dAb413c6a8432e',
               '0x669105FB922F301869402043BDd79393D010e68E',
               '0xA6d057174dd6A4Fa72aDd3708fE96d849B240958',
               '0x68F4d58842F1bC6f4B6c800aD2d74B1231894eFe',
               '0xb38D5A45967b7c10e68ef875e99fb3592c033Afb',
               '0x3539252de43334191f4EC8ba9A0d128c151b1530',
               '0xfD8D06740291E7F2675Bc584fC6021d488B37c4f'
              ]

function Admin () {
  const context = useWeb3Context()
  const balance = useAccountBalance()

  const [etherscanLinks, setEtherscanLinks] = useState([])

  function sendBatch() {
    const tokenContract = new context.web3js.eth.Contract(token.ABI, token.address)
    members.forEach(function(member)  {
      tokenContract.methods.transfer(member, "222222000000000000000000").send({from: context.account}).then(transaction => {
        let tempArray = etherscanLinks
        tempArray.push({'address': member, 'transaction': transaction.transactionHash})
        setEtherscanLinks(tempArray)
      })
    })
  }

  return (
    <>
      <p>{context.account}</p>
      <p>{balance} ETH</p>
      <button onClick={sendBatch}>Send Monthly Tokens</button>
      <Table>
        <TableHead>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>Transaction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {etherscanLinks.map((trx, i)  => (
            <TableRow
              key={trx.transaction}
            >
              <TableCell>
                <a
                  href={getEtherscanLink(context.networkId, 'address', trx.address)}
                  target="_blank" rel='noopener noreferrer'
                  >
                  {trx.address}
                </a>
              </TableCell>
              <TableCell>
                <a
                  href={getEtherscanLink(context.networkId, 'transaction', trx.transaction)}
                  target="_blank" rel='noopener noreferrer'
                >
                  {trx.transaction}
                </a>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
      </Table>
    </>
  )
}

export default Admin;
