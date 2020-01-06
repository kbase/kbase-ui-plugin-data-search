define([],(function(){"use strict";function t(t,r,e,o,s){
this.source=t,this.code=r,
this.message=e,this.detail=o,this.info=s,this.stack=(new Error).stack}
return t.prototype=Object.create(Error.prototype),
t.prototype.constructor=t,t.prototype.name="DataSearchError",{DataSearchError:t}
}));