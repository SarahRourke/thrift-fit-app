const User = require('../models/User')

const fetch = require('node-fetch')

const shippingCalculator = {};

shippingCalculator.date = (req, res, next) => {
    let date_ob = new Date();
    let day = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const date = month +"/"+ day;
    // const User2 = req.user
    User.getById(req.params.id)
      .then((User) => {
        console.log(User)
        res.locals.user =  User 
        res.locals.date = date 
        next();
      })
      .catch(next);
}

shippingCalculator.shipping = (req, res, next) => {
    console.log('hello')

    const url = 'https://api.shipengine.com/v1/rates/estimate';
    const headers = {
        'Content-Type': 'application/json',
        'API-KEY': 'TEST_6Jaeq1Xd7myvZ+obeLJ2IqW6vCZvCuMNCHx4RJxhdak',
    }
    const data = JSON.stringify({
            "carrier_id": "se-327879",
            "from_country_code": "US",
            "from_postal_code": res.locals.user.zip_code,
            "from_city_locality": res.locals.user.city,
            "from_state_province": res.locals.user.state,
            "to_country_code": "US",
            "to_postal_code": req.user.zip_code,
            "to_city_locality": req.user.city,
            "to_state_province": req.user.state,
            "weight": {
            "value": 5,
            "unit": "pound"
            },
            "dimensions": {
            "unit": "inch",
            "length": 10,
            "width": 6,
            "height": 6
            },
            "confirmation": "none",
            "address_residential_indicator": "unknown",
            "ship_date": res.locals.date
    })
    console.log(data)
    fetch(url, {method: 'POST', headers: headers, body: data
    }).then(res => {
        console.log(res)
         return res.json()
    }).then((cost) => {
        console.log(cost)
        res.json({
          message: 'ok',
          shippingCost: { cost },
        });
      })
      .catch(next);

    // fetch('https://api.shipengine.com/v1/rates/estimate', {
    //     method: 'POST',
    //     Headers: {
    //         'Content-Type': 'application/json',
    //         'API-KEY': 'TEST_6Jaeq1Xd7myvZ+obeLJ2IqW6vCZvCuMNCHx4RJxhdak',
    //     },
    //     Body: JSON.stringify({
    //         "carrier_id": "se-327879",
    //         "from_country_code": "US",
    //         "from_postal_code": res.locals.user.zip_code,
    //         "from_city_locality": res.locals.user.city,
    //         "from_state_province": res.locals.user.state,
    //         "to_country_code": "US",
    //         "to_postal_code": req.user.zip_code,
    //         "to_city_locality": req.user.city,
    //         "to_state_province": req.user.state,
    //         "weight": {
    //         "value": 5,
    //         "unit": "pound"
    //         },
    //         "dimensions": {
    //         "unit": "inch",
    //         "length": 10,
    //         "width": 6,
    //         "height": 6
    //         },
    //         "confirmation": "none",
    //         "address_residential_indicator": "unknown",
    //         "ship_date": res.locals.date
    //             })
    // }).then((cost) => {
    //     console.log(cost)
    //     res.json({
    //       message: 'ok',
    //       shippingCost: { cost },
    //     });
    //   })
    //   .catch(next);
}

module.exports = shippingCalculator

