#! /bin/sh

# we are in circle ci server context
# deploy backend first
cd ~/repo/apps/api
now -e NODE_ENV=production --token $NOW_TOKEN --public
now alias --token=$NOW_TOKEN

cd ~/repo/apps/client
now -e NODE_ENV=production --token $NOW_TOKEN --public
now alias --token=$NOW_TOKEN
