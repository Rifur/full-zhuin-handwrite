#!/bin/sh

zinnia_learn zhuyin-for-zinnia.s zhuyin-zh_TW.model
zinnia -m zhuyin-zh_TW.model < zhuyin-for-zinnia.s
zinnia_convert zhuyin-zh_TW.model.txt zhuyin-zh_TW.model

node full-zhuyin-gen.js > full-two-zhuyin.s
zinnia_learn full-two-zhuyin.s full.model