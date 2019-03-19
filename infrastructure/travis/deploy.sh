#!/bin/bash
token=`cat ./infrastructure/travis/openshift-token`
oc login $OPENSHIFT_URL --token=$token --insecure-skip-tls-verify=true
# TODO: add rollout logic
oc logout