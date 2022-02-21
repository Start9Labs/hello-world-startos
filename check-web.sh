#!/bin/sh

DURATION=$(</dev/stdin)
if (($DURATION <= 5000)); then
    exit 60
else
    curl --silent --fail hello-world.embassy &>/dev/null
    RES=$?
    if test "$RES" != 0; then
        echo "Web interface is unreachable" >&2
        exit 1
    fi
fi