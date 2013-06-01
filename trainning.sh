#!/bin/sh

zinnia_learn zhuyin-for-zinnia.s zhuyin-zh_TW.model
zinnia -m zhuyin-zh_TW.model < zhuyin-for-zinnia.s
zinnia_convert zhuyin-zh_TW.model.txt zhuyin-zh_TW.model