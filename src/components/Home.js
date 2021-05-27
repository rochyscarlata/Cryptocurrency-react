import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import './Home.css'

function Home() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		axios
			.get(
				'https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=250&page=1&sparkline=false'
			)
			.then((res) => {
				setCoins(res.data);
			})
			.catch((error) => console.error(error));
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="container coin-app">
			<div className="coin-search">
				<div className="row">
					<h1 className="col-md-12 coin-text ">Search a Currency</h1>
				</div>
				<form>
					<input
						placeholder="Search"
						className="coin-input "
						onChange={handleChange}
					/>
				</form>
			</div>
			<div className="row coin-row coin-nocel">
				<div className="col-md-3 coin">
					
					<h1 className="no">imagen</h1>
					<h1>Coin</h1>
					<h1 className="no">aBRE</h1>
					<p className="coin-symbol"></p>
				</div>
				<p className="col-md-2 coin-price">Price</p>
				<p className="col-md-2 coin-volume">
					Volume
				</p>
			
					<p className="col-md-1 coin-percent red">
						+/-
					</p>
			
			
				<p className="col-md-4 coin-marketcap">
					Market Cap:
				</p>
			</div>
			{filteredCoins.map((coin) => {
				return (
					
					<Coin
						key={coin.id}
						name={coin.name}
						image={coin.image}
						symbol={coin.symbol}
						volume={coin.total_volume}
						price={coin.current_price}
						priceChange={coin.price_change_percentage_24h}
						marketCap={coin.market_cap}
					/>
				);
			})}
		</div>
	);
}


export default Home;
