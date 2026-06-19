#!/usr/bin/env bash
# release.sh - update package.json version and print tag & push commands

if [ -z "$1" ]; then
  echo "Usage: ./release.sh <new-version>"
  exit 1
fi

VERSION="$1"

# Update version in package.json without creating git tag/commit
npm version "$VERSION" --no-git-tag-version

echo ""
echo "package.json version set to $VERSION."
echo "Next steps to publish a release:"
echo "  git add package.json"
echo "  git commit -m \"chore: bump version to $VERSION\""
