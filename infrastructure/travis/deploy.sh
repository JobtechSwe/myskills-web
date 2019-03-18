#!/bin/bash
token=`cat ./openshift-token`
oc login $OPENSHIFT_URL --token=$token
oc rollout latest api-ci -n myskills