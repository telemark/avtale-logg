[![Build Status](https://travis-ci.org/telemark/avtale-logg.svg?branch=master)](https://travis-ci.org/telemark/avtale-logg)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

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

### ```GET /agreements/parts/:partId```

Get all parts for an agreement using the partId

```bash
$ http GET https://logs.service.io/agreements/parts/42405aab-466e-4459-ac17-7f2c96f4ec19 'Authorization: Bearer <INSERT TOKEN>'
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
### ```GET /stats/total```

Get total amount of agreements

```bash
$ http GET https://logs.service.io/stats/total
```

### ```GET /stats/total/:status```

Get total amount of agreements with a given status

```bash
$ http GET https://logs.service.io/stats/total/signed
```

### ```GET /stats/status```

Get total amount of different agreement statuses

```bash
$ http GET https://logs.service.io/stats/status
```

### ```GET /stats/types```

Get total amount of different agreement types

```bash
$ http GET https://logs.service.io/stats/types
```

### ```GET /stats/read```

Get total amount of different read statuses

```bash
$ http GET https://logs.service.io/stats/read
```

### ```GET /stats/agreements```

Get total amount of different signed statuses grouped by agreementIds

```bash
$ http GET https://logs.service.io/stats/agreements
```

## Deployment - ZEIT/Now

Change content of [production.env](production.env) to match your environment.

Change content of now:alias in [package.json](package.json) to match your domains.

Deploy service.

```bash
$ npm run deploy
```

## Related

- [avtale-generate-grunnlag](https://github.com/telemark/avtale-generate-grunnlag) Robot for generating agreement-generator jobs
- [avtale-generator](https://github.com/telemark/avtale-generator#readme) Robot for generating agreements
- [avtale-distribusjon](https://github.com/telemark/avtale-distribusjon#readme) Robot for distributing agreements
- [avtale-status](https://github.com/telemark/avtale-status#readme) Robot for updating agreements log
- [avtale-templates](https://github.com/telemark/avtale-templates#readme) Templates for agreements
- [minelev-avtaler](https://github.com/telemark/minelev-avtaler#readme) See agreements for students

## License

[MIT](LICENSE)

![Robohash image of avtale-logg](https://robots.kebabstudios.party/avtale-logg.png "Robohash image of avtale-logg")
