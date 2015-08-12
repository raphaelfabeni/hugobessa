#!/bin/bash

set -ex; # halt on any error

bundle exec htmlproof ./dist --check-favicon; # test html
