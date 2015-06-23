#!/bin/bash

set -e; # halt on any error

bundle exec htmlproof ./dist --check-favicon; # test html
