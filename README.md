# G Funk

Meaningful, Simplicity and Usefulness, all in one letter. The Trinity of G.

## INSTALL

```
$ npm install -S gfunk
```

## USE

```
var G = require('gfunk');
var log = G([
      {match:[/G/], exec: function(what){ console.log(what + ' funk.')}
    }])
    .funk(function(){
      return console.log.apply(console, arguments);
    });
log('G');
// Output:
// G funk.
// G
```

## TEST

```
$ git clone https://github.com/renegare/gfunk.git && \
    cd gfunk && \
    make setup test
```
## WHY

I called this library 'G' Funk because, G stands for many things, like;

* God
* Gay
* Great
* G

If some one was to call you ‘a’, an obvious response could be “‘a’ what?”.

Or take the ‘z’; "What do you meeeeeean?” is my response.
"Do you mean a The Z Man? What happened to X Man or you calling me a ‘z’ celebrity?”

Can get quite offending pretty quickly if the wrong letter is used.

But with G - there’s no need to question a G. As a G, you know who you are:

* Gangster
* Girl
* Great
* G
