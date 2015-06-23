#!/bin/bash

set -e # halt on any error

grunt build:prod; # build site
bundle exec htmlproof ./dist --check-favicon; # test html
