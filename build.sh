#!/bin/bash

# Change to the directory of the script itself and get a username based on
# the path where the file resides. This assumes the typical Linux scheme of
# /home/username and will otherwise fail. The script then re-runs itself as 
# that user.

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
if [ "$(id -u)" = "0" ]; then
    USER="$(echo $PWD|sed 's|^/home/\([^/]\+\).*$|\1|')"
    SCRIPT="$(realpath $0)"
    exec su -l -c "$SCRIPT" "$USER"
fi


# Build process goes here

yarn=yarnpkg

# Install new deps
MD5="$(md5sum package.json)"
git pull || exit
[ "$MD5" = "$(md5sum package.json)" ] || $yarn install

# Build main site
$yarn build
rm -rf site
cp -a dist site

# Build widget (output files should be symlinked in the public directory of this repo)
git submodule init
git submodule update
cd climate-clock-widget
$yarn install
$yarn build

# TEMPORARY maker kit image hosting
cd ../site
for i in ~/climate-clock-images/*.img; do ln -s $i; done

