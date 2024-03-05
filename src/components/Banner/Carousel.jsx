import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { TrendingCoins } from '../../config/apis';
import { CryptoState } from '../../cryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { numberWithCommas } from '../CoinListTable';
const useStyles = makeStyles(() => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
}));


const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();
    const { currency ,symbol} = CryptoState();
    const fetchTrendingCoins = async() => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)

    }
    
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem } to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }} />
                <span>
                    {coin?.symbol}
                    &nbsp;
                </span>
                <span style={{
                    color: profit > 0 ? "rgb(14,203,129)" : "red",
                    fontweight: "500",
                }}>
                    {profit && "+"}{
                        coin?.price_change_percentage_24h?.toFixed(2)
                    }
                </span>
                 <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
            </Link>
        )
    })
    const responsive = {
        0: { items: 2 },
        512: {
            items:4,
        },

    }
  return (
    <div className={classes.carousel}>
          <AliceCarousel
              mouseTracking
              infinite
              autoPlayInterval={100}
              animationDuration={1500}
              disableDotsControls
              responsive={responsive}
              items={items}
              disableButtonsControls
          autoPlay/>
    </div>
  )
}

export default Carousel
