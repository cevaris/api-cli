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

# setup typescript
tsc --init
# compile project on save
tsc -w

mkdir src
touch src/index.ts
```

### Advice API
```
node bin/index.js advice
node bin/index.js advice --help
node bin/index.js advice --ids 12,3,4
node bin/index.js advice --search monkey
```