#!/bin/sh

if [ "$1" = "shell" ]; then
/bin/bash
exit 0
fi

node index.js
