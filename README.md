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
```


### Advice API
```
node bin/index.js advice
node bin/index.js advice --help
node bin/index.js advice --ids 12,3,4
node bin/index.js advice --search monkey
```

```
# setup advice files
touch tests/command/advice.ts
```
