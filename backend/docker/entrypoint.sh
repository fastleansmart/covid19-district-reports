#!/bin/sh

cd /root

if [ -z $ERROR_PROBABILITY ]; then
    ERROR_PROBABILITY=0
fi

exec ./backend serve --errorProbability $ERROR_PROBABILITY