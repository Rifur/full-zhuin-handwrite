#!/bin/sh

zinnia_learn single-data/zhuyin-for-zinnia.s single-data/zhuyin-zh_TW.model

node full-zhuyin-gen.js > full-data/full-zhuyin.s
zinnia_learn full-data/full-zhuyin.s full-zhuyin.model