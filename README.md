[![Build status](https://ci.appveyor.com/api/projects/status/0p9qslm3t5i7f7we/branch/main?svg=true)](https://ci.appveyor.com/project/marinaustinovich/ahj-homeworks-workers-buggy-service-front/branch/main)

### Buggy Service

#### Легенда

Вам выпала нелёгкая задача — интегрироваться с «глючным» сторонним сервисом новостей. Сервер периодически отваливается, отвечая кодом 500. Поскольку вы уже знакомы с Service Workers, вы решили кешировать ответы сервера, когда они всё-таки появляются, и отдавать закешированные, если сервер отвечает ошибкой.

#### Описание

Вам необходимо реализовать сервер, эмулирующий эту ситуацию. Достаточно выставлять правильный код в koa, как мы это делали в лекции по HTTP, либо можете дополнительно ознакомиться с [обработкой ошибок в koa](https://github.com/koajs/koa/wiki/Error-Handling).

Общий вид интерфейса:

![](./pic/buggy.png)

