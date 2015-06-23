#!/bin/bash

set -e # halt on any error

grunt build:prod; # build site
htmlproof ./dist --check-favicon; # test html
