[![Build Status](https://travis-ci.org/telemark/avtale-logg.svg?branch=master)](https://travis-ci.org/telemark/avtale-logg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/avtale-logg.svg)](https://greenkeeper.io/)

# avtale-logg

Log for avtale status

## API

All API calls needs an Authorization header with valid jwt

```bash
$ http GET https://logs.service.io/agreements/5ac770926ae9e948ebc0bb47 'Authorization: Bearer <INSERT TOKEN>'
```

### ```PUT /agreements```

Add a new agreement

```bash
$ http PUT https://logs.service.io/agreements userid=12345 agreementId=98765 'Authorization: Bearer <INSERT TOKEN>'
```

### ```GET /agreements/:id```

Get a specific agreement

```bash
$ http GET https://logs.service.io/agreements/5ac770926ae9e948ebc0bb47 'Authorization: Bearer <INSERT TOKEN>'
```

### ```POST /agreements/:id```

Updates agreement

```bash
$ http POST https://logs.service.io/agreements/5ac770926ae9e948ebc0bb47 status=signed 'Authorization: Bearer <INSERT TOKEN>'
```

### ```POST /agreements/search```

Search agreements

```bash
$ http POST https://logs.service.io/agreements/search status=signed 'Authorization: Bearer <INSERT TOKEN>'
```

## Deployment - ZEIT/Now

Change content of [production.env](production.env) to match your environment.

Change content of now:alias in [package.json](package.json) to match your domains.

Deploy service.

```bash
$ npm run deploy
```

## License

[MIT](LICENSE)

![Robohash image of avtale-logg](https://robots.kebabstudios.party/avtale-logg.png "Robohash image of avtale-logg")
