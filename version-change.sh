#!/bin/bash

# Lire la version actuelle depuis package.json
current_version=$(jq -r '.version' package.json)

# Diviser la version en ses composants MAJOR.MINOR.PATCH.BUILD
IFS='.' read -r -a version_parts <<< "$current_version"

# Initialiser les composants
major="${version_parts[0]}"
minor="${version_parts[1]}"
patch="${version_parts[2]}"
build="${version_parts[3]}"

# Déterminer quel composant incrémenter en fonction de l'argument
case "$1" in
  major)
    major=$((major + 1))
    minor=0
    patch=0
    build=0
    ;;
  minor)
    minor=$((minor + 1))
    patch=0
    build=0
    ;;
  patch)
    patch=$((patch + 1))
    build=0
    ;;
  build)
    build=$((build + 1))
    ;;
  *)
    echo "Usage: $0 {major|minor|patch|build}"
    exit 1
    ;;
esac

# Composer la nouvelle version
new_version="$major.$minor.$patch.$build"

# Mettre à jour la version dans package.json
jq --arg new_version "$new_version" '.version = $new_version' package.json > tmp.json && mv tmp.json package.json
