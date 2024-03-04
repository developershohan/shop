// allow origin

const allowedOrigins = ["http://localhost:5454"]


const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credential: true,
    optionsSuccessStatus: 200
  }