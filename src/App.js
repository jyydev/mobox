import React, { useState, useEffect } from 'react';

const Input = () => {
  const [price, setPrice] = useState({
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
  });
  const rarities = ['common', 'uncommon', 'rare', 'epic'];

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
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
  });
  const [level, setLevel] = useState([1, 2]);
  // const [level, setLevel] = useState(11);

  var total = 0;
  rarities.map((rarity) => {
    total += price[rarity] * sum[rarity];
  });

  useEffect(() => {
    var common = 0;
    var uncommon = 0;
    var rare = 0;
    var epic = 0;

    Object.keys(costs).map((e) => {
      if (parseInt(e) >= level[0] && parseInt(e) < level[1]) {
        common += costs[e][0];
        uncommon += costs[e][1];
        rare += costs[e][2];
        epic += costs[e][3];
      }
    });
    setSum({
      common,
      uncommon,
      rare,
      epic,
    });
  }, [price, level]);
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
      <p>subtitle </p>
      <h3>Heading</h3>
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
                      // setPrice((prev) => {
                      //   return { ...prev, [rarity]: e.target.value };
                      // });
                      setPrice({
                        ...price,
                        [rarity]: e.target.value,
                      });
                    }}
                  />
                  <div>BUSD</div>
                </React.Fragment>
              );
            })}
          </div>
          <span>Level : </span>
          <input
            type='text'
            id='from'
            name='from'
            value={level[0]}
            size='5'
            onChange={(e) => {
              setLevel({ ...level, 0: e.target.value });
            }}
          />
          &#10132; {}
          <input
            type='text'
            id='to'
            name='to'
            size='5'
            value={level[1]}
            onChange={(e) => {
              setLevel({ ...level, 1: e.target.value });
            }}
          />
        </form>
        <div className='item'>
          <p></p>
          <h3>
            <small>=</small> {total} USD
          </h3>
          <p></p>
        </div>
        {rarities.map((rarity) => {
          return (
            <div className='item'>
              <small>{rarity}:</small>
              <h4>{sum[rarity]}</h4>
              <small>x</small>
              <h4>${price[rarity]}</h4>
              <small>=</small>
              <h4>{sum[rarity] * price[rarity]} USD</h4>
            </div>
          );
        })}
        {/* <Result price={price} /> */}
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
