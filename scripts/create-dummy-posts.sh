#!/bin/bash

script_dir=$(cd $(dirname $0); pwd)

for i in $(seq 1 100); do
    d=$(date -v+${i}d -j "+%Y-%m-%d")
    cat << EOF > "$script_dir/../content/blog/$d-dummy$i.md"
---
title: dummy-${i}
date: ${d}T15:26:30.801Z
tags:
  - test
  - hello
thumbnail: /img/k2wanko_a.png
description: dummy-${i}
---
dummy-${i}
EOF
done