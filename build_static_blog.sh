#!/usr/bin/env bash

CUR_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

UI_BUNDLE=${CUR_DIR}/ui-bundle
echo $CUR_DIR
echo $UI_BUNDLE

cd "$UI_BUNDLE" && zip -r $CUR_DIR/ui-bundle.zip ./
cd $CUR_DIR || exit
echo "antora build static blog website"
docker run -v `pwd`:/antora --rm -t antora:latest --stacktrace kevin_antora_playbook.yml

