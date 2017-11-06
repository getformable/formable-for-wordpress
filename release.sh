#!/bin/bash

read -p "Enter SVN dir [../wordpress-svn]: " SVN_DIR
SVN_DIR=${SVN_DIR:-../wordpress-svn}
echo "SVN directory is" $SVN_DIR

read -p "Enter version: " VERSION
echo "Version is" $VERSION

# build
npm run build

# copy files
rsync -av --exclude='.git' --exclude='node_modules' ./ $SVN_DIR/trunk
rsync -av --exclude='.git' --exclude='node_modules' ./ $SVN_DIR/tags/$VERSION

# commit SVN
cd $SVN_DIR
svn add trunk
svn add tags
svn ci -m 'Committing tag' $VERSION
svn up