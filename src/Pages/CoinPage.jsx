import React, { useEffect, useState } from 'react'
import { SingleCoin } from '../config/apis';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../cryptoContext';
import axios from 'axios';

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  console.log(coin);
  useEffect(() => {
    fetchCoin();
  },[])
  return (
    <div>
      Coin Page
    </div>
  )
}

export default CoinPage
