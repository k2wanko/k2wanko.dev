#!/bin/bash

script_dir=$(cd $(dirname $0); pwd)

find $script_dir/../content/blog -name "*dummy*.md" | xargs rm -f