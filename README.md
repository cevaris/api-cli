# cli-api
CLI wrapper around multiple HTTP API's

```
# create 
yarn init

# setup git
git init 
git remote add origin git@github.com:cevaris/cli-api.git
git pull --rebase
echo "\nbin/" >> .gitignore

# install application libraries and developer tools
yarn add axios commander
yarn add --dev @types/jest @types/node jest ts-jest typescript

# setup typescript config
tsc --init
tsc -w

# setup jest config
jest init
jest --watchAll

mkdir src
touch src/index.ts

mkdir src/api
mkdir src/command
mkdir tests/
mkdir tests/api
mkdir tests/command

mkdir build/

mkdir bin/
touch bin/advice
```


### Advice API
```
~࿔ ./bin/advice --help
Usage: index advice [options]

prints advice form Advice API

Options:
  -i --ids <ids>      fetch advice by ids
  -q --query <query>  query for advice
  -h, --help          output usage information
```

Random Advice
```
~࿔ ./bin/advice
Advice(201): Don't burn bridges.
```

Ask for specific advice by id.
```
~࿔ ./bin/advice --ids 12,3,4
Advice(003): Don't eat non-snow-coloured snow.
Advice(004): Cars are bad investments.
Advice(012): Always block trolls.
```

Ask for specific advice that includes the given text.
```
~࿔ ./bin/advice --query other
Advice(011): Avoid mixing Ginger Nuts with other biscuits, they contaminate. Keep separated.
Advice(017): Sometimes it's best to ignore other people's advice.
Advice(031): Never let your Mother cut your hair.
Advice(096): Don't give to others advice which you wouldn't follow.
Advice(142): If you don't like the opinion you've been given, get another one.
Advice(189): Do not compare yourself with others.
Advice(208): Play is the true mother of invention.
```

### Weather API
Query for a Locations data. Separate multiple locations by ':' colon characters.
```
~࿔ ./bin/weather --locations 'A:Paris,France:Fresno,CA,USA'
Location "A" not found
┌──────────┬─────────────────────────┬───────────┬───────────────┬──────────┬──────────────────┬────────────────┐
│ Location │ Local Date/Time         │ Temp (°F) │ Lat/Long (°)  │ Vis. (m) │ Wind Speed (m/s) │ Wind Angle (°) │
├──────────┼─────────────────────────┼───────────┼───────────────┼──────────┼──────────────────┼────────────────┤
│ Paris    │ Sep 22, 2019/5:42:52 pm │ 61.48     │ 48.86/2.35    │ 10000    │ 3.6              │ 200            │
├──────────┼─────────────────────────┼───────────┼───────────────┼──────────┼──────────────────┼────────────────┤
│ Fresno   │ Sep 22, 2019/8:42:52 am │ 63.86     │ 36.74/-119.78 │ 16093    │ 0.31             │ 25.259         │
└──────────┴─────────────────────────┴───────────┴───────────────┴──────────┴──────────────────┴────────────────┘┘
```