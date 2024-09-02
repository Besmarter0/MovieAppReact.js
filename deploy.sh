#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# replace <USERNAME> with your GitHub username and <REPO> with the repository name
git push -f git@github.com:besmarter0/moviesapp.git master:gh-pages

cd -
