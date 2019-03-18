#!/bin/bash
token=`cat ./infrastructure/travis/openshift-token` --insecure-skip-tls-verify=true
oc login $OPENSHIFT_URL --token=$token
oc rollout latest api-ci -n myskills