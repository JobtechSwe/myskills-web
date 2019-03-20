#!/bin/bash
docker login -u $DOCKER_USER -p $DOCKER_PASS
REPO=jobtechswe/myskills-web

docker build --build-arg REACT_APP_GRAPHQL_URI=$REACT_APP_GRAPHQL_URI --build-arg REACT_APP_GRAPHQL_WS_URI=$REACT_APP_GRAPHQL_WS_URI -f Dockerfile -t $REPO .

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  TAG="latest"
  docker tag $REPO $REPO:$TAG
  docker push $REPO:$TAG
fi

if [[ ! -z "$TRAVIS_TAG" ]]; then
  docker tag $REPO $REPO:$TRAVIS_TAG
  docker tag $REPO $REPO:"latest-tag-release"

  docker push $REPO:$TRAVIS_TAG
  docker push $REPO:"latest-tag-release"
fi

docker logout