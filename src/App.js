import React, { useState, useEffect } from 'react';

const Input = () => {
  const [price, setPrice] = useState({
    momo: 0,
    common: 20,
    uncommon: 15,
    unique: 15,
    rare: 600,
  });
  const rarities = ['momo', 'common', 'uncommon', 'unique', 'rare'];
  const [rarity, setRarity] = useState('');
  const costs = {
    1: [2, 0, 0, 0],
    2: [1, 1, 0, 0],
    3: [1, 2, 0, 0],
    4: [2, 2, 0, 0],
    5: [3, 0, 0, 0],
    6: [2, 2, 0, 0],
    7: [3, 2, 0, 0],
    8: [2, 2, 1, 0],
    9: [3, 1, 1, 0],
    10: [5, 0, 0, 0],
    11: [2, 3, 0, 0],
    12: [4, 3, 0, 0],
    13: [3, 3, 2, 0],
    14: [4, 2, 2, 0],
    15: [6, 1, 0, 0],
    16: [3, 4, 0, 0],
    17: [5, 4, 0, 0],
    18: [4, 4, 3, 0],
    19: [5, 3, 3, 1],
    20: [7, 2, 0, 0],
    21: [4, 5, 0, 0],
    22: [6, 5, 0, 0],
    23: [5, 5, 4, 0],
    24: [5, 3, 3, 1],
    25: [8, 3, 0, 0],
    26: [5, 6, 0, 0],
    27: [7, 6, 0, 0],
    28: [6, 6, 5, 0],
    29: [5, 3, 3, 2],
  };
  const [sum, setSum] = useState({
    momo: 0,
    common: 0,
    uncommon: 0,
    unique: 0,
    rare: 0,
  });
  const [level, setLevel] = useState([1, 2]);

  var total = 0;
  rarities.map((rarity) => {
    total += price[rarity] * sum[rarity];
  });

  const [basePower, setBasePower] = useState(110);
  const [bonusPower, setBonusPower] = useState(0);
  const [set, setSet] = useState(false);
  const [powers, setPowers] = useState({
    from: 0,
    to: 0,
    increased: 0,
  });

  const [mbox, setMbox] = useState({
    from: 0,
    to: 0,
    increased: 0,
  });

  useEffect(() => {
    function mboxMultiply(v) {
      return parseFloat((v * 2) / 100).toFixed(2);
    }
    setMbox({
      from: mboxMultiply(powers.from),
      to: mboxMultiply(powers.to),
      increased: mboxMultiply(powers.increased),
    });
  }, [powers]);

  useEffect(() => {
    var momo = 1;
    var common = 0;
    var uncommon = 0;
    var unique = 0;
    var rare = 0;

    function levelUp(level) {
      var powerUp = basePower;
      for (; level > 1; level--) {
        if (basePower >=50) {
          powerUp += 25 + basePower * 0.5;
          if (level == 5) powerUp += 7 + basePower * 0.15;
          if (level == 10) powerUp += 15 + basePower * 0.3;
          if (level == 15) powerUp += 23 + basePower * 0.45;
          if (level == 20) powerUp += 30 + basePower * 0.6;
          if (level == 25) powerUp += 37 + basePower * 0.75;
          if (level == 30) powerUp += 45 + basePower * 0.9;
          setRarity('Epic')
        } else {
          powerUp += 20 + (basePower - 10) * 0.5;
          if (level == 5) powerUp += 3 + basePower * 0.1;
          if (level == 10) powerUp += 6 + basePower * 0.2;
          if (level == 15) powerUp += 9 + basePower * 0.3;
          if (level == 20) powerUp += 12 + basePower * 0.4;
          if (level == 25) powerUp += 15 + basePower * 0.5;
          if (level == 30) powerUp += 18 + basePower * 0.6;
          setRarity('Rare');
        }
      }
      return powerUp;
    }
    function getPowers() {
      setPowers({
        ...powers,
        from: levelUp(level[0]),
        to: levelUp(level[1]),
        increased: levelUp(level[1]) - levelUp(level[0]),
      });
      if (set) {
        setPowers((prev) => ({
          ...prev,
          from: prev.from + 300,
          to: prev.to + 300,
          increased: prev.increased + 300,
        }));
      }
      if (bonusPower) {
        setPowers((prev) => ({
          ...prev,
          from: prev.from * (1 + bonusPower / 100),
          to: prev.to * (1 + bonusPower / 100),
          increased: prev.increased * (1 + bonusPower / 100),
        }));
      }
    }
    getPowers();

    Object.keys(costs).map((e) => {
      if (parseInt(e) >= level[0] && parseInt(e) < level[1]) {
        common += costs[e][0];
        uncommon += costs[e][1];
        unique += costs[e][2];
        rare += costs[e][3];
      }
    });
    setSum({
      momo,
      common,
      uncommon,
      unique,
      rare,
    });
  }, [price, level, basePower, bonusPower, set]);

  return (
    <>
      <h2>
        <img
          style={{ verticalAlign: 'middle', marginRight: '0.5rem' }}
          height='50rem'
          src='https://s2.coinmarketcap.com/static/img/coins/64x64/9175.png'
          alt='SLP'
        />
        MOBOX: upgrade cost
      </h2>
      <p>Calculator for {rarity} Momo NFT level upgrade cost </p>
      <h3>Require ${total}</h3>
      <p>Upgrade cost: ${total - price.momo} + momo cost: ${price.momo} </p>

      <article>
        <form className='form'>
          <h4>Price</h4>
          <div className='form-control'>
            {rarities.map((rarity, i) => {
              return (
                <React.Fragment key={i}>
                  <label htmlFor={rarity}>{rarity} : </label>{' '}
                  <input
                    type='text'
                    id={rarity}
                    name={rarity}
                    value={price[rarity]}
                    onChange={(e) => {
                      setPrice({
                        ...price,
                        [rarity]: e.target.value,
                      });
                    }}
                  />
                  <div>USD</div>
                </React.Fragment>
              );
            })}
          </div>

          <div>
            <span>Level : </span>
            <input
              type='text'
              id='from'
              name='from'
              value={level[0]}
              size='3'
              onChange={(e) => {
                if (e.target.value <= 0 && e.target.value) e.target.value = 1;
                setLevel({ ...level, 0: e.target.value });
              }}
            />
            &#10132; {}
            <input
              type='text'
              id='to'
              name='to'
              size='3'
              value={level[1]}
              onChange={(e) => {
                if (e.target.value > 30) e.target.value = 30;
                setLevel({ ...level, 1: e.target.value });
              }}
            />
            <button
              type='button'
              onClick={() => {
                setLevel({ ...level, 0: 1, 1: 30 });
              }}
            >
              max
            </button>
          </div>

          <div>
            <span>Base hash power : </span>
            <input
              type='text'
              id='base'
              name='base'
              value={basePower}
              size='4'
              onChange={(e) => {
                setBasePower(parseInt(e.target.value) || 0);
              }}
            />{' '}
            Bonus: {}
            <input
              type='text'
              id='bonus'
              name='bonus'
              value={bonusPower}
              size='3'
              onChange={(e) => {
                setBonusPower(parseInt(e.target.value) || 0);
              }}
            />
            %
          </div>
          <div>
            <label htmlFor='set'>Rare set +300 hash power : </label> {}
            <input
              type='checkbox'
              id='set'
              name='set'
              checked={set}
              onChange={() => setSet(!set)}
            />
          </div>
        </form>

        <h3> {basePower} base hash power</h3>

        <div className='item'>
          <h4>
            <small>Lvl {level[0]}</small> <div>{powers.from.toFixed()}</div>
            <small style={{ fontSize: '0.6rem' }}>
              ${parseFloat(price.momo / powers.from).toFixed(2)} / hash
            </small>
          </h4>
          <h3>
            <small>Hash power</small>
            <div>+{powers.increased.toFixed()}</div>
            <small style={{ fontSize: '0.8rem' }}>
              ${parseFloat(total / powers.increased).toFixed(2)} / hash
            </small>
          </h3>
          <h4>
            <small>Lvl {level[1]}</small>
            <br />
            <div>{powers.to.toFixed()}</div>
            <small style={{ fontSize: '0.6rem' }}>
              ${parseFloat(total / powers.to).toFixed(2)} / hash
            </small>
          </h4>
        </div>
        <div className='item'>
          <h4>
            <small>Lvl {level[0]}</small>
            <br />
            <div>{mbox.from}</div>
          </h4>
          <h3>
            <small>MBOX per day</small>
            <div>+{mbox.increased}</div>
          </h3>
          <h4>
            <small>Lvl {level[1]}</small>
            <br />
            <div>{mbox.to}</div>
          </h4>
        </div>

        <div className='item'>
          <p>Return in</p>
          <h3>{(total / ((powers.increased * 2) / 100)).toFixed()}</h3>
          <p>days</p>
        </div>

        <div className='item'>
          <p>Require</p>
          <h3>${total}</h3>
          <p>USD</p>
        </div>
        {rarities.map((rarity, i) => {
          return (
            <div className='item' key={i}>
              <small>{rarity}:</small>
              <h4>{sum[rarity]}</h4>
              <small>x</small>
              <h4>${price[rarity]}</h4>
              <small>=</small>
              <h4>{sum[rarity] * price[rarity]} USD</h4>
            </div>
          );
        })}
      </article>
    </>
  );
};

function App() {
  return (
    <div className='container'>
      <Input />
    </div>
  );
}

export default App;
