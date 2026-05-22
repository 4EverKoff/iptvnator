var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all3) => {
  for (var name in all3)
    __defProp(target, name, { get: all3[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js
var require_delayed_stream = __commonJS({
  "node_modules/.pnpm/delayed-stream@1.0.0/node_modules/delayed-stream/lib/delayed_stream.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    var util3 = require("util");
    module2.exports = DelayedStream;
    function DelayedStream() {
      this.source = null;
      this.dataSize = 0;
      this.maxDataSize = 1024 * 1024;
      this.pauseStream = true;
      this._maxDataSizeExceeded = false;
      this._released = false;
      this._bufferedEvents = [];
    }
    util3.inherits(DelayedStream, Stream);
    DelayedStream.create = function(source, options) {
      var delayedStream = new this();
      options = options || {};
      for (var option in options) {
        delayedStream[option] = options[option];
      }
      delayedStream.source = source;
      var realEmit = source.emit;
      source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
      };
      source.on("error", function() {
      });
      if (delayedStream.pauseStream) {
        source.pause();
      }
      return delayedStream;
    };
    Object.defineProperty(DelayedStream.prototype, "readable", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.source.readable;
      }
    });
    DelayedStream.prototype.setEncoding = function() {
      return this.source.setEncoding.apply(this.source, arguments);
    };
    DelayedStream.prototype.resume = function() {
      if (!this._released) {
        this.release();
      }
      this.source.resume();
    };
    DelayedStream.prototype.pause = function() {
      this.source.pause();
    };
    DelayedStream.prototype.release = function() {
      this._released = true;
      this._bufferedEvents.forEach(function(args) {
        this.emit.apply(this, args);
      }.bind(this));
      this._bufferedEvents = [];
    };
    DelayedStream.prototype.pipe = function() {
      var r = Stream.prototype.pipe.apply(this, arguments);
      this.resume();
      return r;
    };
    DelayedStream.prototype._handleEmit = function(args) {
      if (this._released) {
        this.emit.apply(this, args);
        return;
      }
      if (args[0] === "data") {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
      }
      this._bufferedEvents.push(args);
    };
    DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
      if (this._maxDataSizeExceeded) {
        return;
      }
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      this._maxDataSizeExceeded = true;
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this.emit("error", new Error(message));
    };
  }
});

// node_modules/.pnpm/combined-stream@1.0.8/node_modules/combined-stream/lib/combined_stream.js
var require_combined_stream = __commonJS({
  "node_modules/.pnpm/combined-stream@1.0.8/node_modules/combined-stream/lib/combined_stream.js"(exports2, module2) {
    var util3 = require("util");
    var Stream = require("stream").Stream;
    var DelayedStream = require_delayed_stream();
    module2.exports = CombinedStream;
    function CombinedStream() {
      this.writable = false;
      this.readable = true;
      this.dataSize = 0;
      this.maxDataSize = 2 * 1024 * 1024;
      this.pauseStreams = true;
      this._released = false;
      this._streams = [];
      this._currentStream = null;
      this._insideLoop = false;
      this._pendingNext = false;
    }
    util3.inherits(CombinedStream, Stream);
    CombinedStream.create = function(options) {
      var combinedStream = new this();
      options = options || {};
      for (var option in options) {
        combinedStream[option] = options[option];
      }
      return combinedStream;
    };
    CombinedStream.isStreamLike = function(stream4) {
      return typeof stream4 !== "function" && typeof stream4 !== "string" && typeof stream4 !== "boolean" && typeof stream4 !== "number" && !Buffer.isBuffer(stream4);
    };
    CombinedStream.prototype.append = function(stream4) {
      var isStreamLike = CombinedStream.isStreamLike(stream4);
      if (isStreamLike) {
        if (!(stream4 instanceof DelayedStream)) {
          var newStream = DelayedStream.create(stream4, {
            maxDataSize: Infinity,
            pauseStream: this.pauseStreams
          });
          stream4.on("data", this._checkDataSize.bind(this));
          stream4 = newStream;
        }
        this._handleErrors(stream4);
        if (this.pauseStreams) {
          stream4.pause();
        }
      }
      this._streams.push(stream4);
      return this;
    };
    CombinedStream.prototype.pipe = function(dest, options) {
      Stream.prototype.pipe.call(this, dest, options);
      this.resume();
      return dest;
    };
    CombinedStream.prototype._getNext = function() {
      this._currentStream = null;
      if (this._insideLoop) {
        this._pendingNext = true;
        return;
      }
      this._insideLoop = true;
      try {
        do {
          this._pendingNext = false;
          this._realGetNext();
        } while (this._pendingNext);
      } finally {
        this._insideLoop = false;
      }
    };
    CombinedStream.prototype._realGetNext = function() {
      var stream4 = this._streams.shift();
      if (typeof stream4 == "undefined") {
        this.end();
        return;
      }
      if (typeof stream4 !== "function") {
        this._pipeNext(stream4);
        return;
      }
      var getStream = stream4;
      getStream(function(stream5) {
        var isStreamLike = CombinedStream.isStreamLike(stream5);
        if (isStreamLike) {
          stream5.on("data", this._checkDataSize.bind(this));
          this._handleErrors(stream5);
        }
        this._pipeNext(stream5);
      }.bind(this));
    };
    CombinedStream.prototype._pipeNext = function(stream4) {
      this._currentStream = stream4;
      var isStreamLike = CombinedStream.isStreamLike(stream4);
      if (isStreamLike) {
        stream4.on("end", this._getNext.bind(this));
        stream4.pipe(this, { end: false });
        return;
      }
      var value = stream4;
      this.write(value);
      this._getNext();
    };
    CombinedStream.prototype._handleErrors = function(stream4) {
      var self2 = this;
      stream4.on("error", function(err) {
        self2._emitError(err);
      });
    };
    CombinedStream.prototype.write = function(data) {
      this.emit("data", data);
    };
    CombinedStream.prototype.pause = function() {
      if (!this.pauseStreams) {
        return;
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
      this.emit("pause");
    };
    CombinedStream.prototype.resume = function() {
      if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
      }
      if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
      this.emit("resume");
    };
    CombinedStream.prototype.end = function() {
      this._reset();
      this.emit("end");
    };
    CombinedStream.prototype.destroy = function() {
      this._reset();
      this.emit("close");
    };
    CombinedStream.prototype._reset = function() {
      this.writable = false;
      this._streams = [];
      this._currentStream = null;
    };
    CombinedStream.prototype._checkDataSize = function() {
      this._updateDataSize();
      if (this.dataSize <= this.maxDataSize) {
        return;
      }
      var message = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
      this._emitError(new Error(message));
    };
    CombinedStream.prototype._updateDataSize = function() {
      this.dataSize = 0;
      var self2 = this;
      this._streams.forEach(function(stream4) {
        if (!stream4.dataSize) {
          return;
        }
        self2.dataSize += stream4.dataSize;
      });
      if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
      }
    };
    CombinedStream.prototype._emitError = function(err) {
      this._reset();
      this.emit("error", err);
    };
  }
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json
var require_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/db.json"(exports2, module2) {
    module2.exports = {
      "application/1d-interleaved-parityfec": {
        source: "iana"
      },
      "application/3gpdash-qoe-report+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/3gpp-ims+xml": {
        source: "iana",
        compressible: true
      },
      "application/3gpphal+json": {
        source: "iana",
        compressible: true
      },
      "application/3gpphalforms+json": {
        source: "iana",
        compressible: true
      },
      "application/a2l": {
        source: "iana"
      },
      "application/ace+cbor": {
        source: "iana"
      },
      "application/activemessage": {
        source: "iana"
      },
      "application/activity+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-costmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-directory+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcost+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointcostparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointprop+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-endpointpropparams+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-error+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmap+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-networkmapfilter+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamcontrol+json": {
        source: "iana",
        compressible: true
      },
      "application/alto-updatestreamparams+json": {
        source: "iana",
        compressible: true
      },
      "application/aml": {
        source: "iana"
      },
      "application/andrew-inset": {
        source: "iana",
        extensions: ["ez"]
      },
      "application/applefile": {
        source: "iana"
      },
      "application/applixware": {
        source: "apache",
        extensions: ["aw"]
      },
      "application/at+jwt": {
        source: "iana"
      },
      "application/atf": {
        source: "iana"
      },
      "application/atfx": {
        source: "iana"
      },
      "application/atom+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atom"]
      },
      "application/atomcat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomcat"]
      },
      "application/atomdeleted+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomdeleted"]
      },
      "application/atomicmail": {
        source: "iana"
      },
      "application/atomsvc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["atomsvc"]
      },
      "application/atsc-dwd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dwd"]
      },
      "application/atsc-dynamic-event-message": {
        source: "iana"
      },
      "application/atsc-held+xml": {
        source: "iana",
        compressible: true,
        extensions: ["held"]
      },
      "application/atsc-rdt+json": {
        source: "iana",
        compressible: true
      },
      "application/atsc-rsat+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsat"]
      },
      "application/atxml": {
        source: "iana"
      },
      "application/auth-policy+xml": {
        source: "iana",
        compressible: true
      },
      "application/bacnet-xdd+zip": {
        source: "iana",
        compressible: false
      },
      "application/batch-smtp": {
        source: "iana"
      },
      "application/bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/beep+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/calendar+json": {
        source: "iana",
        compressible: true
      },
      "application/calendar+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xcs"]
      },
      "application/call-completion": {
        source: "iana"
      },
      "application/cals-1840": {
        source: "iana"
      },
      "application/captive+json": {
        source: "iana",
        compressible: true
      },
      "application/cbor": {
        source: "iana"
      },
      "application/cbor-seq": {
        source: "iana"
      },
      "application/cccex": {
        source: "iana"
      },
      "application/ccmp+xml": {
        source: "iana",
        compressible: true
      },
      "application/ccxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ccxml"]
      },
      "application/cdfx+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdfx"]
      },
      "application/cdmi-capability": {
        source: "iana",
        extensions: ["cdmia"]
      },
      "application/cdmi-container": {
        source: "iana",
        extensions: ["cdmic"]
      },
      "application/cdmi-domain": {
        source: "iana",
        extensions: ["cdmid"]
      },
      "application/cdmi-object": {
        source: "iana",
        extensions: ["cdmio"]
      },
      "application/cdmi-queue": {
        source: "iana",
        extensions: ["cdmiq"]
      },
      "application/cdni": {
        source: "iana"
      },
      "application/cea": {
        source: "iana"
      },
      "application/cea-2018+xml": {
        source: "iana",
        compressible: true
      },
      "application/cellml+xml": {
        source: "iana",
        compressible: true
      },
      "application/cfw": {
        source: "iana"
      },
      "application/city+json": {
        source: "iana",
        compressible: true
      },
      "application/clr": {
        source: "iana"
      },
      "application/clue+xml": {
        source: "iana",
        compressible: true
      },
      "application/clue_info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cms": {
        source: "iana"
      },
      "application/cnrp+xml": {
        source: "iana",
        compressible: true
      },
      "application/coap-group+json": {
        source: "iana",
        compressible: true
      },
      "application/coap-payload": {
        source: "iana"
      },
      "application/commonground": {
        source: "iana"
      },
      "application/conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/cose": {
        source: "iana"
      },
      "application/cose-key": {
        source: "iana"
      },
      "application/cose-key-set": {
        source: "iana"
      },
      "application/cpl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cpl"]
      },
      "application/csrattrs": {
        source: "iana"
      },
      "application/csta+xml": {
        source: "iana",
        compressible: true
      },
      "application/cstadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/csvm+json": {
        source: "iana",
        compressible: true
      },
      "application/cu-seeme": {
        source: "apache",
        extensions: ["cu"]
      },
      "application/cwt": {
        source: "iana"
      },
      "application/cybercash": {
        source: "iana"
      },
      "application/dart": {
        compressible: true
      },
      "application/dash+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpd"]
      },
      "application/dash-patch+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpp"]
      },
      "application/dashdelta": {
        source: "iana"
      },
      "application/davmount+xml": {
        source: "iana",
        compressible: true,
        extensions: ["davmount"]
      },
      "application/dca-rft": {
        source: "iana"
      },
      "application/dcd": {
        source: "iana"
      },
      "application/dec-dx": {
        source: "iana"
      },
      "application/dialog-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/dicom": {
        source: "iana"
      },
      "application/dicom+json": {
        source: "iana",
        compressible: true
      },
      "application/dicom+xml": {
        source: "iana",
        compressible: true
      },
      "application/dii": {
        source: "iana"
      },
      "application/dit": {
        source: "iana"
      },
      "application/dns": {
        source: "iana"
      },
      "application/dns+json": {
        source: "iana",
        compressible: true
      },
      "application/dns-message": {
        source: "iana"
      },
      "application/docbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dbk"]
      },
      "application/dots+cbor": {
        source: "iana"
      },
      "application/dskpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/dssc+der": {
        source: "iana",
        extensions: ["dssc"]
      },
      "application/dssc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdssc"]
      },
      "application/dvcs": {
        source: "iana"
      },
      "application/ecmascript": {
        source: "iana",
        compressible: true,
        extensions: ["es", "ecma"]
      },
      "application/edi-consent": {
        source: "iana"
      },
      "application/edi-x12": {
        source: "iana",
        compressible: false
      },
      "application/edifact": {
        source: "iana",
        compressible: false
      },
      "application/efi": {
        source: "iana"
      },
      "application/elm+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/elm+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.cap+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/emergencycalldata.comment+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.control+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.deviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.ecall.msd": {
        source: "iana"
      },
      "application/emergencycalldata.providerinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.serviceinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.subscriberinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/emergencycalldata.veds+xml": {
        source: "iana",
        compressible: true
      },
      "application/emma+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emma"]
      },
      "application/emotionml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["emotionml"]
      },
      "application/encaprtp": {
        source: "iana"
      },
      "application/epp+xml": {
        source: "iana",
        compressible: true
      },
      "application/epub+zip": {
        source: "iana",
        compressible: false,
        extensions: ["epub"]
      },
      "application/eshop": {
        source: "iana"
      },
      "application/exi": {
        source: "iana",
        extensions: ["exi"]
      },
      "application/expect-ct-report+json": {
        source: "iana",
        compressible: true
      },
      "application/express": {
        source: "iana",
        extensions: ["exp"]
      },
      "application/fastinfoset": {
        source: "iana"
      },
      "application/fastsoap": {
        source: "iana"
      },
      "application/fdt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fdt"]
      },
      "application/fhir+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fhir+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/fido.trusted-apps+json": {
        compressible: true
      },
      "application/fits": {
        source: "iana"
      },
      "application/flexfec": {
        source: "iana"
      },
      "application/font-sfnt": {
        source: "iana"
      },
      "application/font-tdpfr": {
        source: "iana",
        extensions: ["pfr"]
      },
      "application/font-woff": {
        source: "iana",
        compressible: false
      },
      "application/framework-attributes+xml": {
        source: "iana",
        compressible: true
      },
      "application/geo+json": {
        source: "iana",
        compressible: true,
        extensions: ["geojson"]
      },
      "application/geo+json-seq": {
        source: "iana"
      },
      "application/geopackage+sqlite3": {
        source: "iana"
      },
      "application/geoxacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/gltf-buffer": {
        source: "iana"
      },
      "application/gml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["gml"]
      },
      "application/gpx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["gpx"]
      },
      "application/gxf": {
        source: "apache",
        extensions: ["gxf"]
      },
      "application/gzip": {
        source: "iana",
        compressible: false,
        extensions: ["gz"]
      },
      "application/h224": {
        source: "iana"
      },
      "application/held+xml": {
        source: "iana",
        compressible: true
      },
      "application/hjson": {
        extensions: ["hjson"]
      },
      "application/http": {
        source: "iana"
      },
      "application/hyperstudio": {
        source: "iana",
        extensions: ["stk"]
      },
      "application/ibe-key-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pkg-reply+xml": {
        source: "iana",
        compressible: true
      },
      "application/ibe-pp-data": {
        source: "iana"
      },
      "application/iges": {
        source: "iana"
      },
      "application/im-iscomposing+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/index": {
        source: "iana"
      },
      "application/index.cmd": {
        source: "iana"
      },
      "application/index.obj": {
        source: "iana"
      },
      "application/index.response": {
        source: "iana"
      },
      "application/index.vnd": {
        source: "iana"
      },
      "application/inkml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ink", "inkml"]
      },
      "application/iotp": {
        source: "iana"
      },
      "application/ipfix": {
        source: "iana",
        extensions: ["ipfix"]
      },
      "application/ipp": {
        source: "iana"
      },
      "application/isup": {
        source: "iana"
      },
      "application/its+xml": {
        source: "iana",
        compressible: true,
        extensions: ["its"]
      },
      "application/java-archive": {
        source: "apache",
        compressible: false,
        extensions: ["jar", "war", "ear"]
      },
      "application/java-serialized-object": {
        source: "apache",
        compressible: false,
        extensions: ["ser"]
      },
      "application/java-vm": {
        source: "apache",
        compressible: false,
        extensions: ["class"]
      },
      "application/javascript": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["js", "mjs"]
      },
      "application/jf2feed+json": {
        source: "iana",
        compressible: true
      },
      "application/jose": {
        source: "iana"
      },
      "application/jose+json": {
        source: "iana",
        compressible: true
      },
      "application/jrd+json": {
        source: "iana",
        compressible: true
      },
      "application/jscalendar+json": {
        source: "iana",
        compressible: true
      },
      "application/json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["json", "map"]
      },
      "application/json-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/json-seq": {
        source: "iana"
      },
      "application/json5": {
        extensions: ["json5"]
      },
      "application/jsonml+json": {
        source: "apache",
        compressible: true,
        extensions: ["jsonml"]
      },
      "application/jwk+json": {
        source: "iana",
        compressible: true
      },
      "application/jwk-set+json": {
        source: "iana",
        compressible: true
      },
      "application/jwt": {
        source: "iana"
      },
      "application/kpml-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/kpml-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/ld+json": {
        source: "iana",
        compressible: true,
        extensions: ["jsonld"]
      },
      "application/lgr+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lgr"]
      },
      "application/link-format": {
        source: "iana"
      },
      "application/load-control+xml": {
        source: "iana",
        compressible: true
      },
      "application/lost+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lostxml"]
      },
      "application/lostsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/lpf+zip": {
        source: "iana",
        compressible: false
      },
      "application/lxf": {
        source: "iana"
      },
      "application/mac-binhex40": {
        source: "iana",
        extensions: ["hqx"]
      },
      "application/mac-compactpro": {
        source: "apache",
        extensions: ["cpt"]
      },
      "application/macwriteii": {
        source: "iana"
      },
      "application/mads+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mads"]
      },
      "application/manifest+json": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["webmanifest"]
      },
      "application/marc": {
        source: "iana",
        extensions: ["mrc"]
      },
      "application/marcxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mrcx"]
      },
      "application/mathematica": {
        source: "iana",
        extensions: ["ma", "nb", "mb"]
      },
      "application/mathml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mathml"]
      },
      "application/mathml-content+xml": {
        source: "iana",
        compressible: true
      },
      "application/mathml-presentation+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-associated-procedure-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-deregister+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-envelope+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-msk-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-protection-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-reception-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-register-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-schedule+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbms-user-service-description+xml": {
        source: "iana",
        compressible: true
      },
      "application/mbox": {
        source: "iana",
        extensions: ["mbox"]
      },
      "application/media-policy-dataset+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpf"]
      },
      "application/media_control+xml": {
        source: "iana",
        compressible: true
      },
      "application/mediaservercontrol+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mscml"]
      },
      "application/merge-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/metalink+xml": {
        source: "apache",
        compressible: true,
        extensions: ["metalink"]
      },
      "application/metalink4+xml": {
        source: "iana",
        compressible: true,
        extensions: ["meta4"]
      },
      "application/mets+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mets"]
      },
      "application/mf4": {
        source: "iana"
      },
      "application/mikey": {
        source: "iana"
      },
      "application/mipc": {
        source: "iana"
      },
      "application/missing-blocks+cbor-seq": {
        source: "iana"
      },
      "application/mmt-aei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["maei"]
      },
      "application/mmt-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musd"]
      },
      "application/mods+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mods"]
      },
      "application/moss-keys": {
        source: "iana"
      },
      "application/moss-signature": {
        source: "iana"
      },
      "application/mosskey-data": {
        source: "iana"
      },
      "application/mosskey-request": {
        source: "iana"
      },
      "application/mp21": {
        source: "iana",
        extensions: ["m21", "mp21"]
      },
      "application/mp4": {
        source: "iana",
        extensions: ["mp4s", "m4p"]
      },
      "application/mpeg4-generic": {
        source: "iana"
      },
      "application/mpeg4-iod": {
        source: "iana"
      },
      "application/mpeg4-iod-xmt": {
        source: "iana"
      },
      "application/mrb-consumer+xml": {
        source: "iana",
        compressible: true
      },
      "application/mrb-publish+xml": {
        source: "iana",
        compressible: true
      },
      "application/msc-ivr+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msc-mixer+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/msword": {
        source: "iana",
        compressible: false,
        extensions: ["doc", "dot"]
      },
      "application/mud+json": {
        source: "iana",
        compressible: true
      },
      "application/multipart-core": {
        source: "iana"
      },
      "application/mxf": {
        source: "iana",
        extensions: ["mxf"]
      },
      "application/n-quads": {
        source: "iana",
        extensions: ["nq"]
      },
      "application/n-triples": {
        source: "iana",
        extensions: ["nt"]
      },
      "application/nasdata": {
        source: "iana"
      },
      "application/news-checkgroups": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-groupinfo": {
        source: "iana",
        charset: "US-ASCII"
      },
      "application/news-transmission": {
        source: "iana"
      },
      "application/nlsml+xml": {
        source: "iana",
        compressible: true
      },
      "application/node": {
        source: "iana",
        extensions: ["cjs"]
      },
      "application/nss": {
        source: "iana"
      },
      "application/oauth-authz-req+jwt": {
        source: "iana"
      },
      "application/oblivious-dns-message": {
        source: "iana"
      },
      "application/ocsp-request": {
        source: "iana"
      },
      "application/ocsp-response": {
        source: "iana"
      },
      "application/octet-stream": {
        source: "iana",
        compressible: false,
        extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"]
      },
      "application/oda": {
        source: "iana",
        extensions: ["oda"]
      },
      "application/odm+xml": {
        source: "iana",
        compressible: true
      },
      "application/odx": {
        source: "iana"
      },
      "application/oebps-package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["opf"]
      },
      "application/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogx"]
      },
      "application/omdoc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["omdoc"]
      },
      "application/onenote": {
        source: "apache",
        extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"]
      },
      "application/opc-nodeset+xml": {
        source: "iana",
        compressible: true
      },
      "application/oscore": {
        source: "iana"
      },
      "application/oxps": {
        source: "iana",
        extensions: ["oxps"]
      },
      "application/p21": {
        source: "iana"
      },
      "application/p21+zip": {
        source: "iana",
        compressible: false
      },
      "application/p2p-overlay+xml": {
        source: "iana",
        compressible: true,
        extensions: ["relo"]
      },
      "application/parityfec": {
        source: "iana"
      },
      "application/passport": {
        source: "iana"
      },
      "application/patch-ops-error+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xer"]
      },
      "application/pdf": {
        source: "iana",
        compressible: false,
        extensions: ["pdf"]
      },
      "application/pdx": {
        source: "iana"
      },
      "application/pem-certificate-chain": {
        source: "iana"
      },
      "application/pgp-encrypted": {
        source: "iana",
        compressible: false,
        extensions: ["pgp"]
      },
      "application/pgp-keys": {
        source: "iana",
        extensions: ["asc"]
      },
      "application/pgp-signature": {
        source: "iana",
        extensions: ["asc", "sig"]
      },
      "application/pics-rules": {
        source: "apache",
        extensions: ["prf"]
      },
      "application/pidf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pidf-diff+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/pkcs10": {
        source: "iana",
        extensions: ["p10"]
      },
      "application/pkcs12": {
        source: "iana"
      },
      "application/pkcs7-mime": {
        source: "iana",
        extensions: ["p7m", "p7c"]
      },
      "application/pkcs7-signature": {
        source: "iana",
        extensions: ["p7s"]
      },
      "application/pkcs8": {
        source: "iana",
        extensions: ["p8"]
      },
      "application/pkcs8-encrypted": {
        source: "iana"
      },
      "application/pkix-attr-cert": {
        source: "iana",
        extensions: ["ac"]
      },
      "application/pkix-cert": {
        source: "iana",
        extensions: ["cer"]
      },
      "application/pkix-crl": {
        source: "iana",
        extensions: ["crl"]
      },
      "application/pkix-pkipath": {
        source: "iana",
        extensions: ["pkipath"]
      },
      "application/pkixcmp": {
        source: "iana",
        extensions: ["pki"]
      },
      "application/pls+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pls"]
      },
      "application/poc-settings+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/postscript": {
        source: "iana",
        compressible: true,
        extensions: ["ai", "eps", "ps"]
      },
      "application/ppsp-tracker+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+json": {
        source: "iana",
        compressible: true
      },
      "application/problem+xml": {
        source: "iana",
        compressible: true
      },
      "application/provenance+xml": {
        source: "iana",
        compressible: true,
        extensions: ["provx"]
      },
      "application/prs.alvestrand.titrax-sheet": {
        source: "iana"
      },
      "application/prs.cww": {
        source: "iana",
        extensions: ["cww"]
      },
      "application/prs.cyn": {
        source: "iana",
        charset: "7-BIT"
      },
      "application/prs.hpub+zip": {
        source: "iana",
        compressible: false
      },
      "application/prs.nprend": {
        source: "iana"
      },
      "application/prs.plucker": {
        source: "iana"
      },
      "application/prs.rdf-xml-crypt": {
        source: "iana"
      },
      "application/prs.xsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/pskc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["pskcxml"]
      },
      "application/pvd+json": {
        source: "iana",
        compressible: true
      },
      "application/qsig": {
        source: "iana"
      },
      "application/raml+yaml": {
        compressible: true,
        extensions: ["raml"]
      },
      "application/raptorfec": {
        source: "iana"
      },
      "application/rdap+json": {
        source: "iana",
        compressible: true
      },
      "application/rdf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rdf", "owl"]
      },
      "application/reginfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rif"]
      },
      "application/relax-ng-compact-syntax": {
        source: "iana",
        extensions: ["rnc"]
      },
      "application/remote-printing": {
        source: "iana"
      },
      "application/reputon+json": {
        source: "iana",
        compressible: true
      },
      "application/resource-lists+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rl"]
      },
      "application/resource-lists-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rld"]
      },
      "application/rfc+xml": {
        source: "iana",
        compressible: true
      },
      "application/riscos": {
        source: "iana"
      },
      "application/rlmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/rls-services+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rs"]
      },
      "application/route-apd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rapd"]
      },
      "application/route-s-tsid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sls"]
      },
      "application/route-usd+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rusd"]
      },
      "application/rpki-ghostbusters": {
        source: "iana",
        extensions: ["gbr"]
      },
      "application/rpki-manifest": {
        source: "iana",
        extensions: ["mft"]
      },
      "application/rpki-publication": {
        source: "iana"
      },
      "application/rpki-roa": {
        source: "iana",
        extensions: ["roa"]
      },
      "application/rpki-updown": {
        source: "iana"
      },
      "application/rsd+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rsd"]
      },
      "application/rss+xml": {
        source: "apache",
        compressible: true,
        extensions: ["rss"]
      },
      "application/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "application/rtploopback": {
        source: "iana"
      },
      "application/rtx": {
        source: "iana"
      },
      "application/samlassertion+xml": {
        source: "iana",
        compressible: true
      },
      "application/samlmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/sarif+json": {
        source: "iana",
        compressible: true
      },
      "application/sarif-external-properties+json": {
        source: "iana",
        compressible: true
      },
      "application/sbe": {
        source: "iana"
      },
      "application/sbml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sbml"]
      },
      "application/scaip+xml": {
        source: "iana",
        compressible: true
      },
      "application/scim+json": {
        source: "iana",
        compressible: true
      },
      "application/scvp-cv-request": {
        source: "iana",
        extensions: ["scq"]
      },
      "application/scvp-cv-response": {
        source: "iana",
        extensions: ["scs"]
      },
      "application/scvp-vp-request": {
        source: "iana",
        extensions: ["spq"]
      },
      "application/scvp-vp-response": {
        source: "iana",
        extensions: ["spp"]
      },
      "application/sdp": {
        source: "iana",
        extensions: ["sdp"]
      },
      "application/secevent+jwt": {
        source: "iana"
      },
      "application/senml+cbor": {
        source: "iana"
      },
      "application/senml+json": {
        source: "iana",
        compressible: true
      },
      "application/senml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["senmlx"]
      },
      "application/senml-etch+cbor": {
        source: "iana"
      },
      "application/senml-etch+json": {
        source: "iana",
        compressible: true
      },
      "application/senml-exi": {
        source: "iana"
      },
      "application/sensml+cbor": {
        source: "iana"
      },
      "application/sensml+json": {
        source: "iana",
        compressible: true
      },
      "application/sensml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sensmlx"]
      },
      "application/sensml-exi": {
        source: "iana"
      },
      "application/sep+xml": {
        source: "iana",
        compressible: true
      },
      "application/sep-exi": {
        source: "iana"
      },
      "application/session-info": {
        source: "iana"
      },
      "application/set-payment": {
        source: "iana"
      },
      "application/set-payment-initiation": {
        source: "iana",
        extensions: ["setpay"]
      },
      "application/set-registration": {
        source: "iana"
      },
      "application/set-registration-initiation": {
        source: "iana",
        extensions: ["setreg"]
      },
      "application/sgml": {
        source: "iana"
      },
      "application/sgml-open-catalog": {
        source: "iana"
      },
      "application/shf+xml": {
        source: "iana",
        compressible: true,
        extensions: ["shf"]
      },
      "application/sieve": {
        source: "iana",
        extensions: ["siv", "sieve"]
      },
      "application/simple-filter+xml": {
        source: "iana",
        compressible: true
      },
      "application/simple-message-summary": {
        source: "iana"
      },
      "application/simplesymbolcontainer": {
        source: "iana"
      },
      "application/sipc": {
        source: "iana"
      },
      "application/slate": {
        source: "iana"
      },
      "application/smil": {
        source: "iana"
      },
      "application/smil+xml": {
        source: "iana",
        compressible: true,
        extensions: ["smi", "smil"]
      },
      "application/smpte336m": {
        source: "iana"
      },
      "application/soap+fastinfoset": {
        source: "iana"
      },
      "application/soap+xml": {
        source: "iana",
        compressible: true
      },
      "application/sparql-query": {
        source: "iana",
        extensions: ["rq"]
      },
      "application/sparql-results+xml": {
        source: "iana",
        compressible: true,
        extensions: ["srx"]
      },
      "application/spdx+json": {
        source: "iana",
        compressible: true
      },
      "application/spirits-event+xml": {
        source: "iana",
        compressible: true
      },
      "application/sql": {
        source: "iana"
      },
      "application/srgs": {
        source: "iana",
        extensions: ["gram"]
      },
      "application/srgs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["grxml"]
      },
      "application/sru+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sru"]
      },
      "application/ssdl+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ssdl"]
      },
      "application/ssml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ssml"]
      },
      "application/stix+json": {
        source: "iana",
        compressible: true
      },
      "application/swid+xml": {
        source: "iana",
        compressible: true,
        extensions: ["swidtag"]
      },
      "application/tamp-apex-update": {
        source: "iana"
      },
      "application/tamp-apex-update-confirm": {
        source: "iana"
      },
      "application/tamp-community-update": {
        source: "iana"
      },
      "application/tamp-community-update-confirm": {
        source: "iana"
      },
      "application/tamp-error": {
        source: "iana"
      },
      "application/tamp-sequence-adjust": {
        source: "iana"
      },
      "application/tamp-sequence-adjust-confirm": {
        source: "iana"
      },
      "application/tamp-status-query": {
        source: "iana"
      },
      "application/tamp-status-response": {
        source: "iana"
      },
      "application/tamp-update": {
        source: "iana"
      },
      "application/tamp-update-confirm": {
        source: "iana"
      },
      "application/tar": {
        compressible: true
      },
      "application/taxii+json": {
        source: "iana",
        compressible: true
      },
      "application/td+json": {
        source: "iana",
        compressible: true
      },
      "application/tei+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tei", "teicorpus"]
      },
      "application/tetra_isi": {
        source: "iana"
      },
      "application/thraud+xml": {
        source: "iana",
        compressible: true,
        extensions: ["tfi"]
      },
      "application/timestamp-query": {
        source: "iana"
      },
      "application/timestamp-reply": {
        source: "iana"
      },
      "application/timestamped-data": {
        source: "iana",
        extensions: ["tsd"]
      },
      "application/tlsrpt+gzip": {
        source: "iana"
      },
      "application/tlsrpt+json": {
        source: "iana",
        compressible: true
      },
      "application/tnauthlist": {
        source: "iana"
      },
      "application/token-introspection+jwt": {
        source: "iana"
      },
      "application/toml": {
        compressible: true,
        extensions: ["toml"]
      },
      "application/trickle-ice-sdpfrag": {
        source: "iana"
      },
      "application/trig": {
        source: "iana",
        extensions: ["trig"]
      },
      "application/ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ttml"]
      },
      "application/tve-trigger": {
        source: "iana"
      },
      "application/tzif": {
        source: "iana"
      },
      "application/tzif-leap": {
        source: "iana"
      },
      "application/ubjson": {
        compressible: false,
        extensions: ["ubj"]
      },
      "application/ulpfec": {
        source: "iana"
      },
      "application/urc-grpsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/urc-ressheet+xml": {
        source: "iana",
        compressible: true,
        extensions: ["rsheet"]
      },
      "application/urc-targetdesc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["td"]
      },
      "application/urc-uisocketdesc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vcard+json": {
        source: "iana",
        compressible: true
      },
      "application/vcard+xml": {
        source: "iana",
        compressible: true
      },
      "application/vemmi": {
        source: "iana"
      },
      "application/vividence.scriptfile": {
        source: "apache"
      },
      "application/vnd.1000minds.decision-model+xml": {
        source: "iana",
        compressible: true,
        extensions: ["1km"]
      },
      "application/vnd.3gpp-prose+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-prose-pc3ch+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp-v2x-local-service-information": {
        source: "iana"
      },
      "application/vnd.3gpp.5gnas": {
        source: "iana"
      },
      "application/vnd.3gpp.access-transfer-events+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.bsf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gmop+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.gtpc": {
        source: "iana"
      },
      "application/vnd.3gpp.interworking-data": {
        source: "iana"
      },
      "application/vnd.3gpp.lpp": {
        source: "iana"
      },
      "application/vnd.3gpp.mc-signalling-ear": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-payload": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-signalling": {
        source: "iana"
      },
      "application/vnd.3gpp.mcdata-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcdata-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-floor-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-signed+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-ue-init-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcptt-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-location-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-service-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-transmission-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-ue-config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mcvideo-user-profile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.mid-call+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ngap": {
        source: "iana"
      },
      "application/vnd.3gpp.pfcp": {
        source: "iana"
      },
      "application/vnd.3gpp.pic-bw-large": {
        source: "iana",
        extensions: ["plb"]
      },
      "application/vnd.3gpp.pic-bw-small": {
        source: "iana",
        extensions: ["psb"]
      },
      "application/vnd.3gpp.pic-bw-var": {
        source: "iana",
        extensions: ["pvb"]
      },
      "application/vnd.3gpp.s1ap": {
        source: "iana"
      },
      "application/vnd.3gpp.sms": {
        source: "iana"
      },
      "application/vnd.3gpp.sms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-ext+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.srvcc-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.state-and-event-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp.ussd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.bcmcsinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.3gpp2.sms": {
        source: "iana"
      },
      "application/vnd.3gpp2.tcap": {
        source: "iana",
        extensions: ["tcap"]
      },
      "application/vnd.3lightssoftware.imagescal": {
        source: "iana"
      },
      "application/vnd.3m.post-it-notes": {
        source: "iana",
        extensions: ["pwn"]
      },
      "application/vnd.accpac.simply.aso": {
        source: "iana",
        extensions: ["aso"]
      },
      "application/vnd.accpac.simply.imp": {
        source: "iana",
        extensions: ["imp"]
      },
      "application/vnd.acucobol": {
        source: "iana",
        extensions: ["acu"]
      },
      "application/vnd.acucorp": {
        source: "iana",
        extensions: ["atc", "acutc"]
      },
      "application/vnd.adobe.air-application-installer-package+zip": {
        source: "apache",
        compressible: false,
        extensions: ["air"]
      },
      "application/vnd.adobe.flash.movie": {
        source: "iana"
      },
      "application/vnd.adobe.formscentral.fcdt": {
        source: "iana",
        extensions: ["fcdt"]
      },
      "application/vnd.adobe.fxp": {
        source: "iana",
        extensions: ["fxp", "fxpl"]
      },
      "application/vnd.adobe.partial-upload": {
        source: "iana"
      },
      "application/vnd.adobe.xdp+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdp"]
      },
      "application/vnd.adobe.xfdf": {
        source: "iana",
        extensions: ["xfdf"]
      },
      "application/vnd.aether.imp": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata": {
        source: "iana"
      },
      "application/vnd.afpc.afplinedata-pagedef": {
        source: "iana"
      },
      "application/vnd.afpc.cmoca-cmresource": {
        source: "iana"
      },
      "application/vnd.afpc.foca-charset": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codedfont": {
        source: "iana"
      },
      "application/vnd.afpc.foca-codepage": {
        source: "iana"
      },
      "application/vnd.afpc.modca": {
        source: "iana"
      },
      "application/vnd.afpc.modca-cmtable": {
        source: "iana"
      },
      "application/vnd.afpc.modca-formdef": {
        source: "iana"
      },
      "application/vnd.afpc.modca-mediummap": {
        source: "iana"
      },
      "application/vnd.afpc.modca-objectcontainer": {
        source: "iana"
      },
      "application/vnd.afpc.modca-overlay": {
        source: "iana"
      },
      "application/vnd.afpc.modca-pagesegment": {
        source: "iana"
      },
      "application/vnd.age": {
        source: "iana",
        extensions: ["age"]
      },
      "application/vnd.ah-barcode": {
        source: "iana"
      },
      "application/vnd.ahead.space": {
        source: "iana",
        extensions: ["ahead"]
      },
      "application/vnd.airzip.filesecure.azf": {
        source: "iana",
        extensions: ["azf"]
      },
      "application/vnd.airzip.filesecure.azs": {
        source: "iana",
        extensions: ["azs"]
      },
      "application/vnd.amadeus+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.amazon.ebook": {
        source: "apache",
        extensions: ["azw"]
      },
      "application/vnd.amazon.mobi8-ebook": {
        source: "iana"
      },
      "application/vnd.americandynamics.acc": {
        source: "iana",
        extensions: ["acc"]
      },
      "application/vnd.amiga.ami": {
        source: "iana",
        extensions: ["ami"]
      },
      "application/vnd.amundsen.maze+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.android.ota": {
        source: "iana"
      },
      "application/vnd.android.package-archive": {
        source: "apache",
        compressible: false,
        extensions: ["apk"]
      },
      "application/vnd.anki": {
        source: "iana"
      },
      "application/vnd.anser-web-certificate-issue-initiation": {
        source: "iana",
        extensions: ["cii"]
      },
      "application/vnd.anser-web-funds-transfer-initiation": {
        source: "apache",
        extensions: ["fti"]
      },
      "application/vnd.antix.game-component": {
        source: "iana",
        extensions: ["atx"]
      },
      "application/vnd.apache.arrow.file": {
        source: "iana"
      },
      "application/vnd.apache.arrow.stream": {
        source: "iana"
      },
      "application/vnd.apache.thrift.binary": {
        source: "iana"
      },
      "application/vnd.apache.thrift.compact": {
        source: "iana"
      },
      "application/vnd.apache.thrift.json": {
        source: "iana"
      },
      "application/vnd.api+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.aplextor.warrp+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apothekende.reservation+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.apple.installer+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mpkg"]
      },
      "application/vnd.apple.keynote": {
        source: "iana",
        extensions: ["key"]
      },
      "application/vnd.apple.mpegurl": {
        source: "iana",
        extensions: ["m3u8"]
      },
      "application/vnd.apple.numbers": {
        source: "iana",
        extensions: ["numbers"]
      },
      "application/vnd.apple.pages": {
        source: "iana",
        extensions: ["pages"]
      },
      "application/vnd.apple.pkpass": {
        compressible: false,
        extensions: ["pkpass"]
      },
      "application/vnd.arastra.swi": {
        source: "iana"
      },
      "application/vnd.aristanetworks.swi": {
        source: "iana",
        extensions: ["swi"]
      },
      "application/vnd.artisan+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.artsquare": {
        source: "iana"
      },
      "application/vnd.astraea-software.iota": {
        source: "iana",
        extensions: ["iota"]
      },
      "application/vnd.audiograph": {
        source: "iana",
        extensions: ["aep"]
      },
      "application/vnd.autopackage": {
        source: "iana"
      },
      "application/vnd.avalon+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.avistar+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.balsamiq.bmml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["bmml"]
      },
      "application/vnd.balsamiq.bmpr": {
        source: "iana"
      },
      "application/vnd.banana-accounting": {
        source: "iana"
      },
      "application/vnd.bbf.usp.error": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg": {
        source: "iana"
      },
      "application/vnd.bbf.usp.msg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bekitzur-stech+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.bint.med-content": {
        source: "iana"
      },
      "application/vnd.biopax.rdf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.blink-idb-value-wrapper": {
        source: "iana"
      },
      "application/vnd.blueice.multipass": {
        source: "iana",
        extensions: ["mpm"]
      },
      "application/vnd.bluetooth.ep.oob": {
        source: "iana"
      },
      "application/vnd.bluetooth.le.oob": {
        source: "iana"
      },
      "application/vnd.bmi": {
        source: "iana",
        extensions: ["bmi"]
      },
      "application/vnd.bpf": {
        source: "iana"
      },
      "application/vnd.bpf3": {
        source: "iana"
      },
      "application/vnd.businessobjects": {
        source: "iana",
        extensions: ["rep"]
      },
      "application/vnd.byu.uapi+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cab-jscript": {
        source: "iana"
      },
      "application/vnd.canon-cpdl": {
        source: "iana"
      },
      "application/vnd.canon-lips": {
        source: "iana"
      },
      "application/vnd.capasystems-pg+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cendio.thinlinc.clientconf": {
        source: "iana"
      },
      "application/vnd.century-systems.tcp_stream": {
        source: "iana"
      },
      "application/vnd.chemdraw+xml": {
        source: "iana",
        compressible: true,
        extensions: ["cdxml"]
      },
      "application/vnd.chess-pgn": {
        source: "iana"
      },
      "application/vnd.chipnuts.karaoke-mmd": {
        source: "iana",
        extensions: ["mmd"]
      },
      "application/vnd.ciedi": {
        source: "iana"
      },
      "application/vnd.cinderella": {
        source: "iana",
        extensions: ["cdy"]
      },
      "application/vnd.cirpack.isdn-ext": {
        source: "iana"
      },
      "application/vnd.citationstyles.style+xml": {
        source: "iana",
        compressible: true,
        extensions: ["csl"]
      },
      "application/vnd.claymore": {
        source: "iana",
        extensions: ["cla"]
      },
      "application/vnd.cloanto.rp9": {
        source: "iana",
        extensions: ["rp9"]
      },
      "application/vnd.clonk.c4group": {
        source: "iana",
        extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"]
      },
      "application/vnd.cluetrust.cartomobile-config": {
        source: "iana",
        extensions: ["c11amc"]
      },
      "application/vnd.cluetrust.cartomobile-config-pkg": {
        source: "iana",
        extensions: ["c11amz"]
      },
      "application/vnd.coffeescript": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.document-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.presentation-template": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet": {
        source: "iana"
      },
      "application/vnd.collabio.xodocuments.spreadsheet-template": {
        source: "iana"
      },
      "application/vnd.collection+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.doc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.collection.next+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.comicbook+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.comicbook-rar": {
        source: "iana"
      },
      "application/vnd.commerce-battelle": {
        source: "iana"
      },
      "application/vnd.commonspace": {
        source: "iana",
        extensions: ["csp"]
      },
      "application/vnd.contact.cmsg": {
        source: "iana",
        extensions: ["cdbcmsg"]
      },
      "application/vnd.coreos.ignition+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cosmocaller": {
        source: "iana",
        extensions: ["cmc"]
      },
      "application/vnd.crick.clicker": {
        source: "iana",
        extensions: ["clkx"]
      },
      "application/vnd.crick.clicker.keyboard": {
        source: "iana",
        extensions: ["clkk"]
      },
      "application/vnd.crick.clicker.palette": {
        source: "iana",
        extensions: ["clkp"]
      },
      "application/vnd.crick.clicker.template": {
        source: "iana",
        extensions: ["clkt"]
      },
      "application/vnd.crick.clicker.wordbank": {
        source: "iana",
        extensions: ["clkw"]
      },
      "application/vnd.criticaltools.wbs+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wbs"]
      },
      "application/vnd.cryptii.pipe+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.crypto-shade-file": {
        source: "iana"
      },
      "application/vnd.cryptomator.encrypted": {
        source: "iana"
      },
      "application/vnd.cryptomator.vault": {
        source: "iana"
      },
      "application/vnd.ctc-posml": {
        source: "iana",
        extensions: ["pml"]
      },
      "application/vnd.ctct.ws+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cups-pdf": {
        source: "iana"
      },
      "application/vnd.cups-postscript": {
        source: "iana"
      },
      "application/vnd.cups-ppd": {
        source: "iana",
        extensions: ["ppd"]
      },
      "application/vnd.cups-raster": {
        source: "iana"
      },
      "application/vnd.cups-raw": {
        source: "iana"
      },
      "application/vnd.curl": {
        source: "iana"
      },
      "application/vnd.curl.car": {
        source: "apache",
        extensions: ["car"]
      },
      "application/vnd.curl.pcurl": {
        source: "apache",
        extensions: ["pcurl"]
      },
      "application/vnd.cyan.dean.root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cybank": {
        source: "iana"
      },
      "application/vnd.cyclonedx+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.cyclonedx+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.d2l.coursepackage1p0+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.d3m-dataset": {
        source: "iana"
      },
      "application/vnd.d3m-problem": {
        source: "iana"
      },
      "application/vnd.dart": {
        source: "iana",
        compressible: true,
        extensions: ["dart"]
      },
      "application/vnd.data-vision.rdz": {
        source: "iana",
        extensions: ["rdz"]
      },
      "application/vnd.datapackage+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dataresource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dbf": {
        source: "iana",
        extensions: ["dbf"]
      },
      "application/vnd.debian.binary-package": {
        source: "iana"
      },
      "application/vnd.dece.data": {
        source: "iana",
        extensions: ["uvf", "uvvf", "uvd", "uvvd"]
      },
      "application/vnd.dece.ttml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uvt", "uvvt"]
      },
      "application/vnd.dece.unspecified": {
        source: "iana",
        extensions: ["uvx", "uvvx"]
      },
      "application/vnd.dece.zip": {
        source: "iana",
        extensions: ["uvz", "uvvz"]
      },
      "application/vnd.denovo.fcselayout-link": {
        source: "iana",
        extensions: ["fe_launch"]
      },
      "application/vnd.desmume.movie": {
        source: "iana"
      },
      "application/vnd.dir-bi.plate-dl-nosuffix": {
        source: "iana"
      },
      "application/vnd.dm.delegation+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dna": {
        source: "iana",
        extensions: ["dna"]
      },
      "application/vnd.document+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dolby.mlp": {
        source: "apache",
        extensions: ["mlp"]
      },
      "application/vnd.dolby.mobile.1": {
        source: "iana"
      },
      "application/vnd.dolby.mobile.2": {
        source: "iana"
      },
      "application/vnd.doremir.scorecloud-binary-document": {
        source: "iana"
      },
      "application/vnd.dpgraph": {
        source: "iana",
        extensions: ["dpg"]
      },
      "application/vnd.dreamfactory": {
        source: "iana",
        extensions: ["dfac"]
      },
      "application/vnd.drive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ds-keypoint": {
        source: "apache",
        extensions: ["kpxx"]
      },
      "application/vnd.dtg.local": {
        source: "iana"
      },
      "application/vnd.dtg.local.flash": {
        source: "iana"
      },
      "application/vnd.dtg.local.html": {
        source: "iana"
      },
      "application/vnd.dvb.ait": {
        source: "iana",
        extensions: ["ait"]
      },
      "application/vnd.dvb.dvbisl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.dvbj": {
        source: "iana"
      },
      "application/vnd.dvb.esgcontainer": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcdftnotifaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgaccess2": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcesgpdd": {
        source: "iana"
      },
      "application/vnd.dvb.ipdcroaming": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-base": {
        source: "iana"
      },
      "application/vnd.dvb.iptv.alfec-enhancement": {
        source: "iana"
      },
      "application/vnd.dvb.notif-aggregate-root+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-container+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-generic+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-msglist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-ia-registration-response+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.notif-init+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.dvb.pfr": {
        source: "iana"
      },
      "application/vnd.dvb.service": {
        source: "iana",
        extensions: ["svc"]
      },
      "application/vnd.dxr": {
        source: "iana"
      },
      "application/vnd.dynageo": {
        source: "iana",
        extensions: ["geo"]
      },
      "application/vnd.dzr": {
        source: "iana"
      },
      "application/vnd.easykaraoke.cdgdownload": {
        source: "iana"
      },
      "application/vnd.ecdis-update": {
        source: "iana"
      },
      "application/vnd.ecip.rlp": {
        source: "iana"
      },
      "application/vnd.eclipse.ditto+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ecowin.chart": {
        source: "iana",
        extensions: ["mag"]
      },
      "application/vnd.ecowin.filerequest": {
        source: "iana"
      },
      "application/vnd.ecowin.fileupdate": {
        source: "iana"
      },
      "application/vnd.ecowin.series": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesrequest": {
        source: "iana"
      },
      "application/vnd.ecowin.seriesupdate": {
        source: "iana"
      },
      "application/vnd.efi.img": {
        source: "iana"
      },
      "application/vnd.efi.iso": {
        source: "iana"
      },
      "application/vnd.emclient.accessrequest+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.enliven": {
        source: "iana",
        extensions: ["nml"]
      },
      "application/vnd.enphase.envoy": {
        source: "iana"
      },
      "application/vnd.eprints.data+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.epson.esf": {
        source: "iana",
        extensions: ["esf"]
      },
      "application/vnd.epson.msf": {
        source: "iana",
        extensions: ["msf"]
      },
      "application/vnd.epson.quickanime": {
        source: "iana",
        extensions: ["qam"]
      },
      "application/vnd.epson.salt": {
        source: "iana",
        extensions: ["slt"]
      },
      "application/vnd.epson.ssf": {
        source: "iana",
        extensions: ["ssf"]
      },
      "application/vnd.ericsson.quickcall": {
        source: "iana"
      },
      "application/vnd.espass-espass+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.eszigno3+xml": {
        source: "iana",
        compressible: true,
        extensions: ["es3", "et3"]
      },
      "application/vnd.etsi.aoc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.asic-e+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.asic-s+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.etsi.cug+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvcommand+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-bc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-cod+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsad-npvr+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvservice+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvsync+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.iptvueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mcid+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.mheg5": {
        source: "iana"
      },
      "application/vnd.etsi.overload-control-policy-dataset+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.pstn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.sci+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.simservs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.timestamp-token": {
        source: "iana"
      },
      "application/vnd.etsi.tsl+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.etsi.tsl.der": {
        source: "iana"
      },
      "application/vnd.eu.kasparian.car+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.eudora.data": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.profile": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.settings": {
        source: "iana"
      },
      "application/vnd.evolv.ecig.theme": {
        source: "iana"
      },
      "application/vnd.exstream-empower+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.exstream-package": {
        source: "iana"
      },
      "application/vnd.ezpix-album": {
        source: "iana",
        extensions: ["ez2"]
      },
      "application/vnd.ezpix-package": {
        source: "iana",
        extensions: ["ez3"]
      },
      "application/vnd.f-secure.mobile": {
        source: "iana"
      },
      "application/vnd.familysearch.gedcom+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.fastcopy-disk-image": {
        source: "iana"
      },
      "application/vnd.fdf": {
        source: "iana",
        extensions: ["fdf"]
      },
      "application/vnd.fdsn.mseed": {
        source: "iana",
        extensions: ["mseed"]
      },
      "application/vnd.fdsn.seed": {
        source: "iana",
        extensions: ["seed", "dataless"]
      },
      "application/vnd.ffsns": {
        source: "iana"
      },
      "application/vnd.ficlab.flb+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.filmit.zfc": {
        source: "iana"
      },
      "application/vnd.fints": {
        source: "iana"
      },
      "application/vnd.firemonkeys.cloudcell": {
        source: "iana"
      },
      "application/vnd.flographit": {
        source: "iana",
        extensions: ["gph"]
      },
      "application/vnd.fluxtime.clip": {
        source: "iana",
        extensions: ["ftc"]
      },
      "application/vnd.font-fontforge-sfd": {
        source: "iana"
      },
      "application/vnd.framemaker": {
        source: "iana",
        extensions: ["fm", "frame", "maker", "book"]
      },
      "application/vnd.frogans.fnc": {
        source: "iana",
        extensions: ["fnc"]
      },
      "application/vnd.frogans.ltf": {
        source: "iana",
        extensions: ["ltf"]
      },
      "application/vnd.fsc.weblaunch": {
        source: "iana",
        extensions: ["fsc"]
      },
      "application/vnd.fujifilm.fb.docuworks": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.binder": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujifilm.fb.jfi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fujitsu.oasys": {
        source: "iana",
        extensions: ["oas"]
      },
      "application/vnd.fujitsu.oasys2": {
        source: "iana",
        extensions: ["oa2"]
      },
      "application/vnd.fujitsu.oasys3": {
        source: "iana",
        extensions: ["oa3"]
      },
      "application/vnd.fujitsu.oasysgp": {
        source: "iana",
        extensions: ["fg5"]
      },
      "application/vnd.fujitsu.oasysprs": {
        source: "iana",
        extensions: ["bh2"]
      },
      "application/vnd.fujixerox.art-ex": {
        source: "iana"
      },
      "application/vnd.fujixerox.art4": {
        source: "iana"
      },
      "application/vnd.fujixerox.ddd": {
        source: "iana",
        extensions: ["ddd"]
      },
      "application/vnd.fujixerox.docuworks": {
        source: "iana",
        extensions: ["xdw"]
      },
      "application/vnd.fujixerox.docuworks.binder": {
        source: "iana",
        extensions: ["xbd"]
      },
      "application/vnd.fujixerox.docuworks.container": {
        source: "iana"
      },
      "application/vnd.fujixerox.hbpl": {
        source: "iana"
      },
      "application/vnd.fut-misnet": {
        source: "iana"
      },
      "application/vnd.futoin+cbor": {
        source: "iana"
      },
      "application/vnd.futoin+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.fuzzysheet": {
        source: "iana",
        extensions: ["fzs"]
      },
      "application/vnd.genomatix.tuxedo": {
        source: "iana",
        extensions: ["txd"]
      },
      "application/vnd.gentics.grd+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geo+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geocube+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.geogebra.file": {
        source: "iana",
        extensions: ["ggb"]
      },
      "application/vnd.geogebra.slides": {
        source: "iana"
      },
      "application/vnd.geogebra.tool": {
        source: "iana",
        extensions: ["ggt"]
      },
      "application/vnd.geometry-explorer": {
        source: "iana",
        extensions: ["gex", "gre"]
      },
      "application/vnd.geonext": {
        source: "iana",
        extensions: ["gxt"]
      },
      "application/vnd.geoplan": {
        source: "iana",
        extensions: ["g2w"]
      },
      "application/vnd.geospace": {
        source: "iana",
        extensions: ["g3w"]
      },
      "application/vnd.gerber": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt": {
        source: "iana"
      },
      "application/vnd.globalplatform.card-content-mgt-response": {
        source: "iana"
      },
      "application/vnd.gmx": {
        source: "iana",
        extensions: ["gmx"]
      },
      "application/vnd.google-apps.document": {
        compressible: false,
        extensions: ["gdoc"]
      },
      "application/vnd.google-apps.presentation": {
        compressible: false,
        extensions: ["gslides"]
      },
      "application/vnd.google-apps.spreadsheet": {
        compressible: false,
        extensions: ["gsheet"]
      },
      "application/vnd.google-earth.kml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["kml"]
      },
      "application/vnd.google-earth.kmz": {
        source: "iana",
        compressible: false,
        extensions: ["kmz"]
      },
      "application/vnd.gov.sk.e-form+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.gov.sk.e-form+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.gov.sk.xmldatacontainer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.grafeq": {
        source: "iana",
        extensions: ["gqf", "gqs"]
      },
      "application/vnd.gridmp": {
        source: "iana"
      },
      "application/vnd.groove-account": {
        source: "iana",
        extensions: ["gac"]
      },
      "application/vnd.groove-help": {
        source: "iana",
        extensions: ["ghf"]
      },
      "application/vnd.groove-identity-message": {
        source: "iana",
        extensions: ["gim"]
      },
      "application/vnd.groove-injector": {
        source: "iana",
        extensions: ["grv"]
      },
      "application/vnd.groove-tool-message": {
        source: "iana",
        extensions: ["gtm"]
      },
      "application/vnd.groove-tool-template": {
        source: "iana",
        extensions: ["tpl"]
      },
      "application/vnd.groove-vcard": {
        source: "iana",
        extensions: ["vcg"]
      },
      "application/vnd.hal+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hal+xml": {
        source: "iana",
        compressible: true,
        extensions: ["hal"]
      },
      "application/vnd.handheld-entertainment+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zmm"]
      },
      "application/vnd.hbci": {
        source: "iana",
        extensions: ["hbci"]
      },
      "application/vnd.hc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hcl-bireports": {
        source: "iana"
      },
      "application/vnd.hdt": {
        source: "iana"
      },
      "application/vnd.heroku+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hhe.lesson-player": {
        source: "iana",
        extensions: ["les"]
      },
      "application/vnd.hl7cda+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hl7v2+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.hp-hpgl": {
        source: "iana",
        extensions: ["hpgl"]
      },
      "application/vnd.hp-hpid": {
        source: "iana",
        extensions: ["hpid"]
      },
      "application/vnd.hp-hps": {
        source: "iana",
        extensions: ["hps"]
      },
      "application/vnd.hp-jlyt": {
        source: "iana",
        extensions: ["jlt"]
      },
      "application/vnd.hp-pcl": {
        source: "iana",
        extensions: ["pcl"]
      },
      "application/vnd.hp-pclxl": {
        source: "iana",
        extensions: ["pclxl"]
      },
      "application/vnd.httphone": {
        source: "iana"
      },
      "application/vnd.hydrostatix.sof-data": {
        source: "iana",
        extensions: ["sfd-hdstx"]
      },
      "application/vnd.hyper+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyper-item+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hyperdrive+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.hzn-3d-crossword": {
        source: "iana"
      },
      "application/vnd.ibm.afplinedata": {
        source: "iana"
      },
      "application/vnd.ibm.electronic-media": {
        source: "iana"
      },
      "application/vnd.ibm.minipay": {
        source: "iana",
        extensions: ["mpy"]
      },
      "application/vnd.ibm.modcap": {
        source: "iana",
        extensions: ["afp", "listafp", "list3820"]
      },
      "application/vnd.ibm.rights-management": {
        source: "iana",
        extensions: ["irm"]
      },
      "application/vnd.ibm.secure-container": {
        source: "iana",
        extensions: ["sc"]
      },
      "application/vnd.iccprofile": {
        source: "iana",
        extensions: ["icc", "icm"]
      },
      "application/vnd.ieee.1905": {
        source: "iana"
      },
      "application/vnd.igloader": {
        source: "iana",
        extensions: ["igl"]
      },
      "application/vnd.imagemeter.folder+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.imagemeter.image+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.immervision-ivp": {
        source: "iana",
        extensions: ["ivp"]
      },
      "application/vnd.immervision-ivu": {
        source: "iana",
        extensions: ["ivu"]
      },
      "application/vnd.ims.imsccv1p1": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p2": {
        source: "iana"
      },
      "application/vnd.ims.imsccv1p3": {
        source: "iana"
      },
      "application/vnd.ims.lis.v2.result+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolproxy.id+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ims.lti.v2.toolsettings.simple+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informedcontrol.rms+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.informix-visionary": {
        source: "iana"
      },
      "application/vnd.infotech.project": {
        source: "iana"
      },
      "application/vnd.infotech.project+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.innopath.wamp.notification": {
        source: "iana"
      },
      "application/vnd.insors.igm": {
        source: "iana",
        extensions: ["igm"]
      },
      "application/vnd.intercon.formnet": {
        source: "iana",
        extensions: ["xpw", "xpx"]
      },
      "application/vnd.intergeo": {
        source: "iana",
        extensions: ["i2g"]
      },
      "application/vnd.intertrust.digibox": {
        source: "iana"
      },
      "application/vnd.intertrust.nncp": {
        source: "iana"
      },
      "application/vnd.intu.qbo": {
        source: "iana",
        extensions: ["qbo"]
      },
      "application/vnd.intu.qfx": {
        source: "iana",
        extensions: ["qfx"]
      },
      "application/vnd.iptc.g2.catalogitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.conceptitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.knowledgeitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.newsmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.packageitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.iptc.g2.planningitem+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ipunplugged.rcprofile": {
        source: "iana",
        extensions: ["rcprofile"]
      },
      "application/vnd.irepository.package+xml": {
        source: "iana",
        compressible: true,
        extensions: ["irp"]
      },
      "application/vnd.is-xpr": {
        source: "iana",
        extensions: ["xpr"]
      },
      "application/vnd.isac.fcs": {
        source: "iana",
        extensions: ["fcs"]
      },
      "application/vnd.iso11783-10+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.jam": {
        source: "iana",
        extensions: ["jam"]
      },
      "application/vnd.japannet-directory-service": {
        source: "iana"
      },
      "application/vnd.japannet-jpnstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-payment-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-registration": {
        source: "iana"
      },
      "application/vnd.japannet-registration-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-setstore-wakeup": {
        source: "iana"
      },
      "application/vnd.japannet-verification": {
        source: "iana"
      },
      "application/vnd.japannet-verification-wakeup": {
        source: "iana"
      },
      "application/vnd.jcp.javame.midlet-rms": {
        source: "iana",
        extensions: ["rms"]
      },
      "application/vnd.jisp": {
        source: "iana",
        extensions: ["jisp"]
      },
      "application/vnd.joost.joda-archive": {
        source: "iana",
        extensions: ["joda"]
      },
      "application/vnd.jsk.isdn-ngn": {
        source: "iana"
      },
      "application/vnd.kahootz": {
        source: "iana",
        extensions: ["ktz", "ktr"]
      },
      "application/vnd.kde.karbon": {
        source: "iana",
        extensions: ["karbon"]
      },
      "application/vnd.kde.kchart": {
        source: "iana",
        extensions: ["chrt"]
      },
      "application/vnd.kde.kformula": {
        source: "iana",
        extensions: ["kfo"]
      },
      "application/vnd.kde.kivio": {
        source: "iana",
        extensions: ["flw"]
      },
      "application/vnd.kde.kontour": {
        source: "iana",
        extensions: ["kon"]
      },
      "application/vnd.kde.kpresenter": {
        source: "iana",
        extensions: ["kpr", "kpt"]
      },
      "application/vnd.kde.kspread": {
        source: "iana",
        extensions: ["ksp"]
      },
      "application/vnd.kde.kword": {
        source: "iana",
        extensions: ["kwd", "kwt"]
      },
      "application/vnd.kenameaapp": {
        source: "iana",
        extensions: ["htke"]
      },
      "application/vnd.kidspiration": {
        source: "iana",
        extensions: ["kia"]
      },
      "application/vnd.kinar": {
        source: "iana",
        extensions: ["kne", "knp"]
      },
      "application/vnd.koan": {
        source: "iana",
        extensions: ["skp", "skd", "skt", "skm"]
      },
      "application/vnd.kodak-descriptor": {
        source: "iana",
        extensions: ["sse"]
      },
      "application/vnd.las": {
        source: "iana"
      },
      "application/vnd.las.las+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.las.las+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lasxml"]
      },
      "application/vnd.laszip": {
        source: "iana"
      },
      "application/vnd.leap+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.liberty-request+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.llamagraphics.life-balance.desktop": {
        source: "iana",
        extensions: ["lbd"]
      },
      "application/vnd.llamagraphics.life-balance.exchange+xml": {
        source: "iana",
        compressible: true,
        extensions: ["lbe"]
      },
      "application/vnd.logipipe.circuit+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.loom": {
        source: "iana"
      },
      "application/vnd.lotus-1-2-3": {
        source: "iana",
        extensions: ["123"]
      },
      "application/vnd.lotus-approach": {
        source: "iana",
        extensions: ["apr"]
      },
      "application/vnd.lotus-freelance": {
        source: "iana",
        extensions: ["pre"]
      },
      "application/vnd.lotus-notes": {
        source: "iana",
        extensions: ["nsf"]
      },
      "application/vnd.lotus-organizer": {
        source: "iana",
        extensions: ["org"]
      },
      "application/vnd.lotus-screencam": {
        source: "iana",
        extensions: ["scm"]
      },
      "application/vnd.lotus-wordpro": {
        source: "iana",
        extensions: ["lwp"]
      },
      "application/vnd.macports.portpkg": {
        source: "iana",
        extensions: ["portpkg"]
      },
      "application/vnd.mapbox-vector-tile": {
        source: "iana",
        extensions: ["mvt"]
      },
      "application/vnd.marlin.drm.actiontoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.conftoken+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.license+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.marlin.drm.mdcf": {
        source: "iana"
      },
      "application/vnd.mason+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.maxar.archive.3tz+zip": {
        source: "iana",
        compressible: false
      },
      "application/vnd.maxmind.maxmind-db": {
        source: "iana"
      },
      "application/vnd.mcd": {
        source: "iana",
        extensions: ["mcd"]
      },
      "application/vnd.medcalcdata": {
        source: "iana",
        extensions: ["mc1"]
      },
      "application/vnd.mediastation.cdkey": {
        source: "iana",
        extensions: ["cdkey"]
      },
      "application/vnd.meridian-slingshot": {
        source: "iana"
      },
      "application/vnd.mfer": {
        source: "iana",
        extensions: ["mwf"]
      },
      "application/vnd.mfmp": {
        source: "iana",
        extensions: ["mfm"]
      },
      "application/vnd.micro+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.micrografx.flo": {
        source: "iana",
        extensions: ["flo"]
      },
      "application/vnd.micrografx.igx": {
        source: "iana",
        extensions: ["igx"]
      },
      "application/vnd.microsoft.portable-executable": {
        source: "iana"
      },
      "application/vnd.microsoft.windows.thumbnail-cache": {
        source: "iana"
      },
      "application/vnd.miele+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.mif": {
        source: "iana",
        extensions: ["mif"]
      },
      "application/vnd.minisoft-hp3000-save": {
        source: "iana"
      },
      "application/vnd.mitsubishi.misty-guard.trustweb": {
        source: "iana"
      },
      "application/vnd.mobius.daf": {
        source: "iana",
        extensions: ["daf"]
      },
      "application/vnd.mobius.dis": {
        source: "iana",
        extensions: ["dis"]
      },
      "application/vnd.mobius.mbk": {
        source: "iana",
        extensions: ["mbk"]
      },
      "application/vnd.mobius.mqy": {
        source: "iana",
        extensions: ["mqy"]
      },
      "application/vnd.mobius.msl": {
        source: "iana",
        extensions: ["msl"]
      },
      "application/vnd.mobius.plc": {
        source: "iana",
        extensions: ["plc"]
      },
      "application/vnd.mobius.txf": {
        source: "iana",
        extensions: ["txf"]
      },
      "application/vnd.mophun.application": {
        source: "iana",
        extensions: ["mpn"]
      },
      "application/vnd.mophun.certificate": {
        source: "iana",
        extensions: ["mpc"]
      },
      "application/vnd.motorola.flexsuite": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.adsi": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.fis": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.gotap": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.kmr": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.ttc": {
        source: "iana"
      },
      "application/vnd.motorola.flexsuite.wem": {
        source: "iana"
      },
      "application/vnd.motorola.iprm": {
        source: "iana"
      },
      "application/vnd.mozilla.xul+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xul"]
      },
      "application/vnd.ms-3mfdocument": {
        source: "iana"
      },
      "application/vnd.ms-artgalry": {
        source: "iana",
        extensions: ["cil"]
      },
      "application/vnd.ms-asf": {
        source: "iana"
      },
      "application/vnd.ms-cab-compressed": {
        source: "iana",
        extensions: ["cab"]
      },
      "application/vnd.ms-color.iccprofile": {
        source: "apache"
      },
      "application/vnd.ms-excel": {
        source: "iana",
        compressible: false,
        extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"]
      },
      "application/vnd.ms-excel.addin.macroenabled.12": {
        source: "iana",
        extensions: ["xlam"]
      },
      "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
        source: "iana",
        extensions: ["xlsb"]
      },
      "application/vnd.ms-excel.sheet.macroenabled.12": {
        source: "iana",
        extensions: ["xlsm"]
      },
      "application/vnd.ms-excel.template.macroenabled.12": {
        source: "iana",
        extensions: ["xltm"]
      },
      "application/vnd.ms-fontobject": {
        source: "iana",
        compressible: true,
        extensions: ["eot"]
      },
      "application/vnd.ms-htmlhelp": {
        source: "iana",
        extensions: ["chm"]
      },
      "application/vnd.ms-ims": {
        source: "iana",
        extensions: ["ims"]
      },
      "application/vnd.ms-lrm": {
        source: "iana",
        extensions: ["lrm"]
      },
      "application/vnd.ms-office.activex+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-officetheme": {
        source: "iana",
        extensions: ["thmx"]
      },
      "application/vnd.ms-opentype": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-outlook": {
        compressible: false,
        extensions: ["msg"]
      },
      "application/vnd.ms-package.obfuscated-opentype": {
        source: "apache"
      },
      "application/vnd.ms-pki.seccat": {
        source: "apache",
        extensions: ["cat"]
      },
      "application/vnd.ms-pki.stl": {
        source: "apache",
        extensions: ["stl"]
      },
      "application/vnd.ms-playready.initiator+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-powerpoint": {
        source: "iana",
        compressible: false,
        extensions: ["ppt", "pps", "pot"]
      },
      "application/vnd.ms-powerpoint.addin.macroenabled.12": {
        source: "iana",
        extensions: ["ppam"]
      },
      "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
        source: "iana",
        extensions: ["pptm"]
      },
      "application/vnd.ms-powerpoint.slide.macroenabled.12": {
        source: "iana",
        extensions: ["sldm"]
      },
      "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
        source: "iana",
        extensions: ["ppsm"]
      },
      "application/vnd.ms-powerpoint.template.macroenabled.12": {
        source: "iana",
        extensions: ["potm"]
      },
      "application/vnd.ms-printdevicecapabilities+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-printing.printticket+xml": {
        source: "apache",
        compressible: true
      },
      "application/vnd.ms-printschematicket+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ms-project": {
        source: "iana",
        extensions: ["mpp", "mpt"]
      },
      "application/vnd.ms-tnef": {
        source: "iana"
      },
      "application/vnd.ms-windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.nwprinting.oob": {
        source: "iana"
      },
      "application/vnd.ms-windows.printerpairing": {
        source: "iana"
      },
      "application/vnd.ms-windows.wsd.oob": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.lic-resp": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-chlg-req": {
        source: "iana"
      },
      "application/vnd.ms-wmdrm.meter-resp": {
        source: "iana"
      },
      "application/vnd.ms-word.document.macroenabled.12": {
        source: "iana",
        extensions: ["docm"]
      },
      "application/vnd.ms-word.template.macroenabled.12": {
        source: "iana",
        extensions: ["dotm"]
      },
      "application/vnd.ms-works": {
        source: "iana",
        extensions: ["wps", "wks", "wcm", "wdb"]
      },
      "application/vnd.ms-wpl": {
        source: "iana",
        extensions: ["wpl"]
      },
      "application/vnd.ms-xpsdocument": {
        source: "iana",
        compressible: false,
        extensions: ["xps"]
      },
      "application/vnd.msa-disk-image": {
        source: "iana"
      },
      "application/vnd.mseq": {
        source: "iana",
        extensions: ["mseq"]
      },
      "application/vnd.msign": {
        source: "iana"
      },
      "application/vnd.multiad.creator": {
        source: "iana"
      },
      "application/vnd.multiad.creator.cif": {
        source: "iana"
      },
      "application/vnd.music-niff": {
        source: "iana"
      },
      "application/vnd.musician": {
        source: "iana",
        extensions: ["mus"]
      },
      "application/vnd.muvee.style": {
        source: "iana",
        extensions: ["msty"]
      },
      "application/vnd.mynfc": {
        source: "iana",
        extensions: ["taglet"]
      },
      "application/vnd.nacamar.ybrid+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.ncd.control": {
        source: "iana"
      },
      "application/vnd.ncd.reference": {
        source: "iana"
      },
      "application/vnd.nearst.inv+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nebumind.line": {
        source: "iana"
      },
      "application/vnd.nervana": {
        source: "iana"
      },
      "application/vnd.netfpx": {
        source: "iana"
      },
      "application/vnd.neurolanguage.nlu": {
        source: "iana",
        extensions: ["nlu"]
      },
      "application/vnd.nimn": {
        source: "iana"
      },
      "application/vnd.nintendo.nitro.rom": {
        source: "iana"
      },
      "application/vnd.nintendo.snes.rom": {
        source: "iana"
      },
      "application/vnd.nitf": {
        source: "iana",
        extensions: ["ntf", "nitf"]
      },
      "application/vnd.noblenet-directory": {
        source: "iana",
        extensions: ["nnd"]
      },
      "application/vnd.noblenet-sealer": {
        source: "iana",
        extensions: ["nns"]
      },
      "application/vnd.noblenet-web": {
        source: "iana",
        extensions: ["nnw"]
      },
      "application/vnd.nokia.catalogs": {
        source: "iana"
      },
      "application/vnd.nokia.conml+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.conml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.iptv.config+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.isds-radio-presets": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.landmark+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.landmarkcollection+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.n-gage.ac+xml": {
        source: "iana",
        compressible: true,
        extensions: ["ac"]
      },
      "application/vnd.nokia.n-gage.data": {
        source: "iana",
        extensions: ["ngdat"]
      },
      "application/vnd.nokia.n-gage.symbian.install": {
        source: "iana",
        extensions: ["n-gage"]
      },
      "application/vnd.nokia.ncd": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+wbxml": {
        source: "iana"
      },
      "application/vnd.nokia.pcd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.nokia.radio-preset": {
        source: "iana",
        extensions: ["rpst"]
      },
      "application/vnd.nokia.radio-presets": {
        source: "iana",
        extensions: ["rpss"]
      },
      "application/vnd.novadigm.edm": {
        source: "iana",
        extensions: ["edm"]
      },
      "application/vnd.novadigm.edx": {
        source: "iana",
        extensions: ["edx"]
      },
      "application/vnd.novadigm.ext": {
        source: "iana",
        extensions: ["ext"]
      },
      "application/vnd.ntt-local.content-share": {
        source: "iana"
      },
      "application/vnd.ntt-local.file-transfer": {
        source: "iana"
      },
      "application/vnd.ntt-local.ogw_remote-access": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_remote": {
        source: "iana"
      },
      "application/vnd.ntt-local.sip-ta_tcp_stream": {
        source: "iana"
      },
      "application/vnd.oasis.opendocument.chart": {
        source: "iana",
        extensions: ["odc"]
      },
      "application/vnd.oasis.opendocument.chart-template": {
        source: "iana",
        extensions: ["otc"]
      },
      "application/vnd.oasis.opendocument.database": {
        source: "iana",
        extensions: ["odb"]
      },
      "application/vnd.oasis.opendocument.formula": {
        source: "iana",
        extensions: ["odf"]
      },
      "application/vnd.oasis.opendocument.formula-template": {
        source: "iana",
        extensions: ["odft"]
      },
      "application/vnd.oasis.opendocument.graphics": {
        source: "iana",
        compressible: false,
        extensions: ["odg"]
      },
      "application/vnd.oasis.opendocument.graphics-template": {
        source: "iana",
        extensions: ["otg"]
      },
      "application/vnd.oasis.opendocument.image": {
        source: "iana",
        extensions: ["odi"]
      },
      "application/vnd.oasis.opendocument.image-template": {
        source: "iana",
        extensions: ["oti"]
      },
      "application/vnd.oasis.opendocument.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["odp"]
      },
      "application/vnd.oasis.opendocument.presentation-template": {
        source: "iana",
        extensions: ["otp"]
      },
      "application/vnd.oasis.opendocument.spreadsheet": {
        source: "iana",
        compressible: false,
        extensions: ["ods"]
      },
      "application/vnd.oasis.opendocument.spreadsheet-template": {
        source: "iana",
        extensions: ["ots"]
      },
      "application/vnd.oasis.opendocument.text": {
        source: "iana",
        compressible: false,
        extensions: ["odt"]
      },
      "application/vnd.oasis.opendocument.text-master": {
        source: "iana",
        extensions: ["odm"]
      },
      "application/vnd.oasis.opendocument.text-template": {
        source: "iana",
        extensions: ["ott"]
      },
      "application/vnd.oasis.opendocument.text-web": {
        source: "iana",
        extensions: ["oth"]
      },
      "application/vnd.obn": {
        source: "iana"
      },
      "application/vnd.ocf+cbor": {
        source: "iana"
      },
      "application/vnd.oci.image.manifest.v1+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oftn.l10n+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessdownload+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.contentaccessstreaming+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.cspg-hexbinary": {
        source: "iana"
      },
      "application/vnd.oipf.dae.svg+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.dae.xhtml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.mippvcontrolmessage+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.pae.gem": {
        source: "iana"
      },
      "application/vnd.oipf.spdiscovery+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.spdlist+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.ueprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oipf.userprofile+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.olpc-sugar": {
        source: "iana",
        extensions: ["xo"]
      },
      "application/vnd.oma-scws-config": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-request": {
        source: "iana"
      },
      "application/vnd.oma-scws-http-response": {
        source: "iana"
      },
      "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.drm-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.imd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.ltkm": {
        source: "iana"
      },
      "application/vnd.oma.bcast.notification+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.provisioningtrigger": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgboot": {
        source: "iana"
      },
      "application/vnd.oma.bcast.sgdd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sgdu": {
        source: "iana"
      },
      "application/vnd.oma.bcast.simple-symbol-container": {
        source: "iana"
      },
      "application/vnd.oma.bcast.smartcard-trigger+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.sprov+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.bcast.stkm": {
        source: "iana"
      },
      "application/vnd.oma.cab-address-book+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-feature-handler+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-pcc+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-subs-invite+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.cab-user-prefs+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.dcd": {
        source: "iana"
      },
      "application/vnd.oma.dcdc": {
        source: "iana"
      },
      "application/vnd.oma.dd2+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dd2"]
      },
      "application/vnd.oma.drm.risd+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.group-usage-list+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+cbor": {
        source: "iana"
      },
      "application/vnd.oma.lwm2m+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.lwm2m+tlv": {
        source: "iana"
      },
      "application/vnd.oma.pal+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.detailed-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.final-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.groups+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.invocation-descriptor+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.poc.optimized-progress-report+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.push": {
        source: "iana"
      },
      "application/vnd.oma.scidm.messages+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oma.xcap-directory+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.omads-email+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-file+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omads-folder+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.omaloc-supl-init": {
        source: "iana"
      },
      "application/vnd.onepager": {
        source: "iana"
      },
      "application/vnd.onepagertamp": {
        source: "iana"
      },
      "application/vnd.onepagertamx": {
        source: "iana"
      },
      "application/vnd.onepagertat": {
        source: "iana"
      },
      "application/vnd.onepagertatp": {
        source: "iana"
      },
      "application/vnd.onepagertatx": {
        source: "iana"
      },
      "application/vnd.openblox.game+xml": {
        source: "iana",
        compressible: true,
        extensions: ["obgx"]
      },
      "application/vnd.openblox.game-binary": {
        source: "iana"
      },
      "application/vnd.openeye.oeb": {
        source: "iana"
      },
      "application/vnd.openofficeorg.extension": {
        source: "apache",
        extensions: ["oxt"]
      },
      "application/vnd.openstreetmap.data+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osm"]
      },
      "application/vnd.opentimestamps.ots": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawing+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
        source: "iana",
        compressible: false,
        extensions: ["pptx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide": {
        source: "iana",
        extensions: ["sldx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
        source: "iana",
        extensions: ["ppsx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template": {
        source: "iana",
        extensions: ["potx"]
      },
      "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        source: "iana",
        compressible: false,
        extensions: ["xlsx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
        source: "iana",
        extensions: ["xltx"]
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.theme+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.vmldrawing": {
        source: "iana"
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        source: "iana",
        compressible: false,
        extensions: ["docx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
        source: "iana",
        extensions: ["dotx"]
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.core-properties+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.openxmlformats-package.relationships+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oracle.resource+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.orange.indata": {
        source: "iana"
      },
      "application/vnd.osa.netdeploy": {
        source: "iana"
      },
      "application/vnd.osgeo.mapguide.package": {
        source: "iana",
        extensions: ["mgp"]
      },
      "application/vnd.osgi.bundle": {
        source: "iana"
      },
      "application/vnd.osgi.dp": {
        source: "iana",
        extensions: ["dp"]
      },
      "application/vnd.osgi.subsystem": {
        source: "iana",
        extensions: ["esa"]
      },
      "application/vnd.otps.ct-kip+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.oxli.countgraph": {
        source: "iana"
      },
      "application/vnd.pagerduty+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.palm": {
        source: "iana",
        extensions: ["pdb", "pqa", "oprc"]
      },
      "application/vnd.panoply": {
        source: "iana"
      },
      "application/vnd.paos.xml": {
        source: "iana"
      },
      "application/vnd.patentdive": {
        source: "iana"
      },
      "application/vnd.patientecommsdoc": {
        source: "iana"
      },
      "application/vnd.pawaafile": {
        source: "iana",
        extensions: ["paw"]
      },
      "application/vnd.pcos": {
        source: "iana"
      },
      "application/vnd.pg.format": {
        source: "iana",
        extensions: ["str"]
      },
      "application/vnd.pg.osasli": {
        source: "iana",
        extensions: ["ei6"]
      },
      "application/vnd.piaccess.application-licence": {
        source: "iana"
      },
      "application/vnd.picsel": {
        source: "iana",
        extensions: ["efif"]
      },
      "application/vnd.pmi.widget": {
        source: "iana",
        extensions: ["wg"]
      },
      "application/vnd.poc.group-advertisement+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.pocketlearn": {
        source: "iana",
        extensions: ["plf"]
      },
      "application/vnd.powerbuilder6": {
        source: "iana",
        extensions: ["pbd"]
      },
      "application/vnd.powerbuilder6-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder7": {
        source: "iana"
      },
      "application/vnd.powerbuilder7-s": {
        source: "iana"
      },
      "application/vnd.powerbuilder75": {
        source: "iana"
      },
      "application/vnd.powerbuilder75-s": {
        source: "iana"
      },
      "application/vnd.preminet": {
        source: "iana"
      },
      "application/vnd.previewsystems.box": {
        source: "iana",
        extensions: ["box"]
      },
      "application/vnd.proteus.magazine": {
        source: "iana",
        extensions: ["mgz"]
      },
      "application/vnd.psfs": {
        source: "iana"
      },
      "application/vnd.publishare-delta-tree": {
        source: "iana",
        extensions: ["qps"]
      },
      "application/vnd.pvi.ptid1": {
        source: "iana",
        extensions: ["ptid"]
      },
      "application/vnd.pwg-multiplexed": {
        source: "iana"
      },
      "application/vnd.pwg-xhtml-print+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.qualcomm.brew-app-res": {
        source: "iana"
      },
      "application/vnd.quarantainenet": {
        source: "iana"
      },
      "application/vnd.quark.quarkxpress": {
        source: "iana",
        extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"]
      },
      "application/vnd.quobject-quoxdocument": {
        source: "iana"
      },
      "application/vnd.radisys.moml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-conn+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-audit-stream+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-conf+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-base+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-detect+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-group+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-speech+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.radisys.msml-dialog-transform+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rainstor.data": {
        source: "iana"
      },
      "application/vnd.rapid": {
        source: "iana"
      },
      "application/vnd.rar": {
        source: "iana",
        extensions: ["rar"]
      },
      "application/vnd.realvnc.bed": {
        source: "iana",
        extensions: ["bed"]
      },
      "application/vnd.recordare.musicxml": {
        source: "iana",
        extensions: ["mxl"]
      },
      "application/vnd.recordare.musicxml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["musicxml"]
      },
      "application/vnd.renlearn.rlprint": {
        source: "iana"
      },
      "application/vnd.resilient.logic": {
        source: "iana"
      },
      "application/vnd.restful+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.rig.cryptonote": {
        source: "iana",
        extensions: ["cryptonote"]
      },
      "application/vnd.rim.cod": {
        source: "apache",
        extensions: ["cod"]
      },
      "application/vnd.rn-realmedia": {
        source: "apache",
        extensions: ["rm"]
      },
      "application/vnd.rn-realmedia-vbr": {
        source: "apache",
        extensions: ["rmvb"]
      },
      "application/vnd.route66.link66+xml": {
        source: "iana",
        compressible: true,
        extensions: ["link66"]
      },
      "application/vnd.rs-274x": {
        source: "iana"
      },
      "application/vnd.ruckus.download": {
        source: "iana"
      },
      "application/vnd.s3sms": {
        source: "iana"
      },
      "application/vnd.sailingtracker.track": {
        source: "iana",
        extensions: ["st"]
      },
      "application/vnd.sar": {
        source: "iana"
      },
      "application/vnd.sbm.cid": {
        source: "iana"
      },
      "application/vnd.sbm.mid2": {
        source: "iana"
      },
      "application/vnd.scribus": {
        source: "iana"
      },
      "application/vnd.sealed.3df": {
        source: "iana"
      },
      "application/vnd.sealed.csf": {
        source: "iana"
      },
      "application/vnd.sealed.doc": {
        source: "iana"
      },
      "application/vnd.sealed.eml": {
        source: "iana"
      },
      "application/vnd.sealed.mht": {
        source: "iana"
      },
      "application/vnd.sealed.net": {
        source: "iana"
      },
      "application/vnd.sealed.ppt": {
        source: "iana"
      },
      "application/vnd.sealed.tiff": {
        source: "iana"
      },
      "application/vnd.sealed.xls": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.html": {
        source: "iana"
      },
      "application/vnd.sealedmedia.softseal.pdf": {
        source: "iana"
      },
      "application/vnd.seemail": {
        source: "iana",
        extensions: ["see"]
      },
      "application/vnd.seis+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.sema": {
        source: "iana",
        extensions: ["sema"]
      },
      "application/vnd.semd": {
        source: "iana",
        extensions: ["semd"]
      },
      "application/vnd.semf": {
        source: "iana",
        extensions: ["semf"]
      },
      "application/vnd.shade-save-file": {
        source: "iana"
      },
      "application/vnd.shana.informed.formdata": {
        source: "iana",
        extensions: ["ifm"]
      },
      "application/vnd.shana.informed.formtemplate": {
        source: "iana",
        extensions: ["itp"]
      },
      "application/vnd.shana.informed.interchange": {
        source: "iana",
        extensions: ["iif"]
      },
      "application/vnd.shana.informed.package": {
        source: "iana",
        extensions: ["ipk"]
      },
      "application/vnd.shootproof+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shopkick+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.shp": {
        source: "iana"
      },
      "application/vnd.shx": {
        source: "iana"
      },
      "application/vnd.sigrok.session": {
        source: "iana"
      },
      "application/vnd.simtech-mindmapper": {
        source: "iana",
        extensions: ["twd", "twds"]
      },
      "application/vnd.siren+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.smaf": {
        source: "iana",
        extensions: ["mmf"]
      },
      "application/vnd.smart.notebook": {
        source: "iana"
      },
      "application/vnd.smart.teacher": {
        source: "iana",
        extensions: ["teacher"]
      },
      "application/vnd.snesdev-page-table": {
        source: "iana"
      },
      "application/vnd.software602.filler.form+xml": {
        source: "iana",
        compressible: true,
        extensions: ["fo"]
      },
      "application/vnd.software602.filler.form-xml-zip": {
        source: "iana"
      },
      "application/vnd.solent.sdkm+xml": {
        source: "iana",
        compressible: true,
        extensions: ["sdkm", "sdkd"]
      },
      "application/vnd.spotfire.dxp": {
        source: "iana",
        extensions: ["dxp"]
      },
      "application/vnd.spotfire.sfs": {
        source: "iana",
        extensions: ["sfs"]
      },
      "application/vnd.sqlite3": {
        source: "iana"
      },
      "application/vnd.sss-cod": {
        source: "iana"
      },
      "application/vnd.sss-dtf": {
        source: "iana"
      },
      "application/vnd.sss-ntf": {
        source: "iana"
      },
      "application/vnd.stardivision.calc": {
        source: "apache",
        extensions: ["sdc"]
      },
      "application/vnd.stardivision.draw": {
        source: "apache",
        extensions: ["sda"]
      },
      "application/vnd.stardivision.impress": {
        source: "apache",
        extensions: ["sdd"]
      },
      "application/vnd.stardivision.math": {
        source: "apache",
        extensions: ["smf"]
      },
      "application/vnd.stardivision.writer": {
        source: "apache",
        extensions: ["sdw", "vor"]
      },
      "application/vnd.stardivision.writer-global": {
        source: "apache",
        extensions: ["sgl"]
      },
      "application/vnd.stepmania.package": {
        source: "iana",
        extensions: ["smzip"]
      },
      "application/vnd.stepmania.stepchart": {
        source: "iana",
        extensions: ["sm"]
      },
      "application/vnd.street-stream": {
        source: "iana"
      },
      "application/vnd.sun.wadl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wadl"]
      },
      "application/vnd.sun.xml.calc": {
        source: "apache",
        extensions: ["sxc"]
      },
      "application/vnd.sun.xml.calc.template": {
        source: "apache",
        extensions: ["stc"]
      },
      "application/vnd.sun.xml.draw": {
        source: "apache",
        extensions: ["sxd"]
      },
      "application/vnd.sun.xml.draw.template": {
        source: "apache",
        extensions: ["std"]
      },
      "application/vnd.sun.xml.impress": {
        source: "apache",
        extensions: ["sxi"]
      },
      "application/vnd.sun.xml.impress.template": {
        source: "apache",
        extensions: ["sti"]
      },
      "application/vnd.sun.xml.math": {
        source: "apache",
        extensions: ["sxm"]
      },
      "application/vnd.sun.xml.writer": {
        source: "apache",
        extensions: ["sxw"]
      },
      "application/vnd.sun.xml.writer.global": {
        source: "apache",
        extensions: ["sxg"]
      },
      "application/vnd.sun.xml.writer.template": {
        source: "apache",
        extensions: ["stw"]
      },
      "application/vnd.sus-calendar": {
        source: "iana",
        extensions: ["sus", "susp"]
      },
      "application/vnd.svd": {
        source: "iana",
        extensions: ["svd"]
      },
      "application/vnd.swiftview-ics": {
        source: "iana"
      },
      "application/vnd.sycle+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.syft+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.symbian.install": {
        source: "apache",
        extensions: ["sis", "sisx"]
      },
      "application/vnd.syncml+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xsm"]
      },
      "application/vnd.syncml.dm+wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["bdm"]
      },
      "application/vnd.syncml.dm+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["xdm"]
      },
      "application/vnd.syncml.dm.notification": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmddf+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["ddf"]
      },
      "application/vnd.syncml.dmtnds+wbxml": {
        source: "iana"
      },
      "application/vnd.syncml.dmtnds+xml": {
        source: "iana",
        charset: "UTF-8",
        compressible: true
      },
      "application/vnd.syncml.ds.notification": {
        source: "iana"
      },
      "application/vnd.tableschema+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tao.intent-module-archive": {
        source: "iana",
        extensions: ["tao"]
      },
      "application/vnd.tcpdump.pcap": {
        source: "iana",
        extensions: ["pcap", "cap", "dmp"]
      },
      "application/vnd.think-cell.ppttc+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tmd.mediaflex.api+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.tml": {
        source: "iana"
      },
      "application/vnd.tmobile-livetv": {
        source: "iana",
        extensions: ["tmo"]
      },
      "application/vnd.tri.onesource": {
        source: "iana"
      },
      "application/vnd.trid.tpt": {
        source: "iana",
        extensions: ["tpt"]
      },
      "application/vnd.triscape.mxs": {
        source: "iana",
        extensions: ["mxs"]
      },
      "application/vnd.trueapp": {
        source: "iana",
        extensions: ["tra"]
      },
      "application/vnd.truedoc": {
        source: "iana"
      },
      "application/vnd.ubisoft.webplayer": {
        source: "iana"
      },
      "application/vnd.ufdl": {
        source: "iana",
        extensions: ["ufd", "ufdl"]
      },
      "application/vnd.uiq.theme": {
        source: "iana",
        extensions: ["utz"]
      },
      "application/vnd.umajin": {
        source: "iana",
        extensions: ["umj"]
      },
      "application/vnd.unity": {
        source: "iana",
        extensions: ["unityweb"]
      },
      "application/vnd.uoml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["uoml"]
      },
      "application/vnd.uplanet.alert": {
        source: "iana"
      },
      "application/vnd.uplanet.alert-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice": {
        source: "iana"
      },
      "application/vnd.uplanet.bearer-choice-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop": {
        source: "iana"
      },
      "application/vnd.uplanet.cacheop-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.channel": {
        source: "iana"
      },
      "application/vnd.uplanet.channel-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.list": {
        source: "iana"
      },
      "application/vnd.uplanet.list-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd": {
        source: "iana"
      },
      "application/vnd.uplanet.listcmd-wbxml": {
        source: "iana"
      },
      "application/vnd.uplanet.signal": {
        source: "iana"
      },
      "application/vnd.uri-map": {
        source: "iana"
      },
      "application/vnd.valve.source.material": {
        source: "iana"
      },
      "application/vnd.vcx": {
        source: "iana",
        extensions: ["vcx"]
      },
      "application/vnd.vd-study": {
        source: "iana"
      },
      "application/vnd.vectorworks": {
        source: "iana"
      },
      "application/vnd.vel+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.verimatrix.vcas": {
        source: "iana"
      },
      "application/vnd.veritone.aion+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.veryant.thin": {
        source: "iana"
      },
      "application/vnd.ves.encrypted": {
        source: "iana"
      },
      "application/vnd.vidsoft.vidconference": {
        source: "iana"
      },
      "application/vnd.visio": {
        source: "iana",
        extensions: ["vsd", "vst", "vss", "vsw"]
      },
      "application/vnd.visionary": {
        source: "iana",
        extensions: ["vis"]
      },
      "application/vnd.vividence.scriptfile": {
        source: "iana"
      },
      "application/vnd.vsf": {
        source: "iana",
        extensions: ["vsf"]
      },
      "application/vnd.wap.sic": {
        source: "iana"
      },
      "application/vnd.wap.slc": {
        source: "iana"
      },
      "application/vnd.wap.wbxml": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["wbxml"]
      },
      "application/vnd.wap.wmlc": {
        source: "iana",
        extensions: ["wmlc"]
      },
      "application/vnd.wap.wmlscriptc": {
        source: "iana",
        extensions: ["wmlsc"]
      },
      "application/vnd.webturbo": {
        source: "iana",
        extensions: ["wtb"]
      },
      "application/vnd.wfa.dpp": {
        source: "iana"
      },
      "application/vnd.wfa.p2p": {
        source: "iana"
      },
      "application/vnd.wfa.wsc": {
        source: "iana"
      },
      "application/vnd.windows.devicepairing": {
        source: "iana"
      },
      "application/vnd.wmc": {
        source: "iana"
      },
      "application/vnd.wmf.bootstrap": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica": {
        source: "iana"
      },
      "application/vnd.wolfram.mathematica.package": {
        source: "iana"
      },
      "application/vnd.wolfram.player": {
        source: "iana",
        extensions: ["nbp"]
      },
      "application/vnd.wordperfect": {
        source: "iana",
        extensions: ["wpd"]
      },
      "application/vnd.wqd": {
        source: "iana",
        extensions: ["wqd"]
      },
      "application/vnd.wrq-hp3000-labelled": {
        source: "iana"
      },
      "application/vnd.wt.stf": {
        source: "iana",
        extensions: ["stf"]
      },
      "application/vnd.wv.csp+wbxml": {
        source: "iana"
      },
      "application/vnd.wv.csp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.wv.ssp+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xacml+json": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xara": {
        source: "iana",
        extensions: ["xar"]
      },
      "application/vnd.xfdl": {
        source: "iana",
        extensions: ["xfdl"]
      },
      "application/vnd.xfdl.webform": {
        source: "iana"
      },
      "application/vnd.xmi+xml": {
        source: "iana",
        compressible: true
      },
      "application/vnd.xmpie.cpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.dpkg": {
        source: "iana"
      },
      "application/vnd.xmpie.plan": {
        source: "iana"
      },
      "application/vnd.xmpie.ppkg": {
        source: "iana"
      },
      "application/vnd.xmpie.xlim": {
        source: "iana"
      },
      "application/vnd.yamaha.hv-dic": {
        source: "iana",
        extensions: ["hvd"]
      },
      "application/vnd.yamaha.hv-script": {
        source: "iana",
        extensions: ["hvs"]
      },
      "application/vnd.yamaha.hv-voice": {
        source: "iana",
        extensions: ["hvp"]
      },
      "application/vnd.yamaha.openscoreformat": {
        source: "iana",
        extensions: ["osf"]
      },
      "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["osfpvg"]
      },
      "application/vnd.yamaha.remote-setup": {
        source: "iana"
      },
      "application/vnd.yamaha.smaf-audio": {
        source: "iana",
        extensions: ["saf"]
      },
      "application/vnd.yamaha.smaf-phrase": {
        source: "iana",
        extensions: ["spf"]
      },
      "application/vnd.yamaha.through-ngn": {
        source: "iana"
      },
      "application/vnd.yamaha.tunnel-udpencap": {
        source: "iana"
      },
      "application/vnd.yaoweme": {
        source: "iana"
      },
      "application/vnd.yellowriver-custom-menu": {
        source: "iana",
        extensions: ["cmp"]
      },
      "application/vnd.youtube.yt": {
        source: "iana"
      },
      "application/vnd.zul": {
        source: "iana",
        extensions: ["zir", "zirz"]
      },
      "application/vnd.zzazz.deck+xml": {
        source: "iana",
        compressible: true,
        extensions: ["zaz"]
      },
      "application/voicexml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["vxml"]
      },
      "application/voucher-cms+json": {
        source: "iana",
        compressible: true
      },
      "application/vq-rtcpxr": {
        source: "iana"
      },
      "application/wasm": {
        source: "iana",
        compressible: true,
        extensions: ["wasm"]
      },
      "application/watcherinfo+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wif"]
      },
      "application/webpush-options+json": {
        source: "iana",
        compressible: true
      },
      "application/whoispp-query": {
        source: "iana"
      },
      "application/whoispp-response": {
        source: "iana"
      },
      "application/widget": {
        source: "iana",
        extensions: ["wgt"]
      },
      "application/winhlp": {
        source: "apache",
        extensions: ["hlp"]
      },
      "application/wita": {
        source: "iana"
      },
      "application/wordperfect5.1": {
        source: "iana"
      },
      "application/wsdl+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wsdl"]
      },
      "application/wspolicy+xml": {
        source: "iana",
        compressible: true,
        extensions: ["wspolicy"]
      },
      "application/x-7z-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["7z"]
      },
      "application/x-abiword": {
        source: "apache",
        extensions: ["abw"]
      },
      "application/x-ace-compressed": {
        source: "apache",
        extensions: ["ace"]
      },
      "application/x-amf": {
        source: "apache"
      },
      "application/x-apple-diskimage": {
        source: "apache",
        extensions: ["dmg"]
      },
      "application/x-arj": {
        compressible: false,
        extensions: ["arj"]
      },
      "application/x-authorware-bin": {
        source: "apache",
        extensions: ["aab", "x32", "u32", "vox"]
      },
      "application/x-authorware-map": {
        source: "apache",
        extensions: ["aam"]
      },
      "application/x-authorware-seg": {
        source: "apache",
        extensions: ["aas"]
      },
      "application/x-bcpio": {
        source: "apache",
        extensions: ["bcpio"]
      },
      "application/x-bdoc": {
        compressible: false,
        extensions: ["bdoc"]
      },
      "application/x-bittorrent": {
        source: "apache",
        extensions: ["torrent"]
      },
      "application/x-blorb": {
        source: "apache",
        extensions: ["blb", "blorb"]
      },
      "application/x-bzip": {
        source: "apache",
        compressible: false,
        extensions: ["bz"]
      },
      "application/x-bzip2": {
        source: "apache",
        compressible: false,
        extensions: ["bz2", "boz"]
      },
      "application/x-cbr": {
        source: "apache",
        extensions: ["cbr", "cba", "cbt", "cbz", "cb7"]
      },
      "application/x-cdlink": {
        source: "apache",
        extensions: ["vcd"]
      },
      "application/x-cfs-compressed": {
        source: "apache",
        extensions: ["cfs"]
      },
      "application/x-chat": {
        source: "apache",
        extensions: ["chat"]
      },
      "application/x-chess-pgn": {
        source: "apache",
        extensions: ["pgn"]
      },
      "application/x-chrome-extension": {
        extensions: ["crx"]
      },
      "application/x-cocoa": {
        source: "nginx",
        extensions: ["cco"]
      },
      "application/x-compress": {
        source: "apache"
      },
      "application/x-conference": {
        source: "apache",
        extensions: ["nsc"]
      },
      "application/x-cpio": {
        source: "apache",
        extensions: ["cpio"]
      },
      "application/x-csh": {
        source: "apache",
        extensions: ["csh"]
      },
      "application/x-deb": {
        compressible: false
      },
      "application/x-debian-package": {
        source: "apache",
        extensions: ["deb", "udeb"]
      },
      "application/x-dgc-compressed": {
        source: "apache",
        extensions: ["dgc"]
      },
      "application/x-director": {
        source: "apache",
        extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"]
      },
      "application/x-doom": {
        source: "apache",
        extensions: ["wad"]
      },
      "application/x-dtbncx+xml": {
        source: "apache",
        compressible: true,
        extensions: ["ncx"]
      },
      "application/x-dtbook+xml": {
        source: "apache",
        compressible: true,
        extensions: ["dtb"]
      },
      "application/x-dtbresource+xml": {
        source: "apache",
        compressible: true,
        extensions: ["res"]
      },
      "application/x-dvi": {
        source: "apache",
        compressible: false,
        extensions: ["dvi"]
      },
      "application/x-envoy": {
        source: "apache",
        extensions: ["evy"]
      },
      "application/x-eva": {
        source: "apache",
        extensions: ["eva"]
      },
      "application/x-font-bdf": {
        source: "apache",
        extensions: ["bdf"]
      },
      "application/x-font-dos": {
        source: "apache"
      },
      "application/x-font-framemaker": {
        source: "apache"
      },
      "application/x-font-ghostscript": {
        source: "apache",
        extensions: ["gsf"]
      },
      "application/x-font-libgrx": {
        source: "apache"
      },
      "application/x-font-linux-psf": {
        source: "apache",
        extensions: ["psf"]
      },
      "application/x-font-pcf": {
        source: "apache",
        extensions: ["pcf"]
      },
      "application/x-font-snf": {
        source: "apache",
        extensions: ["snf"]
      },
      "application/x-font-speedo": {
        source: "apache"
      },
      "application/x-font-sunos-news": {
        source: "apache"
      },
      "application/x-font-type1": {
        source: "apache",
        extensions: ["pfa", "pfb", "pfm", "afm"]
      },
      "application/x-font-vfont": {
        source: "apache"
      },
      "application/x-freearc": {
        source: "apache",
        extensions: ["arc"]
      },
      "application/x-futuresplash": {
        source: "apache",
        extensions: ["spl"]
      },
      "application/x-gca-compressed": {
        source: "apache",
        extensions: ["gca"]
      },
      "application/x-glulx": {
        source: "apache",
        extensions: ["ulx"]
      },
      "application/x-gnumeric": {
        source: "apache",
        extensions: ["gnumeric"]
      },
      "application/x-gramps-xml": {
        source: "apache",
        extensions: ["gramps"]
      },
      "application/x-gtar": {
        source: "apache",
        extensions: ["gtar"]
      },
      "application/x-gzip": {
        source: "apache"
      },
      "application/x-hdf": {
        source: "apache",
        extensions: ["hdf"]
      },
      "application/x-httpd-php": {
        compressible: true,
        extensions: ["php"]
      },
      "application/x-install-instructions": {
        source: "apache",
        extensions: ["install"]
      },
      "application/x-iso9660-image": {
        source: "apache",
        extensions: ["iso"]
      },
      "application/x-iwork-keynote-sffkey": {
        extensions: ["key"]
      },
      "application/x-iwork-numbers-sffnumbers": {
        extensions: ["numbers"]
      },
      "application/x-iwork-pages-sffpages": {
        extensions: ["pages"]
      },
      "application/x-java-archive-diff": {
        source: "nginx",
        extensions: ["jardiff"]
      },
      "application/x-java-jnlp-file": {
        source: "apache",
        compressible: false,
        extensions: ["jnlp"]
      },
      "application/x-javascript": {
        compressible: true
      },
      "application/x-keepass2": {
        extensions: ["kdbx"]
      },
      "application/x-latex": {
        source: "apache",
        compressible: false,
        extensions: ["latex"]
      },
      "application/x-lua-bytecode": {
        extensions: ["luac"]
      },
      "application/x-lzh-compressed": {
        source: "apache",
        extensions: ["lzh", "lha"]
      },
      "application/x-makeself": {
        source: "nginx",
        extensions: ["run"]
      },
      "application/x-mie": {
        source: "apache",
        extensions: ["mie"]
      },
      "application/x-mobipocket-ebook": {
        source: "apache",
        extensions: ["prc", "mobi"]
      },
      "application/x-mpegurl": {
        compressible: false
      },
      "application/x-ms-application": {
        source: "apache",
        extensions: ["application"]
      },
      "application/x-ms-shortcut": {
        source: "apache",
        extensions: ["lnk"]
      },
      "application/x-ms-wmd": {
        source: "apache",
        extensions: ["wmd"]
      },
      "application/x-ms-wmz": {
        source: "apache",
        extensions: ["wmz"]
      },
      "application/x-ms-xbap": {
        source: "apache",
        extensions: ["xbap"]
      },
      "application/x-msaccess": {
        source: "apache",
        extensions: ["mdb"]
      },
      "application/x-msbinder": {
        source: "apache",
        extensions: ["obd"]
      },
      "application/x-mscardfile": {
        source: "apache",
        extensions: ["crd"]
      },
      "application/x-msclip": {
        source: "apache",
        extensions: ["clp"]
      },
      "application/x-msdos-program": {
        extensions: ["exe"]
      },
      "application/x-msdownload": {
        source: "apache",
        extensions: ["exe", "dll", "com", "bat", "msi"]
      },
      "application/x-msmediaview": {
        source: "apache",
        extensions: ["mvb", "m13", "m14"]
      },
      "application/x-msmetafile": {
        source: "apache",
        extensions: ["wmf", "wmz", "emf", "emz"]
      },
      "application/x-msmoney": {
        source: "apache",
        extensions: ["mny"]
      },
      "application/x-mspublisher": {
        source: "apache",
        extensions: ["pub"]
      },
      "application/x-msschedule": {
        source: "apache",
        extensions: ["scd"]
      },
      "application/x-msterminal": {
        source: "apache",
        extensions: ["trm"]
      },
      "application/x-mswrite": {
        source: "apache",
        extensions: ["wri"]
      },
      "application/x-netcdf": {
        source: "apache",
        extensions: ["nc", "cdf"]
      },
      "application/x-ns-proxy-autoconfig": {
        compressible: true,
        extensions: ["pac"]
      },
      "application/x-nzb": {
        source: "apache",
        extensions: ["nzb"]
      },
      "application/x-perl": {
        source: "nginx",
        extensions: ["pl", "pm"]
      },
      "application/x-pilot": {
        source: "nginx",
        extensions: ["prc", "pdb"]
      },
      "application/x-pkcs12": {
        source: "apache",
        compressible: false,
        extensions: ["p12", "pfx"]
      },
      "application/x-pkcs7-certificates": {
        source: "apache",
        extensions: ["p7b", "spc"]
      },
      "application/x-pkcs7-certreqresp": {
        source: "apache",
        extensions: ["p7r"]
      },
      "application/x-pki-message": {
        source: "iana"
      },
      "application/x-rar-compressed": {
        source: "apache",
        compressible: false,
        extensions: ["rar"]
      },
      "application/x-redhat-package-manager": {
        source: "nginx",
        extensions: ["rpm"]
      },
      "application/x-research-info-systems": {
        source: "apache",
        extensions: ["ris"]
      },
      "application/x-sea": {
        source: "nginx",
        extensions: ["sea"]
      },
      "application/x-sh": {
        source: "apache",
        compressible: true,
        extensions: ["sh"]
      },
      "application/x-shar": {
        source: "apache",
        extensions: ["shar"]
      },
      "application/x-shockwave-flash": {
        source: "apache",
        compressible: false,
        extensions: ["swf"]
      },
      "application/x-silverlight-app": {
        source: "apache",
        extensions: ["xap"]
      },
      "application/x-sql": {
        source: "apache",
        extensions: ["sql"]
      },
      "application/x-stuffit": {
        source: "apache",
        compressible: false,
        extensions: ["sit"]
      },
      "application/x-stuffitx": {
        source: "apache",
        extensions: ["sitx"]
      },
      "application/x-subrip": {
        source: "apache",
        extensions: ["srt"]
      },
      "application/x-sv4cpio": {
        source: "apache",
        extensions: ["sv4cpio"]
      },
      "application/x-sv4crc": {
        source: "apache",
        extensions: ["sv4crc"]
      },
      "application/x-t3vm-image": {
        source: "apache",
        extensions: ["t3"]
      },
      "application/x-tads": {
        source: "apache",
        extensions: ["gam"]
      },
      "application/x-tar": {
        source: "apache",
        compressible: true,
        extensions: ["tar"]
      },
      "application/x-tcl": {
        source: "apache",
        extensions: ["tcl", "tk"]
      },
      "application/x-tex": {
        source: "apache",
        extensions: ["tex"]
      },
      "application/x-tex-tfm": {
        source: "apache",
        extensions: ["tfm"]
      },
      "application/x-texinfo": {
        source: "apache",
        extensions: ["texinfo", "texi"]
      },
      "application/x-tgif": {
        source: "apache",
        extensions: ["obj"]
      },
      "application/x-ustar": {
        source: "apache",
        extensions: ["ustar"]
      },
      "application/x-virtualbox-hdd": {
        compressible: true,
        extensions: ["hdd"]
      },
      "application/x-virtualbox-ova": {
        compressible: true,
        extensions: ["ova"]
      },
      "application/x-virtualbox-ovf": {
        compressible: true,
        extensions: ["ovf"]
      },
      "application/x-virtualbox-vbox": {
        compressible: true,
        extensions: ["vbox"]
      },
      "application/x-virtualbox-vbox-extpack": {
        compressible: false,
        extensions: ["vbox-extpack"]
      },
      "application/x-virtualbox-vdi": {
        compressible: true,
        extensions: ["vdi"]
      },
      "application/x-virtualbox-vhd": {
        compressible: true,
        extensions: ["vhd"]
      },
      "application/x-virtualbox-vmdk": {
        compressible: true,
        extensions: ["vmdk"]
      },
      "application/x-wais-source": {
        source: "apache",
        extensions: ["src"]
      },
      "application/x-web-app-manifest+json": {
        compressible: true,
        extensions: ["webapp"]
      },
      "application/x-www-form-urlencoded": {
        source: "iana",
        compressible: true
      },
      "application/x-x509-ca-cert": {
        source: "iana",
        extensions: ["der", "crt", "pem"]
      },
      "application/x-x509-ca-ra-cert": {
        source: "iana"
      },
      "application/x-x509-next-ca-cert": {
        source: "iana"
      },
      "application/x-xfig": {
        source: "apache",
        extensions: ["fig"]
      },
      "application/x-xliff+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/x-xpinstall": {
        source: "apache",
        compressible: false,
        extensions: ["xpi"]
      },
      "application/x-xz": {
        source: "apache",
        extensions: ["xz"]
      },
      "application/x-zmachine": {
        source: "apache",
        extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"]
      },
      "application/x400-bp": {
        source: "iana"
      },
      "application/xacml+xml": {
        source: "iana",
        compressible: true
      },
      "application/xaml+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xaml"]
      },
      "application/xcap-att+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xav"]
      },
      "application/xcap-caps+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xca"]
      },
      "application/xcap-diff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xdf"]
      },
      "application/xcap-el+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xel"]
      },
      "application/xcap-error+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcap-ns+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xns"]
      },
      "application/xcon-conference-info+xml": {
        source: "iana",
        compressible: true
      },
      "application/xcon-conference-info-diff+xml": {
        source: "iana",
        compressible: true
      },
      "application/xenc+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xenc"]
      },
      "application/xhtml+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xhtml", "xht"]
      },
      "application/xhtml-voice+xml": {
        source: "apache",
        compressible: true
      },
      "application/xliff+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xlf"]
      },
      "application/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml", "xsl", "xsd", "rng"]
      },
      "application/xml-dtd": {
        source: "iana",
        compressible: true,
        extensions: ["dtd"]
      },
      "application/xml-external-parsed-entity": {
        source: "iana"
      },
      "application/xml-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/xmpp+xml": {
        source: "iana",
        compressible: true
      },
      "application/xop+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xop"]
      },
      "application/xproc+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xpl"]
      },
      "application/xslt+xml": {
        source: "iana",
        compressible: true,
        extensions: ["xsl", "xslt"]
      },
      "application/xspf+xml": {
        source: "apache",
        compressible: true,
        extensions: ["xspf"]
      },
      "application/xv+xml": {
        source: "iana",
        compressible: true,
        extensions: ["mxml", "xhvml", "xvml", "xvm"]
      },
      "application/yang": {
        source: "iana",
        extensions: ["yang"]
      },
      "application/yang-data+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-data+xml": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+json": {
        source: "iana",
        compressible: true
      },
      "application/yang-patch+xml": {
        source: "iana",
        compressible: true
      },
      "application/yin+xml": {
        source: "iana",
        compressible: true,
        extensions: ["yin"]
      },
      "application/zip": {
        source: "iana",
        compressible: false,
        extensions: ["zip"]
      },
      "application/zlib": {
        source: "iana"
      },
      "application/zstd": {
        source: "iana"
      },
      "audio/1d-interleaved-parityfec": {
        source: "iana"
      },
      "audio/32kadpcm": {
        source: "iana"
      },
      "audio/3gpp": {
        source: "iana",
        compressible: false,
        extensions: ["3gpp"]
      },
      "audio/3gpp2": {
        source: "iana"
      },
      "audio/aac": {
        source: "iana"
      },
      "audio/ac3": {
        source: "iana"
      },
      "audio/adpcm": {
        source: "apache",
        extensions: ["adp"]
      },
      "audio/amr": {
        source: "iana",
        extensions: ["amr"]
      },
      "audio/amr-wb": {
        source: "iana"
      },
      "audio/amr-wb+": {
        source: "iana"
      },
      "audio/aptx": {
        source: "iana"
      },
      "audio/asc": {
        source: "iana"
      },
      "audio/atrac-advanced-lossless": {
        source: "iana"
      },
      "audio/atrac-x": {
        source: "iana"
      },
      "audio/atrac3": {
        source: "iana"
      },
      "audio/basic": {
        source: "iana",
        compressible: false,
        extensions: ["au", "snd"]
      },
      "audio/bv16": {
        source: "iana"
      },
      "audio/bv32": {
        source: "iana"
      },
      "audio/clearmode": {
        source: "iana"
      },
      "audio/cn": {
        source: "iana"
      },
      "audio/dat12": {
        source: "iana"
      },
      "audio/dls": {
        source: "iana"
      },
      "audio/dsr-es201108": {
        source: "iana"
      },
      "audio/dsr-es202050": {
        source: "iana"
      },
      "audio/dsr-es202211": {
        source: "iana"
      },
      "audio/dsr-es202212": {
        source: "iana"
      },
      "audio/dv": {
        source: "iana"
      },
      "audio/dvi4": {
        source: "iana"
      },
      "audio/eac3": {
        source: "iana"
      },
      "audio/encaprtp": {
        source: "iana"
      },
      "audio/evrc": {
        source: "iana"
      },
      "audio/evrc-qcp": {
        source: "iana"
      },
      "audio/evrc0": {
        source: "iana"
      },
      "audio/evrc1": {
        source: "iana"
      },
      "audio/evrcb": {
        source: "iana"
      },
      "audio/evrcb0": {
        source: "iana"
      },
      "audio/evrcb1": {
        source: "iana"
      },
      "audio/evrcnw": {
        source: "iana"
      },
      "audio/evrcnw0": {
        source: "iana"
      },
      "audio/evrcnw1": {
        source: "iana"
      },
      "audio/evrcwb": {
        source: "iana"
      },
      "audio/evrcwb0": {
        source: "iana"
      },
      "audio/evrcwb1": {
        source: "iana"
      },
      "audio/evs": {
        source: "iana"
      },
      "audio/flexfec": {
        source: "iana"
      },
      "audio/fwdred": {
        source: "iana"
      },
      "audio/g711-0": {
        source: "iana"
      },
      "audio/g719": {
        source: "iana"
      },
      "audio/g722": {
        source: "iana"
      },
      "audio/g7221": {
        source: "iana"
      },
      "audio/g723": {
        source: "iana"
      },
      "audio/g726-16": {
        source: "iana"
      },
      "audio/g726-24": {
        source: "iana"
      },
      "audio/g726-32": {
        source: "iana"
      },
      "audio/g726-40": {
        source: "iana"
      },
      "audio/g728": {
        source: "iana"
      },
      "audio/g729": {
        source: "iana"
      },
      "audio/g7291": {
        source: "iana"
      },
      "audio/g729d": {
        source: "iana"
      },
      "audio/g729e": {
        source: "iana"
      },
      "audio/gsm": {
        source: "iana"
      },
      "audio/gsm-efr": {
        source: "iana"
      },
      "audio/gsm-hr-08": {
        source: "iana"
      },
      "audio/ilbc": {
        source: "iana"
      },
      "audio/ip-mr_v2.5": {
        source: "iana"
      },
      "audio/isac": {
        source: "apache"
      },
      "audio/l16": {
        source: "iana"
      },
      "audio/l20": {
        source: "iana"
      },
      "audio/l24": {
        source: "iana",
        compressible: false
      },
      "audio/l8": {
        source: "iana"
      },
      "audio/lpc": {
        source: "iana"
      },
      "audio/melp": {
        source: "iana"
      },
      "audio/melp1200": {
        source: "iana"
      },
      "audio/melp2400": {
        source: "iana"
      },
      "audio/melp600": {
        source: "iana"
      },
      "audio/mhas": {
        source: "iana"
      },
      "audio/midi": {
        source: "apache",
        extensions: ["mid", "midi", "kar", "rmi"]
      },
      "audio/mobile-xmf": {
        source: "iana",
        extensions: ["mxmf"]
      },
      "audio/mp3": {
        compressible: false,
        extensions: ["mp3"]
      },
      "audio/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["m4a", "mp4a"]
      },
      "audio/mp4a-latm": {
        source: "iana"
      },
      "audio/mpa": {
        source: "iana"
      },
      "audio/mpa-robust": {
        source: "iana"
      },
      "audio/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"]
      },
      "audio/mpeg4-generic": {
        source: "iana"
      },
      "audio/musepack": {
        source: "apache"
      },
      "audio/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["oga", "ogg", "spx", "opus"]
      },
      "audio/opus": {
        source: "iana"
      },
      "audio/parityfec": {
        source: "iana"
      },
      "audio/pcma": {
        source: "iana"
      },
      "audio/pcma-wb": {
        source: "iana"
      },
      "audio/pcmu": {
        source: "iana"
      },
      "audio/pcmu-wb": {
        source: "iana"
      },
      "audio/prs.sid": {
        source: "iana"
      },
      "audio/qcelp": {
        source: "iana"
      },
      "audio/raptorfec": {
        source: "iana"
      },
      "audio/red": {
        source: "iana"
      },
      "audio/rtp-enc-aescm128": {
        source: "iana"
      },
      "audio/rtp-midi": {
        source: "iana"
      },
      "audio/rtploopback": {
        source: "iana"
      },
      "audio/rtx": {
        source: "iana"
      },
      "audio/s3m": {
        source: "apache",
        extensions: ["s3m"]
      },
      "audio/scip": {
        source: "iana"
      },
      "audio/silk": {
        source: "apache",
        extensions: ["sil"]
      },
      "audio/smv": {
        source: "iana"
      },
      "audio/smv-qcp": {
        source: "iana"
      },
      "audio/smv0": {
        source: "iana"
      },
      "audio/sofa": {
        source: "iana"
      },
      "audio/sp-midi": {
        source: "iana"
      },
      "audio/speex": {
        source: "iana"
      },
      "audio/t140c": {
        source: "iana"
      },
      "audio/t38": {
        source: "iana"
      },
      "audio/telephone-event": {
        source: "iana"
      },
      "audio/tetra_acelp": {
        source: "iana"
      },
      "audio/tetra_acelp_bb": {
        source: "iana"
      },
      "audio/tone": {
        source: "iana"
      },
      "audio/tsvcis": {
        source: "iana"
      },
      "audio/uemclip": {
        source: "iana"
      },
      "audio/ulpfec": {
        source: "iana"
      },
      "audio/usac": {
        source: "iana"
      },
      "audio/vdvi": {
        source: "iana"
      },
      "audio/vmr-wb": {
        source: "iana"
      },
      "audio/vnd.3gpp.iufp": {
        source: "iana"
      },
      "audio/vnd.4sb": {
        source: "iana"
      },
      "audio/vnd.audiokoz": {
        source: "iana"
      },
      "audio/vnd.celp": {
        source: "iana"
      },
      "audio/vnd.cisco.nse": {
        source: "iana"
      },
      "audio/vnd.cmles.radio-events": {
        source: "iana"
      },
      "audio/vnd.cns.anp1": {
        source: "iana"
      },
      "audio/vnd.cns.inf1": {
        source: "iana"
      },
      "audio/vnd.dece.audio": {
        source: "iana",
        extensions: ["uva", "uvva"]
      },
      "audio/vnd.digital-winds": {
        source: "iana",
        extensions: ["eol"]
      },
      "audio/vnd.dlna.adts": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.1": {
        source: "iana"
      },
      "audio/vnd.dolby.heaac.2": {
        source: "iana"
      },
      "audio/vnd.dolby.mlp": {
        source: "iana"
      },
      "audio/vnd.dolby.mps": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2x": {
        source: "iana"
      },
      "audio/vnd.dolby.pl2z": {
        source: "iana"
      },
      "audio/vnd.dolby.pulse.1": {
        source: "iana"
      },
      "audio/vnd.dra": {
        source: "iana",
        extensions: ["dra"]
      },
      "audio/vnd.dts": {
        source: "iana",
        extensions: ["dts"]
      },
      "audio/vnd.dts.hd": {
        source: "iana",
        extensions: ["dtshd"]
      },
      "audio/vnd.dts.uhd": {
        source: "iana"
      },
      "audio/vnd.dvb.file": {
        source: "iana"
      },
      "audio/vnd.everad.plj": {
        source: "iana"
      },
      "audio/vnd.hns.audio": {
        source: "iana"
      },
      "audio/vnd.lucent.voice": {
        source: "iana",
        extensions: ["lvp"]
      },
      "audio/vnd.ms-playready.media.pya": {
        source: "iana",
        extensions: ["pya"]
      },
      "audio/vnd.nokia.mobile-xmf": {
        source: "iana"
      },
      "audio/vnd.nortel.vbk": {
        source: "iana"
      },
      "audio/vnd.nuera.ecelp4800": {
        source: "iana",
        extensions: ["ecelp4800"]
      },
      "audio/vnd.nuera.ecelp7470": {
        source: "iana",
        extensions: ["ecelp7470"]
      },
      "audio/vnd.nuera.ecelp9600": {
        source: "iana",
        extensions: ["ecelp9600"]
      },
      "audio/vnd.octel.sbc": {
        source: "iana"
      },
      "audio/vnd.presonus.multitrack": {
        source: "iana"
      },
      "audio/vnd.qcelp": {
        source: "iana"
      },
      "audio/vnd.rhetorex.32kadpcm": {
        source: "iana"
      },
      "audio/vnd.rip": {
        source: "iana",
        extensions: ["rip"]
      },
      "audio/vnd.rn-realaudio": {
        compressible: false
      },
      "audio/vnd.sealedmedia.softseal.mpeg": {
        source: "iana"
      },
      "audio/vnd.vmx.cvsd": {
        source: "iana"
      },
      "audio/vnd.wave": {
        compressible: false
      },
      "audio/vorbis": {
        source: "iana",
        compressible: false
      },
      "audio/vorbis-config": {
        source: "iana"
      },
      "audio/wav": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/wave": {
        compressible: false,
        extensions: ["wav"]
      },
      "audio/webm": {
        source: "apache",
        compressible: false,
        extensions: ["weba"]
      },
      "audio/x-aac": {
        source: "apache",
        compressible: false,
        extensions: ["aac"]
      },
      "audio/x-aiff": {
        source: "apache",
        extensions: ["aif", "aiff", "aifc"]
      },
      "audio/x-caf": {
        source: "apache",
        compressible: false,
        extensions: ["caf"]
      },
      "audio/x-flac": {
        source: "apache",
        extensions: ["flac"]
      },
      "audio/x-m4a": {
        source: "nginx",
        extensions: ["m4a"]
      },
      "audio/x-matroska": {
        source: "apache",
        extensions: ["mka"]
      },
      "audio/x-mpegurl": {
        source: "apache",
        extensions: ["m3u"]
      },
      "audio/x-ms-wax": {
        source: "apache",
        extensions: ["wax"]
      },
      "audio/x-ms-wma": {
        source: "apache",
        extensions: ["wma"]
      },
      "audio/x-pn-realaudio": {
        source: "apache",
        extensions: ["ram", "ra"]
      },
      "audio/x-pn-realaudio-plugin": {
        source: "apache",
        extensions: ["rmp"]
      },
      "audio/x-realaudio": {
        source: "nginx",
        extensions: ["ra"]
      },
      "audio/x-tta": {
        source: "apache"
      },
      "audio/x-wav": {
        source: "apache",
        extensions: ["wav"]
      },
      "audio/xm": {
        source: "apache",
        extensions: ["xm"]
      },
      "chemical/x-cdx": {
        source: "apache",
        extensions: ["cdx"]
      },
      "chemical/x-cif": {
        source: "apache",
        extensions: ["cif"]
      },
      "chemical/x-cmdf": {
        source: "apache",
        extensions: ["cmdf"]
      },
      "chemical/x-cml": {
        source: "apache",
        extensions: ["cml"]
      },
      "chemical/x-csml": {
        source: "apache",
        extensions: ["csml"]
      },
      "chemical/x-pdb": {
        source: "apache"
      },
      "chemical/x-xyz": {
        source: "apache",
        extensions: ["xyz"]
      },
      "font/collection": {
        source: "iana",
        extensions: ["ttc"]
      },
      "font/otf": {
        source: "iana",
        compressible: true,
        extensions: ["otf"]
      },
      "font/sfnt": {
        source: "iana"
      },
      "font/ttf": {
        source: "iana",
        compressible: true,
        extensions: ["ttf"]
      },
      "font/woff": {
        source: "iana",
        extensions: ["woff"]
      },
      "font/woff2": {
        source: "iana",
        extensions: ["woff2"]
      },
      "image/aces": {
        source: "iana",
        extensions: ["exr"]
      },
      "image/apng": {
        compressible: false,
        extensions: ["apng"]
      },
      "image/avci": {
        source: "iana",
        extensions: ["avci"]
      },
      "image/avcs": {
        source: "iana",
        extensions: ["avcs"]
      },
      "image/avif": {
        source: "iana",
        compressible: false,
        extensions: ["avif"]
      },
      "image/bmp": {
        source: "iana",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/cgm": {
        source: "iana",
        extensions: ["cgm"]
      },
      "image/dicom-rle": {
        source: "iana",
        extensions: ["drle"]
      },
      "image/emf": {
        source: "iana",
        extensions: ["emf"]
      },
      "image/fits": {
        source: "iana",
        extensions: ["fits"]
      },
      "image/g3fax": {
        source: "iana",
        extensions: ["g3"]
      },
      "image/gif": {
        source: "iana",
        compressible: false,
        extensions: ["gif"]
      },
      "image/heic": {
        source: "iana",
        extensions: ["heic"]
      },
      "image/heic-sequence": {
        source: "iana",
        extensions: ["heics"]
      },
      "image/heif": {
        source: "iana",
        extensions: ["heif"]
      },
      "image/heif-sequence": {
        source: "iana",
        extensions: ["heifs"]
      },
      "image/hej2k": {
        source: "iana",
        extensions: ["hej2"]
      },
      "image/hsj2": {
        source: "iana",
        extensions: ["hsj2"]
      },
      "image/ief": {
        source: "iana",
        extensions: ["ief"]
      },
      "image/jls": {
        source: "iana",
        extensions: ["jls"]
      },
      "image/jp2": {
        source: "iana",
        compressible: false,
        extensions: ["jp2", "jpg2"]
      },
      "image/jpeg": {
        source: "iana",
        compressible: false,
        extensions: ["jpeg", "jpg", "jpe"]
      },
      "image/jph": {
        source: "iana",
        extensions: ["jph"]
      },
      "image/jphc": {
        source: "iana",
        extensions: ["jhc"]
      },
      "image/jpm": {
        source: "iana",
        compressible: false,
        extensions: ["jpm"]
      },
      "image/jpx": {
        source: "iana",
        compressible: false,
        extensions: ["jpx", "jpf"]
      },
      "image/jxr": {
        source: "iana",
        extensions: ["jxr"]
      },
      "image/jxra": {
        source: "iana",
        extensions: ["jxra"]
      },
      "image/jxrs": {
        source: "iana",
        extensions: ["jxrs"]
      },
      "image/jxs": {
        source: "iana",
        extensions: ["jxs"]
      },
      "image/jxsc": {
        source: "iana",
        extensions: ["jxsc"]
      },
      "image/jxsi": {
        source: "iana",
        extensions: ["jxsi"]
      },
      "image/jxss": {
        source: "iana",
        extensions: ["jxss"]
      },
      "image/ktx": {
        source: "iana",
        extensions: ["ktx"]
      },
      "image/ktx2": {
        source: "iana",
        extensions: ["ktx2"]
      },
      "image/naplps": {
        source: "iana"
      },
      "image/pjpeg": {
        compressible: false
      },
      "image/png": {
        source: "iana",
        compressible: false,
        extensions: ["png"]
      },
      "image/prs.btif": {
        source: "iana",
        extensions: ["btif"]
      },
      "image/prs.pti": {
        source: "iana",
        extensions: ["pti"]
      },
      "image/pwg-raster": {
        source: "iana"
      },
      "image/sgi": {
        source: "apache",
        extensions: ["sgi"]
      },
      "image/svg+xml": {
        source: "iana",
        compressible: true,
        extensions: ["svg", "svgz"]
      },
      "image/t38": {
        source: "iana",
        extensions: ["t38"]
      },
      "image/tiff": {
        source: "iana",
        compressible: false,
        extensions: ["tif", "tiff"]
      },
      "image/tiff-fx": {
        source: "iana",
        extensions: ["tfx"]
      },
      "image/vnd.adobe.photoshop": {
        source: "iana",
        compressible: true,
        extensions: ["psd"]
      },
      "image/vnd.airzip.accelerator.azv": {
        source: "iana",
        extensions: ["azv"]
      },
      "image/vnd.cns.inf2": {
        source: "iana"
      },
      "image/vnd.dece.graphic": {
        source: "iana",
        extensions: ["uvi", "uvvi", "uvg", "uvvg"]
      },
      "image/vnd.djvu": {
        source: "iana",
        extensions: ["djvu", "djv"]
      },
      "image/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "image/vnd.dwg": {
        source: "iana",
        extensions: ["dwg"]
      },
      "image/vnd.dxf": {
        source: "iana",
        extensions: ["dxf"]
      },
      "image/vnd.fastbidsheet": {
        source: "iana",
        extensions: ["fbs"]
      },
      "image/vnd.fpx": {
        source: "iana",
        extensions: ["fpx"]
      },
      "image/vnd.fst": {
        source: "iana",
        extensions: ["fst"]
      },
      "image/vnd.fujixerox.edmics-mmr": {
        source: "iana",
        extensions: ["mmr"]
      },
      "image/vnd.fujixerox.edmics-rlc": {
        source: "iana",
        extensions: ["rlc"]
      },
      "image/vnd.globalgraphics.pgb": {
        source: "iana"
      },
      "image/vnd.microsoft.icon": {
        source: "iana",
        compressible: true,
        extensions: ["ico"]
      },
      "image/vnd.mix": {
        source: "iana"
      },
      "image/vnd.mozilla.apng": {
        source: "iana"
      },
      "image/vnd.ms-dds": {
        compressible: true,
        extensions: ["dds"]
      },
      "image/vnd.ms-modi": {
        source: "iana",
        extensions: ["mdi"]
      },
      "image/vnd.ms-photo": {
        source: "apache",
        extensions: ["wdp"]
      },
      "image/vnd.net-fpx": {
        source: "iana",
        extensions: ["npx"]
      },
      "image/vnd.pco.b16": {
        source: "iana",
        extensions: ["b16"]
      },
      "image/vnd.radiance": {
        source: "iana"
      },
      "image/vnd.sealed.png": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.gif": {
        source: "iana"
      },
      "image/vnd.sealedmedia.softseal.jpg": {
        source: "iana"
      },
      "image/vnd.svf": {
        source: "iana"
      },
      "image/vnd.tencent.tap": {
        source: "iana",
        extensions: ["tap"]
      },
      "image/vnd.valve.source.texture": {
        source: "iana",
        extensions: ["vtf"]
      },
      "image/vnd.wap.wbmp": {
        source: "iana",
        extensions: ["wbmp"]
      },
      "image/vnd.xiff": {
        source: "iana",
        extensions: ["xif"]
      },
      "image/vnd.zbrush.pcx": {
        source: "iana",
        extensions: ["pcx"]
      },
      "image/webp": {
        source: "apache",
        extensions: ["webp"]
      },
      "image/wmf": {
        source: "iana",
        extensions: ["wmf"]
      },
      "image/x-3ds": {
        source: "apache",
        extensions: ["3ds"]
      },
      "image/x-cmu-raster": {
        source: "apache",
        extensions: ["ras"]
      },
      "image/x-cmx": {
        source: "apache",
        extensions: ["cmx"]
      },
      "image/x-freehand": {
        source: "apache",
        extensions: ["fh", "fhc", "fh4", "fh5", "fh7"]
      },
      "image/x-icon": {
        source: "apache",
        compressible: true,
        extensions: ["ico"]
      },
      "image/x-jng": {
        source: "nginx",
        extensions: ["jng"]
      },
      "image/x-mrsid-image": {
        source: "apache",
        extensions: ["sid"]
      },
      "image/x-ms-bmp": {
        source: "nginx",
        compressible: true,
        extensions: ["bmp"]
      },
      "image/x-pcx": {
        source: "apache",
        extensions: ["pcx"]
      },
      "image/x-pict": {
        source: "apache",
        extensions: ["pic", "pct"]
      },
      "image/x-portable-anymap": {
        source: "apache",
        extensions: ["pnm"]
      },
      "image/x-portable-bitmap": {
        source: "apache",
        extensions: ["pbm"]
      },
      "image/x-portable-graymap": {
        source: "apache",
        extensions: ["pgm"]
      },
      "image/x-portable-pixmap": {
        source: "apache",
        extensions: ["ppm"]
      },
      "image/x-rgb": {
        source: "apache",
        extensions: ["rgb"]
      },
      "image/x-tga": {
        source: "apache",
        extensions: ["tga"]
      },
      "image/x-xbitmap": {
        source: "apache",
        extensions: ["xbm"]
      },
      "image/x-xcf": {
        compressible: false
      },
      "image/x-xpixmap": {
        source: "apache",
        extensions: ["xpm"]
      },
      "image/x-xwindowdump": {
        source: "apache",
        extensions: ["xwd"]
      },
      "message/cpim": {
        source: "iana"
      },
      "message/delivery-status": {
        source: "iana"
      },
      "message/disposition-notification": {
        source: "iana",
        extensions: [
          "disposition-notification"
        ]
      },
      "message/external-body": {
        source: "iana"
      },
      "message/feedback-report": {
        source: "iana"
      },
      "message/global": {
        source: "iana",
        extensions: ["u8msg"]
      },
      "message/global-delivery-status": {
        source: "iana",
        extensions: ["u8dsn"]
      },
      "message/global-disposition-notification": {
        source: "iana",
        extensions: ["u8mdn"]
      },
      "message/global-headers": {
        source: "iana",
        extensions: ["u8hdr"]
      },
      "message/http": {
        source: "iana",
        compressible: false
      },
      "message/imdn+xml": {
        source: "iana",
        compressible: true
      },
      "message/news": {
        source: "iana"
      },
      "message/partial": {
        source: "iana",
        compressible: false
      },
      "message/rfc822": {
        source: "iana",
        compressible: true,
        extensions: ["eml", "mime"]
      },
      "message/s-http": {
        source: "iana"
      },
      "message/sip": {
        source: "iana"
      },
      "message/sipfrag": {
        source: "iana"
      },
      "message/tracking-status": {
        source: "iana"
      },
      "message/vnd.si.simp": {
        source: "iana"
      },
      "message/vnd.wfa.wsc": {
        source: "iana",
        extensions: ["wsc"]
      },
      "model/3mf": {
        source: "iana",
        extensions: ["3mf"]
      },
      "model/e57": {
        source: "iana"
      },
      "model/gltf+json": {
        source: "iana",
        compressible: true,
        extensions: ["gltf"]
      },
      "model/gltf-binary": {
        source: "iana",
        compressible: true,
        extensions: ["glb"]
      },
      "model/iges": {
        source: "iana",
        compressible: false,
        extensions: ["igs", "iges"]
      },
      "model/mesh": {
        source: "iana",
        compressible: false,
        extensions: ["msh", "mesh", "silo"]
      },
      "model/mtl": {
        source: "iana",
        extensions: ["mtl"]
      },
      "model/obj": {
        source: "iana",
        extensions: ["obj"]
      },
      "model/step": {
        source: "iana"
      },
      "model/step+xml": {
        source: "iana",
        compressible: true,
        extensions: ["stpx"]
      },
      "model/step+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpz"]
      },
      "model/step-xml+zip": {
        source: "iana",
        compressible: false,
        extensions: ["stpxz"]
      },
      "model/stl": {
        source: "iana",
        extensions: ["stl"]
      },
      "model/vnd.collada+xml": {
        source: "iana",
        compressible: true,
        extensions: ["dae"]
      },
      "model/vnd.dwf": {
        source: "iana",
        extensions: ["dwf"]
      },
      "model/vnd.flatland.3dml": {
        source: "iana"
      },
      "model/vnd.gdl": {
        source: "iana",
        extensions: ["gdl"]
      },
      "model/vnd.gs-gdl": {
        source: "apache"
      },
      "model/vnd.gs.gdl": {
        source: "iana"
      },
      "model/vnd.gtw": {
        source: "iana",
        extensions: ["gtw"]
      },
      "model/vnd.moml+xml": {
        source: "iana",
        compressible: true
      },
      "model/vnd.mts": {
        source: "iana",
        extensions: ["mts"]
      },
      "model/vnd.opengex": {
        source: "iana",
        extensions: ["ogex"]
      },
      "model/vnd.parasolid.transmit.binary": {
        source: "iana",
        extensions: ["x_b"]
      },
      "model/vnd.parasolid.transmit.text": {
        source: "iana",
        extensions: ["x_t"]
      },
      "model/vnd.pytha.pyox": {
        source: "iana"
      },
      "model/vnd.rosette.annotated-data-model": {
        source: "iana"
      },
      "model/vnd.sap.vds": {
        source: "iana",
        extensions: ["vds"]
      },
      "model/vnd.usdz+zip": {
        source: "iana",
        compressible: false,
        extensions: ["usdz"]
      },
      "model/vnd.valve.source.compiled-map": {
        source: "iana",
        extensions: ["bsp"]
      },
      "model/vnd.vtu": {
        source: "iana",
        extensions: ["vtu"]
      },
      "model/vrml": {
        source: "iana",
        compressible: false,
        extensions: ["wrl", "vrml"]
      },
      "model/x3d+binary": {
        source: "apache",
        compressible: false,
        extensions: ["x3db", "x3dbz"]
      },
      "model/x3d+fastinfoset": {
        source: "iana",
        extensions: ["x3db"]
      },
      "model/x3d+vrml": {
        source: "apache",
        compressible: false,
        extensions: ["x3dv", "x3dvz"]
      },
      "model/x3d+xml": {
        source: "iana",
        compressible: true,
        extensions: ["x3d", "x3dz"]
      },
      "model/x3d-vrml": {
        source: "iana",
        extensions: ["x3dv"]
      },
      "multipart/alternative": {
        source: "iana",
        compressible: false
      },
      "multipart/appledouble": {
        source: "iana"
      },
      "multipart/byteranges": {
        source: "iana"
      },
      "multipart/digest": {
        source: "iana"
      },
      "multipart/encrypted": {
        source: "iana",
        compressible: false
      },
      "multipart/form-data": {
        source: "iana",
        compressible: false
      },
      "multipart/header-set": {
        source: "iana"
      },
      "multipart/mixed": {
        source: "iana"
      },
      "multipart/multilingual": {
        source: "iana"
      },
      "multipart/parallel": {
        source: "iana"
      },
      "multipart/related": {
        source: "iana",
        compressible: false
      },
      "multipart/report": {
        source: "iana"
      },
      "multipart/signed": {
        source: "iana",
        compressible: false
      },
      "multipart/vnd.bint.med-plus": {
        source: "iana"
      },
      "multipart/voice-message": {
        source: "iana"
      },
      "multipart/x-mixed-replace": {
        source: "iana"
      },
      "text/1d-interleaved-parityfec": {
        source: "iana"
      },
      "text/cache-manifest": {
        source: "iana",
        compressible: true,
        extensions: ["appcache", "manifest"]
      },
      "text/calendar": {
        source: "iana",
        extensions: ["ics", "ifb"]
      },
      "text/calender": {
        compressible: true
      },
      "text/cmd": {
        compressible: true
      },
      "text/coffeescript": {
        extensions: ["coffee", "litcoffee"]
      },
      "text/cql": {
        source: "iana"
      },
      "text/cql-expression": {
        source: "iana"
      },
      "text/cql-identifier": {
        source: "iana"
      },
      "text/css": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["css"]
      },
      "text/csv": {
        source: "iana",
        compressible: true,
        extensions: ["csv"]
      },
      "text/csv-schema": {
        source: "iana"
      },
      "text/directory": {
        source: "iana"
      },
      "text/dns": {
        source: "iana"
      },
      "text/ecmascript": {
        source: "iana"
      },
      "text/encaprtp": {
        source: "iana"
      },
      "text/enriched": {
        source: "iana"
      },
      "text/fhirpath": {
        source: "iana"
      },
      "text/flexfec": {
        source: "iana"
      },
      "text/fwdred": {
        source: "iana"
      },
      "text/gff3": {
        source: "iana"
      },
      "text/grammar-ref-list": {
        source: "iana"
      },
      "text/html": {
        source: "iana",
        compressible: true,
        extensions: ["html", "htm", "shtml"]
      },
      "text/jade": {
        extensions: ["jade"]
      },
      "text/javascript": {
        source: "iana",
        compressible: true
      },
      "text/jcr-cnd": {
        source: "iana"
      },
      "text/jsx": {
        compressible: true,
        extensions: ["jsx"]
      },
      "text/less": {
        compressible: true,
        extensions: ["less"]
      },
      "text/markdown": {
        source: "iana",
        compressible: true,
        extensions: ["markdown", "md"]
      },
      "text/mathml": {
        source: "nginx",
        extensions: ["mml"]
      },
      "text/mdx": {
        compressible: true,
        extensions: ["mdx"]
      },
      "text/mizar": {
        source: "iana"
      },
      "text/n3": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["n3"]
      },
      "text/parameters": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/parityfec": {
        source: "iana"
      },
      "text/plain": {
        source: "iana",
        compressible: true,
        extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"]
      },
      "text/provenance-notation": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/prs.fallenstein.rst": {
        source: "iana"
      },
      "text/prs.lines.tag": {
        source: "iana",
        extensions: ["dsc"]
      },
      "text/prs.prop.logic": {
        source: "iana"
      },
      "text/raptorfec": {
        source: "iana"
      },
      "text/red": {
        source: "iana"
      },
      "text/rfc822-headers": {
        source: "iana"
      },
      "text/richtext": {
        source: "iana",
        compressible: true,
        extensions: ["rtx"]
      },
      "text/rtf": {
        source: "iana",
        compressible: true,
        extensions: ["rtf"]
      },
      "text/rtp-enc-aescm128": {
        source: "iana"
      },
      "text/rtploopback": {
        source: "iana"
      },
      "text/rtx": {
        source: "iana"
      },
      "text/sgml": {
        source: "iana",
        extensions: ["sgml", "sgm"]
      },
      "text/shaclc": {
        source: "iana"
      },
      "text/shex": {
        source: "iana",
        extensions: ["shex"]
      },
      "text/slim": {
        extensions: ["slim", "slm"]
      },
      "text/spdx": {
        source: "iana",
        extensions: ["spdx"]
      },
      "text/strings": {
        source: "iana"
      },
      "text/stylus": {
        extensions: ["stylus", "styl"]
      },
      "text/t140": {
        source: "iana"
      },
      "text/tab-separated-values": {
        source: "iana",
        compressible: true,
        extensions: ["tsv"]
      },
      "text/troff": {
        source: "iana",
        extensions: ["t", "tr", "roff", "man", "me", "ms"]
      },
      "text/turtle": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["ttl"]
      },
      "text/ulpfec": {
        source: "iana"
      },
      "text/uri-list": {
        source: "iana",
        compressible: true,
        extensions: ["uri", "uris", "urls"]
      },
      "text/vcard": {
        source: "iana",
        compressible: true,
        extensions: ["vcard"]
      },
      "text/vnd.a": {
        source: "iana"
      },
      "text/vnd.abc": {
        source: "iana"
      },
      "text/vnd.ascii-art": {
        source: "iana"
      },
      "text/vnd.curl": {
        source: "iana",
        extensions: ["curl"]
      },
      "text/vnd.curl.dcurl": {
        source: "apache",
        extensions: ["dcurl"]
      },
      "text/vnd.curl.mcurl": {
        source: "apache",
        extensions: ["mcurl"]
      },
      "text/vnd.curl.scurl": {
        source: "apache",
        extensions: ["scurl"]
      },
      "text/vnd.debian.copyright": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.dmclientscript": {
        source: "iana"
      },
      "text/vnd.dvb.subtitle": {
        source: "iana",
        extensions: ["sub"]
      },
      "text/vnd.esmertec.theme-descriptor": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.familysearch.gedcom": {
        source: "iana",
        extensions: ["ged"]
      },
      "text/vnd.ficlab.flt": {
        source: "iana"
      },
      "text/vnd.fly": {
        source: "iana",
        extensions: ["fly"]
      },
      "text/vnd.fmi.flexstor": {
        source: "iana",
        extensions: ["flx"]
      },
      "text/vnd.gml": {
        source: "iana"
      },
      "text/vnd.graphviz": {
        source: "iana",
        extensions: ["gv"]
      },
      "text/vnd.hans": {
        source: "iana"
      },
      "text/vnd.hgl": {
        source: "iana"
      },
      "text/vnd.in3d.3dml": {
        source: "iana",
        extensions: ["3dml"]
      },
      "text/vnd.in3d.spot": {
        source: "iana",
        extensions: ["spot"]
      },
      "text/vnd.iptc.newsml": {
        source: "iana"
      },
      "text/vnd.iptc.nitf": {
        source: "iana"
      },
      "text/vnd.latex-z": {
        source: "iana"
      },
      "text/vnd.motorola.reflex": {
        source: "iana"
      },
      "text/vnd.ms-mediapackage": {
        source: "iana"
      },
      "text/vnd.net2phone.commcenter.command": {
        source: "iana"
      },
      "text/vnd.radisys.msml-basic-layout": {
        source: "iana"
      },
      "text/vnd.senx.warpscript": {
        source: "iana"
      },
      "text/vnd.si.uricatalogue": {
        source: "iana"
      },
      "text/vnd.sosi": {
        source: "iana"
      },
      "text/vnd.sun.j2me.app-descriptor": {
        source: "iana",
        charset: "UTF-8",
        extensions: ["jad"]
      },
      "text/vnd.trolltech.linguist": {
        source: "iana",
        charset: "UTF-8"
      },
      "text/vnd.wap.si": {
        source: "iana"
      },
      "text/vnd.wap.sl": {
        source: "iana"
      },
      "text/vnd.wap.wml": {
        source: "iana",
        extensions: ["wml"]
      },
      "text/vnd.wap.wmlscript": {
        source: "iana",
        extensions: ["wmls"]
      },
      "text/vtt": {
        source: "iana",
        charset: "UTF-8",
        compressible: true,
        extensions: ["vtt"]
      },
      "text/x-asm": {
        source: "apache",
        extensions: ["s", "asm"]
      },
      "text/x-c": {
        source: "apache",
        extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"]
      },
      "text/x-component": {
        source: "nginx",
        extensions: ["htc"]
      },
      "text/x-fortran": {
        source: "apache",
        extensions: ["f", "for", "f77", "f90"]
      },
      "text/x-gwt-rpc": {
        compressible: true
      },
      "text/x-handlebars-template": {
        extensions: ["hbs"]
      },
      "text/x-java-source": {
        source: "apache",
        extensions: ["java"]
      },
      "text/x-jquery-tmpl": {
        compressible: true
      },
      "text/x-lua": {
        extensions: ["lua"]
      },
      "text/x-markdown": {
        compressible: true,
        extensions: ["mkd"]
      },
      "text/x-nfo": {
        source: "apache",
        extensions: ["nfo"]
      },
      "text/x-opml": {
        source: "apache",
        extensions: ["opml"]
      },
      "text/x-org": {
        compressible: true,
        extensions: ["org"]
      },
      "text/x-pascal": {
        source: "apache",
        extensions: ["p", "pas"]
      },
      "text/x-processing": {
        compressible: true,
        extensions: ["pde"]
      },
      "text/x-sass": {
        extensions: ["sass"]
      },
      "text/x-scss": {
        extensions: ["scss"]
      },
      "text/x-setext": {
        source: "apache",
        extensions: ["etx"]
      },
      "text/x-sfv": {
        source: "apache",
        extensions: ["sfv"]
      },
      "text/x-suse-ymp": {
        compressible: true,
        extensions: ["ymp"]
      },
      "text/x-uuencode": {
        source: "apache",
        extensions: ["uu"]
      },
      "text/x-vcalendar": {
        source: "apache",
        extensions: ["vcs"]
      },
      "text/x-vcard": {
        source: "apache",
        extensions: ["vcf"]
      },
      "text/xml": {
        source: "iana",
        compressible: true,
        extensions: ["xml"]
      },
      "text/xml-external-parsed-entity": {
        source: "iana"
      },
      "text/yaml": {
        compressible: true,
        extensions: ["yaml", "yml"]
      },
      "video/1d-interleaved-parityfec": {
        source: "iana"
      },
      "video/3gpp": {
        source: "iana",
        extensions: ["3gp", "3gpp"]
      },
      "video/3gpp-tt": {
        source: "iana"
      },
      "video/3gpp2": {
        source: "iana",
        extensions: ["3g2"]
      },
      "video/av1": {
        source: "iana"
      },
      "video/bmpeg": {
        source: "iana"
      },
      "video/bt656": {
        source: "iana"
      },
      "video/celb": {
        source: "iana"
      },
      "video/dv": {
        source: "iana"
      },
      "video/encaprtp": {
        source: "iana"
      },
      "video/ffv1": {
        source: "iana"
      },
      "video/flexfec": {
        source: "iana"
      },
      "video/h261": {
        source: "iana",
        extensions: ["h261"]
      },
      "video/h263": {
        source: "iana",
        extensions: ["h263"]
      },
      "video/h263-1998": {
        source: "iana"
      },
      "video/h263-2000": {
        source: "iana"
      },
      "video/h264": {
        source: "iana",
        extensions: ["h264"]
      },
      "video/h264-rcdo": {
        source: "iana"
      },
      "video/h264-svc": {
        source: "iana"
      },
      "video/h265": {
        source: "iana"
      },
      "video/iso.segment": {
        source: "iana",
        extensions: ["m4s"]
      },
      "video/jpeg": {
        source: "iana",
        extensions: ["jpgv"]
      },
      "video/jpeg2000": {
        source: "iana"
      },
      "video/jpm": {
        source: "apache",
        extensions: ["jpm", "jpgm"]
      },
      "video/jxsv": {
        source: "iana"
      },
      "video/mj2": {
        source: "iana",
        extensions: ["mj2", "mjp2"]
      },
      "video/mp1s": {
        source: "iana"
      },
      "video/mp2p": {
        source: "iana"
      },
      "video/mp2t": {
        source: "iana",
        extensions: ["ts"]
      },
      "video/mp4": {
        source: "iana",
        compressible: false,
        extensions: ["mp4", "mp4v", "mpg4"]
      },
      "video/mp4v-es": {
        source: "iana"
      },
      "video/mpeg": {
        source: "iana",
        compressible: false,
        extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"]
      },
      "video/mpeg4-generic": {
        source: "iana"
      },
      "video/mpv": {
        source: "iana"
      },
      "video/nv": {
        source: "iana"
      },
      "video/ogg": {
        source: "iana",
        compressible: false,
        extensions: ["ogv"]
      },
      "video/parityfec": {
        source: "iana"
      },
      "video/pointer": {
        source: "iana"
      },
      "video/quicktime": {
        source: "iana",
        compressible: false,
        extensions: ["qt", "mov"]
      },
      "video/raptorfec": {
        source: "iana"
      },
      "video/raw": {
        source: "iana"
      },
      "video/rtp-enc-aescm128": {
        source: "iana"
      },
      "video/rtploopback": {
        source: "iana"
      },
      "video/rtx": {
        source: "iana"
      },
      "video/scip": {
        source: "iana"
      },
      "video/smpte291": {
        source: "iana"
      },
      "video/smpte292m": {
        source: "iana"
      },
      "video/ulpfec": {
        source: "iana"
      },
      "video/vc1": {
        source: "iana"
      },
      "video/vc2": {
        source: "iana"
      },
      "video/vnd.cctv": {
        source: "iana"
      },
      "video/vnd.dece.hd": {
        source: "iana",
        extensions: ["uvh", "uvvh"]
      },
      "video/vnd.dece.mobile": {
        source: "iana",
        extensions: ["uvm", "uvvm"]
      },
      "video/vnd.dece.mp4": {
        source: "iana"
      },
      "video/vnd.dece.pd": {
        source: "iana",
        extensions: ["uvp", "uvvp"]
      },
      "video/vnd.dece.sd": {
        source: "iana",
        extensions: ["uvs", "uvvs"]
      },
      "video/vnd.dece.video": {
        source: "iana",
        extensions: ["uvv", "uvvv"]
      },
      "video/vnd.directv.mpeg": {
        source: "iana"
      },
      "video/vnd.directv.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dlna.mpeg-tts": {
        source: "iana"
      },
      "video/vnd.dvb.file": {
        source: "iana",
        extensions: ["dvb"]
      },
      "video/vnd.fvt": {
        source: "iana",
        extensions: ["fvt"]
      },
      "video/vnd.hns.video": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.1dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-1010": {
        source: "iana"
      },
      "video/vnd.iptvforum.2dparityfec-2005": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsavc": {
        source: "iana"
      },
      "video/vnd.iptvforum.ttsmpeg2": {
        source: "iana"
      },
      "video/vnd.motorola.video": {
        source: "iana"
      },
      "video/vnd.motorola.videop": {
        source: "iana"
      },
      "video/vnd.mpegurl": {
        source: "iana",
        extensions: ["mxu", "m4u"]
      },
      "video/vnd.ms-playready.media.pyv": {
        source: "iana",
        extensions: ["pyv"]
      },
      "video/vnd.nokia.interleaved-multimedia": {
        source: "iana"
      },
      "video/vnd.nokia.mp4vr": {
        source: "iana"
      },
      "video/vnd.nokia.videovoip": {
        source: "iana"
      },
      "video/vnd.objectvideo": {
        source: "iana"
      },
      "video/vnd.radgamettools.bink": {
        source: "iana"
      },
      "video/vnd.radgamettools.smacker": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg1": {
        source: "iana"
      },
      "video/vnd.sealed.mpeg4": {
        source: "iana"
      },
      "video/vnd.sealed.swf": {
        source: "iana"
      },
      "video/vnd.sealedmedia.softseal.mov": {
        source: "iana"
      },
      "video/vnd.uvvu.mp4": {
        source: "iana",
        extensions: ["uvu", "uvvu"]
      },
      "video/vnd.vivo": {
        source: "iana",
        extensions: ["viv"]
      },
      "video/vnd.youtube.yt": {
        source: "iana"
      },
      "video/vp8": {
        source: "iana"
      },
      "video/vp9": {
        source: "iana"
      },
      "video/webm": {
        source: "apache",
        compressible: false,
        extensions: ["webm"]
      },
      "video/x-f4v": {
        source: "apache",
        extensions: ["f4v"]
      },
      "video/x-fli": {
        source: "apache",
        extensions: ["fli"]
      },
      "video/x-flv": {
        source: "apache",
        compressible: false,
        extensions: ["flv"]
      },
      "video/x-m4v": {
        source: "apache",
        extensions: ["m4v"]
      },
      "video/x-matroska": {
        source: "apache",
        compressible: false,
        extensions: ["mkv", "mk3d", "mks"]
      },
      "video/x-mng": {
        source: "apache",
        extensions: ["mng"]
      },
      "video/x-ms-asf": {
        source: "apache",
        extensions: ["asf", "asx"]
      },
      "video/x-ms-vob": {
        source: "apache",
        extensions: ["vob"]
      },
      "video/x-ms-wm": {
        source: "apache",
        extensions: ["wm"]
      },
      "video/x-ms-wmv": {
        source: "apache",
        compressible: false,
        extensions: ["wmv"]
      },
      "video/x-ms-wmx": {
        source: "apache",
        extensions: ["wmx"]
      },
      "video/x-ms-wvx": {
        source: "apache",
        extensions: ["wvx"]
      },
      "video/x-msvideo": {
        source: "apache",
        extensions: ["avi"]
      },
      "video/x-sgi-movie": {
        source: "apache",
        extensions: ["movie"]
      },
      "video/x-smv": {
        source: "apache",
        extensions: ["smv"]
      },
      "x-conference/x-cooltalk": {
        source: "apache",
        extensions: ["ice"]
      },
      "x-shader/x-fragment": {
        compressible: true
      },
      "x-shader/x-vertex": {
        compressible: true
      }
    };
  }
});

// node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js
var require_mime_db = __commonJS({
  "node_modules/.pnpm/mime-db@1.52.0/node_modules/mime-db/index.js"(exports2, module2) {
    module2.exports = require_db();
  }
});

// node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js
var require_mime_types = __commonJS({
  "node_modules/.pnpm/mime-types@2.1.35/node_modules/mime-types/index.js"(exports2) {
    "use strict";
    var db = require_mime_db();
    var extname = require("path").extname;
    var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
    var TEXT_TYPE_REGEXP = /^text\//i;
    exports2.charset = charset;
    exports2.charsets = { lookup: charset };
    exports2.contentType = contentType;
    exports2.extension = extension;
    exports2.extensions = /* @__PURE__ */ Object.create(null);
    exports2.lookup = lookup;
    exports2.types = /* @__PURE__ */ Object.create(null);
    populateMaps(exports2.extensions, exports2.types);
    function charset(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var mime = match && db[match[1].toLowerCase()];
      if (mime && mime.charset) {
        return mime.charset;
      }
      if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return "UTF-8";
      }
      return false;
    }
    function contentType(str) {
      if (!str || typeof str !== "string") {
        return false;
      }
      var mime = str.indexOf("/") === -1 ? exports2.lookup(str) : str;
      if (!mime) {
        return false;
      }
      if (mime.indexOf("charset") === -1) {
        var charset2 = exports2.charset(mime);
        if (charset2) mime += "; charset=" + charset2.toLowerCase();
      }
      return mime;
    }
    function extension(type) {
      if (!type || typeof type !== "string") {
        return false;
      }
      var match = EXTRACT_TYPE_REGEXP.exec(type);
      var exts = match && exports2.extensions[match[1].toLowerCase()];
      if (!exts || !exts.length) {
        return false;
      }
      return exts[0];
    }
    function lookup(path) {
      if (!path || typeof path !== "string") {
        return false;
      }
      var extension2 = extname("x." + path).toLowerCase().substr(1);
      if (!extension2) {
        return false;
      }
      return exports2.types[extension2] || false;
    }
    function populateMaps(extensions, types) {
      var preference = ["nginx", "apache", void 0, "iana"];
      Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
          return;
        }
        extensions[type] = exts;
        for (var i = 0; i < exts.length; i++) {
          var extension2 = exts[i];
          if (types[extension2]) {
            var from = preference.indexOf(db[types[extension2]].source);
            var to = preference.indexOf(mime.source);
            if (types[extension2] !== "application/octet-stream" && (from > to || from === to && types[extension2].substr(0, 12) === "application/")) {
              continue;
            }
          }
          types[extension2] = type;
        }
      });
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/defer.js
var require_defer = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/defer.js"(exports2, module2) {
    module2.exports = defer;
    function defer(fn) {
      var nextTick = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
      if (nextTick) {
        nextTick(fn);
      } else {
        setTimeout(fn, 0);
      }
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/async.js
var require_async = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/async.js"(exports2, module2) {
    var defer = require_defer();
    module2.exports = async;
    function async(callback) {
      var isAsync = false;
      defer(function() {
        isAsync = true;
      });
      return function async_callback(err, result) {
        if (isAsync) {
          callback(err, result);
        } else {
          defer(function nextTick_callback() {
            callback(err, result);
          });
        }
      };
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/abort.js
var require_abort = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/abort.js"(exports2, module2) {
    module2.exports = abort;
    function abort(state) {
      Object.keys(state.jobs).forEach(clean.bind(state));
      state.jobs = {};
    }
    function clean(key) {
      if (typeof this.jobs[key] == "function") {
        this.jobs[key]();
      }
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/iterate.js
var require_iterate = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/iterate.js"(exports2, module2) {
    var async = require_async();
    var abort = require_abort();
    module2.exports = iterate;
    function iterate(list, iterator2, state, callback) {
      var key = state["keyedList"] ? state["keyedList"][state.index] : state.index;
      state.jobs[key] = runJob(iterator2, key, list[key], function(error, output) {
        if (!(key in state.jobs)) {
          return;
        }
        delete state.jobs[key];
        if (error) {
          abort(state);
        } else {
          state.results[key] = output;
        }
        callback(error, state.results);
      });
    }
    function runJob(iterator2, key, item, callback) {
      var aborter;
      if (iterator2.length == 2) {
        aborter = iterator2(item, async(callback));
      } else {
        aborter = iterator2(item, key, async(callback));
      }
      return aborter;
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/state.js
var require_state = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/state.js"(exports2, module2) {
    module2.exports = state;
    function state(list, sortMethod) {
      var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
      };
      if (sortMethod) {
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
          return sortMethod(list[a], list[b]);
        });
      }
      return initState;
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/terminator.js
var require_terminator = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/lib/terminator.js"(exports2, module2) {
    var abort = require_abort();
    var async = require_async();
    module2.exports = terminator;
    function terminator(callback) {
      if (!Object.keys(this.jobs).length) {
        return;
      }
      this.index = this.size;
      abort(this);
      async(callback)(null, this.results);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/parallel.js
var require_parallel = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/parallel.js"(exports2, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = parallel;
    function parallel(list, iterator2, callback) {
      var state = initState(list);
      while (state.index < (state["keyedList"] || list).length) {
        iterate(list, iterator2, state, function(error, result) {
          if (error) {
            callback(error, result);
            return;
          }
          if (Object.keys(state.jobs).length === 0) {
            callback(null, state.results);
            return;
          }
        });
        state.index++;
      }
      return terminator.bind(state, callback);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serialOrdered.js
var require_serialOrdered = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serialOrdered.js"(exports2, module2) {
    var iterate = require_iterate();
    var initState = require_state();
    var terminator = require_terminator();
    module2.exports = serialOrdered;
    module2.exports.ascending = ascending;
    module2.exports.descending = descending;
    function serialOrdered(list, iterator2, sortMethod, callback) {
      var state = initState(list, sortMethod);
      iterate(list, iterator2, state, function iteratorHandler(error, result) {
        if (error) {
          callback(error, result);
          return;
        }
        state.index++;
        if (state.index < (state["keyedList"] || list).length) {
          iterate(list, iterator2, state, iteratorHandler);
          return;
        }
        callback(null, state.results);
      });
      return terminator.bind(state, callback);
    }
    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    function descending(a, b) {
      return -1 * ascending(a, b);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serial.js
var require_serial = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/serial.js"(exports2, module2) {
    var serialOrdered = require_serialOrdered();
    module2.exports = serial;
    function serial(list, iterator2, callback) {
      return serialOrdered(list, iterator2, null, callback);
    }
  }
});

// node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/index.js
var require_asynckit = __commonJS({
  "node_modules/.pnpm/asynckit@0.4.0/node_modules/asynckit/index.js"(exports2, module2) {
    module2.exports = {
      parallel: require_parallel(),
      serial: require_serial(),
      serialOrdered: require_serialOrdered()
    };
  }
});

// node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js
var require_es_object_atoms = __commonJS({
  "node_modules/.pnpm/es-object-atoms@1.1.1/node_modules/es-object-atoms/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Object;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    module2.exports = Error;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    module2.exports = EvalError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    module2.exports = RangeError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    module2.exports = ReferenceError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  }
});

// node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/.pnpm/es-errors@1.3.0/node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    module2.exports = URIError;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js
var require_abs = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/abs.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.abs;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js
var require_floor = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/floor.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.floor;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js
var require_max = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/max.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.max;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js
var require_min = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/min.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.min;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js
var require_pow = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/pow.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.pow;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js
var require_round = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/round.js"(exports2, module2) {
    "use strict";
    module2.exports = Math.round;
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js
var require_isNaN = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
    "use strict";
    module2.exports = Number.isNaN || function isNaN2(a) {
      return a !== a;
    };
  }
});

// node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js
var require_sign = __commonJS({
  "node_modules/.pnpm/math-intrinsics@1.1.0/node_modules/math-intrinsics/sign.js"(exports2, module2) {
    "use strict";
    var $isNaN = require_isNaN();
    module2.exports = function sign(number) {
      if ($isNaN(number) || number === 0) {
        return number;
      }
      return number < 0 ? -1 : 1;
    };
  }
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/.pnpm/gopd@1.2.0/node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/.pnpm/es-define-property@1.0.1/node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (var _ in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = (
          /** @type {PropertyDescriptor} */
          Object.getOwnPropertyDescriptor(obj, sym)
        );
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/.pnpm/has-symbols@1.1.0/node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js
var require_Reflect_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js
var require_Object_getPrototypeOf = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
    "use strict";
    var $Object = require_es_object_atoms();
    module2.exports = $Object.getPrototypeOf || null;
  }
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    };
    var slicy = function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    };
    var joiny = function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    };
    module2.exports = function bind2(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      };
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/.pnpm/function-bind@1.1.2/node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js
var require_functionCall = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.call;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js
var require_functionApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
    "use strict";
    module2.exports = Function.prototype.apply;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js
var require_reflectApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
    "use strict";
    module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js
var require_actualApply = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
    "use strict";
    var bind2 = require_function_bind();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var $reflectApply = require_reflectApply();
    module2.exports = $reflectApply || bind2.call($call, $apply);
  }
});

// node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js
var require_call_bind_apply_helpers = __commonJS({
  "node_modules/.pnpm/call-bind-apply-helpers@1.0.2/node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
    "use strict";
    var bind2 = require_function_bind();
    var $TypeError = require_type();
    var $call = require_functionCall();
    var $actualApply = require_actualApply();
    module2.exports = function callBindBasic(args) {
      if (args.length < 1 || typeof args[0] !== "function") {
        throw new $TypeError("a function is required");
      }
      return $actualApply(bind2, $call, args);
    };
  }
});

// node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js
var require_get = __commonJS({
  "node_modules/.pnpm/dunder-proto@1.0.1/node_modules/dunder-proto/get.js"(exports2, module2) {
    "use strict";
    var callBind = require_call_bind_apply_helpers();
    var gOPD = require_gopd();
    var hasProtoAccessor;
    try {
      hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
      [].__proto__ === Array.prototype;
    } catch (e) {
      if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
        throw e;
      }
    }
    var desc = !!hasProtoAccessor && gOPD && gOPD(
      Object.prototype,
      /** @type {keyof typeof Object.prototype} */
      "__proto__"
    );
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
      /** @type {import('./get')} */
      function getDunder(value) {
        return $getPrototypeOf(value == null ? value : $Object(value));
      }
    ) : false;
  }
});

// node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js
var require_get_proto = __commonJS({
  "node_modules/.pnpm/get-proto@1.0.1/node_modules/get-proto/index.js"(exports2, module2) {
    "use strict";
    var reflectGetProto = require_Reflect_getPrototypeOf();
    var originalGetProto = require_Object_getPrototypeOf();
    var getDunderProto = require_get();
    module2.exports = reflectGetProto ? function getProto(O) {
      return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
      if (!O || typeof O !== "object" && typeof O !== "function") {
        throw new TypeError("getProto: not an object");
      }
      return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
      return getDunderProto(O);
    } : null;
  }
});

// node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/.pnpm/hasown@2.0.2/node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind2 = require_function_bind();
    module2.exports = bind2.call(call, $hasOwn);
  }
});

// node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/.pnpm/get-intrinsic@1.3.0/node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    var undefined2;
    var $Object = require_es_object_atoms();
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var abs = require_abs();
    var floor = require_floor();
    var max = require_max();
    var min = require_min();
    var pow = require_pow();
    var round = require_round();
    var sign = require_sign();
    var $Function = Function;
    var getEvalledConstructor = function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    };
    var $gOPD = require_gopd();
    var $defineProperty = require_es_define_property();
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? (function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    })() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = require_get_proto();
    var $ObjectGPO = require_Object_getPrototypeOf();
    var $ReflectGPO = require_Reflect_getPrototypeOf();
    var $apply = require_functionApply();
    var $call = require_functionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": $Object,
      "%Object.getOwnPropertyDescriptor%": $gOPD,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%Function.prototype.call%": $call,
      "%Function.prototype.apply%": $apply,
      "%Object.defineProperty%": $defineProperty,
      "%Object.getPrototypeOf%": $ObjectGPO,
      "%Math.abs%": abs,
      "%Math.floor%": floor,
      "%Math.max%": max,
      "%Math.min%": min,
      "%Math.pow%": pow,
      "%Math.round%": round,
      "%Math.sign%": sign,
      "%Reflect.getPrototypeOf%": $ReflectGPO
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    };
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind2 = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind2.call($call, Array.prototype.concat);
    var $spliceApply = bind2.call($apply, Array.prototype.splice);
    var $replace = bind2.call($call, String.prototype.replace);
    var $strSlice = bind2.call($call, String.prototype.slice);
    var $exec = bind2.call($call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void undefined2;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    };
  }
});

// node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js
var require_shams2 = __commonJS({
  "node_modules/.pnpm/has-tostringtag@1.0.2/node_modules/has-tostringtag/shams.js"(exports2, module2) {
    "use strict";
    var hasSymbols = require_shams();
    module2.exports = function hasToStringTagShams() {
      return hasSymbols() && !!Symbol.toStringTag;
    };
  }
});

// node_modules/.pnpm/es-set-tostringtag@2.1.0/node_modules/es-set-tostringtag/index.js
var require_es_set_tostringtag = __commonJS({
  "node_modules/.pnpm/es-set-tostringtag@2.1.0/node_modules/es-set-tostringtag/index.js"(exports2, module2) {
    "use strict";
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    var hasToStringTag = require_shams2()();
    var hasOwn = require_hasown();
    var $TypeError = require_type();
    var toStringTag2 = hasToStringTag ? Symbol.toStringTag : null;
    module2.exports = function setToStringTag(object, value) {
      var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
      var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
      if (typeof overrideIfSet !== "undefined" && typeof overrideIfSet !== "boolean" || typeof nonConfigurable !== "undefined" && typeof nonConfigurable !== "boolean") {
        throw new $TypeError("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
      }
      if (toStringTag2 && (overrideIfSet || !hasOwn(object, toStringTag2))) {
        if ($defineProperty) {
          $defineProperty(object, toStringTag2, {
            configurable: !nonConfigurable,
            enumerable: false,
            value,
            writable: false
          });
        } else {
          object[toStringTag2] = value;
        }
      }
    };
  }
});

// node_modules/.pnpm/form-data@4.0.5/node_modules/form-data/lib/populate.js
var require_populate = __commonJS({
  "node_modules/.pnpm/form-data@4.0.5/node_modules/form-data/lib/populate.js"(exports2, module2) {
    "use strict";
    module2.exports = function(dst, src) {
      Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop];
      });
      return dst;
    };
  }
});

// node_modules/.pnpm/form-data@4.0.5/node_modules/form-data/lib/form_data.js
var require_form_data = __commonJS({
  "node_modules/.pnpm/form-data@4.0.5/node_modules/form-data/lib/form_data.js"(exports2, module2) {
    "use strict";
    var CombinedStream = require_combined_stream();
    var util3 = require("util");
    var path = require("path");
    var http3 = require("http");
    var https3 = require("https");
    var parseUrl2 = require("url").parse;
    var fs = require("fs");
    var Stream = require("stream").Stream;
    var crypto4 = require("crypto");
    var mime = require_mime_types();
    var asynckit = require_asynckit();
    var setToStringTag = require_es_set_tostringtag();
    var hasOwn = require_hasown();
    var populate = require_populate();
    function FormData3(options) {
      if (!(this instanceof FormData3)) {
        return new FormData3(options);
      }
      this._overheadLength = 0;
      this._valueLength = 0;
      this._valuesToMeasure = [];
      CombinedStream.call(this);
      options = options || {};
      for (var option in options) {
        this[option] = options[option];
      }
    }
    util3.inherits(FormData3, CombinedStream);
    FormData3.LINE_BREAK = "\r\n";
    FormData3.DEFAULT_CONTENT_TYPE = "application/octet-stream";
    FormData3.prototype.append = function(field, value, options) {
      options = options || {};
      if (typeof options === "string") {
        options = { filename: options };
      }
      var append2 = CombinedStream.prototype.append.bind(this);
      if (typeof value === "number" || value == null) {
        value = String(value);
      }
      if (Array.isArray(value)) {
        this._error(new Error("Arrays are not supported."));
        return;
      }
      var header = this._multiPartHeader(field, value, options);
      var footer = this._multiPartFooter();
      append2(header);
      append2(value);
      append2(footer);
      this._trackLength(header, value, options);
    };
    FormData3.prototype._trackLength = function(header, value, options) {
      var valueLength = 0;
      if (options.knownLength != null) {
        valueLength += Number(options.knownLength);
      } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
      } else if (typeof value === "string") {
        valueLength = Buffer.byteLength(value);
      }
      this._valueLength += valueLength;
      this._overheadLength += Buffer.byteLength(header) + FormData3.LINE_BREAK.length;
      if (!value || !value.path && !(value.readable && hasOwn(value, "httpVersion")) && !(value instanceof Stream)) {
        return;
      }
      if (!options.knownLength) {
        this._valuesToMeasure.push(value);
      }
    };
    FormData3.prototype._lengthRetriever = function(value, callback) {
      if (hasOwn(value, "fd")) {
        if (value.end != void 0 && value.end != Infinity && value.start != void 0) {
          callback(null, value.end + 1 - (value.start ? value.start : 0));
        } else {
          fs.stat(value.path, function(err, stat) {
            if (err) {
              callback(err);
              return;
            }
            var fileSize = stat.size - (value.start ? value.start : 0);
            callback(null, fileSize);
          });
        }
      } else if (hasOwn(value, "httpVersion")) {
        callback(null, Number(value.headers["content-length"]));
      } else if (hasOwn(value, "httpModule")) {
        value.on("response", function(response) {
          value.pause();
          callback(null, Number(response.headers["content-length"]));
        });
        value.resume();
      } else {
        callback("Unknown stream");
      }
    };
    FormData3.prototype._multiPartHeader = function(field, value, options) {
      if (typeof options.header === "string") {
        return options.header;
      }
      var contentDisposition = this._getContentDisposition(value, options);
      var contentType = this._getContentType(value, options);
      var contents = "";
      var headers = {
        // add custom disposition as third element or keep it two elements if not
        "Content-Disposition": ["form-data", 'name="' + field + '"'].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        "Content-Type": [].concat(contentType || [])
      };
      if (typeof options.header === "object") {
        populate(headers, options.header);
      }
      var header;
      for (var prop in headers) {
        if (hasOwn(headers, prop)) {
          header = headers[prop];
          if (header == null) {
            continue;
          }
          if (!Array.isArray(header)) {
            header = [header];
          }
          if (header.length) {
            contents += prop + ": " + header.join("; ") + FormData3.LINE_BREAK;
          }
        }
      }
      return "--" + this.getBoundary() + FormData3.LINE_BREAK + contents + FormData3.LINE_BREAK;
    };
    FormData3.prototype._getContentDisposition = function(value, options) {
      var filename;
      if (typeof options.filepath === "string") {
        filename = path.normalize(options.filepath).replace(/\\/g, "/");
      } else if (options.filename || value && (value.name || value.path)) {
        filename = path.basename(options.filename || value && (value.name || value.path));
      } else if (value && value.readable && hasOwn(value, "httpVersion")) {
        filename = path.basename(value.client._httpMessage.path || "");
      }
      if (filename) {
        return 'filename="' + filename + '"';
      }
    };
    FormData3.prototype._getContentType = function(value, options) {
      var contentType = options.contentType;
      if (!contentType && value && value.name) {
        contentType = mime.lookup(value.name);
      }
      if (!contentType && value && value.path) {
        contentType = mime.lookup(value.path);
      }
      if (!contentType && value && value.readable && hasOwn(value, "httpVersion")) {
        contentType = value.headers["content-type"];
      }
      if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
      }
      if (!contentType && value && typeof value === "object") {
        contentType = FormData3.DEFAULT_CONTENT_TYPE;
      }
      return contentType;
    };
    FormData3.prototype._multiPartFooter = function() {
      return function(next) {
        var footer = FormData3.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
          footer += this._lastBoundary();
        }
        next(footer);
      }.bind(this);
    };
    FormData3.prototype._lastBoundary = function() {
      return "--" + this.getBoundary() + "--" + FormData3.LINE_BREAK;
    };
    FormData3.prototype.getHeaders = function(userHeaders) {
      var header;
      var formHeaders = {
        "content-type": "multipart/form-data; boundary=" + this.getBoundary()
      };
      for (header in userHeaders) {
        if (hasOwn(userHeaders, header)) {
          formHeaders[header.toLowerCase()] = userHeaders[header];
        }
      }
      return formHeaders;
    };
    FormData3.prototype.setBoundary = function(boundary) {
      if (typeof boundary !== "string") {
        throw new TypeError("FormData boundary must be a string");
      }
      this._boundary = boundary;
    };
    FormData3.prototype.getBoundary = function() {
      if (!this._boundary) {
        this._generateBoundary();
      }
      return this._boundary;
    };
    FormData3.prototype.getBuffer = function() {
      var dataBuffer = new Buffer.alloc(0);
      var boundary = this.getBoundary();
      for (var i = 0, len = this._streams.length; i < len; i++) {
        if (typeof this._streams[i] !== "function") {
          if (Buffer.isBuffer(this._streams[i])) {
            dataBuffer = Buffer.concat([dataBuffer, this._streams[i]]);
          } else {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(this._streams[i])]);
          }
          if (typeof this._streams[i] !== "string" || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
            dataBuffer = Buffer.concat([dataBuffer, Buffer.from(FormData3.LINE_BREAK)]);
          }
        }
      }
      return Buffer.concat([dataBuffer, Buffer.from(this._lastBoundary())]);
    };
    FormData3.prototype._generateBoundary = function() {
      this._boundary = "--------------------------" + crypto4.randomBytes(12).toString("hex");
    };
    FormData3.prototype.getLengthSync = function() {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this.hasKnownLength()) {
        this._error(new Error("Cannot calculate proper length in synchronous way."));
      }
      return knownLength;
    };
    FormData3.prototype.hasKnownLength = function() {
      var hasKnownLength = true;
      if (this._valuesToMeasure.length) {
        hasKnownLength = false;
      }
      return hasKnownLength;
    };
    FormData3.prototype.getLength = function(cb) {
      var knownLength = this._overheadLength + this._valueLength;
      if (this._streams.length) {
        knownLength += this._lastBoundary().length;
      }
      if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
      }
      asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
          cb(err);
          return;
        }
        values.forEach(function(length) {
          knownLength += length;
        });
        cb(null, knownLength);
      });
    };
    FormData3.prototype.submit = function(params, cb) {
      var request;
      var options;
      var defaults2 = { method: "post" };
      if (typeof params === "string") {
        params = parseUrl2(params);
        options = populate({
          port: params.port,
          path: params.pathname,
          host: params.hostname,
          protocol: params.protocol
        }, defaults2);
      } else {
        options = populate(params, defaults2);
        if (!options.port) {
          options.port = options.protocol === "https:" ? 443 : 80;
        }
      }
      options.headers = this.getHeaders(params.headers);
      if (options.protocol === "https:") {
        request = https3.request(options);
      } else {
        request = http3.request(options);
      }
      this.getLength(function(err, length) {
        if (err && err !== "Unknown stream") {
          this._error(err);
          return;
        }
        if (length) {
          request.setHeader("Content-Length", length);
        }
        this.pipe(request);
        if (cb) {
          var onResponse;
          var callback = function(error, responce) {
            request.removeListener("error", callback);
            request.removeListener("response", onResponse);
            return cb.call(this, error, responce);
          };
          onResponse = callback.bind(this, null);
          request.on("error", callback);
          request.on("response", onResponse);
        }
      }.bind(this));
      return request;
    };
    FormData3.prototype._error = function(err) {
      if (!this.error) {
        this.error = err;
        this.pause();
        this.emit("error", err);
      }
    };
    FormData3.prototype.toString = function() {
      return "[object FormData]";
    };
    setToStringTag(FormData3.prototype, "FormData");
    module2.exports = FormData3;
  }
});

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend2;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend2(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream4) {
      const level = supportsColor(stream4, stream4 && stream4.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util3 = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util3.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util3.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util3.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util3.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.4.3/node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/.pnpm/follow-redirects@1.16.0_debug@4.4.3/node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/follow-redirects@1.16.0_debug@4.4.3/node_modules/follow-redirects/debug.js"(exports2, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
        }
        if (typeof debug !== "function") {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/.pnpm/follow-redirects@1.16.0_debug@4.4.3/node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/.pnpm/follow-redirects@1.16.0_debug@4.4.3/node_modules/follow-redirects/index.js"(exports2, module2) {
    var url2 = require("url");
    var URL2 = url2.URL;
    var http3 = require("http");
    var https3 = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    (function detectUnsupportedEnvironment() {
      var looksLikeNode = typeof process !== "undefined";
      var looksLikeBrowser = typeof window !== "undefined" && typeof document !== "undefined";
      var looksLikeV8 = isFunction3(Error.captureStackTrace);
      if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
        console.warn("The follow-redirects package should be excluded from browser builds.");
      }
    })();
    var useNativeURL = false;
    try {
      assert(new URL2(""));
    } catch (error) {
      useNativeURL = error.code === "ERR_INVALID_URL";
    }
    var sensitiveHeaders = [
      "Authorization",
      "Proxy-Authorization",
      "Cookie"
    ];
    var preservedUrlFields = [
      "auth",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "hash"
    ];
    var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
    var eventHandlers = /* @__PURE__ */ Object.create(null);
    events.forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var InvalidUrlError = createErrorType(
      "ERR_INVALID_URL",
      "Invalid URL",
      TypeError
    );
    var RedirectionError = createErrorType(
      "ERR_FR_REDIRECTION_FAILURE",
      "Redirected request failed"
    );
    var TooManyRedirectsError = createErrorType(
      "ERR_FR_TOO_MANY_REDIRECTS",
      "Maximum number of redirects exceeded",
      RedirectionError
    );
    var MaxBodyLengthExceededError = createErrorType(
      "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
      "Request body larger than maxBodyLength limit"
    );
    var WriteAfterEndError = createErrorType(
      "ERR_STREAM_WRITE_AFTER_END",
      "write after end"
    );
    var destroy = Writable.prototype.destroy || noop2;
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self2 = this;
      this._onNativeResponse = function(response) {
        try {
          self2._processResponse(response);
        } catch (cause) {
          self2.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({ cause }));
        }
      };
      this._headerFilter = new RegExp("^(?:" + sensitiveHeaders.concat(options.sensitiveHeaders).map(escapeRegex).join("|") + ")$", "i");
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.abort = function() {
      destroyRequest(this._currentRequest);
      this._currentRequest.abort();
      this.emit("abort");
    };
    RedirectableRequest.prototype.destroy = function(error) {
      destroyRequest(this._currentRequest, error);
      destroy.call(this, error);
      return this;
    };
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!isString2(data) && !isBuffer2(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (isFunction3(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (isFunction3(data)) {
        callback = data;
        data = encoding = null;
      } else if (isFunction3(encoding)) {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self2 = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self2._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      var self2 = this;
      function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
      }
      function startTimer(socket) {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
        }
        self2._timeout = setTimeout(function() {
          self2.emit("timeout");
          clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
      }
      function clearTimer() {
        if (self2._timeout) {
          clearTimeout(self2._timeout);
          self2._timeout = null;
        }
        self2.removeListener("abort", clearTimer);
        self2.removeListener("error", clearTimer);
        self2.removeListener("response", clearTimer);
        self2.removeListener("close", clearTimer);
        if (callback) {
          self2.removeListener("timeout", callback);
        }
        if (!self2.socket) {
          self2._currentRequest.removeListener("socket", startTimer);
        }
      }
      if (callback) {
        this.on("timeout", callback);
      }
      if (this.socket) {
        startTimer(this.socket);
      } else {
        this._currentRequest.once("socket", startTimer);
      }
      this.on("socket", destroyOnTimeout);
      this.on("abort", clearTimer);
      this.on("error", clearTimer);
      this.on("response", clearTimer);
      this.on("close", clearTimer);
      return this;
    };
    [
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (!isArray2(options.sensitiveHeaders)) {
        options.sensitiveHeaders = [];
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        throw new TypeError("Unsupported protocol " + protocol);
      }
      if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      request._redirectable = this;
      for (var event of events) {
        request.on(event, eventHandlers[event]);
      }
      this._currentUrl = /^\//.test(this._options.path) ? url2.format(this._options) : (
        // When making a request to a proxy, […]
        // a client MUST send the target URI in absolute-form […].
        this._options.path
      );
      if (this._isRedirect) {
        var i = 0;
        var self2 = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self2._currentRequest) {
            if (error) {
              self2.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self2._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
        return;
      }
      destroyRequest(this._currentRequest);
      response.destroy();
      if (++this._redirectCount > this._options.maxRedirects) {
        throw new TooManyRedirectsError();
      }
      var requestHeaders;
      var beforeRedirect = this._options.beforeRedirect;
      if (beforeRedirect) {
        requestHeaders = Object.assign({
          // The Host header was set by nativeProtocol.request
          Host: response.req.getHeader("host")
        }, this._options.headers);
      }
      var method = this._options.method;
      if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
      }
      var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
      var currentUrlParts = parseUrl2(this._currentUrl);
      var currentHost = currentHostHeader || currentUrlParts.host;
      var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url2.format(Object.assign(currentUrlParts, { host: currentHost }));
      var redirectUrl = resolveUrl(location, currentUrl);
      debug("redirecting to", redirectUrl.href);
      this._isRedirect = true;
      spreadUrlObject(redirectUrl, this._options);
      if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(this._headerFilter, this._options.headers);
      }
      if (isFunction3(beforeRedirect)) {
        var responseDetails = {
          headers: response.headers,
          statusCode
        };
        var requestDetails = {
          url: currentUrl,
          method,
          headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails);
        this._sanitizeOptions(this._options);
      }
      this._performRequest();
    };
    function wrap(protocols) {
      var exports3 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports3[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (isURL(input)) {
            input = spreadUrlObject(input);
          } else if (isString2(input)) {
            input = spreadUrlObject(parseUrl2(input));
          } else {
            callback = options;
            options = validateUrl(input);
            input = { protocol };
          }
          if (isFunction3(options)) {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports3.maxRedirects,
            maxBodyLength: exports3.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          if (!isString2(options.host) && !isString2(options.hostname)) {
            options.hostname = "::1";
          }
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports3;
    }
    function noop2() {
    }
    function parseUrl2(input) {
      var parsed;
      if (useNativeURL) {
        parsed = new URL2(input);
      } else {
        parsed = validateUrl(url2.parse(input));
        if (!isString2(parsed.protocol)) {
          throw new InvalidUrlError({ input });
        }
      }
      return parsed;
    }
    function resolveUrl(relative, base) {
      return useNativeURL ? new URL2(relative, base) : parseUrl2(url2.resolve(base, relative));
    }
    function validateUrl(input) {
      if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
        throw new InvalidUrlError({ input: input.href || input });
      }
      if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
        throw new InvalidUrlError({ input: input.href || input });
      }
      return input;
    }
    function spreadUrlObject(urlObject, target) {
      var spread3 = target || {};
      for (var key of preservedUrlFields) {
        spread3[key] = urlObject[key];
      }
      if (spread3.hostname.startsWith("[")) {
        spread3.hostname = spread3.hostname.slice(1, -1);
      }
      if (spread3.port !== "") {
        spread3.port = Number(spread3.port);
      }
      spread3.path = spread3.search ? spread3.pathname + spread3.search : spread3.pathname;
      return spread3;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue === null || typeof lastValue === "undefined" ? void 0 : String(lastValue).trim();
    }
    function createErrorType(code, message, baseClass) {
      function CustomError(properties) {
        if (isFunction3(Error.captureStackTrace)) {
          Error.captureStackTrace(this, this.constructor);
        }
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
      }
      CustomError.prototype = new (baseClass || Error)();
      Object.defineProperties(CustomError.prototype, {
        constructor: {
          value: CustomError,
          enumerable: false
        },
        name: {
          value: "Error [" + code + "]",
          enumerable: false
        }
      });
      return CustomError;
    }
    function destroyRequest(request, error) {
      for (var event of events) {
        request.removeListener(event, eventHandlers[event]);
      }
      request.on("error", noop2);
      request.destroy(error);
    }
    function isSubdomain(subdomain, domain) {
      assert(isString2(subdomain) && isString2(domain));
      var dot = subdomain.length - domain.length - 1;
      return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
    }
    function isArray2(value) {
      return value instanceof Array;
    }
    function isString2(value) {
      return typeof value === "string" || value instanceof String;
    }
    function isFunction3(value) {
      return typeof value === "function";
    }
    function isBuffer2(value) {
      return typeof value === "object" && "length" in value;
    }
    function isURL(value) {
      return URL2 && value instanceof URL2;
    }
    function escapeRegex(regex) {
      return regex.replace(/[\]\\/()*+?.$]/g, "\\$&");
    }
    module2.exports = wrap({ http: http3, https: https3 });
    module2.exports.wrap = wrap;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/assertString.js
var require_assertString = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/assertString.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = assertString;
    function assertString(input) {
      if (input === void 0 || input === null) throw new TypeError("Expected a string but received a ".concat(input));
      if (input.constructor.name !== "String") throw new TypeError("Expected a string but received a ".concat(input.constructor.name));
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toDate.js
var require_toDate = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toDate.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toDate;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function toDate(date) {
      (0, _assertString.default)(date);
      date = Date.parse(date);
      return !isNaN(date) ? new Date(date) : null;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/nullUndefinedCheck.js
var require_nullUndefinedCheck = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/nullUndefinedCheck.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isNullOrUndefined;
    function isNullOrUndefined(value) {
      return value === null || value === void 0;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/alpha.js
var require_alpha = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/alpha.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.farsiLocales = exports2.englishLocales = exports2.dotDecimal = exports2.decimal = exports2.commaDecimal = exports2.bengaliLocales = exports2.arabicLocales = exports2.alphanumeric = exports2.alpha = void 0;
    var alpha = exports2.alpha = {
      "en-US": /^[A-Z]+$/i,
      "az-AZ": /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
      "bg-BG": /^[А-Я]+$/i,
      "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
      "da-DK": /^[A-ZÆØÅ]+$/i,
      "de-DE": /^[A-ZÄÖÜß]+$/i,
      "el-GR": /^[Α-ώ]+$/i,
      "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
      "fa-IR": /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
      "fi-FI": /^[A-ZÅÄÖ]+$/i,
      "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
      "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
      "ja-JP": /^[ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
      "nb-NO": /^[A-ZÆØÅ]+$/i,
      "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
      "nn-NO": /^[A-ZÆØÅ]+$/i,
      "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
      "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
      "pt-PT": /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
      "ru-RU": /^[А-ЯЁ]+$/i,
      "kk-KZ": /^[А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
      "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
      "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
      "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
      "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
      "sv-SE": /^[A-ZÅÄÖ]+$/i,
      "th-TH": /^[ก-๐\s]+$/i,
      "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
      "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
      "vi-VN": /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
      "ko-KR": /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
      "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
      ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
      he: /^[א-ת]+$/,
      fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
      bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
      eo: /^[ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
      "hi-IN": /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
      "si-LK": /^[\u0D80-\u0DFF]+$/,
      "ta-IN": /^[\u0B80-\u0BFF]+$/i,
      "te-IN": /^[\u0C00-\u0C7F]+$/i,
      "kn-IN": /^[\u0C80-\u0CFF]+$/i,
      "ml-IN": /^[\u0D00-\u0D7F]+$/i,
      "gu-IN": /^[\u0A80-\u0AFF]+$/i,
      "pa-IN": /^[\u0A00-\u0A7F]+$/i,
      "or-IN": /^[\u0B00-\u0B7F]+$/i
    };
    var alphanumeric = exports2.alphanumeric = {
      "en-US": /^[0-9A-Z]+$/i,
      "az-AZ": /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
      "bg-BG": /^[0-9А-Я]+$/i,
      "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
      "da-DK": /^[0-9A-ZÆØÅ]+$/i,
      "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
      "el-GR": /^[0-9Α-ω]+$/i,
      "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
      "fi-FI": /^[0-9A-ZÅÄÖ]+$/i,
      "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
      "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
      "ja-JP": /^[0-9０-９ぁ-んァ-ヶｦ-ﾟ一-龠ー・。、]+$/i,
      "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
      "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
      "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
      "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
      "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
      "pt-PT": /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
      "ru-RU": /^[0-9А-ЯЁ]+$/i,
      "kk-KZ": /^[0-9А-ЯЁ\u04D8\u04B0\u0406\u04A2\u0492\u04AE\u049A\u04E8\u04BA]+$/i,
      "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
      "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
      "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
      "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
      "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
      "th-TH": /^[ก-๙\s]+$/i,
      "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
      "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
      "ko-KR": /^[0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/,
      "ku-IQ": /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
      "vi-VN": /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
      ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
      he: /^[0-9א-ת]+$/,
      fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
      bn: /^['ঀঁংঃঅআইঈউঊঋঌএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৡৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৸৹৺৻']+$/,
      eo: /^[0-9ABCĈD-GĜHĤIJĴK-PRSŜTUŬVZ]+$/i,
      "hi-IN": /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
      "si-LK": /^[0-9\u0D80-\u0DFF]+$/,
      "ta-IN": /^[0-9\u0B80-\u0BFF.]+$/i,
      "te-IN": /^[0-9\u0C00-\u0C7F.]+$/i,
      "kn-IN": /^[0-9\u0C80-\u0CFF.]+$/i,
      "ml-IN": /^[0-9\u0D00-\u0D7F.]+$/i,
      "gu-IN": /^[0-9\u0A80-\u0AFF.]+$/i,
      "pa-IN": /^[0-9\u0A00-\u0A7F.]+$/i,
      "or-IN": /^[0-9\u0B00-\u0B7F.]+$/i
    };
    var decimal = exports2.decimal = {
      "en-US": ".",
      ar: "\u066B"
    };
    var englishLocales = exports2.englishLocales = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"];
    for (i = 0; i < englishLocales.length; i++) {
      locale = "en-".concat(englishLocales[i]);
      alpha[locale] = alpha["en-US"];
      alphanumeric[locale] = alphanumeric["en-US"];
      decimal[locale] = decimal["en-US"];
    }
    var locale;
    var i;
    var arabicLocales = exports2.arabicLocales = ["AE", "BH", "DZ", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "QM", "QA", "SA", "SD", "SY", "TN", "YE"];
    for (_i = 0; _i < arabicLocales.length; _i++) {
      _locale = "ar-".concat(arabicLocales[_i]);
      alpha[_locale] = alpha.ar;
      alphanumeric[_locale] = alphanumeric.ar;
      decimal[_locale] = decimal.ar;
    }
    var _locale;
    var _i;
    var farsiLocales = exports2.farsiLocales = ["IR", "AF"];
    for (_i2 = 0; _i2 < farsiLocales.length; _i2++) {
      _locale2 = "fa-".concat(farsiLocales[_i2]);
      alphanumeric[_locale2] = alphanumeric.fa;
      decimal[_locale2] = decimal.ar;
    }
    var _locale2;
    var _i2;
    var bengaliLocales = exports2.bengaliLocales = ["BD", "IN"];
    for (_i3 = 0; _i3 < bengaliLocales.length; _i3++) {
      _locale3 = "bn-".concat(bengaliLocales[_i3]);
      alpha[_locale3] = alpha.bn;
      alphanumeric[_locale3] = alphanumeric.bn;
      decimal[_locale3] = decimal["en-US"];
    }
    var _locale3;
    var _i3;
    var dotDecimal = exports2.dotDecimal = ["ar-EG", "ar-LB", "ar-LY"];
    var commaDecimal = exports2.commaDecimal = ["bg-BG", "cs-CZ", "da-DK", "de-DE", "el-GR", "en-ZM", "eo", "es-ES", "fr-CA", "fr-FR", "gu-IN", "hi-IN", "hu-HU", "id-ID", "it-IT", "kk-KZ", "kn-IN", "ku-IQ", "ml-IN", "nb-NO", "nl-NL", "nn-NO", "or-IN", "pa-IN", "pl-PL", "pt-PT", "ru-RU", "si-LK", "sl-SI", "sr-RS", "sr-RS@latin", "sv-SE", "ta-IN", "te-IN", "tr-TR", "uk-UA", "vi-VN"];
    for (_i4 = 0; _i4 < dotDecimal.length; _i4++) {
      decimal[dotDecimal[_i4]] = decimal["en-US"];
    }
    var _i4;
    for (_i5 = 0; _i5 < commaDecimal.length; _i5++) {
      decimal[commaDecimal[_i5]] = ",";
    }
    var _i5;
    alpha["fr-CA"] = alpha["fr-FR"];
    alphanumeric["fr-CA"] = alphanumeric["fr-FR"];
    alpha["pt-BR"] = alpha["pt-PT"];
    alphanumeric["pt-BR"] = alphanumeric["pt-PT"];
    decimal["pt-BR"] = decimal["pt-PT"];
    alpha["pl-Pl"] = alpha["pl-PL"];
    alphanumeric["pl-Pl"] = alphanumeric["pl-PL"];
    decimal["pl-Pl"] = decimal["pl-PL"];
    alpha["fa-AF"] = alpha.fa;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isFloat.js
var require_isFloat = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isFloat.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isFloat;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var _nullUndefinedCheck = _interopRequireDefault(require_nullUndefinedCheck());
    var _alpha = require_alpha();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isFloat(str, options) {
      (0, _assertString.default)(str);
      options = options || {};
      var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : ".", "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));
      if (str === "" || str === "." || str === "," || str === "-" || str === "+") {
        return false;
      }
      var value = parseFloat(str.replace(",", "."));
      return float.test(str) && (!options.hasOwnProperty("min") || (0, _nullUndefinedCheck.default)(options.min) || value >= options.min) && (!options.hasOwnProperty("max") || (0, _nullUndefinedCheck.default)(options.max) || value <= options.max) && (!options.hasOwnProperty("lt") || (0, _nullUndefinedCheck.default)(options.lt) || value < options.lt) && (!options.hasOwnProperty("gt") || (0, _nullUndefinedCheck.default)(options.gt) || value > options.gt);
    }
    var locales = exports2.locales = Object.keys(_alpha.decimal);
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toFloat.js
var require_toFloat = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toFloat.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toFloat;
    var _isFloat = _interopRequireDefault(require_isFloat());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function toFloat(str) {
      if (!(0, _isFloat.default)(str)) return NaN;
      return parseFloat(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toInt.js
var require_toInt = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toInt.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toInt;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function toInt(str, radix) {
      (0, _assertString.default)(str);
      return parseInt(str, radix || 10);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toBoolean.js
var require_toBoolean = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/toBoolean.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toBoolean;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function toBoolean(str, strict) {
      (0, _assertString.default)(str);
      if (strict) {
        return str === "1" || /^true$/i.test(str);
      }
      return str !== "0" && !/^false$/i.test(str) && str !== "";
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/equals.js
var require_equals = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/equals.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = equals;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function equals(str, comparison) {
      (0, _assertString.default)(str);
      return str === comparison;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/toString.js
var require_toString = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/toString.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = toString4;
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function toString4(input) {
      if (_typeof(input) === "object" && input !== null) {
        if (typeof input.toString === "function") {
          input = input.toString();
        } else {
          input = "[object Object]";
        }
      } else if (input === null || typeof input === "undefined" || isNaN(input) && !input.length) {
        input = "";
      }
      return String(input);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/merge.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = merge2;
    function merge2() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var defaults2 = arguments.length > 1 ? arguments[1] : void 0;
      for (var key in defaults2) {
        if (typeof obj[key] === "undefined") {
          obj[key] = defaults2[key];
        }
      }
      return obj;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/contains.js
var require_contains = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/contains.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = contains;
    var _assertString = _interopRequireDefault(require_assertString());
    var _toString = _interopRequireDefault(require_toString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var defaultContainsOptions = {
      ignoreCase: false,
      minOccurrences: 1
    };
    function contains(str, elem, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, defaultContainsOptions);
      if (options.ignoreCase) {
        return str.toLowerCase().split((0, _toString.default)(elem).toLowerCase()).length > options.minOccurrences;
      }
      return str.split((0, _toString.default)(elem)).length > options.minOccurrences;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/matches.js
var require_matches = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/matches.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = matches;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function matches(str, pattern, modifiers) {
      (0, _assertString.default)(str);
      if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
        pattern = new RegExp(pattern, modifiers);
      }
      return !!str.match(pattern);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/checkHost.js
var require_checkHost = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/checkHost.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = checkHost;
    function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }
    function checkHost(host, matches) {
      for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
        if (host === match || isRegExp2(match) && match.test(host)) {
          return true;
        }
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isByteLength.js
var require_isByteLength = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isByteLength.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isByteLength;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isByteLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
      if (_typeof(options) === "object") {
        min = options.min || 0;
        max = options.max;
      } else {
        min = arguments[1];
        max = arguments[2];
      }
      var len = encodeURI(str).split(/%..|./).length - 1;
      return len >= min && (typeof max === "undefined" || len <= max);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isFQDN.js
var require_isFQDN = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isFQDN.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isFQDN;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var default_fqdn_options = {
      require_tld: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_numeric_tld: false,
      allow_wildcard: false,
      ignore_max_length: false
    };
    function isFQDN(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_fqdn_options);
      if (options.allow_trailing_dot && str[str.length - 1] === ".") {
        str = str.substring(0, str.length - 1);
      }
      if (options.allow_wildcard === true && str.indexOf("*.") === 0) {
        str = str.substring(2);
      }
      var parts = str.split(".");
      var tld = parts[parts.length - 1];
      if (options.require_tld) {
        if (parts.length < 2) {
          return false;
        }
        if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
          return false;
        }
        if (/\s/.test(tld)) {
          return false;
        }
      }
      if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
        return false;
      }
      return parts.every(function(part) {
        if (part.length > 63 && !options.ignore_max_length) {
          return false;
        }
        if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
          return false;
        }
        if (/[\uff01-\uff5e]/.test(part)) {
          return false;
        }
        if (/^-|-$/.test(part)) {
          return false;
        }
        if (!options.allow_underscores && /_/.test(part)) {
          return false;
        }
        return true;
      });
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIP.js
var require_isIP = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIP.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isIP;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
    var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
    var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
    var IPv6SegmentFormat = "(?:[0-9a-fA-F]{1,4})";
    var IPv6AddressRegExp = new RegExp("^(" + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ")(%[0-9a-zA-Z.]{1,})?$");
    function isIP(ipAddress) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(ipAddress);
      var version = (_typeof(options) === "object" ? options.version : arguments[1]) || "";
      if (!version) {
        return isIP(ipAddress, {
          version: 4
        }) || isIP(ipAddress, {
          version: 6
        });
      }
      if (version.toString() === "4") {
        return IPv4AddressRegExp.test(ipAddress);
      }
      if (version.toString() === "6") {
        return IPv6AddressRegExp.test(ipAddress);
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEmail.js
var require_isEmail = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEmail.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isEmail;
    var _assertString = _interopRequireDefault(require_assertString());
    var _checkHost = _interopRequireDefault(require_checkHost());
    var _isByteLength = _interopRequireDefault(require_isByteLength());
    var _isFQDN = _interopRequireDefault(require_isFQDN());
    var _isIP = _interopRequireDefault(require_isIP());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var default_email_options = {
      allow_display_name: false,
      allow_underscores: false,
      require_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true,
      blacklisted_chars: "",
      ignore_max_length: false,
      host_blacklist: [],
      host_whitelist: []
    };
    var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var gmailUserPart = /^[a-z\d]+$/;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A1-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    var defaultMaxEmailLength = 254;
    function validateDisplayName(display_name) {
      var display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
      if (!display_name_without_quotes.trim()) {
        return false;
      }
      var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
      if (contains_illegal) {
        if (display_name_without_quotes === display_name) {
          return false;
        }
        var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
        if (!all_start_with_back_slash) {
          return false;
        }
      }
      return true;
    }
    function isEmail(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_email_options);
      if (options.require_display_name || options.allow_display_name) {
        var display_email = str.match(splitNameAddress);
        if (display_email) {
          var display_name = display_email[1];
          str = str.replace(display_name, "").replace(/(^<|>$)/g, "");
          if (display_name.endsWith(" ")) {
            display_name = display_name.slice(0, -1);
          }
          if (!validateDisplayName(display_name)) {
            return false;
          }
        } else if (options.require_display_name) {
          return false;
        }
      }
      if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
        return false;
      }
      var parts = str.split("@");
      var domain = parts.pop();
      var lower_domain = domain.toLowerCase();
      if (options.host_blacklist.length > 0 && (0, _checkHost.default)(lower_domain, options.host_blacklist)) {
        return false;
      }
      if (options.host_whitelist.length > 0 && !(0, _checkHost.default)(lower_domain, options.host_whitelist)) {
        return false;
      }
      var user = parts.join("@");
      if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
        user = user.toLowerCase();
        var username = user.split("+")[0];
        if (!(0, _isByteLength.default)(username.replace(/\./g, ""), {
          min: 6,
          max: 30
        })) {
          return false;
        }
        var _user_parts = username.split(".");
        for (var i = 0; i < _user_parts.length; i++) {
          if (!gmailUserPart.test(_user_parts[i])) {
            return false;
          }
        }
      }
      if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
        max: 64
      }) || !(0, _isByteLength.default)(domain, {
        max: 254
      }))) {
        return false;
      }
      if (!(0, _isFQDN.default)(domain, {
        require_tld: options.require_tld,
        ignore_max_length: options.ignore_max_length,
        allow_underscores: options.allow_underscores
      })) {
        if (!options.allow_ip_domain) {
          return false;
        }
        if (!(0, _isIP.default)(domain)) {
          if (!domain.startsWith("[") || !domain.endsWith("]")) {
            return false;
          }
          var noBracketdomain = domain.slice(1, -1);
          if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
            return false;
          }
        }
      }
      if (options.blacklisted_chars) {
        if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), "g")) !== -1) return false;
      }
      if (user[0] === '"' && user[user.length - 1] === '"') {
        user = user.slice(1, user.length - 1);
        return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
      }
      var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
      var user_parts = user.split(".");
      for (var _i = 0; _i < user_parts.length; _i++) {
        if (!pattern.test(user_parts[_i])) {
          return false;
        }
      }
      return true;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/includesString.js
var require_includesString = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/includesString.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var includes = function includes2(str, val) {
      return str.indexOf(val) !== -1;
    };
    var _default = exports2.default = includes;
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isURL.js
var require_isURL = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isURL.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isURL;
    var _assertString = _interopRequireDefault(require_assertString());
    var _checkHost = _interopRequireDefault(require_checkHost());
    var _includesString = _interopRequireDefault(require_includesString());
    var _isFQDN = _interopRequireDefault(require_isFQDN());
    var _isIP = _interopRequireDefault(require_isIP());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t) return;
            f = false;
          } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    var default_url_options = {
      protocols: ["http", "https", "ftp"],
      require_tld: true,
      require_protocol: false,
      require_host: true,
      require_port: false,
      require_valid_protocol: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false,
      allow_fragments: true,
      allow_query_components: true,
      validate_length: true,
      max_allowed_length: 2084
    };
    var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
    function isURL(url2, options) {
      (0, _assertString.default)(url2);
      if (!url2 || /[\s<>]/.test(url2)) {
        return false;
      }
      if (url2.indexOf("mailto:") === 0) {
        return false;
      }
      options = (0, _merge.default)(options, default_url_options);
      if (options.validate_length && url2.length > options.max_allowed_length) {
        return false;
      }
      if (!options.allow_fragments && (0, _includesString.default)(url2, "#")) {
        return false;
      }
      if (!options.allow_query_components && ((0, _includesString.default)(url2, "?") || (0, _includesString.default)(url2, "&"))) {
        return false;
      }
      var protocol, auth, host, hostname, port, port_str, split, ipv6;
      split = url2.split("#");
      url2 = split.shift();
      split = url2.split("?");
      url2 = split.shift();
      var protocol_match = url2.match(/^([a-z][a-z0-9+\-.]*):/i);
      var had_explicit_protocol = false;
      var cleanUpProtocol = function cleanUpProtocol2(potential_protocol2) {
        had_explicit_protocol = true;
        protocol = potential_protocol2.toLowerCase();
        if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
          return false;
        }
        return url2.substring(protocol_match[0].length);
      };
      if (protocol_match) {
        var potential_protocol = protocol_match[1];
        var after_colon = url2.substring(protocol_match[0].length);
        var starts_with_slashes = after_colon.slice(0, 2) === "//";
        if (!starts_with_slashes) {
          var first_slash_position = after_colon.indexOf("/");
          var before_slash = first_slash_position === -1 ? after_colon : after_colon.substring(0, first_slash_position);
          var at_position = before_slash.indexOf("@");
          if (at_position !== -1) {
            var before_at = before_slash.substring(0, at_position);
            var valid_auth_regex = /^[a-zA-Z0-9\-_.%:]*$/;
            var is_valid_auth = valid_auth_regex.test(before_at);
            var has_encoded_content = /%[0-9a-fA-F]{2}/.test(before_at);
            if (is_valid_auth && !has_encoded_content) {
              if (options.require_protocol) {
                return false;
              }
            } else {
              url2 = cleanUpProtocol(potential_protocol);
              if (url2 === false) {
                return false;
              }
            }
          } else {
            var looks_like_port = /^[0-9]/.test(after_colon);
            if (looks_like_port) {
              if (options.require_protocol) {
                return false;
              }
            } else {
              url2 = cleanUpProtocol(potential_protocol);
              if (url2 === false) {
                return false;
              }
            }
          }
        } else {
          url2 = cleanUpProtocol(potential_protocol);
          if (url2 === false) {
            return false;
          }
        }
      } else if (options.require_protocol) {
        return false;
      }
      if (url2.slice(0, 2) === "//") {
        if (!had_explicit_protocol && !options.allow_protocol_relative_urls) {
          return false;
        }
        url2 = url2.slice(2);
      }
      if (url2 === "") {
        return false;
      }
      split = url2.split("/");
      url2 = split.shift();
      if (url2 === "" && !options.require_host) {
        return true;
      }
      split = url2.split("@");
      if (split.length > 1) {
        if (options.disallow_auth) {
          return false;
        }
        if (split[0] === "") {
          return false;
        }
        auth = split.shift();
        if (auth.indexOf(":") >= 0 && auth.split(":").length > 2) {
          return false;
        }
        var _auth$split = auth.split(":"), _auth$split2 = _slicedToArray(_auth$split, 2), user = _auth$split2[0], password = _auth$split2[1];
        if (user === "" && password === "") {
          return false;
        }
      }
      hostname = split.join("@");
      port_str = null;
      ipv6 = null;
      var ipv6_match = hostname.match(wrapped_ipv6);
      if (ipv6_match) {
        host = "";
        ipv6 = ipv6_match[1];
        port_str = ipv6_match[2] || null;
      } else {
        split = hostname.split(":");
        host = split.shift();
        if (split.length) {
          port_str = split.join(":");
        }
      }
      if (port_str !== null && port_str.length > 0) {
        port = parseInt(port_str, 10);
        if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
          return false;
        }
      } else if (options.require_port) {
        return false;
      }
      if (options.host_whitelist) {
        return (0, _checkHost.default)(host, options.host_whitelist);
      }
      if (host === "" && !options.require_host) {
        return true;
      }
      if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
        return false;
      }
      host = host || ipv6;
      if (options.host_blacklist && (0, _checkHost.default)(host, options.host_blacklist)) {
        return false;
      }
      return true;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMACAddress.js
var require_isMACAddress = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMACAddress.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMACAddress;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var macAddress48 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/;
    var macAddress48NoSeparators = /^([0-9a-fA-F]){12}$/;
    var macAddress48WithDots = /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/;
    var macAddress64 = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){6}([0-9a-fA-F]{2})$/;
    var macAddress64NoSeparators = /^([0-9a-fA-F]){16}$/;
    var macAddress64WithDots = /^([0-9a-fA-F]{4}\.){3}([0-9a-fA-F]{4})$/;
    function isMACAddress(str, options) {
      (0, _assertString.default)(str);
      if (options !== null && options !== void 0 && options.eui) {
        options.eui = String(options.eui);
      }
      if (options !== null && options !== void 0 && options.no_colons || options !== null && options !== void 0 && options.no_separators) {
        if (options.eui === "48") {
          return macAddress48NoSeparators.test(str);
        }
        if (options.eui === "64") {
          return macAddress64NoSeparators.test(str);
        }
        return macAddress48NoSeparators.test(str) || macAddress64NoSeparators.test(str);
      }
      if ((options === null || options === void 0 ? void 0 : options.eui) === "48") {
        return macAddress48.test(str) || macAddress48WithDots.test(str);
      }
      if ((options === null || options === void 0 ? void 0 : options.eui) === "64") {
        return macAddress64.test(str) || macAddress64WithDots.test(str);
      }
      return isMACAddress(str, {
        eui: "48"
      }) || isMACAddress(str, {
        eui: "64"
      });
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIPRange.js
var require_isIPRange = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIPRange.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isIPRange;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isIP = _interopRequireDefault(require_isIP());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var subnetMaybe = /^\d{1,3}$/;
    var v4Subnet = 32;
    var v6Subnet = 128;
    function isIPRange(str) {
      var version = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      (0, _assertString.default)(str);
      var parts = str.split("/");
      if (parts.length !== 2) {
        return false;
      }
      if (!subnetMaybe.test(parts[1])) {
        return false;
      }
      if (parts[1].length > 1 && parts[1].startsWith("0")) {
        return false;
      }
      var isValidIP = (0, _isIP.default)(parts[0], version);
      if (!isValidIP) {
        return false;
      }
      var expectedSubnet = null;
      switch (String(version)) {
        case "4":
          expectedSubnet = v4Subnet;
          break;
        case "6":
          expectedSubnet = v6Subnet;
          break;
        default:
          expectedSubnet = (0, _isIP.default)(parts[0], "6") ? v6Subnet : v4Subnet;
      }
      return parts[1] <= expectedSubnet && parts[1] >= 0;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDate.js
var require_isDate = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDate.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isDate2;
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t) return;
            f = false;
          } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    var default_date_options = {
      format: "YYYY/MM/DD",
      delimiters: ["/", "-"],
      strictMode: false
    };
    function isValidFormat(format) {
      return /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(format);
    }
    function zip(date, format) {
      var zippedArr = [], len = Math.max(date.length, format.length);
      for (var i = 0; i < len; i++) {
        zippedArr.push([date[i], format[i]]);
      }
      return zippedArr;
    }
    function isDate2(input, options) {
      if (typeof options === "string") {
        options = (0, _merge.default)({
          format: options
        }, default_date_options);
      } else {
        options = (0, _merge.default)(options, default_date_options);
      }
      if (typeof input === "string" && isValidFormat(options.format)) {
        if (options.strictMode && input.length !== options.format.length) return false;
        var formatDelimiter = options.delimiters.find(function(delimiter) {
          return options.format.indexOf(delimiter) !== -1;
        });
        var dateDelimiter = options.strictMode ? formatDelimiter : options.delimiters.find(function(delimiter) {
          return input.indexOf(delimiter) !== -1;
        });
        var dateAndFormat = zip(input.split(dateDelimiter), options.format.toLowerCase().split(formatDelimiter));
        var dateObj = {};
        var _iterator = _createForOfIteratorHelper(dateAndFormat), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), dateWord = _step$value[0], formatWord = _step$value[1];
            if (!dateWord || !formatWord || dateWord.length !== formatWord.length) {
              return false;
            }
            dateObj[formatWord.charAt(0)] = dateWord;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var fullYear = dateObj.y;
        if (fullYear.startsWith("-")) {
          return false;
        }
        if (dateObj.y.length === 2) {
          var parsedYear = parseInt(dateObj.y, 10);
          if (isNaN(parsedYear)) {
            return false;
          }
          var currentYearLastTwoDigits = (/* @__PURE__ */ new Date()).getFullYear() % 100;
          if (parsedYear < currentYearLastTwoDigits) {
            fullYear = "20".concat(dateObj.y);
          } else {
            fullYear = "19".concat(dateObj.y);
          }
        }
        var month = dateObj.m;
        if (dateObj.m.length === 1) {
          month = "0".concat(dateObj.m);
        }
        var day = dateObj.d;
        if (dateObj.d.length === 1) {
          day = "0".concat(dateObj.d);
        }
        return new Date("".concat(fullYear, "-").concat(month, "-").concat(day, "T00:00:00.000Z")).getUTCDate() === +dateObj.d;
      }
      if (!options.strictMode) {
        return Object.prototype.toString.call(input) === "[object Date]" && isFinite(input);
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isTime.js
var require_isTime = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isTime.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isTime;
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var default_time_options = {
      hourFormat: "hour24",
      mode: "default"
    };
    var formats = {
      hour24: {
        default: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
        withSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
        withOptionalSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/
      },
      hour12: {
        default: /^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,
        withSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/,
        withOptionalSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9])(?::([0-5][0-9]))? (A|P)M$/
      }
    };
    function isTime(input, options) {
      options = (0, _merge.default)(options, default_time_options);
      if (typeof input !== "string") return false;
      return formats[options.hourFormat][options.mode].test(input);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/includesArray.js
var require_includesArray = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/includesArray.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var includes = function includes2(arr, val) {
      return arr.some(function(arrVal) {
        return val === arrVal;
      });
    };
    var _default = exports2.default = includes;
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBoolean.js
var require_isBoolean = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBoolean.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBoolean2;
    var _assertString = _interopRequireDefault(require_assertString());
    var _includesArray = _interopRequireDefault(require_includesArray());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var defaultOptions = {
      loose: false
    };
    var strictBooleans = ["true", "false", "1", "0"];
    var looseBooleans = [].concat(strictBooleans, ["yes", "no"]);
    function isBoolean2(str) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultOptions;
      (0, _assertString.default)(str);
      if (options.loose) {
        return (0, _includesArray.default)(looseBooleans, str.toLowerCase());
      }
      return (0, _includesArray.default)(strictBooleans, str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLocale.js
var require_isLocale = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLocale.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLocale;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var extlang = "([A-Za-z]{3}(-[A-Za-z]{3}){0,2})";
    var language = "(([a-zA-Z]{2,3}(-".concat(extlang, ")?)|([a-zA-Z]{5,8}))");
    var script = "([A-Za-z]{4})";
    var region = "([A-Za-z]{2}|\\d{3})";
    var variant = "([A-Za-z0-9]{5,8}|(\\d[A-Z-a-z0-9]{3}))";
    var singleton = "(\\d|[A-W]|[Y-Z]|[a-w]|[y-z])";
    var extension = "(".concat(singleton, "(-[A-Za-z0-9]{2,8})+)");
    var privateuse = "(x(-[A-Za-z0-9]{1,8})+)";
    var irregular = "((en-GB-oed)|(i-ami)|(i-bnn)|(i-default)|(i-enochian)|(i-hak)|(i-klingon)|(i-lux)|(i-mingo)|(i-navajo)|(i-pwn)|(i-tao)|(i-tay)|(i-tsu)|(sgn-BE-FR)|(sgn-BE-NL)|(sgn-CH-DE))";
    var regular = "((art-lojban)|(cel-gaulish)|(no-bok)|(no-nyn)|(zh-guoyu)|(zh-hakka)|(zh-min)|(zh-min-nan)|(zh-xiang))";
    var grandfathered = "(".concat(irregular, "|").concat(regular, ")");
    var delimiter = "(-|_)";
    var langtag = "".concat(language, "(").concat(delimiter).concat(script, ")?(").concat(delimiter).concat(region, ")?(").concat(delimiter).concat(variant, ")*(").concat(delimiter).concat(extension, ")*(").concat(delimiter).concat(privateuse, ")?");
    var languageTagRegex = new RegExp("(^".concat(privateuse, "$)|(^").concat(grandfathered, "$)|(^").concat(langtag, "$)"));
    function isLocale(str) {
      (0, _assertString.default)(str);
      return languageTagRegex.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAbaRouting.js
var require_isAbaRouting = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAbaRouting.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isAbaRouting;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isRoutingReg = /^(?!(1[3-9])|(20)|(3[3-9])|(4[0-9])|(5[0-9])|(60)|(7[3-9])|(8[1-9])|(9[0-2])|(9[3-9]))[0-9]{9}$/;
    function isAbaRouting(str) {
      (0, _assertString.default)(str);
      if (!isRoutingReg.test(str)) return false;
      var checkSumVal = 0;
      for (var i = 0; i < str.length; i++) {
        if (i % 3 === 0) checkSumVal += str[i] * 3;
        else if (i % 3 === 1) checkSumVal += str[i] * 7;
        else checkSumVal += str[i] * 1;
      }
      return checkSumVal % 10 === 0;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAlpha.js
var require_isAlpha = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAlpha.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isAlpha;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var _alpha = require_alpha();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isAlpha(_str) {
      var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      (0, _assertString.default)(_str);
      var str = _str;
      var ignore = options.ignore;
      if (ignore) {
        if (ignore instanceof RegExp) {
          str = str.replace(ignore, "");
        } else if (typeof ignore === "string") {
          str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"), "g"), "");
        } else {
          throw new Error("ignore should be instance of a String or RegExp");
        }
      }
      if (locale in _alpha.alpha) {
        return _alpha.alpha[locale].test(str);
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    var locales = exports2.locales = Object.keys(_alpha.alpha);
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAlphanumeric.js
var require_isAlphanumeric = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAlphanumeric.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isAlphanumeric;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var _alpha = require_alpha();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isAlphanumeric(_str) {
      var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      (0, _assertString.default)(_str);
      var str = _str;
      var ignore = options.ignore;
      if (ignore) {
        if (ignore instanceof RegExp) {
          str = str.replace(ignore, "");
        } else if (typeof ignore === "string") {
          str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"), "g"), "");
        } else {
          throw new Error("ignore should be instance of a String or RegExp");
        }
      }
      if (locale in _alpha.alphanumeric) {
        return _alpha.alphanumeric[locale].test(str);
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    var locales = exports2.locales = Object.keys(_alpha.alphanumeric);
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isNumeric.js
var require_isNumeric = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isNumeric.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isNumeric;
    var _assertString = _interopRequireDefault(require_assertString());
    var _alpha = require_alpha();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var numericNoSymbols = /^[0-9]+$/;
    function isNumeric(str, options) {
      (0, _assertString.default)(str);
      if (options && options.no_symbols) {
        return numericNoSymbols.test(str);
      }
      return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : ".", "])?[0-9]+$")).test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isPassportNumber.js
var require_isPassportNumber = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isPassportNumber.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isPassportNumber;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var passportRegexByCountryCode = {
      AM: /^[A-Z]{2}\d{7}$/,
      // ARMENIA
      AR: /^[A-Z]{3}\d{6}$/,
      // ARGENTINA
      AT: /^[A-Z]\d{7}$/,
      // AUSTRIA
      AU: /^[A-Z]\d{7}$/,
      // AUSTRALIA
      AZ: /^[A-Z]{1}\d{8}$/,
      // AZERBAIJAN
      BE: /^[A-Z]{2}\d{6}$/,
      // BELGIUM
      BG: /^\d{9}$/,
      // BULGARIA
      BR: /^[A-Z]{2}\d{6}$/,
      // BRAZIL
      BY: /^[A-Z]{2}\d{7}$/,
      // BELARUS
      CA: /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/,
      // CANADA
      CH: /^[A-Z]\d{7}$/,
      // SWITZERLAND
      CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
      // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
      CY: /^[A-Z](\d{6}|\d{8})$/,
      // CYPRUS
      CZ: /^\d{8}$/,
      // CZECH REPUBLIC
      DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
      // GERMANY
      DK: /^\d{9}$/,
      // DENMARK
      DZ: /^\d{9}$/,
      // ALGERIA
      EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
      // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
      ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
      // SPAIN
      FI: /^[A-Z]{2}\d{7}$/,
      // FINLAND
      FR: /^\d{2}[A-Z]{2}\d{5}$/,
      // FRANCE
      GB: /^\d{9}$/,
      // UNITED KINGDOM
      GR: /^[A-Z]{2}\d{7}$/,
      // GREECE
      HR: /^\d{9}$/,
      // CROATIA
      HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
      // HUNGARY
      IE: /^[A-Z0-9]{2}\d{7}$/,
      // IRELAND
      IN: /^[A-Z]{1}-?\d{7}$/,
      // INDIA
      ID: /^[A-C]\d{7}$/,
      // INDONESIA
      IR: /^[A-Z]\d{8}$/,
      // IRAN
      IS: /^(A)\d{7}$/,
      // ICELAND
      IT: /^[A-Z0-9]{2}\d{7}$/,
      // ITALY
      JM: /^[Aa]\d{7}$/,
      // JAMAICA
      JP: /^[A-Z]{2}\d{7}$/,
      // JAPAN
      KR: /^[MS]\d{8}$/,
      // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
      KZ: /^[a-zA-Z]\d{7}$/,
      // KAZAKHSTAN
      LI: /^[a-zA-Z]\d{5}$/,
      // LIECHTENSTEIN
      LT: /^[A-Z0-9]{8}$/,
      // LITHUANIA
      LU: /^[A-Z0-9]{8}$/,
      // LUXEMBURG
      LV: /^[A-Z0-9]{2}\d{7}$/,
      // LATVIA
      LY: /^[A-Z0-9]{8}$/,
      // LIBYA
      MT: /^\d{7}$/,
      // MALTA
      MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
      // MOZAMBIQUE
      MY: /^[AHK]\d{8}$/,
      // MALAYSIA
      MX: /^\d{10,11}$/,
      // MEXICO
      NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
      // NETHERLANDS
      NZ: /^([Ll]([Aa]|[Dd]|[Ff]|[Hh])|[Ee]([Aa]|[Pp])|[Nn])\d{6}$/,
      // NEW ZEALAND
      PH: /^([A-Z](\d{6}|\d{7}[A-Z]))|([A-Z]{2}(\d{6}|\d{7}))$/,
      // PHILIPPINES
      PK: /^[A-Z]{2}\d{7}$/,
      // PAKISTAN
      PL: /^[A-Z]{2}\d{7}$/,
      // POLAND
      PT: /^[A-Z]\d{6}$/,
      // PORTUGAL
      RO: /^\d{8,9}$/,
      // ROMANIA
      RU: /^\d{9}$/,
      // RUSSIAN FEDERATION
      SE: /^\d{8}$/,
      // SWEDEN
      SL: /^(P)[A-Z]\d{7}$/,
      // SLOVENIA
      SK: /^[0-9A-Z]\d{7}$/,
      // SLOVAKIA
      TH: /^[A-Z]{1,2}\d{6,7}$/,
      // THAILAND
      TR: /^[A-Z]\d{8}$/,
      // TURKEY
      UA: /^[A-Z]{2}\d{6}$/,
      // UKRAINE
      US: /^\d{9}$|^[A-Z]\d{8}$/,
      // UNITED STATES
      ZA: /^[TAMD]\d{8}$/
      // SOUTH AFRICA
    };
    var locales = exports2.locales = Object.keys(passportRegexByCountryCode);
    function isPassportNumber(str, countryCode) {
      (0, _assertString.default)(str);
      var normalizedStr = str.replace(/\s/g, "").toUpperCase();
      return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
    }
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isInt.js
var require_isInt = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isInt.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isInt;
    var _assertString = _interopRequireDefault(require_assertString());
    var _nullUndefinedCheck = _interopRequireDefault(require_nullUndefinedCheck());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
    var intLeadingZeroes = /^[-+]?[0-9]+$/;
    function isInt(str, options) {
      (0, _assertString.default)(str);
      options = options || {};
      var regex = options.allow_leading_zeroes === false ? int : intLeadingZeroes;
      var minCheckPassed = !options.hasOwnProperty("min") || (0, _nullUndefinedCheck.default)(options.min) || str >= options.min;
      var maxCheckPassed = !options.hasOwnProperty("max") || (0, _nullUndefinedCheck.default)(options.max) || str <= options.max;
      var ltCheckPassed = !options.hasOwnProperty("lt") || (0, _nullUndefinedCheck.default)(options.lt) || str < options.lt;
      var gtCheckPassed = !options.hasOwnProperty("gt") || (0, _nullUndefinedCheck.default)(options.gt) || str > options.gt;
      return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isPort.js
var require_isPort = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isPort.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isPort;
    var _isInt = _interopRequireDefault(require_isInt());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isPort(str) {
      return (0, _isInt.default)(str, {
        allow_leading_zeroes: false,
        min: 0,
        max: 65535
      });
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLowercase.js
var require_isLowercase = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLowercase.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLowercase;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isLowercase(str) {
      (0, _assertString.default)(str);
      return str === str.toLowerCase();
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isUppercase.js
var require_isUppercase = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isUppercase.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isUppercase;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isUppercase(str) {
      (0, _assertString.default)(str);
      return str === str.toUpperCase();
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIMEI.js
var require_isIMEI = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIMEI.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isIMEI;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var imeiRegexWithoutHyphens = /^[0-9]{15}$/;
    var imeiRegexWithHyphens = /^\d{2}-\d{6}-\d{6}-\d{1}$/;
    function isIMEI(str, options) {
      (0, _assertString.default)(str);
      options = options || {};
      var imeiRegex = imeiRegexWithoutHyphens;
      if (options.allow_hyphens) {
        imeiRegex = imeiRegexWithHyphens;
      }
      if (!imeiRegex.test(str)) {
        return false;
      }
      str = str.replace(/-/g, "");
      var sum = 0, mul = 2, l = 14;
      for (var i = 0; i < l; i++) {
        var digit = str.substring(l - i - 1, l - i);
        var tp = parseInt(digit, 10) * mul;
        if (tp >= 10) {
          sum += tp % 10 + 1;
        } else {
          sum += tp;
        }
        if (mul === 1) {
          mul += 1;
        } else {
          mul -= 1;
        }
      }
      var chk = (10 - sum % 10) % 10;
      if (chk !== parseInt(str.substring(14, 15), 10)) {
        return false;
      }
      return true;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAscii.js
var require_isAscii = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAscii.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isAscii;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ascii = /^[\x00-\x7F]+$/;
    function isAscii(str) {
      (0, _assertString.default)(str);
      return ascii.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isFullWidth.js
var require_isFullWidth = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isFullWidth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isFullWidth;
    exports2.fullWidth = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var fullWidth = exports2.fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
    function isFullWidth(str) {
      (0, _assertString.default)(str);
      return fullWidth.test(str);
    }
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHalfWidth.js
var require_isHalfWidth = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHalfWidth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isHalfWidth;
    exports2.halfWidth = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var halfWidth = exports2.halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
    function isHalfWidth(str) {
      (0, _assertString.default)(str);
      return halfWidth.test(str);
    }
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isVariableWidth.js
var require_isVariableWidth = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isVariableWidth.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isVariableWidth;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isFullWidth = require_isFullWidth();
    var _isHalfWidth = require_isHalfWidth();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isVariableWidth(str) {
      (0, _assertString.default)(str);
      return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMultibyte.js
var require_isMultibyte = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMultibyte.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMultibyte;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var multibyte = /[^\x00-\x7F]/;
    function isMultibyte(str) {
      (0, _assertString.default)(str);
      return multibyte.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/multilineRegex.js
var require_multilineRegex = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/multilineRegex.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = multilineRegexp;
    function multilineRegexp(parts, flags) {
      var regexpAsStringLiteral = parts.join("");
      return new RegExp(regexpAsStringLiteral, flags);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isSemVer.js
var require_isSemVer = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isSemVer.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isSemVer;
    var _assertString = _interopRequireDefault(require_assertString());
    var _multilineRegex = _interopRequireDefault(require_multilineRegex());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var semanticVersioningRegex = (0, _multilineRegex.default)(["^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)", "(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))", "?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$"], "i");
    function isSemVer(str) {
      (0, _assertString.default)(str);
      return semanticVersioningRegex.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isSurrogatePair.js
var require_isSurrogatePair = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isSurrogatePair.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isSurrogatePair;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    function isSurrogatePair(str) {
      (0, _assertString.default)(str);
      return surrogatePair.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDecimal.js
var require_isDecimal = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDecimal.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isDecimal;
    var _merge = _interopRequireDefault(require_merge());
    var _assertString = _interopRequireDefault(require_assertString());
    var _includesArray = _interopRequireDefault(require_includesArray());
    var _alpha = require_alpha();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function decimalRegExp(options) {
      var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? "" : "?", "$"));
      return regExp;
    }
    var default_decimal_options = {
      force_decimal: false,
      decimal_digits: "1,",
      locale: "en-US"
    };
    var blacklist = ["", "-", "+"];
    function isDecimal(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_decimal_options);
      if (options.locale in _alpha.decimal) {
        return !(0, _includesArray.default)(blacklist, str.replace(/ /g, "")) && decimalRegExp(options).test(str);
      }
      throw new Error("Invalid locale '".concat(options.locale, "'"));
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHexadecimal.js
var require_isHexadecimal = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHexadecimal.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isHexadecimal;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;
    function isHexadecimal(str) {
      (0, _assertString.default)(str);
      return hexadecimal.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isOctal.js
var require_isOctal = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isOctal.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isOctal;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var octal = /^(0o)?[0-7]+$/i;
    function isOctal(str) {
      (0, _assertString.default)(str);
      return octal.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDivisibleBy.js
var require_isDivisibleBy = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDivisibleBy.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isDivisibleBy;
    var _assertString = _interopRequireDefault(require_assertString());
    var _toFloat = _interopRequireDefault(require_toFloat());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isDivisibleBy(str, num) {
      (0, _assertString.default)(str);
      return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHexColor.js
var require_isHexColor = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHexColor.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isHexColor;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
    var hexcolor_with_prefix = /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
    var default_is_hexcolor_options = {
      require_hashtag: false
    };
    function isHexColor(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_is_hexcolor_options);
      var hexcolor_regex = options.require_hashtag ? hexcolor_with_prefix : hexcolor;
      return hexcolor_regex.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isRgbColor.js
var require_isRgbColor = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isRgbColor.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isRgbColor;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
    var rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d\d?|1(\.0)?|0(\.0)?)\)$/;
    var rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)$/;
    var rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d\d?|1(\.0)?|0(\.0)?)\)$/;
    var startsWithRgb = /^rgba?/;
    function isRgbColor(str, options) {
      (0, _assertString.default)(str);
      var allowSpaces = false;
      var includePercentValues = true;
      if (_typeof(options) !== "object") {
        if (arguments.length >= 2) {
          includePercentValues = arguments[1];
        }
      } else {
        allowSpaces = options.allowSpaces !== void 0 ? options.allowSpaces : allowSpaces;
        includePercentValues = options.includePercentValues !== void 0 ? options.includePercentValues : includePercentValues;
      }
      if (allowSpaces) {
        if (!startsWithRgb.test(str)) {
          return false;
        }
        str = str.replace(/\s/g, "");
      }
      if (!includePercentValues) {
        return rgbColor.test(str) || rgbaColor.test(str);
      }
      return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHSL.js
var require_isHSL = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHSL.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isHSL;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var hslComma = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i;
    var hslSpace = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;
    function isHSL(str) {
      (0, _assertString.default)(str);
      var strippedStr = str.replace(/\s+/g, " ").replace(/\s?(hsla?\(|\)|,)\s?/ig, "$1");
      if (strippedStr.indexOf(",") !== -1) {
        return hslComma.test(strippedStr);
      }
      return hslSpace.test(strippedStr);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISRC.js
var require_isISRC = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISRC.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISRC;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;
    function isISRC(str) {
      (0, _assertString.default)(str);
      return isrc.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIBAN.js
var require_isIBAN = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIBAN.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isIBAN;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var _includesArray = _interopRequireDefault(require_includesArray());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ibanRegexThroughCountryCode = {
      AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
      AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
      AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
      AT: /^(AT[0-9]{2})\d{16}$/,
      AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
      BA: /^(BA[0-9]{2})\d{16}$/,
      BE: /^(BE[0-9]{2})\d{12}$/,
      BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
      BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
      BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
      BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
      CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
      CR: /^(CR[0-9]{2})\d{18}$/,
      CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
      CZ: /^(CZ[0-9]{2})\d{20}$/,
      DE: /^(DE[0-9]{2})\d{18}$/,
      DK: /^(DK[0-9]{2})\d{14}$/,
      DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
      DZ: /^(DZ\d{24})$/,
      EE: /^(EE[0-9]{2})\d{16}$/,
      EG: /^(EG[0-9]{2})\d{25}$/,
      ES: /^(ES[0-9]{2})\d{20}$/,
      FI: /^(FI[0-9]{2})\d{14}$/,
      FO: /^(FO[0-9]{2})\d{14}$/,
      FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
      GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
      GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
      GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
      GL: /^(GL[0-9]{2})\d{14}$/,
      GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
      GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
      HR: /^(HR[0-9]{2})\d{17}$/,
      HU: /^(HU[0-9]{2})\d{24}$/,
      IE: /^(IE[0-9]{2})[A-Z]{4}\d{14}$/,
      IL: /^(IL[0-9]{2})\d{19}$/,
      IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
      IR: /^(IR[0-9]{2})\d{22}$/,
      IS: /^(IS[0-9]{2})\d{22}$/,
      IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
      JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
      KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
      KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
      LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
      LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
      LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
      LT: /^(LT[0-9]{2})\d{16}$/,
      LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
      LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
      MA: /^(MA[0-9]{26})$/,
      MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
      MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
      ME: /^(ME[0-9]{2})\d{18}$/,
      MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
      MR: /^(MR[0-9]{2})\d{23}$/,
      MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
      MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
      MZ: /^(MZ[0-9]{2})\d{21}$/,
      NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
      NO: /^(NO[0-9]{2})\d{11}$/,
      PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
      PL: /^(PL[0-9]{2})\d{24}$/,
      PS: /^(PS[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
      PT: /^(PT[0-9]{2})\d{21}$/,
      QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
      RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
      RS: /^(RS[0-9]{2})\d{18}$/,
      SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
      SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
      SE: /^(SE[0-9]{2})\d{20}$/,
      SI: /^(SI[0-9]{2})\d{15}$/,
      SK: /^(SK[0-9]{2})\d{20}$/,
      SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
      SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
      TL: /^(TL[0-9]{2})\d{19}$/,
      TN: /^(TN[0-9]{2})\d{20}$/,
      TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
      UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
      VA: /^(VA[0-9]{2})\d{18}$/,
      VG: /^(VG[0-9]{2})[A-Z]{4}\d{16}$/,
      XK: /^(XK[0-9]{2})\d{16}$/
    };
    function hasOnlyValidCountryCodes(countryCodeArray) {
      var countryCodeArrayFilteredWithObjectIbanCode = countryCodeArray.filter(function(countryCode) {
        return !(countryCode in ibanRegexThroughCountryCode);
      });
      if (countryCodeArrayFilteredWithObjectIbanCode.length > 0) {
        return false;
      }
      return true;
    }
    function hasValidIbanFormat(str, options) {
      var strippedStr = str.replace(/[\s\-]+/gi, "").toUpperCase();
      var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
      var isoCountryCodeInIbanRegexCodeObject = isoCountryCode in ibanRegexThroughCountryCode;
      if (options.whitelist) {
        if (!hasOnlyValidCountryCodes(options.whitelist)) {
          return false;
        }
        var isoCountryCodeInWhiteList = (0, _includesArray.default)(options.whitelist, isoCountryCode);
        if (!isoCountryCodeInWhiteList) {
          return false;
        }
      }
      if (options.blacklist) {
        var isoCountryCodeInBlackList = (0, _includesArray.default)(options.blacklist, isoCountryCode);
        if (isoCountryCodeInBlackList) {
          return false;
        }
      }
      return isoCountryCodeInIbanRegexCodeObject && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
    }
    function hasValidIbanChecksum(str) {
      var strippedStr = str.replace(/[^A-Z0-9]+/gi, "").toUpperCase();
      var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
      var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function(char) {
        return char.charCodeAt(0) - 55;
      });
      var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function(acc, value) {
        return Number(acc + value) % 97;
      }, "");
      return remainder === 1;
    }
    function isIBAN(str) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(str);
      return hasValidIbanFormat(str, options) && hasValidIbanChecksum(str);
    }
    var locales = exports2.locales = Object.keys(ibanRegexThroughCountryCode);
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO31661Alpha2.js
var require_isISO31661Alpha2 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO31661Alpha2.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.CountryCodes = void 0;
    exports2.default = isISO31661Alpha2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validISO31661Alpha2CountriesCodes = /* @__PURE__ */ new Set(["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]);
    function isISO31661Alpha2(str) {
      (0, _assertString.default)(str);
      return validISO31661Alpha2CountriesCodes.has(str.toUpperCase());
    }
    var CountryCodes = exports2.CountryCodes = validISO31661Alpha2CountriesCodes;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBIC.js
var require_isBIC = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBIC.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBIC;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isISO31661Alpha = require_isISO31661Alpha2();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isBICReg = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;
    function isBIC(str) {
      (0, _assertString.default)(str);
      var countryCode = str.slice(4, 6).toUpperCase();
      if (!_isISO31661Alpha.CountryCodes.has(countryCode) && countryCode !== "XK") {
        return false;
      }
      return isBICReg.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMD5.js
var require_isMD5 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMD5.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMD5;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var md5 = /^[a-f0-9]{32}$/;
    function isMD5(str) {
      (0, _assertString.default)(str);
      return md5.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHash.js
var require_isHash = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isHash.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isHash;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var lengths = {
      md5: 32,
      md4: 32,
      sha1: 40,
      sha256: 64,
      sha384: 96,
      sha512: 128,
      ripemd128: 32,
      ripemd160: 40,
      tiger128: 32,
      tiger160: 40,
      tiger192: 48,
      crc32: 8,
      crc32b: 8
    };
    function isHash(str, algorithm) {
      (0, _assertString.default)(str);
      var hash = new RegExp("^[a-fA-F0-9]{".concat(lengths[algorithm], "}$"));
      return hash.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBase64.js
var require_isBase64 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBase64.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBase64;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var base64WithPadding = /^[A-Za-z0-9+/]+={0,2}$/;
    var base64WithoutPadding = /^[A-Za-z0-9+/]+$/;
    var base64UrlWithPadding = /^[A-Za-z0-9_-]+={0,2}$/;
    var base64UrlWithoutPadding = /^[A-Za-z0-9_-]+$/;
    function isBase64(str, options) {
      var _options;
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, {
        urlSafe: false,
        padding: !((_options = options) !== null && _options !== void 0 && _options.urlSafe)
      });
      if (str === "") return true;
      if (options.padding && str.length % 4 !== 0) return false;
      var regex;
      if (options.urlSafe) {
        regex = options.padding ? base64UrlWithPadding : base64UrlWithoutPadding;
      } else {
        regex = options.padding ? base64WithPadding : base64WithoutPadding;
      }
      return (!options.padding || str.length % 4 === 0) && regex.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isJWT.js
var require_isJWT = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isJWT.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isJWT;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isBase = _interopRequireDefault(require_isBase64());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isJWT(str) {
      (0, _assertString.default)(str);
      var dotSplit = str.split(".");
      var len = dotSplit.length;
      if (len !== 3) {
        return false;
      }
      return dotSplit.reduce(function(acc, currElem) {
        return acc && (0, _isBase.default)(currElem, {
          urlSafe: true
        });
      }, true);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isJSON.js
var require_isJSON = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isJSON.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isJSON;
    var _assertString = _interopRequireDefault(require_assertString());
    var _includesArray = _interopRequireDefault(require_includesArray());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    var default_json_options = {
      allow_primitives: false
    };
    function isJSON(str, options) {
      (0, _assertString.default)(str);
      try {
        options = (0, _merge.default)(options, default_json_options);
        var primitives = [];
        if (options.allow_primitives) {
          primitives = [null, false, true];
        }
        var obj = JSON.parse(str);
        return (0, _includesArray.default)(primitives, obj) || !!obj && _typeof(obj) === "object";
      } catch (e) {
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEmpty.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isEmpty;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var default_is_empty_options = {
      ignore_whitespace: false
    };
    function isEmpty(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_is_empty_options);
      return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLength.js
var require_isLength = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLength.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLength;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
      if (_typeof(options) === "object") {
        min = options.min || 0;
        max = options.max;
      } else {
        min = arguments[1] || 0;
        max = arguments[2];
      }
      var presentationSequences = str.match(/[^\uFE0F\uFE0E][\uFE0F\uFE0E]/g) || [];
      var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
      var len = str.length - presentationSequences.length - surrogatePairs.length;
      var isInsideRange = len >= min && (typeof max === "undefined" || len <= max);
      if (isInsideRange && Array.isArray(options === null || options === void 0 ? void 0 : options.discreteLengths)) {
        return options.discreteLengths.some(function(discreteLen) {
          return discreteLen === len;
        });
      }
      return isInsideRange;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isULID.js
var require_isULID = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isULID.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isULID;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isULID(str) {
      (0, _assertString.default)(str);
      return /^[0-7][0-9A-HJKMNP-TV-Z]{25}$/i.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isUUID.js
var require_isUUID = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isUUID.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isUUID;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var uuid = {
      1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      6: /^[0-9A-F]{8}-[0-9A-F]{4}-6[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      7: /^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      8: /^[0-9A-F]{8}-[0-9A-F]{4}-8[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      nil: /^00000000-0000-0000-0000-000000000000$/i,
      max: /^ffffffff-ffff-ffff-ffff-ffffffffffff$/i,
      loose: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      // From https://github.com/uuidjs/uuid/blob/main/src/regex.js
      all: /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i
    };
    function isUUID(str, version) {
      (0, _assertString.default)(str);
      if (version === void 0 || version === null) {
        version = "all";
      }
      return version in uuid ? uuid[version].test(str) : false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMongoId.js
var require_isMongoId = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMongoId.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMongoId;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isHexadecimal = _interopRequireDefault(require_isHexadecimal());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isMongoId(str) {
      (0, _assertString.default)(str);
      return (0, _isHexadecimal.default)(str) && str.length === 24;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAfter.js
var require_isAfter = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isAfter.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isAfter;
    var _toDate = _interopRequireDefault(require_toDate());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isAfter(date, options) {
      var comparisonDate = (_typeof(options) === "object" ? options.comparisonDate : options) || Date().toString();
      var comparison = (0, _toDate.default)(comparisonDate);
      var original = (0, _toDate.default)(date);
      return !!(original && comparison && original > comparison);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBefore.js
var require_isBefore = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBefore.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBefore;
    var _toDate = _interopRequireDefault(require_toDate());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isBefore(date, options) {
      var comparisonDate = (_typeof(options) === "object" ? options.comparisonDate : options) || Date().toString();
      var comparison = (0, _toDate.default)(comparisonDate);
      var original = (0, _toDate.default)(date);
      return !!(original && comparison && original < comparison);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIn.js
var require_isIn = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIn.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isIn;
    var _assertString = _interopRequireDefault(require_assertString());
    var _toString = _interopRequireDefault(require_toString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function isIn(str, options) {
      (0, _assertString.default)(str);
      var i;
      if (Object.prototype.toString.call(options) === "[object Array]") {
        var array = [];
        for (i in options) {
          if ({}.hasOwnProperty.call(options, i)) {
            array[i] = (0, _toString.default)(options[i]);
          }
        }
        return array.indexOf(str) >= 0;
      } else if (_typeof(options) === "object") {
        return options.hasOwnProperty(str);
      } else if (options && typeof options.indexOf === "function") {
        return options.indexOf(str) >= 0;
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLuhnNumber.js
var require_isLuhnNumber = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLuhnNumber.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLuhnNumber;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isLuhnNumber(str) {
      (0, _assertString.default)(str);
      var sanitized = str.replace(/[- ]+/g, "");
      var sum = 0;
      var digit;
      var tmpNum;
      var shouldDouble;
      for (var i = sanitized.length - 1; i >= 0; i--) {
        digit = sanitized.substring(i, i + 1);
        tmpNum = parseInt(digit, 10);
        if (shouldDouble) {
          tmpNum *= 2;
          if (tmpNum >= 10) {
            sum += tmpNum % 10 + 1;
          } else {
            sum += tmpNum;
          }
        } else {
          sum += tmpNum;
        }
        shouldDouble = !shouldDouble;
      }
      return !!(sum % 10 === 0 ? sanitized : false);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isCreditCard.js
var require_isCreditCard = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isCreditCard.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isCreditCard;
    var _assertString = _interopRequireDefault(require_assertString());
    var _isLuhnNumber = _interopRequireDefault(require_isLuhnNumber());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var cards = {
      amex: /^3[47][0-9]{13}$/,
      dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
      mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
      // /^[25][1-7][0-9]{14}$/;
      unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
      visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
    };
    var allCards = (function() {
      var tmpCardsArray = [];
      for (var cardProvider in cards) {
        if (cards.hasOwnProperty(cardProvider)) {
          tmpCardsArray.push(cards[cardProvider]);
        }
      }
      return tmpCardsArray;
    })();
    function isCreditCard(card) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(card);
      var provider = options.provider;
      var sanitized = card.replace(/[- ]+/g, "");
      if (provider && provider.toLowerCase() in cards) {
        if (!cards[provider.toLowerCase()].test(sanitized)) {
          return false;
        }
      } else if (provider && !(provider.toLowerCase() in cards)) {
        throw new Error("".concat(provider, " is not a valid credit card provider."));
      } else if (!allCards.some(function(cardProvider) {
        return cardProvider.test(sanitized);
      })) {
        return false;
      }
      return (0, _isLuhnNumber.default)(card);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIdentityCard.js
var require_isIdentityCard = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isIdentityCard.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isIdentityCard;
    var _assertString = _interopRequireDefault(require_assertString());
    var _includesArray = _interopRequireDefault(require_includesArray());
    var _isInt = _interopRequireDefault(require_isInt());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validators3 = {
      PL: function PL(str) {
        (0, _assertString.default)(str);
        var weightOfDigits = {
          1: 1,
          2: 3,
          3: 7,
          4: 9,
          5: 1,
          6: 3,
          7: 7,
          8: 9,
          9: 1,
          10: 3,
          11: 0
        };
        if (str != null && str.length === 11 && (0, _isInt.default)(str, {
          allow_leading_zeroes: true
        })) {
          var digits = str.split("").slice(0, -1);
          var sum = digits.reduce(function(acc, digit, index) {
            return acc + Number(digit) * weightOfDigits[index + 1];
          }, 0);
          var modulo = sum % 10;
          var lastDigit = Number(str.charAt(str.length - 1));
          if (modulo === 0 && lastDigit === 0 || lastDigit === 10 - modulo) {
            return true;
          }
        }
        return false;
      },
      ES: function ES(str) {
        (0, _assertString.default)(str);
        var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
        var charsValue = {
          X: 0,
          Y: 1,
          Z: 2
        };
        var controlDigits = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
        var sanitized = str.trim().toUpperCase();
        if (!DNI.test(sanitized)) {
          return false;
        }
        var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function(char) {
          return charsValue[char];
        });
        return sanitized.endsWith(controlDigits[number % 23]);
      },
      FI: function FI(str) {
        (0, _assertString.default)(str);
        if (str.length !== 11) {
          return false;
        }
        if (!str.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/)) {
          return false;
        }
        var checkDigits = "0123456789ABCDEFHJKLMNPRSTUVWXY";
        var idAsNumber = parseInt(str.slice(0, 6), 10) * 1e3 + parseInt(str.slice(7, 10), 10);
        var remainder = idAsNumber % 31;
        var checkDigit = checkDigits[remainder];
        return checkDigit === str.slice(10, 11);
      },
      IN: function IN(str) {
        var DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/;
        var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
        var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];
        var sanitized = str.trim();
        if (!DNI.test(sanitized)) {
          return false;
        }
        var c = 0;
        var invertedArray = sanitized.replace(/\s/g, "").split("").map(Number).reverse();
        invertedArray.forEach(function(val, i) {
          c = d[c][p[i % 8][val]];
        });
        return c === 0;
      },
      IR: function IR(str) {
        if (!str.match(/^\d{10}$/)) return false;
        str = "0000".concat(str).slice(str.length - 6);
        if (parseInt(str.slice(3, 9), 10) === 0) return false;
        var lastNumber = parseInt(str.slice(9, 10), 10);
        var sum = 0;
        for (var i = 0; i < 9; i++) {
          sum += parseInt(str.slice(i, i + 1), 10) * (10 - i);
        }
        sum %= 11;
        return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
      },
      IT: function IT(str) {
        if (str.length !== 9) return false;
        if (str === "CA00000AA") return false;
        return str.search(/C[A-Z]\d{5}[A-Z]{2}/i) > -1;
      },
      NO: function NO(str) {
        var sanitized = str.trim();
        if (isNaN(Number(sanitized))) return false;
        if (sanitized.length !== 11) return false;
        if (sanitized === "00000000000") return false;
        var f = sanitized.split("").map(Number);
        var k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
        var k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
        if (k1 !== f[9] || k2 !== f[10]) return false;
        return true;
      },
      TH: function TH(str) {
        if (!str.match(/^[1-8]\d{12}$/)) return false;
        var sum = 0;
        for (var i = 0; i < 12; i++) {
          sum += parseInt(str[i], 10) * (13 - i);
        }
        return str[12] === ((11 - sum % 11) % 10).toString();
      },
      LK: function LK(str) {
        var old_nic = /^[1-9]\d{8}[vx]$/i;
        var new_nic = /^[1-9]\d{11}$/i;
        if (str.length === 10 && old_nic.test(str)) return true;
        else if (str.length === 12 && new_nic.test(str)) return true;
        return false;
      },
      "he-IL": function heIL(str) {
        var DNI = /^\d{9}$/;
        var sanitized = str.trim();
        if (!DNI.test(sanitized)) {
          return false;
        }
        var id = sanitized;
        var sum = 0, incNum;
        for (var i = 0; i < id.length; i++) {
          incNum = Number(id[i]) * (i % 2 + 1);
          sum += incNum > 9 ? incNum - 9 : incNum;
        }
        return sum % 10 === 0;
      },
      "ar-LY": function arLY(str) {
        var NIN = /^(1|2)\d{11}$/;
        var sanitized = str.trim();
        if (!NIN.test(sanitized)) {
          return false;
        }
        return true;
      },
      "ar-TN": function arTN(str) {
        var DNI = /^\d{8}$/;
        var sanitized = str.trim();
        if (!DNI.test(sanitized)) {
          return false;
        }
        return true;
      },
      "zh-CN": function zhCN(str) {
        var provincesAndCities = [
          "11",
          // 北京
          "12",
          // 天津
          "13",
          // 河北
          "14",
          // 山西
          "15",
          // 内蒙古
          "21",
          // 辽宁
          "22",
          // 吉林
          "23",
          // 黑龙江
          "31",
          // 上海
          "32",
          // 江苏
          "33",
          // 浙江
          "34",
          // 安徽
          "35",
          // 福建
          "36",
          // 江西
          "37",
          // 山东
          "41",
          // 河南
          "42",
          // 湖北
          "43",
          // 湖南
          "44",
          // 广东
          "45",
          // 广西
          "46",
          // 海南
          "50",
          // 重庆
          "51",
          // 四川
          "52",
          // 贵州
          "53",
          // 云南
          "54",
          // 西藏
          "61",
          // 陕西
          "62",
          // 甘肃
          "63",
          // 青海
          "64",
          // 宁夏
          "65",
          // 新疆
          "71",
          // 台湾
          "81",
          // 香港
          "82",
          // 澳门
          "91"
          // 国外
        ];
        var powers = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
        var parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
        var checkAddressCode = function checkAddressCode2(addressCode) {
          return (0, _includesArray.default)(provincesAndCities, addressCode);
        };
        var checkBirthDayCode = function checkBirthDayCode2(birDayCode) {
          var yyyy = parseInt(birDayCode.substring(0, 4), 10);
          var mm = parseInt(birDayCode.substring(4, 6), 10);
          var dd = parseInt(birDayCode.substring(6), 10);
          var xdata = new Date(yyyy, mm - 1, dd);
          if (xdata > /* @__PURE__ */ new Date()) {
            return false;
          } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
            return true;
          }
          return false;
        };
        var getParityBit = function getParityBit2(idCardNo) {
          var id17 = idCardNo.substring(0, 17);
          var power = 0;
          for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
          }
          var mod = power % 11;
          return parityBit[mod];
        };
        var checkParityBit = function checkParityBit2(idCardNo) {
          return getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
        };
        var check15IdCardNo = function check15IdCardNo2(idCardNo) {
          var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
          if (!check) return false;
          var addressCode = idCardNo.substring(0, 2);
          check = checkAddressCode(addressCode);
          if (!check) return false;
          var birDayCode = "19".concat(idCardNo.substring(6, 12));
          check = checkBirthDayCode(birDayCode);
          if (!check) return false;
          return true;
        };
        var check18IdCardNo = function check18IdCardNo2(idCardNo) {
          var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
          if (!check) return false;
          var addressCode = idCardNo.substring(0, 2);
          check = checkAddressCode(addressCode);
          if (!check) return false;
          var birDayCode = idCardNo.substring(6, 14);
          check = checkBirthDayCode(birDayCode);
          if (!check) return false;
          return checkParityBit(idCardNo);
        };
        var checkIdCardNo = function checkIdCardNo2(idCardNo) {
          var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
          if (!check) return false;
          if (idCardNo.length === 15) {
            return check15IdCardNo(idCardNo);
          }
          return check18IdCardNo(idCardNo);
        };
        return checkIdCardNo(str);
      },
      "zh-HK": function zhHK(str) {
        str = str.trim();
        var regexHKID = /^[A-Z]{1,2}[0-9]{6}((\([0-9A]\))|(\[[0-9A]\])|([0-9A]))$/;
        var regexIsDigit = /^[0-9]$/;
        str = str.toUpperCase();
        if (!regexHKID.test(str)) return false;
        str = str.replace(/\[|\]|\(|\)/g, "");
        if (str.length === 8) str = "3".concat(str);
        var checkSumVal = 0;
        for (var i = 0; i <= 7; i++) {
          var convertedChar = void 0;
          if (!regexIsDigit.test(str[i])) convertedChar = (str[i].charCodeAt(0) - 55) % 11;
          else convertedChar = str[i];
          checkSumVal += convertedChar * (9 - i);
        }
        checkSumVal %= 11;
        var checkSumConverted;
        if (checkSumVal === 0) checkSumConverted = "0";
        else if (checkSumVal === 1) checkSumConverted = "A";
        else checkSumConverted = String(11 - checkSumVal);
        if (checkSumConverted === str[str.length - 1]) return true;
        return false;
      },
      "zh-TW": function zhTW(str) {
        var ALPHABET_CODES = {
          A: 10,
          B: 11,
          C: 12,
          D: 13,
          E: 14,
          F: 15,
          G: 16,
          H: 17,
          I: 34,
          J: 18,
          K: 19,
          L: 20,
          M: 21,
          N: 22,
          O: 35,
          P: 23,
          Q: 24,
          R: 25,
          S: 26,
          T: 27,
          U: 28,
          V: 29,
          W: 32,
          X: 30,
          Y: 31,
          Z: 33
        };
        var sanitized = str.trim().toUpperCase();
        if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
        return Array.from(sanitized).reduce(function(sum, number, index) {
          if (index === 0) {
            var code = ALPHABET_CODES[number];
            return code % 10 * 9 + Math.floor(code / 10);
          }
          if (index === 9) {
            return (10 - sum % 10 - Number(number)) % 10 === 0;
          }
          return sum + Number(number) * (9 - index);
        }, 0);
      },
      PK: function PK(str) {
        var CNIC = /^[1-7][0-9]{4}-[0-9]{7}-[1-9]$/;
        var sanitized = str.trim();
        return CNIC.test(sanitized);
      }
    };
    function isIdentityCard(str, locale) {
      (0, _assertString.default)(str);
      if (locale in validators3) {
        return validators3[locale](str);
      } else if (locale === "any") {
        for (var key in validators3) {
          if (validators3.hasOwnProperty(key)) {
            var validator = validators3[key];
            if (validator(str)) {
              return true;
            }
          }
        }
        return false;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEAN.js
var require_isEAN = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEAN.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isEAN;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var LENGTH_EAN_8 = 8;
    var LENGTH_EAN_14 = 14;
    var validEanRegex = /^(\d{8}|\d{13}|\d{14})$/;
    function getPositionWeightThroughLengthAndIndex(length, index) {
      if (length === LENGTH_EAN_8 || length === LENGTH_EAN_14) {
        return index % 2 === 0 ? 3 : 1;
      }
      return index % 2 === 0 ? 1 : 3;
    }
    function calculateCheckDigit(ean) {
      var checksum = ean.slice(0, -1).split("").map(function(char, index) {
        return Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index);
      }).reduce(function(acc, partialSum) {
        return acc + partialSum;
      }, 0);
      var remainder = 10 - checksum % 10;
      return remainder < 10 ? remainder : 0;
    }
    function isEAN(str) {
      (0, _assertString.default)(str);
      var actualCheckDigit = Number(str.slice(-1));
      return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISIN.js
var require_isISIN = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISIN.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISIN;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
    function isISIN(str) {
      (0, _assertString.default)(str);
      if (!isin.test(str)) {
        return false;
      }
      var double = true;
      var sum = 0;
      for (var i = str.length - 2; i >= 0; i--) {
        if (str[i] >= "A" && str[i] <= "Z") {
          var value = str[i].charCodeAt(0) - 55;
          var lo = value % 10;
          var hi = Math.trunc(value / 10);
          for (var _i = 0, _arr = [lo, hi]; _i < _arr.length; _i++) {
            var digit = _arr[_i];
            if (double) {
              if (digit >= 5) {
                sum += 1 + (digit - 5) * 2;
              } else {
                sum += digit * 2;
              }
            } else {
              sum += digit;
            }
            double = !double;
          }
        } else {
          var _digit = str[i].charCodeAt(0) - "0".charCodeAt(0);
          if (double) {
            if (_digit >= 5) {
              sum += 1 + (_digit - 5) * 2;
            } else {
              sum += _digit * 2;
            }
          } else {
            sum += _digit;
          }
          double = !double;
        }
      }
      var check = Math.trunc((sum + 9) / 10) * 10 - sum;
      return +str[str.length - 1] === check;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISBN.js
var require_isISBN = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISBN.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISBN;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var possibleIsbn10 = /^(?:[0-9]{9}X|[0-9]{10})$/;
    var possibleIsbn13 = /^(?:[0-9]{13})$/;
    var factor = [1, 3];
    function isISBN(isbn, options) {
      (0, _assertString.default)(isbn);
      var version = String((options === null || options === void 0 ? void 0 : options.version) || options);
      if (!(options !== null && options !== void 0 && options.version || options)) {
        return isISBN(isbn, {
          version: 10
        }) || isISBN(isbn, {
          version: 13
        });
      }
      var sanitizedIsbn = isbn.replace(/[\s-]+/g, "");
      var checksum = 0;
      if (version === "10") {
        if (!possibleIsbn10.test(sanitizedIsbn)) {
          return false;
        }
        for (var i = 0; i < version - 1; i++) {
          checksum += (i + 1) * sanitizedIsbn.charAt(i);
        }
        if (sanitizedIsbn.charAt(9) === "X") {
          checksum += 10 * 10;
        } else {
          checksum += 10 * sanitizedIsbn.charAt(9);
        }
        if (checksum % 11 === 0) {
          return true;
        }
      } else if (version === "13") {
        if (!possibleIsbn13.test(sanitizedIsbn)) {
          return false;
        }
        for (var _i = 0; _i < 12; _i++) {
          checksum += factor[_i % 2] * sanitizedIsbn.charAt(_i);
        }
        if (sanitizedIsbn.charAt(12) - (10 - checksum % 10) % 10 === 0) {
          return true;
        }
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISSN.js
var require_isISSN = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISSN.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISSN;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var issn = "^\\d{4}-?\\d{3}[\\dX]$";
    function isISSN(str) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(str);
      var testIssn = issn;
      testIssn = options.require_hyphen ? testIssn.replace("?", "") : testIssn;
      testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, "i");
      if (!testIssn.test(str)) {
        return false;
      }
      var digits = str.replace("-", "").toUpperCase();
      var checksum = 0;
      for (var i = 0; i < digits.length; i++) {
        var digit = digits[i];
        checksum += (digit === "X" ? 10 : +digit) * (8 - i);
      }
      return checksum % 11 === 0;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/algorithms.js
var require_algorithms = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/util/algorithms.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.iso7064Check = iso7064Check;
    exports2.luhnCheck = luhnCheck;
    exports2.reverseMultiplyAndSum = reverseMultiplyAndSum;
    exports2.verhoeffCheck = verhoeffCheck;
    function iso7064Check(str) {
      var checkvalue = 10;
      for (var i = 0; i < str.length - 1; i++) {
        checkvalue = (parseInt(str[i], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (parseInt(str[i], 10) + checkvalue) % 10 * 2 % 11;
      }
      checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
      return checkvalue === parseInt(str[10], 10);
    }
    function luhnCheck(str) {
      var checksum = 0;
      var second = false;
      for (var i = str.length - 1; i >= 0; i--) {
        if (second) {
          var product = parseInt(str[i], 10) * 2;
          if (product > 9) {
            checksum += product.toString().split("").map(function(a) {
              return parseInt(a, 10);
            }).reduce(function(a, b) {
              return a + b;
            }, 0);
          } else {
            checksum += product;
          }
        } else {
          checksum += parseInt(str[i], 10);
        }
        second = !second;
      }
      return checksum % 10 === 0;
    }
    function reverseMultiplyAndSum(digits, base) {
      var total = 0;
      for (var i = 0; i < digits.length; i++) {
        total += digits[i] * (base - i);
      }
      return total;
    }
    function verhoeffCheck(str) {
      var d_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
      var p_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];
      var str_copy = str.split("").reverse().join("");
      var checksum = 0;
      for (var i = 0; i < str_copy.length; i++) {
        checksum = d_table[checksum][p_table[i % 8][parseInt(str_copy[i], 10)]];
      }
      return checksum === 0;
    }
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isTaxID.js
var require_isTaxID = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isTaxID.js"(exports2, module2) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isTaxID;
    var _assertString = _interopRequireDefault(require_assertString());
    var algorithms = _interopRequireWildcard(require_algorithms());
    var _isDate = _interopRequireDefault(require_isDate());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function bgBgCheck(tin) {
      var century_year = tin.slice(0, 2);
      var month = parseInt(tin.slice(2, 4), 10);
      if (month > 40) {
        month -= 40;
        century_year = "20".concat(century_year);
      } else if (month > 20) {
        month -= 20;
        century_year = "18".concat(century_year);
      } else {
        century_year = "19".concat(century_year);
      }
      if (month < 10) {
        month = "0".concat(month);
      }
      var date = "".concat(century_year, "/").concat(month, "/").concat(tin.slice(4, 6));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var multip_lookup = [2, 4, 8, 5, 10, 9, 7, 3, 6];
      var checksum = 0;
      for (var i = 0; i < multip_lookup.length; i++) {
        checksum += digits[i] * multip_lookup[i];
      }
      checksum = checksum % 11 === 10 ? 0 : checksum % 11;
      return checksum === digits[9];
    }
    function isCanadianSIN(input) {
      var digitsArray = input.split("");
      var even = digitsArray.filter(function(_, idx) {
        return idx % 2;
      }).map(function(i) {
        return Number(i) * 2;
      }).join("").split("");
      var total = digitsArray.filter(function(_, idx) {
        return !(idx % 2);
      }).concat(even).map(function(i) {
        return Number(i);
      }).reduce(function(acc, cur) {
        return acc + cur;
      });
      return total % 10 === 0;
    }
    function csCzCheck(tin) {
      tin = tin.replace(/\W/, "");
      var full_year = parseInt(tin.slice(0, 2), 10);
      if (tin.length === 10) {
        if (full_year < 54) {
          full_year = "20".concat(full_year);
        } else {
          full_year = "19".concat(full_year);
        }
      } else {
        if (tin.slice(6) === "000") {
          return false;
        }
        if (full_year < 54) {
          full_year = "19".concat(full_year);
        } else {
          return false;
        }
      }
      if (full_year.length === 3) {
        full_year = [full_year.slice(0, 2), "0", full_year.slice(2)].join("");
      }
      var month = parseInt(tin.slice(2, 4), 10);
      if (month > 50) {
        month -= 50;
      }
      if (month > 20) {
        if (parseInt(full_year, 10) < 2004) {
          return false;
        }
        month -= 20;
      }
      if (month < 10) {
        month = "0".concat(month);
      }
      var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      if (tin.length === 10) {
        if (parseInt(tin, 10) % 11 !== 0) {
          var checkdigit = parseInt(tin.slice(0, 9), 10) % 11;
          if (parseInt(full_year, 10) < 1986 && checkdigit === 10) {
            if (parseInt(tin.slice(9), 10) !== 0) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
      return true;
    }
    function deAtCheck(tin) {
      return algorithms.luhnCheck(tin);
    }
    function deDeCheck(tin) {
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var occurrences = [];
      for (var i = 0; i < digits.length - 1; i++) {
        occurrences.push("");
        for (var j = 0; j < digits.length - 1; j++) {
          if (digits[i] === digits[j]) {
            occurrences[i] += j;
          }
        }
      }
      occurrences = occurrences.filter(function(a) {
        return a.length > 1;
      });
      if (occurrences.length !== 2 && occurrences.length !== 3) {
        return false;
      }
      if (occurrences[0].length === 3) {
        var trip_locations = occurrences[0].split("").map(function(a) {
          return parseInt(a, 10);
        });
        var recurrent = 0;
        for (var _i = 0; _i < trip_locations.length - 1; _i++) {
          if (trip_locations[_i] + 1 === trip_locations[_i + 1]) {
            recurrent += 1;
          }
        }
        if (recurrent === 2) {
          return false;
        }
      }
      return algorithms.iso7064Check(tin);
    }
    function dkDkCheck(tin) {
      tin = tin.replace(/\W/, "");
      var year = parseInt(tin.slice(4, 6), 10);
      var century_digit = tin.slice(6, 7);
      switch (century_digit) {
        case "0":
        case "1":
        case "2":
        case "3":
          year = "19".concat(year);
          break;
        case "4":
        case "9":
          if (year < 37) {
            year = "20".concat(year);
          } else {
            year = "19".concat(year);
          }
          break;
        default:
          if (year < 37) {
            year = "20".concat(year);
          } else if (year > 58) {
            year = "18".concat(year);
          } else {
            return false;
          }
          break;
      }
      if (year.length === 3) {
        year = [year.slice(0, 2), "0", year.slice(2)].join("");
      }
      var date = "".concat(year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var checksum = 0;
      var weight = 4;
      for (var i = 0; i < 9; i++) {
        checksum += digits[i] * weight;
        weight -= 1;
        if (weight === 1) {
          weight = 7;
        }
      }
      checksum %= 11;
      if (checksum === 1) {
        return false;
      }
      return checksum === 0 ? digits[9] === 0 : digits[9] === 11 - checksum;
    }
    function elCyCheck(tin) {
      var digits = tin.slice(0, 8).split("").map(function(a) {
        return parseInt(a, 10);
      });
      var checksum = 0;
      for (var i = 1; i < digits.length; i += 2) {
        checksum += digits[i];
      }
      for (var _i2 = 0; _i2 < digits.length; _i2 += 2) {
        if (digits[_i2] < 2) {
          checksum += 1 - digits[_i2];
        } else {
          checksum += 2 * (digits[_i2] - 2) + 5;
          if (digits[_i2] > 4) {
            checksum += 2;
          }
        }
      }
      return String.fromCharCode(checksum % 26 + 65) === tin.charAt(8);
    }
    function elGrCheck(tin) {
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var checksum = 0;
      for (var i = 0; i < 8; i++) {
        checksum += digits[i] * Math.pow(2, 8 - i);
      }
      return checksum % 11 % 10 === digits[8];
    }
    function enIeCheck(tin) {
      var checksum = algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 7).map(function(a) {
        return parseInt(a, 10);
      }), 8);
      if (tin.length === 9 && tin[8] !== "W") {
        checksum += (tin[8].charCodeAt(0) - 64) * 9;
      }
      checksum %= 23;
      if (checksum === 0) {
        return tin[7].toUpperCase() === "W";
      }
      return tin[7].toUpperCase() === String.fromCharCode(64 + checksum);
    }
    var enUsCampusPrefix = {
      andover: ["10", "12"],
      atlanta: ["60", "67"],
      austin: ["50", "53"],
      brookhaven: ["01", "02", "03", "04", "05", "06", "11", "13", "14", "16", "21", "22", "23", "25", "34", "51", "52", "54", "55", "56", "57", "58", "59", "65"],
      cincinnati: ["30", "32", "35", "36", "37", "38", "61"],
      fresno: ["15", "24"],
      internet: ["20", "26", "27", "45", "46", "47"],
      kansas: ["40", "44"],
      memphis: ["94", "95"],
      ogden: ["80", "90"],
      philadelphia: ["33", "39", "41", "42", "43", "46", "48", "62", "63", "64", "66", "68", "71", "72", "73", "74", "75", "76", "77", "81", "82", "83", "84", "85", "86", "87", "88", "91", "92", "93", "98", "99"],
      sba: ["31"]
    };
    function enUsGetPrefixes() {
      var prefixes = [];
      for (var location in enUsCampusPrefix) {
        if (enUsCampusPrefix.hasOwnProperty(location)) {
          prefixes.push.apply(prefixes, _toConsumableArray(enUsCampusPrefix[location]));
        }
      }
      return prefixes;
    }
    function enUsCheck(tin) {
      return enUsGetPrefixes().indexOf(tin.slice(0, 2)) !== -1;
    }
    function esArCheck(tin) {
      var accum = 0;
      var digits = tin.split("");
      var digit = parseInt(digits.pop(), 10);
      for (var i = 0; i < digits.length; i++) {
        accum += digits[9 - i] * (2 + i % 6);
      }
      var verif = 11 - accum % 11;
      if (verif === 11) {
        verif = 0;
      } else if (verif === 10) {
        verif = 9;
      }
      return digit === verif;
    }
    function esEsCheck(tin) {
      var chars = tin.toUpperCase().split("");
      if (isNaN(parseInt(chars[0], 10)) && chars.length > 1) {
        var lead_replace = 0;
        switch (chars[0]) {
          case "Y":
            lead_replace = 1;
            break;
          case "Z":
            lead_replace = 2;
            break;
          default:
        }
        chars.splice(0, 1, lead_replace);
      } else {
        while (chars.length < 9) {
          chars.unshift(0);
        }
      }
      var lookup = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
      chars = chars.join("");
      var checksum = parseInt(chars.slice(0, 8), 10) % 23;
      return chars[8] === lookup[checksum];
    }
    function etEeCheck(tin) {
      var full_year = tin.slice(1, 3);
      var century_digit = tin.slice(0, 1);
      switch (century_digit) {
        case "1":
        case "2":
          full_year = "18".concat(full_year);
          break;
        case "3":
        case "4":
          full_year = "19".concat(full_year);
          break;
        default:
          full_year = "20".concat(full_year);
          break;
      }
      var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var checksum = 0;
      var weight = 1;
      for (var i = 0; i < 10; i++) {
        checksum += digits[i] * weight;
        weight += 1;
        if (weight === 10) {
          weight = 1;
        }
      }
      if (checksum % 11 === 10) {
        checksum = 0;
        weight = 3;
        for (var _i3 = 0; _i3 < 10; _i3++) {
          checksum += digits[_i3] * weight;
          weight += 1;
          if (weight === 10) {
            weight = 1;
          }
        }
        if (checksum % 11 === 10) {
          return digits[10] === 0;
        }
      }
      return checksum % 11 === digits[10];
    }
    function fiFiCheck(tin) {
      var full_year = tin.slice(4, 6);
      var century_symbol = tin.slice(6, 7);
      switch (century_symbol) {
        case "+":
          full_year = "18".concat(full_year);
          break;
        case "-":
          full_year = "19".concat(full_year);
          break;
        default:
          full_year = "20".concat(full_year);
          break;
      }
      var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      var checksum = parseInt(tin.slice(0, 6) + tin.slice(7, 10), 10) % 31;
      if (checksum < 10) {
        return checksum === parseInt(tin.slice(10), 10);
      }
      checksum -= 10;
      var letters_lookup = ["A", "B", "C", "D", "E", "F", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y"];
      return letters_lookup[checksum] === tin.slice(10);
    }
    function frBeCheck(tin) {
      if (tin.slice(2, 4) !== "00" || tin.slice(4, 6) !== "00") {
        var date = "".concat(tin.slice(0, 2), "/").concat(tin.slice(2, 4), "/").concat(tin.slice(4, 6));
        if (!(0, _isDate.default)(date, "YY/MM/DD")) {
          return false;
        }
      }
      var checksum = 97 - parseInt(tin.slice(0, 9), 10) % 97;
      var checkdigits = parseInt(tin.slice(9, 11), 10);
      if (checksum !== checkdigits) {
        checksum = 97 - parseInt("2".concat(tin.slice(0, 9)), 10) % 97;
        if (checksum !== checkdigits) {
          return false;
        }
      }
      return true;
    }
    function frFrCheck(tin) {
      tin = tin.replace(/\s/g, "");
      var checksum = parseInt(tin.slice(0, 10), 10) % 511;
      var checkdigits = parseInt(tin.slice(10, 13), 10);
      return checksum === checkdigits;
    }
    function frLuCheck(tin) {
      var date = "".concat(tin.slice(0, 4), "/").concat(tin.slice(4, 6), "/").concat(tin.slice(6, 8));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      if (!algorithms.luhnCheck(tin.slice(0, 12))) {
        return false;
      }
      return algorithms.verhoeffCheck("".concat(tin.slice(0, 11)).concat(tin[12]));
    }
    function hrHrCheck(tin) {
      return algorithms.iso7064Check(tin);
    }
    function huHuCheck(tin) {
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var checksum = 8;
      for (var i = 1; i < 9; i++) {
        checksum += digits[i] * (i + 1);
      }
      return checksum % 11 === digits[9];
    }
    function itItNameCheck(name) {
      var vowelflag = false;
      var xflag = false;
      for (var i = 0; i < 3; i++) {
        if (!vowelflag && /[AEIOU]/.test(name[i])) {
          vowelflag = true;
        } else if (!xflag && vowelflag && name[i] === "X") {
          xflag = true;
        } else if (i > 0) {
          if (vowelflag && !xflag) {
            if (!/[AEIOU]/.test(name[i])) {
              return false;
            }
          }
          if (xflag) {
            if (!/X/.test(name[i])) {
              return false;
            }
          }
        }
      }
      return true;
    }
    function itItCheck(tin) {
      var chars = tin.toUpperCase().split("");
      if (!itItNameCheck(chars.slice(0, 3))) {
        return false;
      }
      if (!itItNameCheck(chars.slice(3, 6))) {
        return false;
      }
      var number_locations = [6, 7, 9, 10, 12, 13, 14];
      var number_replace = {
        L: "0",
        M: "1",
        N: "2",
        P: "3",
        Q: "4",
        R: "5",
        S: "6",
        T: "7",
        U: "8",
        V: "9"
      };
      for (var _i4 = 0, _number_locations = number_locations; _i4 < _number_locations.length; _i4++) {
        var i = _number_locations[_i4];
        if (chars[i] in number_replace) {
          chars.splice(i, 1, number_replace[chars[i]]);
        }
      }
      var month_replace = {
        A: "01",
        B: "02",
        C: "03",
        D: "04",
        E: "05",
        H: "06",
        L: "07",
        M: "08",
        P: "09",
        R: "10",
        S: "11",
        T: "12"
      };
      var month = month_replace[chars[8]];
      var day = parseInt(chars[9] + chars[10], 10);
      if (day > 40) {
        day -= 40;
      }
      if (day < 10) {
        day = "0".concat(day);
      }
      var date = "".concat(chars[6]).concat(chars[7], "/").concat(month, "/").concat(day);
      if (!(0, _isDate.default)(date, "YY/MM/DD")) {
        return false;
      }
      var checksum = 0;
      for (var _i5 = 1; _i5 < chars.length - 1; _i5 += 2) {
        var char_to_int = parseInt(chars[_i5], 10);
        if (isNaN(char_to_int)) {
          char_to_int = chars[_i5].charCodeAt(0) - 65;
        }
        checksum += char_to_int;
      }
      var odd_convert = {
        // Maps of characters at odd places
        A: 1,
        B: 0,
        C: 5,
        D: 7,
        E: 9,
        F: 13,
        G: 15,
        H: 17,
        I: 19,
        J: 21,
        K: 2,
        L: 4,
        M: 18,
        N: 20,
        O: 11,
        P: 3,
        Q: 6,
        R: 8,
        S: 12,
        T: 14,
        U: 16,
        V: 10,
        W: 22,
        X: 25,
        Y: 24,
        Z: 23,
        0: 1,
        1: 0
      };
      for (var _i6 = 0; _i6 < chars.length - 1; _i6 += 2) {
        var _char_to_int = 0;
        if (chars[_i6] in odd_convert) {
          _char_to_int = odd_convert[chars[_i6]];
        } else {
          var multiplier = parseInt(chars[_i6], 10);
          _char_to_int = 2 * multiplier + 1;
          if (multiplier > 4) {
            _char_to_int += 2;
          }
        }
        checksum += _char_to_int;
      }
      if (String.fromCharCode(65 + checksum % 26) !== chars[15]) {
        return false;
      }
      return true;
    }
    function lvLvCheck(tin) {
      tin = tin.replace(/\W/, "");
      var day = tin.slice(0, 2);
      if (day !== "32") {
        var month = tin.slice(2, 4);
        if (month !== "00") {
          var full_year = tin.slice(4, 6);
          switch (tin[6]) {
            case "0":
              full_year = "18".concat(full_year);
              break;
            case "1":
              full_year = "19".concat(full_year);
              break;
            default:
              full_year = "20".concat(full_year);
              break;
          }
          var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(day);
          if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
            return false;
          }
        }
        var checksum = 1101;
        var multip_lookup = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        for (var i = 0; i < tin.length - 1; i++) {
          checksum -= parseInt(tin[i], 10) * multip_lookup[i];
        }
        return parseInt(tin[10], 10) === checksum % 11;
      }
      return true;
    }
    function mtMtCheck(tin) {
      if (tin.length !== 9) {
        var chars = tin.toUpperCase().split("");
        while (chars.length < 8) {
          chars.unshift(0);
        }
        switch (tin[7]) {
          case "A":
          case "P":
            if (parseInt(chars[6], 10) === 0) {
              return false;
            }
            break;
          default: {
            var first_part = parseInt(chars.join("").slice(0, 5), 10);
            if (first_part > 32e3) {
              return false;
            }
            var second_part = parseInt(chars.join("").slice(5, 7), 10);
            if (first_part === second_part) {
              return false;
            }
          }
        }
      }
      return true;
    }
    function nlNlCheck(tin) {
      return algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 8).map(function(a) {
        return parseInt(a, 10);
      }), 9) % 11 === parseInt(tin[8], 10);
    }
    function plPlCheck(tin) {
      if (tin.length === 10) {
        var lookup = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        var _checksum = 0;
        for (var i = 0; i < lookup.length; i++) {
          _checksum += parseInt(tin[i], 10) * lookup[i];
        }
        _checksum %= 11;
        if (_checksum === 10) {
          return false;
        }
        return _checksum === parseInt(tin[9], 10);
      }
      var full_year = tin.slice(0, 2);
      var month = parseInt(tin.slice(2, 4), 10);
      if (month > 80) {
        full_year = "18".concat(full_year);
        month -= 80;
      } else if (month > 60) {
        full_year = "22".concat(full_year);
        month -= 60;
      } else if (month > 40) {
        full_year = "21".concat(full_year);
        month -= 40;
      } else if (month > 20) {
        full_year = "20".concat(full_year);
        month -= 20;
      } else {
        full_year = "19".concat(full_year);
      }
      if (month < 10) {
        month = "0".concat(month);
      }
      var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
      if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      var checksum = 0;
      var multiplier = 1;
      for (var _i7 = 0; _i7 < tin.length - 1; _i7++) {
        checksum += parseInt(tin[_i7], 10) * multiplier % 10;
        multiplier += 2;
        if (multiplier > 10) {
          multiplier = 1;
        } else if (multiplier === 5) {
          multiplier += 2;
        }
      }
      checksum = 10 - checksum % 10;
      return checksum === parseInt(tin[10], 10);
    }
    function ptBrCheck(tin) {
      if (tin.length === 11) {
        var _sum;
        var remainder;
        _sum = 0;
        if (
          // Reject known invalid CPFs
          tin === "11111111111" || tin === "22222222222" || tin === "33333333333" || tin === "44444444444" || tin === "55555555555" || tin === "66666666666" || tin === "77777777777" || tin === "88888888888" || tin === "99999999999" || tin === "00000000000"
        ) return false;
        for (var i = 1; i <= 9; i++) _sum += parseInt(tin.substring(i - 1, i), 10) * (11 - i);
        remainder = _sum * 10 % 11;
        if (remainder === 10) remainder = 0;
        if (remainder !== parseInt(tin.substring(9, 10), 10)) return false;
        _sum = 0;
        for (var _i8 = 1; _i8 <= 10; _i8++) _sum += parseInt(tin.substring(_i8 - 1, _i8), 10) * (12 - _i8);
        remainder = _sum * 10 % 11;
        if (remainder === 10) remainder = 0;
        if (remainder !== parseInt(tin.substring(10, 11), 10)) return false;
        return true;
      }
      if (
        // Reject know invalid CNPJs
        tin === "00000000000000" || tin === "11111111111111" || tin === "22222222222222" || tin === "33333333333333" || tin === "44444444444444" || tin === "55555555555555" || tin === "66666666666666" || tin === "77777777777777" || tin === "88888888888888" || tin === "99999999999999"
      ) {
        return false;
      }
      var length = tin.length - 2;
      var identifiers = tin.substring(0, length);
      var verificators = tin.substring(length);
      var sum = 0;
      var pos = length - 7;
      for (var _i9 = length; _i9 >= 1; _i9--) {
        sum += identifiers.charAt(length - _i9) * pos;
        pos -= 1;
        if (pos < 2) {
          pos = 9;
        }
      }
      var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result !== parseInt(verificators.charAt(0), 10)) {
        return false;
      }
      length += 1;
      identifiers = tin.substring(0, length);
      sum = 0;
      pos = length - 7;
      for (var _i0 = length; _i0 >= 1; _i0--) {
        sum += identifiers.charAt(length - _i0) * pos;
        pos -= 1;
        if (pos < 2) {
          pos = 9;
        }
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result !== parseInt(verificators.charAt(1), 10)) {
        return false;
      }
      return true;
    }
    function ptPtCheck(tin) {
      var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 8).map(function(a) {
        return parseInt(a, 10);
      }), 9) % 11;
      if (checksum > 9) {
        return parseInt(tin[8], 10) === 0;
      }
      return checksum === parseInt(tin[8], 10);
    }
    function roRoCheck(tin) {
      if (tin.slice(0, 4) !== "9000") {
        var full_year = tin.slice(1, 3);
        switch (tin[0]) {
          case "1":
          case "2":
            full_year = "19".concat(full_year);
            break;
          case "3":
          case "4":
            full_year = "18".concat(full_year);
            break;
          case "5":
          case "6":
            full_year = "20".concat(full_year);
            break;
          default:
        }
        var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));
        if (date.length === 8) {
          if (!(0, _isDate.default)(date, "YY/MM/DD")) {
            return false;
          }
        } else if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
        var digits = tin.split("").map(function(a) {
          return parseInt(a, 10);
        });
        var multipliers = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
        var checksum = 0;
        for (var i = 0; i < multipliers.length; i++) {
          checksum += digits[i] * multipliers[i];
        }
        if (checksum % 11 === 10) {
          return digits[12] === 1;
        }
        return digits[12] === checksum % 11;
      }
      return true;
    }
    function skSkCheck(tin) {
      if (tin.length === 9) {
        tin = tin.replace(/\W/, "");
        if (tin.slice(6) === "000") {
          return false;
        }
        var full_year = parseInt(tin.slice(0, 2), 10);
        if (full_year > 53) {
          return false;
        }
        if (full_year < 10) {
          full_year = "190".concat(full_year);
        } else {
          full_year = "19".concat(full_year);
        }
        var month = parseInt(tin.slice(2, 4), 10);
        if (month > 50) {
          month -= 50;
        }
        if (month < 10) {
          month = "0".concat(month);
        }
        var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));
        if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
          return false;
        }
      }
      return true;
    }
    function slSiCheck(tin) {
      var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 7).map(function(a) {
        return parseInt(a, 10);
      }), 8) % 11;
      if (checksum === 10) {
        return parseInt(tin[7], 10) === 0;
      }
      return checksum === parseInt(tin[7], 10);
    }
    function svSeCheck(tin) {
      var tin_copy = tin.slice(0);
      if (tin.length > 11) {
        tin_copy = tin_copy.slice(2);
      }
      var full_year = "";
      var month = tin_copy.slice(2, 4);
      var day = parseInt(tin_copy.slice(4, 6), 10);
      if (tin.length > 11) {
        full_year = tin.slice(0, 4);
      } else {
        full_year = tin.slice(0, 2);
        if (tin.length === 11 && day < 60) {
          var current_year = (/* @__PURE__ */ new Date()).getFullYear().toString();
          var current_century = parseInt(current_year.slice(0, 2), 10);
          current_year = parseInt(current_year, 10);
          if (tin[6] === "-") {
            if (parseInt("".concat(current_century).concat(full_year), 10) > current_year) {
              full_year = "".concat(current_century - 1).concat(full_year);
            } else {
              full_year = "".concat(current_century).concat(full_year);
            }
          } else {
            full_year = "".concat(current_century - 1).concat(full_year);
            if (current_year - parseInt(full_year, 10) < 100) {
              return false;
            }
          }
        }
      }
      if (day > 60) {
        day -= 60;
      }
      if (day < 10) {
        day = "0".concat(day);
      }
      var date = "".concat(full_year, "/").concat(month, "/").concat(day);
      if (date.length === 8) {
        if (!(0, _isDate.default)(date, "YY/MM/DD")) {
          return false;
        }
      } else if (!(0, _isDate.default)(date, "YYYY/MM/DD")) {
        return false;
      }
      return algorithms.luhnCheck(tin.replace(/\W/, ""));
    }
    function ukUaCheck(tin) {
      var digits = tin.split("").map(function(a) {
        return parseInt(a, 10);
      });
      var multipliers = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
      var checksum = 0;
      for (var i = 0; i < multipliers.length; i++) {
        checksum += digits[i] * multipliers[i];
      }
      return checksum % 11 === 10 ? digits[9] === 0 : digits[9] === checksum % 11;
    }
    var taxIdFormat = {
      "bg-BG": /^\d{10}$/,
      "cs-CZ": /^\d{6}\/{0,1}\d{3,4}$/,
      "de-AT": /^\d{9}$/,
      "de-DE": /^[1-9]\d{10}$/,
      "dk-DK": /^\d{6}-{0,1}\d{4}$/,
      "el-CY": /^[09]\d{7}[A-Z]$/,
      "el-GR": /^([0-4]|[7-9])\d{8}$/,
      "en-CA": /^\d{9}$/,
      "en-GB": /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,
      "en-IE": /^\d{7}[A-W][A-IW]{0,1}$/i,
      "en-US": /^\d{2}[- ]{0,1}\d{7}$/,
      "es-AR": /(20|23|24|27|30|33|34)[0-9]{8}[0-9]/,
      "es-ES": /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
      "et-EE": /^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,
      "fi-FI": /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
      "fr-BE": /^\d{11}$/,
      "fr-FR": /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
      // Conforms both to official spec and provided example
      "fr-LU": /^\d{13}$/,
      "hr-HR": /^\d{11}$/,
      "hu-HU": /^8\d{9}$/,
      "it-IT": /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
      "lv-LV": /^\d{6}-{0,1}\d{5}$/,
      // Conforms both to DG TAXUD spec and original research
      "mt-MT": /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
      "nl-NL": /^\d{9}$/,
      "pl-PL": /^\d{10,11}$/,
      "pt-BR": /(?:^\d{11}$)|(?:^\d{14}$)/,
      "pt-PT": /^\d{9}$/,
      "ro-RO": /^\d{13}$/,
      "sk-SK": /^\d{6}\/{0,1}\d{3,4}$/,
      "sl-SI": /^[1-9]\d{7}$/,
      "sv-SE": /^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/,
      "uk-UA": /^\d{10}$/
    };
    taxIdFormat["lb-LU"] = taxIdFormat["fr-LU"];
    taxIdFormat["lt-LT"] = taxIdFormat["et-EE"];
    taxIdFormat["nl-BE"] = taxIdFormat["fr-BE"];
    taxIdFormat["fr-CA"] = taxIdFormat["en-CA"];
    var taxIdCheck = {
      "bg-BG": bgBgCheck,
      "cs-CZ": csCzCheck,
      "de-AT": deAtCheck,
      "de-DE": deDeCheck,
      "dk-DK": dkDkCheck,
      "el-CY": elCyCheck,
      "el-GR": elGrCheck,
      "en-CA": isCanadianSIN,
      "en-IE": enIeCheck,
      "en-US": enUsCheck,
      "es-AR": esArCheck,
      "es-ES": esEsCheck,
      "et-EE": etEeCheck,
      "fi-FI": fiFiCheck,
      "fr-BE": frBeCheck,
      "fr-FR": frFrCheck,
      "fr-LU": frLuCheck,
      "hr-HR": hrHrCheck,
      "hu-HU": huHuCheck,
      "it-IT": itItCheck,
      "lv-LV": lvLvCheck,
      "mt-MT": mtMtCheck,
      "nl-NL": nlNlCheck,
      "pl-PL": plPlCheck,
      "pt-BR": ptBrCheck,
      "pt-PT": ptPtCheck,
      "ro-RO": roRoCheck,
      "sk-SK": skSkCheck,
      "sl-SI": slSiCheck,
      "sv-SE": svSeCheck,
      "uk-UA": ukUaCheck
    };
    taxIdCheck["lb-LU"] = taxIdCheck["fr-LU"];
    taxIdCheck["lt-LT"] = taxIdCheck["et-EE"];
    taxIdCheck["nl-BE"] = taxIdCheck["fr-BE"];
    taxIdCheck["fr-CA"] = taxIdCheck["en-CA"];
    var allsymbols = /[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g;
    var sanitizeRegexes = {
      "de-AT": allsymbols,
      "de-DE": /[\/\\]/g,
      "fr-BE": allsymbols
    };
    sanitizeRegexes["nl-BE"] = sanitizeRegexes["fr-BE"];
    function isTaxID(str) {
      var locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en-US";
      (0, _assertString.default)(str);
      var strcopy = str.slice(0);
      if (locale in taxIdFormat) {
        if (locale in sanitizeRegexes) {
          strcopy = strcopy.replace(sanitizeRegexes[locale], "");
        }
        if (!taxIdFormat[locale].test(strcopy)) {
          return false;
        }
        if (locale in taxIdCheck) {
          return taxIdCheck[locale](strcopy);
        }
        return true;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMobilePhone.js
var require_isMobilePhone = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMobilePhone.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMobilePhone;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var phones = {
      "am-AM": /^(\+?374|0)(33|4[134]|55|77|88|9[13-689])\d{6}$/,
      "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
      "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
      "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
      "ar-LB": /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
      "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
      "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
      "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
      "ar-KW": /^(\+?965)([569]\d{7}|41\d{6})$/,
      "ar-LY": /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
      "ar-MA": /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
      "ar-OM": /^((\+|00)968)?([79][1-9])\d{6}$/,
      "ar-PS": /^(\+?970|0)5[6|9](\d{7})$/,
      "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
      "ar-SD": /^((\+?249)|0)?(9[012369]|1[012])\d{7}$/,
      "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
      "ar-TN": /^(\+?216)?[2459]\d{7}$/,
      "az-AZ": /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
      "ar-QA": /^(\+?974|0)?([3567]\d{7})$/,
      "bs-BA": /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
      "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
      "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
      "bn-BD": /^(\+?880|0)1[13456789][0-9]{8}$/,
      "ca-AD": /^(\+376)?[346]\d{5}$/,
      "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "de-DE": /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
      "de-AT": /^(\+43|0)\d{1,4}\d{3,12}$/,
      "de-CH": /^(\+41|0)([1-9])\d{1,9}$/,
      "de-LU": /^(\+352)?((6\d1)\d{6})$/,
      "dv-MV": /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
      "el-GR": /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
      "el-CY": /^(\+?357?)?(9(9|7|6|5|4)\d{6})$/,
      "en-AI": /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
      "en-AU": /^(\+?61|0)4\d{8}$/,
      "en-AG": /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
      "en-BM": /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
      "en-BS": /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
      "en-GB": /^(\+?44|0)7[1-9]\d{8}$/,
      "en-GG": /^(\+?44|0)1481\d{6}$/,
      "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|53|28|55|59)\d{7}$/,
      "en-GY": /^(\+592|0)6\d{6}$/,
      "en-HK": /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
      "en-MO": /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
      "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
      "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
      "en-JM": /^(\+?876)?\d{7}$/,
      "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
      "fr-CF": /^(\+?236| ?)(70|75|77|72|21|22)\d{6}$/,
      "en-SS": /^(\+?211|0)(9[1257])\d{7}$/,
      "en-KI": /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
      "en-KN": /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
      "en-LS": /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
      "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
      "en-MU": /^(\+?230|0)?\d{8}$/,
      "en-MW": /^(\+?265|0)(((77|88|31|99|98|21)\d{7})|(((111)|1)\d{6})|(32000\d{4}))$/,
      "en-NA": /^(\+?264|0)(6|8)\d{7}$/,
      "en-NG": /^(\+?234|0)?[789]\d{9}$/,
      "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
      "en-PG": /^(\+?675|0)?(7\d|8[18])\d{6}$/,
      "en-PK": /^((00|\+)?92|0)3[0-6]\d{8}$/,
      "en-PH": /^(09|\+639)\d{9}$/,
      "en-RW": /^(\+?250|0)?[7]\d{8}$/,
      "en-SG": /^(\+65)?[3689]\d{7}$/,
      "en-SL": /^(\+?232|0)\d{8}$/,
      "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
      "en-UG": /^(\+?256|0)?[7]\d{8}$/,
      "en-US": /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
      "en-ZA": /^(\+?27|0)\d{9}$/,
      "en-ZM": /^(\+?26)?0[79][567]\d{7}$/,
      "en-ZW": /^(\+263)[0-9]{9}$/,
      "en-BW": /^(\+?267)?(7[1-8]{1})\d{6}$/,
      "es-AR": /^\+?549(11|[2368]\d)\d{8}$/,
      "es-BO": /^(\+?591)?(6|7)\d{7}$/,
      "es-CO": /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
      "es-CL": /^(\+?56|0)[2-9]\d{1}\d{7}$/,
      "es-CR": /^(\+506)?[2-8]\d{7}$/,
      "es-CU": /^(\+53|0053)?5\d{7}$/,
      "es-DO": /^(\+?1)?8[024]9\d{7}$/,
      "es-HN": /^(\+?504)?[9|8|3|2]\d{7}$/,
      "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
      "es-ES": /^(\+?34)?[6|7]\d{8}$/,
      "es-GT": /^(\+?502)?[2|6|7]\d{7}$/,
      "es-PE": /^(\+?51)?9\d{8}$/,
      "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
      "es-NI": /^(\+?505)\d{7,8}$/,
      "es-PA": /^(\+?507)\d{7,8}$/,
      "es-PY": /^(\+?595|0)9[9876]\d{7}$/,
      "es-SV": /^(\+?503)?[67]\d{7}$/,
      "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
      "es-VE": /^(\+?58)?(2|4)\d{9}$/,
      "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
      "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
      "fi-FI": /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
      "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
      "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "fr-BF": /^(\+226|0)[67]\d{7}$/,
      "fr-BJ": /^(\+229)\d{8}$/,
      "fr-CD": /^(\+?243|0)?(8|9)\d{8}$/,
      "fr-CM": /^(\+?237)6[0-9]{8}$/,
      "fr-FR": /^(\+?33|0)[67]\d{8}$/,
      "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
      "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
      "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
      "fr-PF": /^(\+?689)?8[789]\d{6}$/,
      "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
      "fr-WF": /^(\+681)?\d{6}$/,
      "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
      "hu-HU": /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
      "id-ID": /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
      "ir-IR": /^(\+98|0)?9\d{9}$/,
      "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
      "it-SM": /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
      "ja-JP": /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
      "ka-GE": /^(\+?995)?(79\d{7}|5\d{8})$/,
      "kk-KZ": /^(\+?7|8)?7\d{9}$/,
      "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
      "ky-KG": /^(\+996\s?)?(22[0-9]|50[0-9]|55[0-9]|70[0-9]|75[0-9]|77[0-9]|880|990|995|996|997|998)\s?\d{3}\s?\d{3}$/,
      "lt-LT": /^(\+370|8)\d{8}$/,
      "lv-LV": /^(\+?371)2\d{7}$/,
      "mg-MG": /^((\+?261|0)(2|3)\d)?\d{7}$/,
      "mn-MN": /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
      "my-MM": /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
      "ms-MY": /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
      "mz-MZ": /^(\+?258)?8[234567]\d{7}$/,
      "nb-NO": /^(\+?47)?[49]\d{7}$/,
      "ne-NP": /^(\+?977)?9[78]\d{8}$/,
      "nl-BE": /^(\+?32|0)4\d{8}$/,
      "nl-NL": /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
      "nl-AW": /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
      "nn-NO": /^(\+?47)?[49]\d{7}$/,
      "pl-PL": /^(\+?48)? ?([5-8]\d|45) ?\d{3} ?\d{2} ?\d{2}$/,
      "pt-BR": /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
      "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
      "pt-AO": /^(\+?244)?9\d{8}$/,
      "ro-MD": /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
      "ro-RO": /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
      "ru-RU": /^(\+?7|8)?9\d{9}$/,
      "si-LK": /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
      "sl-SI": /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
      "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      "so-SO": /^(\+?252|0)((6[0-9])\d{7}|(7[1-9])\d{7})$/,
      "sq-AL": /^(\+355|0)6[2-9]\d{7}$/,
      "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
      "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
      "tg-TJ": /^(\+?992)?[5][5]\d{7}$/,
      "th-TH": /^(\+66|66|0)\d{9}$/,
      "tr-TR": /^(\+?90|0)?5\d{9}$/,
      "tk-TM": /^(\+993|993|8)\d{8}$/,
      "uk-UA": /^(\+?38)?0(50|6[36-8]|7[357]|9[1-9])\d{7}$/,
      "uz-UZ": /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
      "vi-VN": /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
      "zh-CN": /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
      "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
      "dz-BT": /^(\+?975|0)?(17|16|77|02)\d{6}$/,
      "ar-YE": /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
      "ar-EH": /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
      "fa-AF": /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/,
      "mk-MK": /^(\+?389|0)?((?:2[2-9]\d{6}|(?:3[1-4]|4[2-8])\d{6}|500\d{5}|5[2-9]\d{6}|7[0-9][2-9]\d{5}|8[1-9]\d{6}|800\d{5}|8009\d{4}))$/
    };
    phones["en-CA"] = phones["en-US"];
    phones["fr-CA"] = phones["en-CA"];
    phones["fr-BE"] = phones["nl-BE"];
    phones["zh-HK"] = phones["en-HK"];
    phones["zh-MO"] = phones["en-MO"];
    phones["ga-IE"] = phones["en-IE"];
    phones["fr-CH"] = phones["de-CH"];
    phones["it-CH"] = phones["fr-CH"];
    function isMobilePhone(str, locale, options) {
      (0, _assertString.default)(str);
      if (options && options.strictMode && !str.startsWith("+")) {
        return false;
      }
      if (Array.isArray(locale)) {
        return locale.some(function(key2) {
          if (phones.hasOwnProperty(key2)) {
            var phone2 = phones[key2];
            if (phone2.test(str)) {
              return true;
            }
          }
          return false;
        });
      } else if (locale in phones) {
        return phones[locale].test(str);
      } else if (!locale || locale === "any") {
        for (var key in phones) {
          if (phones.hasOwnProperty(key)) {
            var phone = phones[key];
            if (phone.test(str)) {
              return true;
            }
          }
        }
        return false;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    var locales = exports2.locales = Object.keys(phones);
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEthereumAddress.js
var require_isEthereumAddress = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isEthereumAddress.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isEthereumAddress;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var eth = /^(0x)[0-9a-f]{40}$/i;
    function isEthereumAddress(str) {
      (0, _assertString.default)(str);
      return eth.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isCurrency.js
var require_isCurrency = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isCurrency.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isCurrency;
    var _merge = _interopRequireDefault(require_merge());
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function currencyRegex(options) {
      var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
      options.digits_after_decimal.forEach(function(digit, index) {
        if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
      });
      var symbol = "(".concat(options.symbol.replace(/\W/, function(m) {
        return "\\".concat(m);
      }), ")").concat(options.require_symbol ? "" : "?"), negative = "-?", whole_dollar_amount_without_sep = "[1-9]\\d*", whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"), valid_whole_dollar_amounts = ["0", whole_dollar_amount_without_sep, whole_dollar_amount_with_sep], whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join("|"), ")?"), decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? "" : "?");
      var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : "");
      if (options.allow_negatives && !options.parens_for_negatives) {
        if (options.negative_sign_after_digits) {
          pattern += negative;
        } else if (options.negative_sign_before_digits) {
          pattern = negative + pattern;
        }
      }
      if (options.allow_negative_sign_placeholder) {
        pattern = "( (?!\\-))?".concat(pattern);
      } else if (options.allow_space_after_symbol) {
        pattern = " ?".concat(pattern);
      } else if (options.allow_space_after_digits) {
        pattern += "( (?!$))?";
      }
      if (options.symbol_after_digits) {
        pattern += symbol;
      } else {
        pattern = symbol + pattern;
      }
      if (options.allow_negatives) {
        if (options.parens_for_negatives) {
          pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
        } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
          pattern = negative + pattern;
        }
      }
      return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
    }
    var default_currency_options = {
      symbol: "$",
      require_symbol: false,
      allow_space_after_symbol: false,
      symbol_after_digits: false,
      allow_negatives: true,
      parens_for_negatives: false,
      negative_sign_before_digits: false,
      negative_sign_after_digits: false,
      allow_negative_sign_placeholder: false,
      thousands_separator: ",",
      decimal_separator: ".",
      allow_decimal: true,
      require_decimal: false,
      digits_after_decimal: [2],
      allow_space_after_digits: false
    };
    function isCurrency(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_currency_options);
      return currencyRegex(options).test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBtcAddress.js
var require_isBtcAddress = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBtcAddress.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBtcAddress;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var bech32 = /^(bc1|tb1|bc1p|tb1p)[ac-hj-np-z02-9]{39,58}$/;
    var base58 = /^(1|2|3|m)[A-HJ-NP-Za-km-z1-9]{25,39}$/;
    function isBtcAddress(str) {
      (0, _assertString.default)(str);
      return bech32.test(str) || base58.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO6346.js
var require_isISO6346 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO6346.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.isFreightContainerID = void 0;
    exports2.isISO6346 = isISO6346;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isISO6346Str = /^[A-Z]{3}(U[0-9]{7})|([J,Z][0-9]{6,7})$/;
    var isDigit = /^[0-9]$/;
    function isISO6346(str) {
      (0, _assertString.default)(str);
      str = str.toUpperCase();
      if (!isISO6346Str.test(str)) return false;
      if (str.length === 11) {
        var sum = 0;
        for (var i = 0; i < str.length - 1; i++) {
          if (!isDigit.test(str[i])) {
            var convertedCode = void 0;
            var letterCode = str.charCodeAt(i) - 55;
            if (letterCode < 11) convertedCode = letterCode;
            else if (letterCode >= 11 && letterCode <= 20) convertedCode = 12 + letterCode % 11;
            else if (letterCode >= 21 && letterCode <= 30) convertedCode = 23 + letterCode % 21;
            else convertedCode = 34 + letterCode % 31;
            sum += convertedCode * Math.pow(2, i);
          } else sum += str[i] * Math.pow(2, i);
        }
        var checkSumDigit = sum % 11;
        if (checkSumDigit === 10) checkSumDigit = 0;
        return Number(str[str.length - 1]) === checkSumDigit;
      }
      return true;
    }
    var isFreightContainerID = exports2.isFreightContainerID = isISO6346;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO6391.js
var require_isISO6391 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO6391.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISO6391;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var isISO6391Set = /* @__PURE__ */ new Set(["aa", "ab", "ae", "af", "ak", "am", "an", "ar", "as", "av", "ay", "az", "az", "ba", "be", "bg", "bh", "bi", "bm", "bn", "bo", "br", "bs", "ca", "ce", "ch", "co", "cr", "cs", "cu", "cv", "cy", "da", "de", "dv", "dz", "ee", "el", "en", "eo", "es", "et", "eu", "fa", "ff", "fi", "fj", "fo", "fr", "fy", "ga", "gd", "gl", "gn", "gu", "gv", "ha", "he", "hi", "ho", "hr", "ht", "hu", "hy", "hz", "ia", "id", "ie", "ig", "ii", "ik", "io", "is", "it", "iu", "ja", "jv", "ka", "kg", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kr", "ks", "ku", "kv", "kw", "ky", "la", "lb", "lg", "li", "ln", "lo", "lt", "lu", "lv", "mg", "mh", "mi", "mk", "ml", "mn", "mr", "ms", "mt", "my", "na", "nb", "nd", "ne", "ng", "nl", "nn", "no", "nr", "nv", "ny", "oc", "oj", "om", "or", "os", "pa", "pi", "pl", "ps", "pt", "qu", "rm", "rn", "ro", "ru", "rw", "sa", "sc", "sd", "se", "sg", "si", "sk", "sl", "sm", "sn", "so", "sq", "sr", "ss", "st", "su", "sv", "sw", "ta", "te", "tg", "th", "ti", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty", "ug", "uk", "ur", "uz", "ve", "vi", "vo", "wa", "wo", "xh", "yi", "yo", "za", "zh", "zu"]);
    function isISO6391(str) {
      (0, _assertString.default)(str);
      return isISO6391Set.has(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO8601.js
var require_isISO8601 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO8601.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISO8601;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    var iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    var isValidDate = function isValidDate2(str) {
      var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);
      if (ordinalMatch) {
        var oYear = Number(ordinalMatch[1]);
        var oDay = Number(ordinalMatch[2]);
        if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
        return oDay <= 365;
      }
      var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
      var year = match[1];
      var month = match[2];
      var day = match[3];
      var monthString = month ? "0".concat(month).slice(-2) : month;
      var dayString = day ? "0".concat(day).slice(-2) : day;
      var d = new Date("".concat(year, "-").concat(monthString || "01", "-").concat(dayString || "01"));
      if (month && day) {
        return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
      }
      return true;
    };
    function isISO8601(str) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      (0, _assertString.default)(str);
      var check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
      if (check && options.strict) return isValidDate(str);
      return check;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isRFC3339.js
var require_isRFC3339 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isRFC3339.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isRFC3339;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var dateFullYear = /[0-9]{4}/;
    var dateMonth = /(0[1-9]|1[0-2])/;
    var dateMDay = /([12]\d|0[1-9]|3[01])/;
    var timeHour = /([01][0-9]|2[0-3])/;
    var timeMinute = /[0-5][0-9]/;
    var timeSecond = /([0-5][0-9]|60)/;
    var timeSecFrac = /(\.[0-9]+)?/;
    var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
    var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
    var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
    var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
    var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
    var rfc3339 = new RegExp("^".concat(fullDate.source, "[ tT]").concat(fullTime.source, "$"));
    function isRFC3339(str) {
      (0, _assertString.default)(str);
      return rfc3339.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO15924.js
var require_isISO15924 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO15924.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.ScriptCodes = void 0;
    exports2.default = isISO15924;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validISO15924Codes = /* @__PURE__ */ new Set(["Adlm", "Afak", "Aghb", "Ahom", "Arab", "Aran", "Armi", "Armn", "Avst", "Bali", "Bamu", "Bass", "Batk", "Beng", "Bhks", "Blis", "Bopo", "Brah", "Brai", "Bugi", "Buhd", "Cakm", "Cans", "Cari", "Cham", "Cher", "Chis", "Chrs", "Cirt", "Copt", "Cpmn", "Cprt", "Cyrl", "Cyrs", "Deva", "Diak", "Dogr", "Dsrt", "Dupl", "Egyd", "Egyh", "Egyp", "Elba", "Elym", "Ethi", "Gara", "Geok", "Geor", "Glag", "Gong", "Gonm", "Goth", "Gran", "Grek", "Gujr", "Gukh", "Guru", "Hanb", "Hang", "Hani", "Hano", "Hans", "Hant", "Hatr", "Hebr", "Hira", "Hluw", "Hmng", "Hmnp", "Hrkt", "Hung", "Inds", "Ital", "Jamo", "Java", "Jpan", "Jurc", "Kali", "Kana", "Kawi", "Khar", "Khmr", "Khoj", "Kitl", "Kits", "Knda", "Kore", "Kpel", "Krai", "Kthi", "Lana", "Laoo", "Latf", "Latg", "Latn", "Leke", "Lepc", "Limb", "Lina", "Linb", "Lisu", "Loma", "Lyci", "Lydi", "Mahj", "Maka", "Mand", "Mani", "Marc", "Maya", "Medf", "Mend", "Merc", "Mero", "Mlym", "Modi", "Mong", "Moon", "Mroo", "Mtei", "Mult", "Mymr", "Nagm", "Nand", "Narb", "Nbat", "Newa", "Nkdb", "Nkgb", "Nkoo", "Nshu", "Ogam", "Olck", "Onao", "Orkh", "Orya", "Osge", "Osma", "Ougr", "Palm", "Pauc", "Pcun", "Pelm", "Perm", "Phag", "Phli", "Phlp", "Phlv", "Phnx", "Plrd", "Piqd", "Prti", "Psin", "Qaaa", "Qaab", "Qaac", "Qaad", "Qaae", "Qaaf", "Qaag", "Qaah", "Qaai", "Qaaj", "Qaak", "Qaal", "Qaam", "Qaan", "Qaao", "Qaap", "Qaaq", "Qaar", "Qaas", "Qaat", "Qaau", "Qaav", "Qaaw", "Qaax", "Qaay", "Qaaz", "Qaba", "Qabb", "Qabc", "Qabd", "Qabe", "Qabf", "Qabg", "Qabh", "Qabi", "Qabj", "Qabk", "Qabl", "Qabm", "Qabn", "Qabo", "Qabp", "Qabq", "Qabr", "Qabs", "Qabt", "Qabu", "Qabv", "Qabw", "Qabx", "Ranj", "Rjng", "Rohg", "Roro", "Runr", "Samr", "Sara", "Sarb", "Saur", "Sgnw", "Shaw", "Shrd", "Shui", "Sidd", "Sidt", "Sind", "Sinh", "Sogd", "Sogo", "Sora", "Soyo", "Sund", "Sunu", "Sylo", "Syrc", "Syre", "Syrj", "Syrn", "Tagb", "Takr", "Tale", "Talu", "Taml", "Tang", "Tavt", "Tayo", "Telu", "Teng", "Tfng", "Tglg", "Thaa", "Thai", "Tibt", "Tirh", "Tnsa", "Todr", "Tols", "Toto", "Tutg", "Ugar", "Vaii", "Visp", "Vith", "Wara", "Wcho", "Wole", "Xpeo", "Xsux", "Yezi", "Yiii", "Zanb", "Zinh", "Zmth", "Zsye", "Zsym", "Zxxx", "Zyyy", "Zzzz"]);
    function isISO15924(str) {
      (0, _assertString.default)(str);
      return validISO15924Codes.has(str);
    }
    var ScriptCodes = exports2.ScriptCodes = validISO15924Codes;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO31661Alpha3.js
var require_isISO31661Alpha3 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO31661Alpha3.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISO31661Alpha3;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validISO31661Alpha3CountriesCodes = /* @__PURE__ */ new Set(["AFG", "ALA", "ALB", "DZA", "ASM", "AND", "AGO", "AIA", "ATA", "ATG", "ARG", "ARM", "ABW", "AUS", "AUT", "AZE", "BHS", "BHR", "BGD", "BRB", "BLR", "BEL", "BLZ", "BEN", "BMU", "BTN", "BOL", "BES", "BIH", "BWA", "BVT", "BRA", "IOT", "BRN", "BGR", "BFA", "BDI", "KHM", "CMR", "CAN", "CPV", "CYM", "CAF", "TCD", "CHL", "CHN", "CXR", "CCK", "COL", "COM", "COG", "COD", "COK", "CRI", "CIV", "HRV", "CUB", "CUW", "CYP", "CZE", "DNK", "DJI", "DMA", "DOM", "ECU", "EGY", "SLV", "GNQ", "ERI", "EST", "ETH", "FLK", "FRO", "FJI", "FIN", "FRA", "GUF", "PYF", "ATF", "GAB", "GMB", "GEO", "DEU", "GHA", "GIB", "GRC", "GRL", "GRD", "GLP", "GUM", "GTM", "GGY", "GIN", "GNB", "GUY", "HTI", "HMD", "VAT", "HND", "HKG", "HUN", "ISL", "IND", "IDN", "IRN", "IRQ", "IRL", "IMN", "ISR", "ITA", "JAM", "JPN", "JEY", "JOR", "KAZ", "KEN", "KIR", "PRK", "KOR", "KWT", "KGZ", "LAO", "LVA", "LBN", "LSO", "LBR", "LBY", "LIE", "LTU", "LUX", "MAC", "MKD", "MDG", "MWI", "MYS", "MDV", "MLI", "MLT", "MHL", "MTQ", "MRT", "MUS", "MYT", "MEX", "FSM", "MDA", "MCO", "MNG", "MNE", "MSR", "MAR", "MOZ", "MMR", "NAM", "NRU", "NPL", "NLD", "NCL", "NZL", "NIC", "NER", "NGA", "NIU", "NFK", "MNP", "NOR", "OMN", "PAK", "PLW", "PSE", "PAN", "PNG", "PRY", "PER", "PHL", "PCN", "POL", "PRT", "PRI", "QAT", "REU", "ROU", "RUS", "RWA", "BLM", "SHN", "KNA", "LCA", "MAF", "SPM", "VCT", "WSM", "SMR", "STP", "SAU", "SEN", "SRB", "SYC", "SLE", "SGP", "SXM", "SVK", "SVN", "SLB", "SOM", "ZAF", "SGS", "SSD", "ESP", "LKA", "SDN", "SUR", "SJM", "SWZ", "SWE", "CHE", "SYR", "TWN", "TJK", "TZA", "THA", "TLS", "TGO", "TKL", "TON", "TTO", "TUN", "TUR", "TKM", "TCA", "TUV", "UGA", "UKR", "ARE", "GBR", "USA", "UMI", "URY", "UZB", "VUT", "VEN", "VNM", "VGB", "VIR", "WLF", "ESH", "YEM", "ZMB", "ZWE"]);
    function isISO31661Alpha3(str) {
      (0, _assertString.default)(str);
      return validISO31661Alpha3CountriesCodes.has(str.toUpperCase());
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO31661Numeric.js
var require_isISO31661Numeric = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO31661Numeric.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isISO31661Numeric;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validISO31661NumericCountriesCodes = /* @__PURE__ */ new Set(["004", "008", "010", "012", "016", "020", "024", "028", "031", "032", "036", "040", "044", "048", "050", "051", "052", "056", "060", "064", "068", "070", "072", "074", "076", "084", "086", "090", "092", "096", "100", "104", "108", "112", "116", "120", "124", "132", "136", "140", "144", "148", "152", "156", "158", "162", "166", "170", "174", "175", "178", "180", "184", "188", "191", "192", "196", "203", "204", "208", "212", "214", "218", "222", "226", "231", "232", "233", "234", "238", "239", "242", "246", "248", "250", "254", "258", "260", "262", "266", "268", "270", "275", "276", "288", "292", "296", "300", "304", "308", "312", "316", "320", "324", "328", "332", "334", "336", "340", "344", "348", "352", "356", "360", "364", "368", "372", "376", "380", "384", "388", "392", "398", "400", "404", "408", "410", "414", "417", "418", "422", "426", "428", "430", "434", "438", "440", "442", "446", "450", "454", "458", "462", "466", "470", "474", "478", "480", "484", "492", "496", "498", "499", "500", "504", "508", "512", "516", "520", "524", "528", "531", "533", "534", "535", "540", "548", "554", "558", "562", "566", "570", "574", "578", "580", "581", "583", "584", "585", "586", "591", "598", "600", "604", "608", "612", "616", "620", "624", "626", "630", "634", "638", "642", "643", "646", "652", "654", "659", "660", "662", "663", "666", "670", "674", "678", "682", "686", "688", "690", "694", "702", "703", "704", "705", "706", "710", "716", "724", "728", "729", "732", "740", "744", "748", "752", "756", "760", "762", "764", "768", "772", "776", "780", "784", "788", "792", "795", "796", "798", "800", "804", "807", "818", "826", "831", "832", "833", "834", "840", "850", "854", "858", "860", "862", "876", "882", "887", "894"]);
    function isISO31661Numeric(str) {
      (0, _assertString.default)(str);
      return validISO31661NumericCountriesCodes.has(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO4217.js
var require_isISO4217 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isISO4217.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.CurrencyCodes = void 0;
    exports2.default = isISO4217;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validISO4217CurrencyCodes = /* @__PURE__ */ new Set(["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNY", "COP", "COU", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "USN", "UYI", "UYU", "UYW", "UZS", "VED", "VES", "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XBA", "XBB", "XBC", "XBD", "XCD", "XDR", "XOF", "XPD", "XPF", "XPT", "XSU", "XTS", "XUA", "XXX", "YER", "ZAR", "ZMW", "ZWL"]);
    function isISO4217(str) {
      (0, _assertString.default)(str);
      return validISO4217CurrencyCodes.has(str.toUpperCase());
    }
    var CurrencyCodes = exports2.CurrencyCodes = validISO4217CurrencyCodes;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBase32.js
var require_isBase32 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBase32.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBase32;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var base32 = /^[A-Z2-7]+=*$/;
    var crockfordBase32 = /^[A-HJKMNP-TV-Z0-9]+$/;
    var defaultBase32Options = {
      crockford: false
    };
    function isBase32(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, defaultBase32Options);
      if (options.crockford) {
        return crockfordBase32.test(str);
      }
      var len = str.length;
      if (len % 8 === 0 && base32.test(str)) {
        return true;
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBase58.js
var require_isBase58 = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isBase58.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isBase58;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;
    function isBase58(str) {
      (0, _assertString.default)(str);
      if (base58Reg.test(str)) {
        return true;
      }
      return false;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDataURI.js
var require_isDataURI = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isDataURI.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isDataURI;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validMediaType = /^[a-z]+\/[a-z0-9\-\+\._]+$/i;
    var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
    var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;
    function isDataURI(str) {
      (0, _assertString.default)(str);
      var data = str.split(",");
      if (data.length < 2) {
        return false;
      }
      var attributes = data.shift().trim().split(";");
      var schemeAndMediaType = attributes.shift();
      if (schemeAndMediaType.slice(0, 5) !== "data:") {
        return false;
      }
      var mediaType = schemeAndMediaType.slice(5);
      if (mediaType !== "" && !validMediaType.test(mediaType)) {
        return false;
      }
      for (var i = 0; i < attributes.length; i++) {
        if (!(i === attributes.length - 1 && attributes[i].toLowerCase() === "base64") && !validAttribute.test(attributes[i])) {
          return false;
        }
      }
      for (var _i = 0; _i < data.length; _i++) {
        if (!validData.test(data[_i])) {
          return false;
        }
      }
      return true;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMagnetURI.js
var require_isMagnetURI = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMagnetURI.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMagnetURI;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var magnetURIComponent = /(?:^magnet:\?|[^?&]&)xt(?:\.1)?=urn:(?:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?|btmh:1220[a-z0-9]{64})(?:$|&)/i;
    function isMagnetURI(url2) {
      (0, _assertString.default)(url2);
      if (url2.indexOf("magnet:?") !== 0) {
        return false;
      }
      return magnetURIComponent.test(url2);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/rtrim.js
var require_rtrim = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/rtrim.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = rtrim;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function rtrim(str, chars) {
      (0, _assertString.default)(str);
      if (chars) {
        var pattern = new RegExp("[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "]+$"), "g");
        return str.replace(pattern, "");
      }
      var strIndex = str.length - 1;
      while (/\s/.test(str.charAt(strIndex))) {
        strIndex -= 1;
      }
      return str.slice(0, strIndex + 1);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/ltrim.js
var require_ltrim = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/ltrim.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = ltrim;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function ltrim(str, chars) {
      (0, _assertString.default)(str);
      var pattern = chars ? new RegExp("^[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "]+"), "g") : /^\s+/g;
      return str.replace(pattern, "");
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/trim.js
var require_trim = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/trim.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = trim2;
    var _rtrim = _interopRequireDefault(require_rtrim());
    var _ltrim = _interopRequireDefault(require_ltrim());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function trim2(str, chars) {
      return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMailtoURI.js
var require_isMailtoURI = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMailtoURI.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMailtoURI;
    var _trim = _interopRequireDefault(require_trim());
    var _isEmail = _interopRequireDefault(require_isEmail());
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _slicedToArray(r, e) {
      return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t) return;
            f = false;
          } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(r) {
      if (Array.isArray(r)) return r;
    }
    function _createForOfIteratorHelper(r, e) {
      var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (!t) {
        if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
          t && (r = t);
          var _n = 0, F = function F2() {
          };
          return { s: F, n: function n() {
            return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
          }, e: function e2(r2) {
            throw r2;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var o, a = true, u = false;
      return { s: function s() {
        t = t.call(r);
      }, n: function n() {
        var r2 = t.next();
        return a = r2.done, r2;
      }, e: function e2(r2) {
        u = true, o = r2;
      }, f: function f() {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      } };
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function parseMailtoQueryString(queryString) {
      var allowedParams = /* @__PURE__ */ new Set(["subject", "body", "cc", "bcc"]), query = {
        cc: "",
        bcc: ""
      };
      var isParseFailed = false;
      var queryParams = queryString.split("&");
      if (queryParams.length > 4) {
        return false;
      }
      var _iterator = _createForOfIteratorHelper(queryParams), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var q = _step.value;
          var _q$split = q.split("="), _q$split2 = _slicedToArray(_q$split, 2), key = _q$split2[0], value = _q$split2[1];
          if (key && !allowedParams.has(key)) {
            isParseFailed = true;
            break;
          }
          if (value && (key === "cc" || key === "bcc")) {
            query[key] = value;
          }
          if (key) {
            allowedParams.delete(key);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return isParseFailed ? false : query;
    }
    function isMailtoURI(url2, options) {
      (0, _assertString.default)(url2);
      if (url2.indexOf("mailto:") !== 0) {
        return false;
      }
      var _url$replace$split = url2.replace("mailto:", "").split("?"), _url$replace$split2 = _slicedToArray(_url$replace$split, 2), to = _url$replace$split2[0], _url$replace$split2$ = _url$replace$split2[1], queryString = _url$replace$split2$ === void 0 ? "" : _url$replace$split2$;
      if (!to && !queryString) {
        return true;
      }
      var query = parseMailtoQueryString(queryString);
      if (!query) {
        return false;
      }
      return "".concat(to, ",").concat(query.cc, ",").concat(query.bcc).split(",").every(function(email) {
        email = (0, _trim.default)(email, " ");
        if (email) {
          return (0, _isEmail.default)(email, options);
        }
        return true;
      });
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMimeType.js
var require_isMimeType = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isMimeType.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isMimeType;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+_]{1,100}$/i;
    var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i;
    var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;
    function isMimeType(str) {
      (0, _assertString.default)(str);
      return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLatLong.js
var require_isLatLong = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLatLong.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLatLong;
    var _assertString = _interopRequireDefault(require_assertString());
    var _merge = _interopRequireDefault(require_merge());
    var _includesString = _interopRequireDefault(require_includesString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
    var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
    var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
    var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
    var defaultLatLongOptions = {
      checkDMS: false
    };
    function isLatLong(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, defaultLatLongOptions);
      if (!(0, _includesString.default)(str, ",")) return false;
      var pair = str.split(",");
      if (pair[0].startsWith("(") && !pair[1].endsWith(")") || pair[1].endsWith(")") && !pair[0].startsWith("(")) return false;
      if (options.checkDMS) {
        return latDMS.test(pair[0]) && longDMS.test(pair[1]);
      }
      return lat.test(pair[0]) && long.test(pair[1]);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isPostalCode.js
var require_isPostalCode = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isPostalCode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isPostalCode;
    exports2.locales = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var threeDigit = /^\d{3}$/;
    var fourDigit = /^\d{4}$/;
    var fiveDigit = /^\d{5}$/;
    var sixDigit = /^\d{6}$/;
    var patterns = {
      AD: /^AD\d{3}$/,
      AT: fourDigit,
      AU: fourDigit,
      AZ: /^AZ\d{4}$/,
      BA: /^([7-8]\d{4}$)/,
      BD: /^([1-8][0-9]{3}|9[0-4][0-9]{2})$/,
      BE: fourDigit,
      BG: fourDigit,
      BR: /^\d{5}-?\d{3}$/,
      BY: /^2[1-4]\d{4}$/,
      CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
      CH: fourDigit,
      CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
      CO: /^(05|08|11|13|15|17|18|19|20|23|25|27|41|44|47|50|52|54|63|66|68|70|73|76|81|85|86|88|91|94|95|97|99)(\d{4})$/,
      CZ: /^\d{3}\s?\d{2}$/,
      DE: fiveDigit,
      DK: fourDigit,
      DO: fiveDigit,
      DZ: fiveDigit,
      EE: fiveDigit,
      ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
      FI: fiveDigit,
      FR: /^(?:(?:0[1-9]|[1-8]\d|9[0-5])\d{3}|97[1-46]\d{2})$/,
      GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
      GR: /^\d{3}\s?\d{2}$/,
      HR: /^([1-5]\d{4}$)/,
      HT: /^HT\d{4}$/,
      HU: fourDigit,
      ID: fiveDigit,
      IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
      IL: /^(\d{5}|\d{7})$/,
      IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
      IR: /^(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}$/,
      IS: threeDigit,
      IT: fiveDigit,
      JP: /^\d{3}\-\d{4}$/,
      KE: fiveDigit,
      KR: /^(\d{5}|\d{6})$/,
      LI: /^(948[5-9]|949[0-7])$/,
      LT: /^LT\-\d{5}$/,
      LU: fourDigit,
      LV: /^LV\-\d{4}$/,
      LK: fiveDigit,
      MG: threeDigit,
      MX: fiveDigit,
      MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
      MY: fiveDigit,
      NL: /^[1-9]\d{3}\s?(?!sa|sd|ss)[a-z]{2}$/i,
      NO: fourDigit,
      NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
      NZ: fourDigit,
      // https://www.pakpost.gov.pk/postcodes.php
      PK: fiveDigit,
      PL: /^\d{2}\-\d{3}$/,
      PR: /^00[679]\d{2}([ -]\d{4})?$/,
      PT: /^\d{4}\-\d{3}?$/,
      RO: sixDigit,
      RU: sixDigit,
      SA: fiveDigit,
      SE: /^[1-9]\d{2}\s?\d{2}$/,
      SG: sixDigit,
      SI: fourDigit,
      SK: /^\d{3}\s?\d{2}$/,
      TH: fiveDigit,
      TN: fourDigit,
      TW: /^\d{3}(\d{2,3})?$/,
      UA: fiveDigit,
      US: /^\d{5}(-\d{4})?$/,
      ZA: fourDigit,
      ZM: fiveDigit
    };
    var locales = exports2.locales = Object.keys(patterns);
    function isPostalCode(str, locale) {
      (0, _assertString.default)(str);
      if (locale in patterns) {
        return patterns[locale].test(str);
      } else if (locale === "any") {
        for (var key in patterns) {
          if (patterns.hasOwnProperty(key)) {
            var pattern = patterns[key];
            if (pattern.test(str)) {
              return true;
            }
          }
        }
        return false;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/escape.js
var require_escape = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/escape.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = escape;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function escape(str) {
      (0, _assertString.default)(str);
      return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&#x2F;").replace(/\\/g, "&#x5C;").replace(/`/g, "&#96;");
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/unescape.js
var require_unescape = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/unescape.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = unescape2;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function unescape2(str) {
      (0, _assertString.default)(str);
      return str.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x2F;/g, "/").replace(/&#x5C;/g, "\\").replace(/&#96;/g, "`").replace(/&amp;/g, "&");
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/blacklist.js
var require_blacklist = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/blacklist.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = blacklist;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function blacklist(str, chars) {
      (0, _assertString.default)(str);
      return str.replace(new RegExp("[".concat(chars, "]+"), "g"), "");
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/stripLow.js
var require_stripLow = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/stripLow.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = stripLow;
    var _assertString = _interopRequireDefault(require_assertString());
    var _blacklist = _interopRequireDefault(require_blacklist());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function stripLow(str, keep_new_lines) {
      (0, _assertString.default)(str);
      var chars = keep_new_lines ? "\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F" : "\\x00-\\x1F\\x7F";
      return (0, _blacklist.default)(str, chars);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/whitelist.js
var require_whitelist = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/whitelist.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = whitelist;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function whitelist(str, chars) {
      (0, _assertString.default)(str);
      return str.replace(new RegExp("[^".concat(chars, "]+"), "g"), "");
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isWhitelisted.js
var require_isWhitelisted = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isWhitelisted.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isWhitelisted;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function isWhitelisted(str, chars) {
      (0, _assertString.default)(str);
      for (var i = str.length - 1; i >= 0; i--) {
        if (chars.indexOf(str[i]) === -1) {
          return false;
        }
      }
      return true;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/normalizeEmail.js
var require_normalizeEmail = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/normalizeEmail.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = normalizeEmail;
    var _merge = _interopRequireDefault(require_merge());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var default_normalize_email_options = {
      // The following options apply to all email addresses
      // Lowercases the local part of the email address.
      // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
      // The domain is always lowercased, as per RFC 1035
      all_lowercase: true,
      // The following conversions are specific to GMail
      // Lowercases the local part of the GMail address (known to be case-insensitive)
      gmail_lowercase: true,
      // Removes dots from the local part of the email address, as that's ignored by GMail
      gmail_remove_dots: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      gmail_remove_subaddress: true,
      // Conversts the googlemail.com domain to gmail.com
      gmail_convert_googlemaildotcom: true,
      // The following conversions are specific to Outlook.com / Windows Live / Hotmail
      // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
      outlookdotcom_lowercase: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      outlookdotcom_remove_subaddress: true,
      // The following conversions are specific to Yahoo
      // Lowercases the local part of the Yahoo address (known to be case-insensitive)
      yahoo_lowercase: true,
      // Removes the subaddress (e.g. "-foo") from the email address
      yahoo_remove_subaddress: true,
      // The following conversions are specific to Yandex
      // Lowercases the local part of the Yandex address (known to be case-insensitive)
      yandex_lowercase: true,
      // all yandex domains are equal, this explicitly sets the domain to 'yandex.ru'
      yandex_convert_yandexru: true,
      // The following conversions are specific to iCloud
      // Lowercases the local part of the iCloud address (known to be case-insensitive)
      icloud_lowercase: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      icloud_remove_subaddress: true
    };
    var icloud_domains = ["icloud.com", "me.com"];
    var outlookdotcom_domains = ["hotmail.at", "hotmail.be", "hotmail.ca", "hotmail.cl", "hotmail.co.il", "hotmail.co.nz", "hotmail.co.th", "hotmail.co.uk", "hotmail.com", "hotmail.com.ar", "hotmail.com.au", "hotmail.com.br", "hotmail.com.gr", "hotmail.com.mx", "hotmail.com.pe", "hotmail.com.tr", "hotmail.com.vn", "hotmail.cz", "hotmail.de", "hotmail.dk", "hotmail.es", "hotmail.fr", "hotmail.hu", "hotmail.id", "hotmail.ie", "hotmail.in", "hotmail.it", "hotmail.jp", "hotmail.kr", "hotmail.lv", "hotmail.my", "hotmail.ph", "hotmail.pt", "hotmail.sa", "hotmail.sg", "hotmail.sk", "live.be", "live.co.uk", "live.com", "live.com.ar", "live.com.mx", "live.de", "live.es", "live.eu", "live.fr", "live.it", "live.nl", "msn.com", "outlook.at", "outlook.be", "outlook.cl", "outlook.co.il", "outlook.co.nz", "outlook.co.th", "outlook.com", "outlook.com.ar", "outlook.com.au", "outlook.com.br", "outlook.com.gr", "outlook.com.pe", "outlook.com.tr", "outlook.com.vn", "outlook.cz", "outlook.de", "outlook.dk", "outlook.es", "outlook.fr", "outlook.hu", "outlook.id", "outlook.ie", "outlook.in", "outlook.it", "outlook.jp", "outlook.kr", "outlook.lv", "outlook.my", "outlook.ph", "outlook.pt", "outlook.sa", "outlook.sg", "outlook.sk", "passport.com"];
    var yahoo_domains = ["rocketmail.com", "yahoo.ca", "yahoo.co.uk", "yahoo.com", "yahoo.de", "yahoo.fr", "yahoo.in", "yahoo.it", "ymail.com"];
    var yandex_domains = ["yandex.ru", "yandex.ua", "yandex.kz", "yandex.com", "yandex.by", "ya.ru"];
    function dotsReplacer(match) {
      if (match.length > 1) {
        return match;
      }
      return "";
    }
    function normalizeEmail(email, options) {
      options = (0, _merge.default)(options, default_normalize_email_options);
      var raw_parts = email.split("@");
      var domain = raw_parts.pop();
      var user = raw_parts.join("@");
      var parts = [user, domain];
      parts[1] = parts[1].toLowerCase();
      if (parts[1] === "gmail.com" || parts[1] === "googlemail.com") {
        if (options.gmail_remove_subaddress) {
          parts[0] = parts[0].split("+")[0];
        }
        if (options.gmail_remove_dots) {
          parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.gmail_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
        parts[1] = options.gmail_convert_googlemaildotcom ? "gmail.com" : parts[1];
      } else if (icloud_domains.indexOf(parts[1]) >= 0) {
        if (options.icloud_remove_subaddress) {
          parts[0] = parts[0].split("+")[0];
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.icloud_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
        if (options.outlookdotcom_remove_subaddress) {
          parts[0] = parts[0].split("+")[0];
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.outlookdotcom_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
        if (options.yahoo_remove_subaddress) {
          var components = parts[0].split("-");
          parts[0] = components.length > 1 ? components.slice(0, -1).join("-") : components[0];
        }
        if (!parts[0].length) {
          return false;
        }
        if (options.all_lowercase || options.yahoo_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (yandex_domains.indexOf(parts[1]) >= 0) {
        if (options.all_lowercase || options.yandex_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
        parts[1] = options.yandex_convert_yandexru ? "yandex.ru" : parts[1];
      } else if (options.all_lowercase) {
        parts[0] = parts[0].toLowerCase();
      }
      return parts.join("@");
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isSlug.js
var require_isSlug = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isSlug.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isSlug;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var charsetRegex = /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;
    function isSlug(str) {
      (0, _assertString.default)(str);
      return charsetRegex.test(str);
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLicensePlate.js
var require_isLicensePlate = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isLicensePlate.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isLicensePlate;
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var validators3 = {
      "cs-CZ": function csCZ(str) {
        return /^(([ABCDEFHIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(str);
      },
      "de-DE": function deDE(str) {
        return /^((A|AA|AB|AC|AE|AH|AK|AM|AN|AÖ|AP|AS|AT|AU|AW|AZ|B|BA|BB|BC|BE|BF|BH|BI|BK|BL|BM|BN|BO|BÖ|BS|BT|BZ|C|CA|CB|CE|CO|CR|CW|D|DA|DD|DE|DH|DI|DL|DM|DN|DO|DU|DW|DZ|E|EA|EB|ED|EE|EF|EG|EH|EI|EL|EM|EN|ER|ES|EU|EW|F|FB|FD|FF|FG|FI|FL|FN|FO|FR|FS|FT|FÜ|FW|FZ|G|GA|GC|GD|GE|GF|GG|GI|GK|GL|GM|GN|GÖ|GP|GR|GS|GT|GÜ|GV|GW|GZ|H|HA|HB|HC|HD|HE|HF|HG|HH|HI|HK|HL|HM|HN|HO|HP|HR|HS|HU|HV|HX|HY|HZ|IK|IL|IN|IZ|J|JE|JL|K|KA|KB|KC|KE|KF|KG|KH|KI|KK|KL|KM|KN|KO|KR|KS|KT|KU|KW|KY|L|LA|LB|LC|LD|LF|LG|LH|LI|LL|LM|LN|LÖ|LP|LR|LU|M|MA|MB|MC|MD|ME|MG|MH|MI|MK|ML|MM|MN|MO|MQ|MR|MS|MÜ|MW|MY|MZ|N|NB|ND|NE|NF|NH|NI|NK|NM|NÖ|NP|NR|NT|NU|NW|NY|NZ|OA|OB|OC|OD|OE|OF|OG|OH|OK|OL|OP|OS|OZ|P|PA|PB|PE|PF|PI|PL|PM|PN|PR|PS|PW|PZ|R|RA|RC|RD|RE|RG|RH|RI|RL|RM|RN|RO|RP|RS|RT|RU|RV|RW|RZ|S|SB|SC|SE|SG|SI|SK|SL|SM|SN|SO|SP|SR|ST|SU|SW|SY|SZ|TE|TF|TG|TO|TP|TR|TS|TT|TÜ|ÜB|UE|UH|UL|UM|UN|V|VB|VG|VK|VR|VS|W|WA|WB|WE|WF|WI|WK|WL|WM|WN|WO|WR|WS|WT|WÜ|WW|WZ|Z|ZE|ZI|ZP|ZR|ZW|ZZ)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(ABG|ABI|AIB|AIC|ALF|ALZ|ANA|ANG|ANK|APD|ARN|ART|ASL|ASZ|AUR|AZE|BAD|BAR|BBG|BCH|BED|BER|BGD|BGL|BID|BIN|BIR|BIT|BIW|BKS|BLB|BLK|BNA|BOG|BOH|BOR|BOT|BRA|BRB|BRG|BRK|BRL|BRV|BSB|BSK|BTF|BÜD|BUL|BÜR|BÜS|BÜZ|CAS|CHA|CLP|CLZ|COC|COE|CUX|DAH|DAN|DAU|DBR|DEG|DEL|DGF|DIL|DIN|DIZ|DKB|DLG|DON|DUD|DÜW|EBE|EBN|EBS|ECK|EIC|EIL|EIN|EIS|EMD|EMS|ERB|ERH|ERK|ERZ|ESB|ESW|FDB|FDS|FEU|FFB|FKB|FLÖ|FOR|FRG|FRI|FRW|FTL|FÜS|GAN|GAP|GDB|GEL|GEO|GER|GHA|GHC|GLA|GMN|GNT|GOA|GOH|GRA|GRH|GRI|GRM|GRZ|GTH|GUB|GUN|GVM|HAB|HAL|HAM|HAS|HBN|HBS|HCH|HDH|HDL|HEB|HEF|HEI|HER|HET|HGN|HGW|HHM|HIG|HIP|HMÜ|HOG|HOH|HOL|HOM|HOR|HÖS|HOT|HRO|HSK|HST|HVL|HWI|IGB|ILL|JÜL|KEH|KEL|KEM|KIB|KLE|KLZ|KÖN|KÖT|KÖZ|KRU|KÜN|KUS|KYF|LAN|LAU|LBS|LBZ|LDK|LDS|LEO|LER|LEV|LIB|LIF|LIP|LÖB|LOS|LRO|LSZ|LÜN|LUP|LWL|MAB|MAI|MAK|MAL|MED|MEG|MEI|MEK|MEL|MER|MET|MGH|MGN|MHL|MIL|MKK|MOD|MOL|MON|MOS|MSE|MSH|MSP|MST|MTK|MTL|MÜB|MÜR|MYK|MZG|NAB|NAI|NAU|NDH|NEA|NEB|NEC|NEN|NES|NEW|NMB|NMS|NOH|NOL|NOM|NOR|NVP|NWM|OAL|OBB|OBG|OCH|OHA|ÖHR|OHV|OHZ|OPR|OSL|OVI|OVL|OVP|PAF|PAN|PAR|PCH|PEG|PIR|PLÖ|PRÜ|QFT|QLB|RDG|REG|REH|REI|RID|RIE|ROD|ROF|ROK|ROL|ROS|ROT|ROW|RSL|RÜD|RÜG|SAB|SAD|SAN|SAW|SBG|SBK|SCZ|SDH|SDL|SDT|SEB|SEE|SEF|SEL|SFB|SFT|SGH|SHA|SHG|SHK|SHL|SIG|SIM|SLE|SLF|SLK|SLN|SLS|SLÜ|SLZ|SMÜ|SOB|SOG|SOK|SÖM|SON|SPB|SPN|SRB|SRO|STA|STB|STD|STE|STL|SUL|SÜW|SWA|SZB|TBB|TDO|TET|TIR|TÖL|TUT|UEM|UER|UFF|USI|VAI|VEC|VER|VIB|VIE|VIT|VOH|WAF|WAK|WAN|WAR|WAT|WBS|WDA|WEL|WEN|WER|WES|WHV|WIL|WIS|WIT|WIZ|WLG|WMS|WND|WOB|WOH|WOL|WOR|WOS|WRN|WSF|WST|WSW|WTL|WTM|WUG|WÜM|WUN|WUR|WZL|ZEL|ZIG)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(str);
      },
      "de-LI": function deLI(str) {
        return /^FL[- ]?\d{1,5}[UZ]?$/.test(str);
      },
      "en-IN": function enIN(str) {
        return /^[A-Z]{2}[ -]?[0-9]{1,2}(?:[ -]?[A-Z])(?:[ -]?[A-Z]*)?[ -]?[0-9]{4}$/.test(str);
      },
      "en-SG": function enSG(str) {
        return /^[A-Z]{3}[ -]?[\d]{4}[ -]?[A-Z]{1}$/.test(str);
      },
      "es-AR": function esAR(str) {
        return /^(([A-Z]{2} ?[0-9]{3} ?[A-Z]{2})|([A-Z]{3} ?[0-9]{3}))$/.test(str);
      },
      "fi-FI": function fiFI(str) {
        return /^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(str);
      },
      "hu-HU": function huHU(str) {
        return /^((((?!AAA)(([A-NPRSTVZWXY]{1})([A-PR-Z]{1})([A-HJ-NPR-Z]))|(A[ABC]I)|A[ABC]O|A[A-W]Q|BPI|BPO|UCO|UDO|XAO)-(?!000)\d{3})|(M\d{6})|((CK|DT|CD|HC|H[ABEFIKLMNPRSTVX]|MA|OT|R[A-Z]) \d{2}-\d{2})|(CD \d{3}-\d{3})|(C-(C|X) \d{4})|(X-(A|B|C) \d{4})|(([EPVZ]-\d{5}))|(S A[A-Z]{2} \d{2})|(SP \d{2}-\d{2}))$/.test(str);
      },
      "pt-BR": function ptBR(str) {
        return /^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(str);
      },
      "pt-PT": function ptPT(str) {
        return /^(([A-Z]{2}[ -·]?[0-9]{2}[ -·]?[0-9]{2})|([0-9]{2}[ -·]?[A-Z]{2}[ -·]?[0-9]{2})|([0-9]{2}[ -·]?[0-9]{2}[ -·]?[A-Z]{2})|([A-Z]{2}[ -·]?[0-9]{2}[ -·]?[A-Z]{2}))$/.test(str);
      },
      "sq-AL": function sqAL(str) {
        return /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(str);
      },
      "sv-SE": function svSE(str) {
        return /^[A-HJ-PR-UW-Z]{3} ?[\d]{2}[A-HJ-PR-UW-Z1-9]$|(^[A-ZÅÄÖ ]{2,7}$)/.test(str.trim());
      },
      "en-PK": function enPK(str) {
        return /(^[A-Z]{2}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{3}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]{4}((\s|-){0,1})[0-9]{3,4}((\s|-)[0-9]{2}){0,1}$)|(^[A-Z]((\s|-){0,1})[0-9]{4}((\s|-)[0-9]{2}){0,1}$)/.test(str.trim());
      }
    };
    function isLicensePlate(str, locale) {
      (0, _assertString.default)(str);
      if (locale in validators3) {
        return validators3[locale](str);
      } else if (locale === "any") {
        for (var key in validators3) {
          var validator = validators3[key];
          if (validator(str)) {
            return true;
          }
        }
        return false;
      }
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isStrongPassword.js
var require_isStrongPassword = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isStrongPassword.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isStrongPassword;
    var _merge = _interopRequireDefault(require_merge());
    var _assertString = _interopRequireDefault(require_assertString());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var upperCaseRegex = /^[A-Z]$/;
    var lowerCaseRegex = /^[a-z]$/;
    var numberRegex = /^[0-9]$/;
    var symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]$/;
    var defaultOptions = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10
    };
    function countChars(str) {
      var result = {};
      Array.from(str).forEach(function(char) {
        var curVal = result[char];
        if (curVal) {
          result[char] += 1;
        } else {
          result[char] = 1;
        }
      });
      return result;
    }
    function analyzePassword(password) {
      var charMap = countChars(password);
      var analysis = {
        length: password.length,
        uniqueChars: Object.keys(charMap).length,
        uppercaseCount: 0,
        lowercaseCount: 0,
        numberCount: 0,
        symbolCount: 0
      };
      Object.keys(charMap).forEach(function(char) {
        if (upperCaseRegex.test(char)) {
          analysis.uppercaseCount += charMap[char];
        } else if (lowerCaseRegex.test(char)) {
          analysis.lowercaseCount += charMap[char];
        } else if (numberRegex.test(char)) {
          analysis.numberCount += charMap[char];
        } else if (symbolRegex.test(char)) {
          analysis.symbolCount += charMap[char];
        }
      });
      return analysis;
    }
    function scorePassword(analysis, scoringOptions) {
      var points = 0;
      points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
      points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;
      if (analysis.lowercaseCount > 0) {
        points += scoringOptions.pointsForContainingLower;
      }
      if (analysis.uppercaseCount > 0) {
        points += scoringOptions.pointsForContainingUpper;
      }
      if (analysis.numberCount > 0) {
        points += scoringOptions.pointsForContainingNumber;
      }
      if (analysis.symbolCount > 0) {
        points += scoringOptions.pointsForContainingSymbol;
      }
      return points;
    }
    function isStrongPassword(str) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      (0, _assertString.default)(str);
      var analysis = analyzePassword(str);
      options = (0, _merge.default)(options || {}, defaultOptions);
      if (options.returnScore) {
        return scorePassword(analysis, options);
      }
      return analysis.length >= options.minLength && analysis.lowercaseCount >= options.minLowercase && analysis.uppercaseCount >= options.minUppercase && analysis.numberCount >= options.minNumbers && analysis.symbolCount >= options.minSymbols;
    }
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isVAT.js
var require_isVAT = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/lib/isVAT.js"(exports2) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = isVAT;
    exports2.vatMatchers = void 0;
    var _assertString = _interopRequireDefault(require_assertString());
    var algorithms = _interopRequireWildcard(require_algorithms());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var AU = function AU2(str) {
      var match = str.match(/^(AU)?(\d{11})$/);
      if (!match) {
        return false;
      }
      var weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
      str = str.replace(/^AU/, "");
      var ABN = (parseInt(str.slice(0, 1), 10) - 1).toString() + str.slice(1);
      var total = 0;
      for (var i = 0; i < 11; i++) {
        total += weights[i] * ABN.charAt(i);
      }
      return total !== 0 && total % 89 === 0;
    };
    var CH = function CH2(str) {
      var hasValidCheckNumber = function hasValidCheckNumber2(digits) {
        var lastDigit = digits.pop();
        var weights = [5, 4, 3, 2, 7, 6, 5, 4];
        var calculatedCheckNumber = (11 - digits.reduce(function(acc, el, idx) {
          return acc + el * weights[idx];
        }, 0) % 11) % 11;
        return lastDigit === calculatedCheckNumber;
      };
      return /^(CHE[- ]?)?(\d{9}|(\d{3}\.\d{3}\.\d{3})|(\d{3} \d{3} \d{3})) ?(TVA|MWST|IVA)?$/.test(str) && hasValidCheckNumber(str.match(/\d/g).map(function(el) {
        return +el;
      }));
    };
    var PT = function PT2(str) {
      var match = str.match(/^(PT)?(\d{9})$/);
      if (!match) {
        return false;
      }
      var tin = match[2];
      var checksum = 11 - algorithms.reverseMultiplyAndSum(tin.split("").slice(0, 8).map(function(a) {
        return parseInt(a, 10);
      }), 9) % 11;
      if (checksum > 9) {
        return parseInt(tin[8], 10) === 0;
      }
      return checksum === parseInt(tin[8], 10);
    };
    var vatMatchers = exports2.vatMatchers = {
      /**
       * European Union VAT identification numbers
       */
      AT: function AT(str) {
        return /^(AT)?U\d{8}$/.test(str);
      },
      BE: function BE(str) {
        return /^(BE)?\d{10}$/.test(str);
      },
      BG: function BG(str) {
        return /^(BG)?\d{9,10}$/.test(str);
      },
      HR: function HR(str) {
        return /^(HR)?\d{11}$/.test(str);
      },
      CY: function CY(str) {
        return /^(CY)?\w{9}$/.test(str);
      },
      CZ: function CZ(str) {
        return /^(CZ)?\d{8,10}$/.test(str);
      },
      DK: function DK(str) {
        return /^(DK)?\d{8}$/.test(str);
      },
      EE: function EE(str) {
        return /^(EE)?\d{9}$/.test(str);
      },
      FI: function FI(str) {
        return /^(FI)?\d{8}$/.test(str);
      },
      FR: function FR(str) {
        return /^(FR)([A-Z0-9]{2}\d{9})$/.test(str);
      },
      DE: function DE(str) {
        return /^(DE)?\d{9}$/.test(str);
      },
      EL: function EL(str) {
        return /^(EL)?\d{9}$/.test(str);
      },
      HU: function HU(str) {
        return /^(HU)?\d{8}$/.test(str);
      },
      IE: function IE(str) {
        return /^(IE)?\d{7}\w{1}(W)?$/.test(str);
      },
      IT: function IT(str) {
        return /^(IT)?\d{11}$/.test(str);
      },
      LV: function LV(str) {
        return /^(LV)?\d{11}$/.test(str);
      },
      LT: function LT(str) {
        return /^(LT)?\d{9,12}$/.test(str);
      },
      LU: function LU(str) {
        return /^(LU)?\d{8}$/.test(str);
      },
      MT: function MT(str) {
        return /^(MT)?\d{8}$/.test(str);
      },
      NL: function NL(str) {
        return /^(NL)?\d{9}B\d{2}$/.test(str);
      },
      PL: function PL(str) {
        return /^(PL)?(\d{10}|(\d{3}-\d{3}-\d{2}-\d{2})|(\d{3}-\d{2}-\d{2}-\d{3}))$/.test(str);
      },
      PT,
      RO: function RO(str) {
        return /^(RO)?\d{2,10}$/.test(str);
      },
      SK: function SK(str) {
        return /^(SK)?\d{10}$/.test(str);
      },
      SI: function SI(str) {
        return /^(SI)?\d{8}$/.test(str);
      },
      ES: function ES(str) {
        return /^(ES)?\w\d{7}[A-Z]$/.test(str);
      },
      SE: function SE(str) {
        return /^(SE)?\d{12}$/.test(str);
      },
      /**
       * VAT numbers of non-EU countries
       */
      AL: function AL(str) {
        return /^(AL)?\w{9}[A-Z]$/.test(str);
      },
      MK: function MK(str) {
        return /^(MK)?\d{13}$/.test(str);
      },
      AU,
      BY: function BY(str) {
        return /^(УНП )?\d{9}$/.test(str);
      },
      CA: function CA(str) {
        return /^(CA)?\d{9}$/.test(str);
      },
      IS: function IS(str) {
        return /^(IS)?\d{5,6}$/.test(str);
      },
      IN: function IN(str) {
        return /^(IN)?\d{15}$/.test(str);
      },
      ID: function ID(str) {
        return /^(ID)?(\d{15}|(\d{2}.\d{3}.\d{3}.\d{1}-\d{3}.\d{3}))$/.test(str);
      },
      IL: function IL(str) {
        return /^(IL)?\d{9}$/.test(str);
      },
      KZ: function KZ(str) {
        return /^(KZ)?\d{12}$/.test(str);
      },
      NZ: function NZ(str) {
        return /^(NZ)?\d{9}$/.test(str);
      },
      NG: function NG(str) {
        return /^(NG)?(\d{12}|(\d{8}-\d{4}))$/.test(str);
      },
      NO: function NO(str) {
        return /^(NO)?\d{9}MVA$/.test(str);
      },
      PH: function PH(str) {
        return /^(PH)?(\d{12}|\d{3} \d{3} \d{3} \d{3})$/.test(str);
      },
      RU: function RU(str) {
        return /^(RU)?(\d{10}|\d{12})$/.test(str);
      },
      SM: function SM(str) {
        return /^(SM)?\d{5}$/.test(str);
      },
      SA: function SA(str) {
        return /^(SA)?\d{15}$/.test(str);
      },
      RS: function RS(str) {
        return /^(RS)?\d{9}$/.test(str);
      },
      CH,
      TR: function TR(str) {
        return /^(TR)?\d{10}$/.test(str);
      },
      UA: function UA(str) {
        return /^(UA)?\d{12}$/.test(str);
      },
      GB: function GB(str) {
        return /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/.test(str);
      },
      UZ: function UZ(str) {
        return /^(UZ)?\d{9}$/.test(str);
      },
      /**
       * VAT numbers of Latin American countries
       */
      AR: function AR(str) {
        return /^(AR)?\d{11}$/.test(str);
      },
      BO: function BO(str) {
        return /^(BO)?\d{7}$/.test(str);
      },
      BR: function BR(str) {
        return /^(BR)?((\d{2}.\d{3}.\d{3}\/\d{4}-\d{2})|(\d{3}.\d{3}.\d{3}-\d{2}))$/.test(str);
      },
      CL: function CL(str) {
        return /^(CL)?\d{8}-\d{1}$/.test(str);
      },
      CO: function CO(str) {
        return /^(CO)?\d{10}$/.test(str);
      },
      CR: function CR(str) {
        return /^(CR)?\d{9,12}$/.test(str);
      },
      EC: function EC(str) {
        return /^(EC)?\d{13}$/.test(str);
      },
      SV: function SV(str) {
        return /^(SV)?\d{4}-\d{6}-\d{3}-\d{1}$/.test(str);
      },
      GT: function GT(str) {
        return /^(GT)?\d{7}-\d{1}$/.test(str);
      },
      HN: function HN(str) {
        return /^(HN)?$/.test(str);
      },
      MX: function MX(str) {
        return /^(MX)?\w{3,4}\d{6}\w{3}$/.test(str);
      },
      NI: function NI(str) {
        return /^(NI)?\d{3}-\d{6}-\d{4}\w{1}$/.test(str);
      },
      PA: function PA(str) {
        return /^(PA)?$/.test(str);
      },
      PY: function PY(str) {
        return /^(PY)?\d{6,8}-\d{1}$/.test(str);
      },
      PE: function PE(str) {
        return /^(PE)?\d{11}$/.test(str);
      },
      DO: function DO(str) {
        return /^(DO)?(\d{11}|(\d{3}-\d{7}-\d{1})|[1,4,5]{1}\d{8}|([1,4,5]{1})-\d{2}-\d{5}-\d{1})$/.test(str);
      },
      UY: function UY(str) {
        return /^(UY)?\d{12}$/.test(str);
      },
      VE: function VE(str) {
        return /^(VE)?[J,G,V,E]{1}-(\d{9}|(\d{8}-\d{1}))$/.test(str);
      }
    };
    function isVAT(str, countryCode) {
      (0, _assertString.default)(str);
      (0, _assertString.default)(countryCode);
      if (countryCode in vatMatchers) {
        return vatMatchers[countryCode](str);
      }
      throw new Error("Invalid country code: '".concat(countryCode, "'"));
    }
  }
});

// node_modules/.pnpm/validator@13.15.26/node_modules/validator/index.js
var require_validator = __commonJS({
  "node_modules/.pnpm/validator@13.15.26/node_modules/validator/index.js"(exports2, module2) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _toDate = _interopRequireDefault(require_toDate());
    var _toFloat = _interopRequireDefault(require_toFloat());
    var _toInt = _interopRequireDefault(require_toInt());
    var _toBoolean = _interopRequireDefault(require_toBoolean());
    var _equals = _interopRequireDefault(require_equals());
    var _contains = _interopRequireDefault(require_contains());
    var _matches = _interopRequireDefault(require_matches());
    var _isEmail = _interopRequireDefault(require_isEmail());
    var _isURL = _interopRequireDefault(require_isURL());
    var _isMACAddress = _interopRequireDefault(require_isMACAddress());
    var _isIP = _interopRequireDefault(require_isIP());
    var _isIPRange = _interopRequireDefault(require_isIPRange());
    var _isFQDN = _interopRequireDefault(require_isFQDN());
    var _isDate = _interopRequireDefault(require_isDate());
    var _isTime = _interopRequireDefault(require_isTime());
    var _isBoolean = _interopRequireDefault(require_isBoolean());
    var _isLocale = _interopRequireDefault(require_isLocale());
    var _isAbaRouting = _interopRequireDefault(require_isAbaRouting());
    var _isAlpha = _interopRequireWildcard(require_isAlpha());
    var _isAlphanumeric = _interopRequireWildcard(require_isAlphanumeric());
    var _isNumeric = _interopRequireDefault(require_isNumeric());
    var _isPassportNumber = _interopRequireWildcard(require_isPassportNumber());
    var _isPort = _interopRequireDefault(require_isPort());
    var _isLowercase = _interopRequireDefault(require_isLowercase());
    var _isUppercase = _interopRequireDefault(require_isUppercase());
    var _isIMEI = _interopRequireDefault(require_isIMEI());
    var _isAscii = _interopRequireDefault(require_isAscii());
    var _isFullWidth = _interopRequireDefault(require_isFullWidth());
    var _isHalfWidth = _interopRequireDefault(require_isHalfWidth());
    var _isVariableWidth = _interopRequireDefault(require_isVariableWidth());
    var _isMultibyte = _interopRequireDefault(require_isMultibyte());
    var _isSemVer = _interopRequireDefault(require_isSemVer());
    var _isSurrogatePair = _interopRequireDefault(require_isSurrogatePair());
    var _isInt = _interopRequireDefault(require_isInt());
    var _isFloat = _interopRequireWildcard(require_isFloat());
    var _isDecimal = _interopRequireDefault(require_isDecimal());
    var _isHexadecimal = _interopRequireDefault(require_isHexadecimal());
    var _isOctal = _interopRequireDefault(require_isOctal());
    var _isDivisibleBy = _interopRequireDefault(require_isDivisibleBy());
    var _isHexColor = _interopRequireDefault(require_isHexColor());
    var _isRgbColor = _interopRequireDefault(require_isRgbColor());
    var _isHSL = _interopRequireDefault(require_isHSL());
    var _isISRC = _interopRequireDefault(require_isISRC());
    var _isIBAN = _interopRequireWildcard(require_isIBAN());
    var _isBIC = _interopRequireDefault(require_isBIC());
    var _isMD = _interopRequireDefault(require_isMD5());
    var _isHash = _interopRequireDefault(require_isHash());
    var _isJWT = _interopRequireDefault(require_isJWT());
    var _isJSON = _interopRequireDefault(require_isJSON());
    var _isEmpty = _interopRequireDefault(require_isEmpty());
    var _isLength = _interopRequireDefault(require_isLength());
    var _isByteLength = _interopRequireDefault(require_isByteLength());
    var _isULID = _interopRequireDefault(require_isULID());
    var _isUUID = _interopRequireDefault(require_isUUID());
    var _isMongoId = _interopRequireDefault(require_isMongoId());
    var _isAfter = _interopRequireDefault(require_isAfter());
    var _isBefore = _interopRequireDefault(require_isBefore());
    var _isIn = _interopRequireDefault(require_isIn());
    var _isLuhnNumber = _interopRequireDefault(require_isLuhnNumber());
    var _isCreditCard = _interopRequireDefault(require_isCreditCard());
    var _isIdentityCard = _interopRequireDefault(require_isIdentityCard());
    var _isEAN = _interopRequireDefault(require_isEAN());
    var _isISIN = _interopRequireDefault(require_isISIN());
    var _isISBN = _interopRequireDefault(require_isISBN());
    var _isISSN = _interopRequireDefault(require_isISSN());
    var _isTaxID = _interopRequireDefault(require_isTaxID());
    var _isMobilePhone = _interopRequireWildcard(require_isMobilePhone());
    var _isEthereumAddress = _interopRequireDefault(require_isEthereumAddress());
    var _isCurrency = _interopRequireDefault(require_isCurrency());
    var _isBtcAddress = _interopRequireDefault(require_isBtcAddress());
    var _isISO = require_isISO6346();
    var _isISO2 = _interopRequireDefault(require_isISO6391());
    var _isISO3 = _interopRequireDefault(require_isISO8601());
    var _isRFC = _interopRequireDefault(require_isRFC3339());
    var _isISO4 = _interopRequireDefault(require_isISO15924());
    var _isISO31661Alpha = _interopRequireDefault(require_isISO31661Alpha2());
    var _isISO31661Alpha2 = _interopRequireDefault(require_isISO31661Alpha3());
    var _isISO31661Numeric = _interopRequireDefault(require_isISO31661Numeric());
    var _isISO5 = _interopRequireDefault(require_isISO4217());
    var _isBase = _interopRequireDefault(require_isBase32());
    var _isBase2 = _interopRequireDefault(require_isBase58());
    var _isBase3 = _interopRequireDefault(require_isBase64());
    var _isDataURI = _interopRequireDefault(require_isDataURI());
    var _isMagnetURI = _interopRequireDefault(require_isMagnetURI());
    var _isMailtoURI = _interopRequireDefault(require_isMailtoURI());
    var _isMimeType = _interopRequireDefault(require_isMimeType());
    var _isLatLong = _interopRequireDefault(require_isLatLong());
    var _isPostalCode = _interopRequireWildcard(require_isPostalCode());
    var _ltrim = _interopRequireDefault(require_ltrim());
    var _rtrim = _interopRequireDefault(require_rtrim());
    var _trim = _interopRequireDefault(require_trim());
    var _escape = _interopRequireDefault(require_escape());
    var _unescape = _interopRequireDefault(require_unescape());
    var _stripLow = _interopRequireDefault(require_stripLow());
    var _whitelist = _interopRequireDefault(require_whitelist());
    var _blacklist = _interopRequireDefault(require_blacklist());
    var _isWhitelisted = _interopRequireDefault(require_isWhitelisted());
    var _normalizeEmail = _interopRequireDefault(require_normalizeEmail());
    var _isSlug = _interopRequireDefault(require_isSlug());
    var _isLicensePlate = _interopRequireDefault(require_isLicensePlate());
    var _isStrongPassword = _interopRequireDefault(require_isStrongPassword());
    var _isVAT = _interopRequireDefault(require_isVAT());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, default: e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var version = "13.15.26";
    var validator = {
      version,
      toDate: _toDate.default,
      toFloat: _toFloat.default,
      toInt: _toInt.default,
      toBoolean: _toBoolean.default,
      equals: _equals.default,
      contains: _contains.default,
      matches: _matches.default,
      isEmail: _isEmail.default,
      isURL: _isURL.default,
      isMACAddress: _isMACAddress.default,
      isIP: _isIP.default,
      isIPRange: _isIPRange.default,
      isFQDN: _isFQDN.default,
      isBoolean: _isBoolean.default,
      isIBAN: _isIBAN.default,
      isBIC: _isBIC.default,
      isAbaRouting: _isAbaRouting.default,
      isAlpha: _isAlpha.default,
      isAlphaLocales: _isAlpha.locales,
      isAlphanumeric: _isAlphanumeric.default,
      isAlphanumericLocales: _isAlphanumeric.locales,
      isNumeric: _isNumeric.default,
      isPassportNumber: _isPassportNumber.default,
      passportNumberLocales: _isPassportNumber.locales,
      isPort: _isPort.default,
      isLowercase: _isLowercase.default,
      isUppercase: _isUppercase.default,
      isAscii: _isAscii.default,
      isFullWidth: _isFullWidth.default,
      isHalfWidth: _isHalfWidth.default,
      isVariableWidth: _isVariableWidth.default,
      isMultibyte: _isMultibyte.default,
      isSemVer: _isSemVer.default,
      isSurrogatePair: _isSurrogatePair.default,
      isInt: _isInt.default,
      isIMEI: _isIMEI.default,
      isFloat: _isFloat.default,
      isFloatLocales: _isFloat.locales,
      isDecimal: _isDecimal.default,
      isHexadecimal: _isHexadecimal.default,
      isOctal: _isOctal.default,
      isDivisibleBy: _isDivisibleBy.default,
      isHexColor: _isHexColor.default,
      isRgbColor: _isRgbColor.default,
      isHSL: _isHSL.default,
      isISRC: _isISRC.default,
      isMD5: _isMD.default,
      isHash: _isHash.default,
      isJWT: _isJWT.default,
      isJSON: _isJSON.default,
      isEmpty: _isEmpty.default,
      isLength: _isLength.default,
      isLocale: _isLocale.default,
      isByteLength: _isByteLength.default,
      isULID: _isULID.default,
      isUUID: _isUUID.default,
      isMongoId: _isMongoId.default,
      isAfter: _isAfter.default,
      isBefore: _isBefore.default,
      isIn: _isIn.default,
      isLuhnNumber: _isLuhnNumber.default,
      isCreditCard: _isCreditCard.default,
      isIdentityCard: _isIdentityCard.default,
      isEAN: _isEAN.default,
      isISIN: _isISIN.default,
      isISBN: _isISBN.default,
      isISSN: _isISSN.default,
      isMobilePhone: _isMobilePhone.default,
      isMobilePhoneLocales: _isMobilePhone.locales,
      isPostalCode: _isPostalCode.default,
      isPostalCodeLocales: _isPostalCode.locales,
      isEthereumAddress: _isEthereumAddress.default,
      isCurrency: _isCurrency.default,
      isBtcAddress: _isBtcAddress.default,
      isISO6346: _isISO.isISO6346,
      isFreightContainerID: _isISO.isFreightContainerID,
      isISO6391: _isISO2.default,
      isISO8601: _isISO3.default,
      isISO15924: _isISO4.default,
      isRFC3339: _isRFC.default,
      isISO31661Alpha2: _isISO31661Alpha.default,
      isISO31661Alpha3: _isISO31661Alpha2.default,
      isISO31661Numeric: _isISO31661Numeric.default,
      isISO4217: _isISO5.default,
      isBase32: _isBase.default,
      isBase58: _isBase2.default,
      isBase64: _isBase3.default,
      isDataURI: _isDataURI.default,
      isMagnetURI: _isMagnetURI.default,
      isMailtoURI: _isMailtoURI.default,
      isMimeType: _isMimeType.default,
      isLatLong: _isLatLong.default,
      ltrim: _ltrim.default,
      rtrim: _rtrim.default,
      trim: _trim.default,
      escape: _escape.default,
      unescape: _unescape.default,
      stripLow: _stripLow.default,
      whitelist: _whitelist.default,
      blacklist: _blacklist.default,
      isWhitelisted: _isWhitelisted.default,
      normalizeEmail: _normalizeEmail.default,
      toString,
      isSlug: _isSlug.default,
      isStrongPassword: _isStrongPassword.default,
      isTaxID: _isTaxID.default,
      isDate: _isDate.default,
      isTime: _isTime.default,
      isLicensePlate: _isLicensePlate.default,
      isVAT: _isVAT.default,
      ibanLocales: _isIBAN.locales
    };
    var _default = exports2.default = validator;
    module2.exports = exports2.default;
    module2.exports.default = exports2.default;
  }
});

// node_modules/.pnpm/is-extglob@1.0.0/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "node_modules/.pnpm/is-extglob@1.0.0/node_modules/is-extglob/index.js"(exports2, module2) {
    module2.exports = function isExtglob(str) {
      return typeof str === "string" && /[@?!+*]\(/.test(str);
    };
  }
});

// node_modules/.pnpm/is-glob@2.0.1/node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "node_modules/.pnpm/is-glob@2.0.1/node_modules/is-glob/index.js"(exports2, module2) {
    var isExtglob = require_is_extglob();
    module2.exports = function isGlob(str) {
      return typeof str === "string" && (/[*!?{}(|)[\]]/.test(str) || isExtglob(str));
    };
  }
});

// node_modules/.pnpm/is-invalid-path@0.1.0/node_modules/is-invalid-path/index.js
var require_is_invalid_path = __commonJS({
  "node_modules/.pnpm/is-invalid-path@0.1.0/node_modules/is-invalid-path/index.js"(exports2, module2) {
    "use strict";
    var isGlob = require_is_glob();
    var re = /[‘“!#$%&+^<=>`]/;
    module2.exports = function(str) {
      return typeof str !== "string" || isGlob(str) || re.test(str);
    };
  }
});

// node_modules/.pnpm/is-valid-path@0.1.1/node_modules/is-valid-path/index.js
var require_is_valid_path = __commonJS({
  "node_modules/.pnpm/is-valid-path@0.1.1/node_modules/is-valid-path/index.js"(exports2, module2) {
    "use strict";
    var isInvalidPath = require_is_invalid_path();
    module2.exports = function(str) {
      return isInvalidPath(str) === false;
    };
  }
});

// node_modules/.pnpm/iptv-playlist-parser@https+++codeload.github.com+4gray+iptv-playlist-parser+tar.gz+38a6_9899916b2eeff163e8c776559b2de2b5/node_modules/iptv-playlist-parser/src/index.js
var require_src2 = __commonJS({
  "node_modules/.pnpm/iptv-playlist-parser@https+++codeload.github.com+4gray+iptv-playlist-parser+tar.gz+38a6_9899916b2eeff163e8c776559b2de2b5/node_modules/iptv-playlist-parser/src/index.js"(exports2, module2) {
    var { isURL: isValidUrl } = require_validator();
    var isValidPath = require_is_valid_path();
    var Parser = {};
    Parser.parse = (content) => {
      let playlist = {
        header: {},
        items: []
      };
      let lines = content.split("\n").map(parseLine);
      let firstLine = lines.find((l) => l.index === 0);
      if (!firstLine || !/^#EXTM3U/.test(firstLine.raw)) throw new Error("Playlist is not valid");
      playlist.header = parseHeader(firstLine);
      let i = 0;
      const items = {};
      for (let line of lines) {
        if (line.index === 0) continue;
        const string = line.raw.toString().trim();
        if (string.startsWith("#EXTINF:")) {
          const EXTINF = string;
          items[i] = {
            name: EXTINF.getName(),
            tvg: {
              id: EXTINF.getAttribute("tvg-id"),
              name: EXTINF.getAttribute("tvg-name"),
              logo: EXTINF.getAttribute("tvg-logo"),
              url: EXTINF.getAttribute("tvg-url"),
              rec: EXTINF.getAttribute("tvg-rec")
            },
            group: {
              title: EXTINF.getAttribute("group-title")
            },
            http: {
              referrer: "",
              "user-agent": EXTINF.getAttribute("user-agent")
            },
            url: void 0,
            raw: line.raw,
            line: line.index + 1,
            catchup: {
              type: EXTINF.getAttribute("catchup"),
              days: EXTINF.getAttribute("catchup-days"),
              source: EXTINF.getAttribute("catchup-source")
            },
            timeshift: EXTINF.getAttribute("timeshift"),
            radio: EXTINF.getAttribute("radio")
          };
        } else if (string.startsWith("#EXTVLCOPT:")) {
          if (!items[i]) continue;
          const EXTVLCOPT = string;
          items[i].http.referrer = EXTVLCOPT.getOption("http-referrer") || items[i].http.referrer;
          items[i].http["user-agent"] = EXTVLCOPT.getOption("http-user-agent") || items[i].http["user-agent"];
          items[i].raw += `\r
${line.raw}`;
        } else if (string.startsWith("#EXTGRP:")) {
          if (!items[i]) continue;
          const EXTGRP = string;
          items[i].group.title = EXTGRP.getValue() || items[i].group.title;
          items[i].raw += `\r
${line.raw}`;
        } else {
          if (!items[i]) continue;
          const url2 = string.getURL();
          const user_agent = string.getParameter("user-agent");
          const referrer = string.getParameter("referer");
          if (url2 && (isValidPath(url2) || isValidUrl(url2, { require_tld: false }))) {
            items[i].url = url2;
            items[i].http["user-agent"] = user_agent || items[i].http["user-agent"];
            items[i].http.referrer = referrer || items[i].http.referrer;
            items[i].raw += `\r
${line.raw}`;
            i++;
          } else {
            if (!items[i]) continue;
            items[i].raw += `\r
${line.raw}`;
          }
        }
      }
      playlist.items = Object.values(items);
      return playlist;
    };
    function parseLine(line, index) {
      return {
        index,
        raw: line
      };
    }
    function parseHeader(line) {
      const supportedAttrs = ["x-tvg-url", "url-tvg"];
      let attrs = {};
      for (let attrName of supportedAttrs) {
        const tvgUrl = line.raw.getAttribute(attrName);
        if (tvgUrl) {
          attrs[attrName] = tvgUrl;
        }
      }
      return {
        attrs,
        raw: line.raw
      };
    }
    String.prototype.getName = function() {
      let info = this.replace(/\="(.*?)"/g, "");
      let parts = info.split(/,(.*)/);
      return parts[1] || "";
    };
    String.prototype.getAttribute = function(name) {
      let regex = new RegExp(name + '="(.*?)"', "gi");
      let match = regex.exec(this);
      return match && match[1] ? match[1] : "";
    };
    String.prototype.getOption = function(name) {
      let regex = new RegExp(":" + name + "=(.*)", "gi");
      let match = regex.exec(this);
      return match && match[1] && typeof match[1] === "string" ? match[1].replace(/\"/g, "") : "";
    };
    String.prototype.getValue = function(name) {
      let regex = new RegExp(":(.*)", "gi");
      let match = regex.exec(this);
      return match && match[1] && typeof match[1] === "string" ? match[1].replace(/\"/g, "") : "";
    };
    String.prototype.getURL = function() {
      return this.split("|")[0] || "";
    };
    String.prototype.getParameter = function(name) {
      const params = this.replace(/^(.*)\|/, "");
      const regex = new RegExp(name + "=(\\w[^&]*)", "gi");
      const match = regex.exec(params);
      return match && match[1] ? match[1] : "";
    };
    module2.exports = Parser;
  }
});

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/bind.js
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/utils.js
var { toString: toString2 } = Object.prototype;
var { getPrototypeOf } = Object;
var { iterator, toStringTag } = Symbol;
var kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString2.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
var kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
var typeOfTest = (type) => (thing) => typeof thing === type;
var { isArray } = Array;
var isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
var isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
var isString = typeOfTest("string");
var isFunction = typeOfTest("function");
var isNumber = typeOfTest("number");
var isObject = (thing) => thing !== null && typeof thing === "object";
var isBoolean = (thing) => thing === true || thing === false;
var isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
var isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
var isDate = kindOfTest("Date");
var isFile = kindOfTest("File");
var isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== "undefined");
};
var isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
var isBlob = kindOfTest("Blob");
var isFileList = kindOfTest("FileList");
var isStream = (val) => isObject(val) && isFunction(val.pipe);
function getGlobal() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  return {};
}
var G = getGlobal();
var FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
var isFormData = (thing) => {
  let kind;
  return thing && (FormDataCtor && thing instanceof FormDataCtor || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
var isURLSearchParams = kindOfTest("URLSearchParams");
var [isReadableStream, isRequest, isResponse, isHeaders] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(kindOfTest);
var trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
var _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
var isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
var extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction(val)) {
        Object.defineProperty(a, key, {
          value: bind(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true
        });
      } else {
        Object.defineProperty(a, key, {
          value: val,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};
var stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
var inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, "constructor", {
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
var toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
var endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
var toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
var isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
var forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
var matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
var isHTMLForm = kindOfTest("HTMLFormElement");
var toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
var isRegExp = kindOfTest("RegExp");
var reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
var freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
var toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
var noop = () => {
};
var toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
var isAsyncFn = kindOfTest("AsyncFunction");
var isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
var _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener(
      "message",
      ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      },
      false
    );
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction(_global.postMessage));
var asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
var isIterable = (thing) => thing != null && isFunction(thing[iterator]);
var utils_default = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/AxiosError.js
var AxiosError = class _AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    const axiosError = new _AxiosError(error.message, code || error.code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code, config, request, response) {
    super(message);
    Object.defineProperty(this, "message", {
      value: message,
      enumerable: true,
      writable: true,
      configurable: true
    });
    this.name = "AxiosError";
    this.isAxiosError = true;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }
  toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils_default.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
};
AxiosError.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError.ECONNABORTED = "ECONNABORTED";
AxiosError.ETIMEDOUT = "ETIMEDOUT";
AxiosError.ERR_NETWORK = "ERR_NETWORK";
AxiosError.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError.ERR_CANCELED = "ERR_CANCELED";
AxiosError.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError.ERR_INVALID_URL = "ERR_INVALID_URL";
var AxiosError_default = AxiosError;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/platform/node/classes/FormData.js
var import_form_data = __toESM(require_form_data(), 1);
var FormData_default = import_form_data.default;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/toFormData.js
function isVisitable(thing) {
  return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
function removeBrackets(key) {
  return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils_default.isArray(arr) && !arr.some(isVisitable);
}
var predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils_default.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new (FormData_default || FormData)();
  options = utils_default.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false
    },
    false,
    function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    }
  );
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
  if (!utils_default.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils_default.isDate(value)) {
      return value.toISOString();
    }
    if (utils_default.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils_default.isBlob(value)) {
      throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
    }
    if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    if (value && !path && typeof value === "object") {
      if (utils_default.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils_default.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils_default.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils_default.forEach(value, function each(el, key) {
      const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils_default.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
var toFormData_default = toFormData;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
function encode(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData_default(params, this, options);
}
var prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString3(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
var AxiosURLSearchParams_default = AxiosURLSearchParams;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/buildURL.js
function encode2(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url2, params, options) {
  if (!params) {
    return url2;
  }
  const _encode = options && options.encode || encode2;
  const _options = utils_default.isFunction(options) ? {
    serialize: options
  } : options;
  const serializeFn = _options && _options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, _options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url2.indexOf("#");
    if (hashmarkIndex !== -1) {
      url2 = url2.slice(0, hashmarkIndex);
    }
    url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url2;
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager = class {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils_default.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
};
var InterceptorManager_default = InterceptorManager;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/defaults/transitional.js
var transitional_default = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/platform/node/index.js
var import_crypto = __toESM(require("crypto"), 1);

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/platform/node/classes/URLSearchParams.js
var import_url = __toESM(require("url"), 1);
var URLSearchParams_default = import_url.default.URLSearchParams;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/platform/node/index.js
var ALPHA = "abcdefghijklmnopqrstuvwxyz";
var DIGIT = "0123456789";
var ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
var generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  const randomValues = new Uint32Array(size);
  import_crypto.default.randomFillSync(randomValues);
  for (let i = 0; i < size; i++) {
    str += alphabet[randomValues[i] % length];
  }
  return str;
};
var node_default = {
  isNode: true,
  classes: {
    URLSearchParams: URLSearchParams_default,
    FormData: FormData_default,
    Blob: typeof Blob !== "undefined" && Blob || null
  },
  ALPHABET,
  generateString,
  protocols: ["http", "https", "file", "data"]
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/platform/common/utils.js
var utils_exports = {};
__export(utils_exports, {
  hasBrowserEnv: () => hasBrowserEnv,
  hasStandardBrowserEnv: () => hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
  navigator: () => _navigator,
  origin: () => origin
});
var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
var _navigator = typeof navigator === "object" && navigator || void 0;
var hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
var hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
var origin = hasBrowserEnv && window.location.href || "http://localhost";

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/platform/index.js
var platform_default = {
  ...utils_exports,
  ...node_default
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
  return toFormData_default(data, new platform_default.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform_default.isNode && utils_default.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/formDataToJSON.js
function parsePropPath(name) {
  return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils_default.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils_default.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils_default.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils_default.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
    const obj = {};
    utils_default.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
var formDataToJSON_default = formDataToJSON;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/defaults/index.js
function stringifySafely(rawValue, parser, encoder) {
  if (utils_default.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils_default.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
  transitional: transitional_default,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }
  ],
  transformResponse: [
    function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data, this.parseReviver);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform_default.classes.FormData,
    Blob: platform_default.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
var defaults_default = defaults;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf = utils_default.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
var parseHeaders_default = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/AxiosHeaders.js
var $internals = Symbol("internals");
var isValidHeaderValue = (value) => !/[\r\n]/.test(value);
function assertValidHeaderValue(value, header) {
  if (value === false || value == null) {
    return;
  }
  if (utils_default.isArray(value)) {
    value.forEach((v) => assertValidHeaderValue(v, header));
    return;
  }
  if (!isValidHeaderValue(String(value))) {
    throw new Error(`Invalid character in header content ["${header}"]`);
  }
}
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function stripTrailingCRLF(str) {
  let end = str.length;
  while (end > 0) {
    const charCode = str.charCodeAt(end - 1);
    if (charCode !== 10 && charCode !== 13) {
      break;
    }
    end -= 1;
  }
  return end === str.length ? str : str.slice(0, end);
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils_default.isArray(value) ? value.map(normalizeValue) : stripTrailingCRLF(String(value));
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
var isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils_default.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils_default.isString(value)) return;
  if (utils_default.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils_default.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils_default.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
var AxiosHeaders = class {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils_default.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        assertValidHeaderValue(_value, _header);
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders_default(header), valueOrRewrite);
    } else if (utils_default.isObject(header) && utils_default.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils_default.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils_default.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils_default.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils_default.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils_default.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils_default.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils_default.forEach(this, (value, header) => {
      const key = utils_default.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils_default.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils_default.freezeMethods(AxiosHeaders);
var AxiosHeaders_default = AxiosHeaders;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/transformData.js
function transformData(fns, response) {
  const config = this || defaults_default;
  const context = response || config;
  const headers = AxiosHeaders_default.from(context.headers);
  let data = context.data;
  utils_default.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/cancel/isCancel.js
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/cancel/CanceledError.js
var CanceledError = class extends AxiosError_default {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
    this.__CANCEL__ = true;
  }
};
var CanceledError_default = CanceledError;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/settle.js
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(
      new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      )
    );
  }
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/isAbsoluteURL.js
function isAbsoluteURL(url2) {
  if (typeof url2 !== "string") {
    return false;
  }
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/combineURLs.js
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/buildFullPath.js
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

// node_modules/.pnpm/proxy-from-env@2.1.0/node_modules/proxy-from-env/index.js
var DEFAULT_PORTS = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};
function parseUrl(urlString) {
  try {
    return new URL(urlString);
  } catch {
    return null;
  }
}
function getProxyForUrl(url2) {
  var parsedUrl = (typeof url2 === "string" ? parseUrl(url2) : url2) || {};
  var proto = parsedUrl.protocol;
  var hostname = parsedUrl.host;
  var port = parsedUrl.port;
  if (typeof hostname !== "string" || !hostname || typeof proto !== "string") {
    return "";
  }
  proto = proto.split(":", 1)[0];
  hostname = hostname.replace(/:\d*$/, "");
  port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
  if (!shouldProxy(hostname, port)) {
    return "";
  }
  var proxy = getEnv(proto + "_proxy") || getEnv("all_proxy");
  if (proxy && proxy.indexOf("://") === -1) {
    proxy = proto + "://" + proxy;
  }
  return proxy;
}
function shouldProxy(hostname, port) {
  var NO_PROXY = getEnv("no_proxy").toLowerCase();
  if (!NO_PROXY) {
    return true;
  }
  if (NO_PROXY === "*") {
    return false;
  }
  return NO_PROXY.split(/[,\s]/).every(function(proxy) {
    if (!proxy) {
      return true;
    }
    var parsedProxy = proxy.match(/^(.+):(\d+)$/);
    var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
    var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
    if (parsedProxyPort && parsedProxyPort !== port) {
      return true;
    }
    if (!/^[.*]/.test(parsedProxyHostname)) {
      return hostname !== parsedProxyHostname;
    }
    if (parsedProxyHostname.charAt(0) === "*") {
      parsedProxyHostname = parsedProxyHostname.slice(1);
    }
    return !hostname.endsWith(parsedProxyHostname);
  });
}
function getEnv(key) {
  return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || "";
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/http.js
var import_http = __toESM(require("http"), 1);
var import_https = __toESM(require("https"), 1);
var import_http2 = __toESM(require("http2"), 1);
var import_util2 = __toESM(require("util"), 1);
var import_follow_redirects = __toESM(require_follow_redirects(), 1);
var import_zlib = __toESM(require("zlib"), 1);

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/env/data.js
var VERSION = "1.15.0";

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url2) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
  return match && match[1] || "";
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/fromDataURI.js
var DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function fromDataURI(uri, asBlob, options) {
  const _Blob = options && options.Blob || platform_default.classes.Blob;
  const protocol = parseProtocol(uri);
  if (asBlob === void 0 && _Blob) {
    asBlob = true;
  }
  if (protocol === "data") {
    uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
    const match = DATA_URL_PATTERN.exec(uri);
    if (!match) {
      throw new AxiosError_default("Invalid URL", AxiosError_default.ERR_INVALID_URL);
    }
    const mime = match[1];
    const isBase64 = match[2];
    const body = match[3];
    const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? "base64" : "utf8");
    if (asBlob) {
      if (!_Blob) {
        throw new AxiosError_default("Blob is not supported", AxiosError_default.ERR_NOT_SUPPORT);
      }
      return new _Blob([buffer], { type: mime });
    }
    return buffer;
  }
  throw new AxiosError_default("Unsupported protocol " + protocol, AxiosError_default.ERR_NOT_SUPPORT);
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/http.js
var import_stream4 = __toESM(require("stream"), 1);

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/AxiosTransformStream.js
var import_stream = __toESM(require("stream"), 1);
var kInternals = Symbol("internals");
var AxiosTransformStream = class extends import_stream.default.Transform {
  constructor(options) {
    options = utils_default.toFlatObject(
      options,
      {
        maxRate: 0,
        chunkSize: 64 * 1024,
        minChunkSize: 100,
        timeWindow: 500,
        ticksRate: 2,
        samplesCount: 15
      },
      null,
      (prop, source) => {
        return !utils_default.isUndefined(source[prop]);
      }
    );
    super({
      readableHighWaterMark: options.chunkSize
    });
    const internals = this[kInternals] = {
      timeWindow: options.timeWindow,
      chunkSize: options.chunkSize,
      maxRate: options.maxRate,
      minChunkSize: options.minChunkSize,
      bytesSeen: 0,
      isCaptured: false,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (event) => {
      if (event === "progress") {
        if (!internals.isCaptured) {
          internals.isCaptured = true;
        }
      }
    });
  }
  _read(size) {
    const internals = this[kInternals];
    if (internals.onReadCallback) {
      internals.onReadCallback();
    }
    return super._read(size);
  }
  _transform(chunk, encoding, callback) {
    const internals = this[kInternals];
    const maxRate = internals.maxRate;
    const readableHighWaterMark = this.readableHighWaterMark;
    const timeWindow = internals.timeWindow;
    const divider = 1e3 / timeWindow;
    const bytesThreshold = maxRate / divider;
    const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;
    const pushChunk = (_chunk, _callback) => {
      const bytes = Buffer.byteLength(_chunk);
      internals.bytesSeen += bytes;
      internals.bytes += bytes;
      internals.isCaptured && this.emit("progress", internals.bytesSeen);
      if (this.push(_chunk)) {
        process.nextTick(_callback);
      } else {
        internals.onReadCallback = () => {
          internals.onReadCallback = null;
          process.nextTick(_callback);
        };
      }
    };
    const transformChunk = (_chunk, _callback) => {
      const chunkSize = Buffer.byteLength(_chunk);
      let chunkRemainder = null;
      let maxChunkSize = readableHighWaterMark;
      let bytesLeft;
      let passed = 0;
      if (maxRate) {
        const now = Date.now();
        if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
          internals.ts = now;
          bytesLeft = bytesThreshold - internals.bytes;
          internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
          passed = 0;
        }
        bytesLeft = bytesThreshold - internals.bytes;
      }
      if (maxRate) {
        if (bytesLeft <= 0) {
          return setTimeout(() => {
            _callback(null, _chunk);
          }, timeWindow - passed);
        }
        if (bytesLeft < maxChunkSize) {
          maxChunkSize = bytesLeft;
        }
      }
      if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
        chunkRemainder = _chunk.subarray(maxChunkSize);
        _chunk = _chunk.subarray(0, maxChunkSize);
      }
      pushChunk(
        _chunk,
        chunkRemainder ? () => {
          process.nextTick(_callback, null, chunkRemainder);
        } : _callback
      );
    };
    transformChunk(chunk, function transformNextChunk(err, _chunk) {
      if (err) {
        return callback(err);
      }
      if (_chunk) {
        transformChunk(_chunk, transformNextChunk);
      } else {
        callback(null);
      }
    });
  }
};
var AxiosTransformStream_default = AxiosTransformStream;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/http.js
var import_events = require("events");

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/formDataToStream.js
var import_util = __toESM(require("util"), 1);
var import_stream2 = require("stream");

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/readBlob.js
var { asyncIterator } = Symbol;
var readBlob = async function* (blob) {
  if (blob.stream) {
    yield* blob.stream();
  } else if (blob.arrayBuffer) {
    yield await blob.arrayBuffer();
  } else if (blob[asyncIterator]) {
    yield* blob[asyncIterator]();
  } else {
    yield blob;
  }
};
var readBlob_default = readBlob;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/formDataToStream.js
var BOUNDARY_ALPHABET = platform_default.ALPHABET.ALPHA_DIGIT + "-_";
var textEncoder = typeof TextEncoder === "function" ? new TextEncoder() : new import_util.default.TextEncoder();
var CRLF = "\r\n";
var CRLF_BYTES = textEncoder.encode(CRLF);
var CRLF_BYTES_COUNT = 2;
var FormDataPart = class {
  constructor(name, value) {
    const { escapeName } = this.constructor;
    const isStringValue = utils_default.isString(value);
    let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ""}${CRLF}`;
    if (isStringValue) {
      value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
    } else {
      headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
    }
    this.headers = textEncoder.encode(headers + CRLF);
    this.contentLength = isStringValue ? value.byteLength : value.size;
    this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
    this.name = name;
    this.value = value;
  }
  async *encode() {
    yield this.headers;
    const { value } = this;
    if (utils_default.isTypedArray(value)) {
      yield value;
    } else {
      yield* readBlob_default(value);
    }
    yield CRLF_BYTES;
  }
  static escapeName(name) {
    return String(name).replace(
      /[\r\n"]/g,
      (match) => ({
        "\r": "%0D",
        "\n": "%0A",
        '"': "%22"
      })[match]
    );
  }
};
var formDataToStream = (form, headersHandler, options) => {
  const {
    tag = "form-data-boundary",
    size = 25,
    boundary = tag + "-" + platform_default.generateString(size, BOUNDARY_ALPHABET)
  } = options || {};
  if (!utils_default.isFormData(form)) {
    throw TypeError("FormData instance required");
  }
  if (boundary.length < 1 || boundary.length > 70) {
    throw Error("boundary must be 10-70 characters long");
  }
  const boundaryBytes = textEncoder.encode("--" + boundary + CRLF);
  const footerBytes = textEncoder.encode("--" + boundary + "--" + CRLF);
  let contentLength = footerBytes.byteLength;
  const parts = Array.from(form.entries()).map(([name, value]) => {
    const part = new FormDataPart(name, value);
    contentLength += part.size;
    return part;
  });
  contentLength += boundaryBytes.byteLength * parts.length;
  contentLength = utils_default.toFiniteNumber(contentLength);
  const computedHeaders = {
    "Content-Type": `multipart/form-data; boundary=${boundary}`
  };
  if (Number.isFinite(contentLength)) {
    computedHeaders["Content-Length"] = contentLength;
  }
  headersHandler && headersHandler(computedHeaders);
  return import_stream2.Readable.from(
    (async function* () {
      for (const part of parts) {
        yield boundaryBytes;
        yield* part.encode();
      }
      yield footerBytes;
    })()
  );
};
var formDataToStream_default = formDataToStream;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/ZlibHeaderTransformStream.js
var import_stream3 = __toESM(require("stream"), 1);
var ZlibHeaderTransformStream = class extends import_stream3.default.Transform {
  __transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
  _transform(chunk, encoding, callback) {
    if (chunk.length !== 0) {
      this._transform = this.__transform;
      if (chunk[0] !== 120) {
        const header = Buffer.alloc(2);
        header[0] = 120;
        header[1] = 156;
        this.push(header, encoding);
      }
    }
    this.__transform(chunk, encoding, callback);
  }
};
var ZlibHeaderTransformStream_default = ZlibHeaderTransformStream;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/callbackify.js
var callbackify = (fn, reducer) => {
  return utils_default.isAsyncFn(fn) ? function(...args) {
    const cb = args.pop();
    fn.apply(this, args).then((value) => {
      try {
        reducer ? cb(null, ...reducer(value)) : cb(null, value);
      } catch (err) {
        cb(err);
      }
    }, cb);
  } : fn;
};
var callbackify_default = callbackify;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/shouldBypassProxy.js
var DEFAULT_PORTS2 = {
  http: 80,
  https: 443,
  ws: 80,
  wss: 443,
  ftp: 21
};
var parseNoProxyEntry = (entry) => {
  let entryHost = entry;
  let entryPort = 0;
  if (entryHost.charAt(0) === "[") {
    const bracketIndex = entryHost.indexOf("]");
    if (bracketIndex !== -1) {
      const host = entryHost.slice(1, bracketIndex);
      const rest = entryHost.slice(bracketIndex + 1);
      if (rest.charAt(0) === ":" && /^\d+$/.test(rest.slice(1))) {
        entryPort = Number.parseInt(rest.slice(1), 10);
      }
      return [host, entryPort];
    }
  }
  const firstColon = entryHost.indexOf(":");
  const lastColon = entryHost.lastIndexOf(":");
  if (firstColon !== -1 && firstColon === lastColon && /^\d+$/.test(entryHost.slice(lastColon + 1))) {
    entryPort = Number.parseInt(entryHost.slice(lastColon + 1), 10);
    entryHost = entryHost.slice(0, lastColon);
  }
  return [entryHost, entryPort];
};
var normalizeNoProxyHost = (hostname) => {
  if (!hostname) {
    return hostname;
  }
  if (hostname.charAt(0) === "[" && hostname.charAt(hostname.length - 1) === "]") {
    hostname = hostname.slice(1, -1);
  }
  return hostname.replace(/\.+$/, "");
};
function shouldBypassProxy(location) {
  let parsed;
  try {
    parsed = new URL(location);
  } catch (_err) {
    return false;
  }
  const noProxy = (process.env.no_proxy || process.env.NO_PROXY || "").toLowerCase();
  if (!noProxy) {
    return false;
  }
  if (noProxy === "*") {
    return true;
  }
  const port = Number.parseInt(parsed.port, 10) || DEFAULT_PORTS2[parsed.protocol.split(":", 1)[0]] || 0;
  const hostname = normalizeNoProxyHost(parsed.hostname.toLowerCase());
  return noProxy.split(/[\s,]+/).some((entry) => {
    if (!entry) {
      return false;
    }
    let [entryHost, entryPort] = parseNoProxyEntry(entry);
    entryHost = normalizeNoProxyHost(entryHost);
    if (!entryHost) {
      return false;
    }
    if (entryPort && entryPort !== port) {
      return false;
    }
    if (entryHost.charAt(0) === "*") {
      entryHost = entryHost.slice(1);
    }
    if (entryHost.charAt(0) === ".") {
      return hostname.endsWith(entryHost);
    }
    return hostname === entryHost;
  });
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/speedometer.js
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
var speedometer_default = speedometer;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/throttle.js
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
var throttle_default = throttle;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer_default(50, 250);
  return throttle_default((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
var progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [
    (loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }),
    throttled[1]
  ];
};
var asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
function estimateDataURLDecodedBytes(url2) {
  if (!url2 || typeof url2 !== "string") return 0;
  if (!url2.startsWith("data:")) return 0;
  const comma = url2.indexOf(",");
  if (comma < 0) return 0;
  const meta = url2.slice(5, comma);
  const body = url2.slice(comma + 1);
  const isBase64 = /;base64/i.test(meta);
  if (isBase64) {
    let effectiveLen = body.length;
    const len = body.length;
    for (let i = 0; i < len; i++) {
      if (body.charCodeAt(i) === 37 && i + 2 < len) {
        const a = body.charCodeAt(i + 1);
        const b = body.charCodeAt(i + 2);
        const isHex = (a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102) && (b >= 48 && b <= 57 || b >= 65 && b <= 70 || b >= 97 && b <= 102);
        if (isHex) {
          effectiveLen -= 2;
          i += 2;
        }
      }
    }
    let pad = 0;
    let idx = len - 1;
    const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && // '%'
    body.charCodeAt(j - 1) === 51 && // '3'
    (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
    if (idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
        idx--;
      } else if (tailIsPct3D(idx)) {
        pad++;
        idx -= 3;
      }
    }
    if (pad === 1 && idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
      } else if (tailIsPct3D(idx)) {
        pad++;
      }
    }
    const groups = Math.floor(effectiveLen / 4);
    const bytes = groups * 3 - (pad || 0);
    return bytes > 0 ? bytes : 0;
  }
  return Buffer.byteLength(body, "utf8");
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/http.js
var zlibOptions = {
  flush: import_zlib.default.constants.Z_SYNC_FLUSH,
  finishFlush: import_zlib.default.constants.Z_SYNC_FLUSH
};
var brotliOptions = {
  flush: import_zlib.default.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: import_zlib.default.constants.BROTLI_OPERATION_FLUSH
};
var isBrotliSupported = utils_default.isFunction(import_zlib.default.createBrotliDecompress);
var { http: httpFollow, https: httpsFollow } = import_follow_redirects.default;
var isHttps = /https:?/;
var supportedProtocols = platform_default.protocols.map((protocol) => {
  return protocol + ":";
});
var flushOnFinish = (stream4, [throttled, flush]) => {
  stream4.on("end", flush).on("error", flush);
  return throttled;
};
var Http2Sessions = class {
  constructor() {
    this.sessions = /* @__PURE__ */ Object.create(null);
  }
  getSession(authority, options) {
    options = Object.assign(
      {
        sessionTimeout: 1e3
      },
      options
    );
    let authoritySessions = this.sessions[authority];
    if (authoritySessions) {
      let len = authoritySessions.length;
      for (let i = 0; i < len; i++) {
        const [sessionHandle, sessionOptions] = authoritySessions[i];
        if (!sessionHandle.destroyed && !sessionHandle.closed && import_util2.default.isDeepStrictEqual(sessionOptions, options)) {
          return sessionHandle;
        }
      }
    }
    const session = import_http2.default.connect(authority, options);
    let removed;
    const removeSession = () => {
      if (removed) {
        return;
      }
      removed = true;
      let entries = authoritySessions, len = entries.length, i = len;
      while (i--) {
        if (entries[i][0] === session) {
          if (len === 1) {
            delete this.sessions[authority];
          } else {
            entries.splice(i, 1);
          }
          if (!session.closed) {
            session.close();
          }
          return;
        }
      }
    };
    const originalRequestFn = session.request;
    const { sessionTimeout } = options;
    if (sessionTimeout != null) {
      let timer;
      let streamsCount = 0;
      session.request = function() {
        const stream4 = originalRequestFn.apply(this, arguments);
        streamsCount++;
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        stream4.once("close", () => {
          if (!--streamsCount) {
            timer = setTimeout(() => {
              timer = null;
              removeSession();
            }, sessionTimeout);
          }
        });
        return stream4;
      };
    }
    session.once("close", removeSession);
    let entry = [session, options];
    authoritySessions ? authoritySessions.push(entry) : authoritySessions = this.sessions[authority] = [entry];
    return session;
  }
};
var http2Sessions = new Http2Sessions();
function dispatchBeforeRedirect(options, responseDetails) {
  if (options.beforeRedirects.proxy) {
    options.beforeRedirects.proxy(options);
  }
  if (options.beforeRedirects.config) {
    options.beforeRedirects.config(options, responseDetails);
  }
}
function setProxy(options, configProxy, location) {
  let proxy = configProxy;
  if (!proxy && proxy !== false) {
    const proxyUrl = getProxyForUrl(location);
    if (proxyUrl) {
      if (!shouldBypassProxy(location)) {
        proxy = new URL(proxyUrl);
      }
    }
  }
  if (proxy) {
    if (proxy.username) {
      proxy.auth = (proxy.username || "") + ":" + (proxy.password || "");
    }
    if (proxy.auth) {
      const validProxyAuth = Boolean(proxy.auth.username || proxy.auth.password);
      if (validProxyAuth) {
        proxy.auth = (proxy.auth.username || "") + ":" + (proxy.auth.password || "");
      } else if (typeof proxy.auth === "object") {
        throw new AxiosError_default("Invalid proxy authorization", AxiosError_default.ERR_BAD_OPTION, { proxy });
      }
      const base64 = Buffer.from(proxy.auth, "utf8").toString("base64");
      options.headers["Proxy-Authorization"] = "Basic " + base64;
    }
    options.headers.host = options.hostname + (options.port ? ":" + options.port : "");
    const proxyHost = proxy.hostname || proxy.host;
    options.hostname = proxyHost;
    options.host = proxyHost;
    options.port = proxy.port;
    options.path = location;
    if (proxy.protocol) {
      options.protocol = proxy.protocol.includes(":") ? proxy.protocol : `${proxy.protocol}:`;
    }
  }
  options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
    setProxy(redirectOptions, configProxy, redirectOptions.href);
  };
}
var isHttpAdapterSupported = typeof process !== "undefined" && utils_default.kindOf(process) === "process";
var wrapAsync = (asyncExecutor) => {
  return new Promise((resolve, reject) => {
    let onDone;
    let isDone;
    const done = (value, isRejected) => {
      if (isDone) return;
      isDone = true;
      onDone && onDone(value, isRejected);
    };
    const _resolve = (value) => {
      done(value);
      resolve(value);
    };
    const _reject = (reason) => {
      done(reason, true);
      reject(reason);
    };
    asyncExecutor(_resolve, _reject, (onDoneHandler) => onDone = onDoneHandler).catch(_reject);
  });
};
var resolveFamily = ({ address, family }) => {
  if (!utils_default.isString(address)) {
    throw TypeError("address must be a string");
  }
  return {
    address,
    family: family || (address.indexOf(".") < 0 ? 6 : 4)
  };
};
var buildAddressEntry = (address, family) => resolveFamily(utils_default.isObject(address) ? address : { address, family });
var http2Transport = {
  request(options, cb) {
    const authority = options.protocol + "//" + options.hostname + ":" + (options.port || (options.protocol === "https:" ? 443 : 80));
    const { http2Options, headers } = options;
    const session = http2Sessions.getSession(authority, http2Options);
    const { HTTP2_HEADER_SCHEME, HTTP2_HEADER_METHOD, HTTP2_HEADER_PATH, HTTP2_HEADER_STATUS } = import_http2.default.constants;
    const http2Headers = {
      [HTTP2_HEADER_SCHEME]: options.protocol.replace(":", ""),
      [HTTP2_HEADER_METHOD]: options.method,
      [HTTP2_HEADER_PATH]: options.path
    };
    utils_default.forEach(headers, (header, name) => {
      name.charAt(0) !== ":" && (http2Headers[name] = header);
    });
    const req = session.request(http2Headers);
    req.once("response", (responseHeaders) => {
      const response = req;
      responseHeaders = Object.assign({}, responseHeaders);
      const status = responseHeaders[HTTP2_HEADER_STATUS];
      delete responseHeaders[HTTP2_HEADER_STATUS];
      response.headers = responseHeaders;
      response.statusCode = +status;
      cb(response);
    });
    return req;
  }
};
var http_default = isHttpAdapterSupported && function httpAdapter(config) {
  return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
    let { data, lookup, family, httpVersion = 1, http2Options } = config;
    const { responseType, responseEncoding } = config;
    const method = config.method.toUpperCase();
    let isDone;
    let rejected = false;
    let req;
    httpVersion = +httpVersion;
    if (Number.isNaN(httpVersion)) {
      throw TypeError(`Invalid protocol version: '${config.httpVersion}' is not a number`);
    }
    if (httpVersion !== 1 && httpVersion !== 2) {
      throw TypeError(`Unsupported protocol version '${httpVersion}'`);
    }
    const isHttp2 = httpVersion === 2;
    if (lookup) {
      const _lookup = callbackify_default(lookup, (value) => utils_default.isArray(value) ? value : [value]);
      lookup = (hostname, opt, cb) => {
        _lookup(hostname, opt, (err, arg0, arg1) => {
          if (err) {
            return cb(err);
          }
          const addresses = utils_default.isArray(arg0) ? arg0.map((addr) => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
          opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
        });
      };
    }
    const abortEmitter = new import_events.EventEmitter();
    function abort(reason) {
      try {
        abortEmitter.emit(
          "abort",
          !reason || reason.type ? new CanceledError_default(null, config, req) : reason
        );
      } catch (err) {
        console.warn("emit error", err);
      }
    }
    abortEmitter.once("abort", reject);
    const onFinished = () => {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(abort);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", abort);
      }
      abortEmitter.removeAllListeners();
    };
    if (config.cancelToken || config.signal) {
      config.cancelToken && config.cancelToken.subscribe(abort);
      if (config.signal) {
        config.signal.aborted ? abort() : config.signal.addEventListener("abort", abort);
      }
    }
    onDone((response, isRejected) => {
      isDone = true;
      if (isRejected) {
        rejected = true;
        onFinished();
        return;
      }
      const { data: data2 } = response;
      if (data2 instanceof import_stream4.default.Readable || data2 instanceof import_stream4.default.Duplex) {
        const offListeners = import_stream4.default.finished(data2, () => {
          offListeners();
          onFinished();
        });
      } else {
        onFinished();
      }
    });
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    const parsed = new URL(fullPath, platform_default.hasBrowserEnv ? platform_default.origin : void 0);
    const protocol = parsed.protocol || supportedProtocols[0];
    if (protocol === "data:") {
      if (config.maxContentLength > -1) {
        const dataUrl = String(config.url || fullPath || "");
        const estimated = estimateDataURLDecodedBytes(dataUrl);
        if (estimated > config.maxContentLength) {
          return reject(
            new AxiosError_default(
              "maxContentLength size of " + config.maxContentLength + " exceeded",
              AxiosError_default.ERR_BAD_RESPONSE,
              config
            )
          );
        }
      }
      let convertedData;
      if (method !== "GET") {
        return settle(resolve, reject, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config
        });
      }
      try {
        convertedData = fromDataURI(config.url, responseType === "blob", {
          Blob: config.env && config.env.Blob
        });
      } catch (err) {
        throw AxiosError_default.from(err, AxiosError_default.ERR_BAD_REQUEST, config);
      }
      if (responseType === "text") {
        convertedData = convertedData.toString(responseEncoding);
        if (!responseEncoding || responseEncoding === "utf8") {
          convertedData = utils_default.stripBOM(convertedData);
        }
      } else if (responseType === "stream") {
        convertedData = import_stream4.default.Readable.from(convertedData);
      }
      return settle(resolve, reject, {
        data: convertedData,
        status: 200,
        statusText: "OK",
        headers: new AxiosHeaders_default(),
        config
      });
    }
    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(
        new AxiosError_default("Unsupported protocol " + protocol, AxiosError_default.ERR_BAD_REQUEST, config)
      );
    }
    const headers = AxiosHeaders_default.from(config.headers).normalize();
    headers.set("User-Agent", "axios/" + VERSION, false);
    const { onUploadProgress, onDownloadProgress } = config;
    const maxRate = config.maxRate;
    let maxUploadRate = void 0;
    let maxDownloadRate = void 0;
    if (utils_default.isSpecCompliantForm(data)) {
      const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
      data = formDataToStream_default(
        data,
        (formHeaders) => {
          headers.set(formHeaders);
        },
        {
          tag: `axios-${VERSION}-boundary`,
          boundary: userBoundary && userBoundary[1] || void 0
        }
      );
    } else if (utils_default.isFormData(data) && utils_default.isFunction(data.getHeaders)) {
      headers.set(data.getHeaders());
      if (!headers.hasContentLength()) {
        try {
          const knownLength = await import_util2.default.promisify(data.getLength).call(data);
          Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
        } catch (e) {
        }
      }
    } else if (utils_default.isBlob(data) || utils_default.isFile(data)) {
      data.size && headers.setContentType(data.type || "application/octet-stream");
      headers.setContentLength(data.size || 0);
      data = import_stream4.default.Readable.from(readBlob_default(data));
    } else if (data && !utils_default.isStream(data)) {
      if (Buffer.isBuffer(data)) {
      } else if (utils_default.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils_default.isString(data)) {
        data = Buffer.from(data, "utf-8");
      } else {
        return reject(
          new AxiosError_default(
            "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
            AxiosError_default.ERR_BAD_REQUEST,
            config
          )
        );
      }
      headers.setContentLength(data.length, false);
      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(
          new AxiosError_default(
            "Request body larger than maxBodyLength limit",
            AxiosError_default.ERR_BAD_REQUEST,
            config
          )
        );
      }
    }
    const contentLength = utils_default.toFiniteNumber(headers.getContentLength());
    if (utils_default.isArray(maxRate)) {
      maxUploadRate = maxRate[0];
      maxDownloadRate = maxRate[1];
    } else {
      maxUploadRate = maxDownloadRate = maxRate;
    }
    if (data && (onUploadProgress || maxUploadRate)) {
      if (!utils_default.isStream(data)) {
        data = import_stream4.default.Readable.from(data, { objectMode: false });
      }
      data = import_stream4.default.pipeline(
        [
          data,
          new AxiosTransformStream_default({
            maxRate: utils_default.toFiniteNumber(maxUploadRate)
          })
        ],
        utils_default.noop
      );
      onUploadProgress && data.on(
        "progress",
        flushOnFinish(
          data,
          progressEventDecorator(
            contentLength,
            progressEventReducer(asyncDecorator(onUploadProgress), false, 3)
          )
        )
      );
    }
    let auth = void 0;
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password || "";
      auth = username + ":" + password;
    }
    if (!auth && parsed.username) {
      const urlUsername = parsed.username;
      const urlPassword = parsed.password;
      auth = urlUsername + ":" + urlPassword;
    }
    auth && headers.delete("authorization");
    let path;
    try {
      path = buildURL(
        parsed.pathname + parsed.search,
        config.params,
        config.paramsSerializer
      ).replace(/^\?/, "");
    } catch (err) {
      const customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      return reject(customErr);
    }
    headers.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (isBrotliSupported ? ", br" : ""),
      false
    );
    const options = {
      path,
      method,
      headers: headers.toJSON(),
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth,
      protocol,
      family,
      beforeRedirect: dispatchBeforeRedirect,
      beforeRedirects: {},
      http2Options
    };
    !utils_default.isUndefined(lookup) && (options.lookup = lookup);
    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
      options.port = parsed.port;
      setProxy(
        options,
        config.proxy,
        protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path
      );
    }
    let transport;
    const isHttpsRequest = isHttps.test(options.protocol);
    options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    if (isHttp2) {
      transport = http2Transport;
    } else {
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsRequest ? import_https.default : import_http.default;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        if (config.beforeRedirect) {
          options.beforeRedirects.config = config.beforeRedirect;
        }
        transport = isHttpsRequest ? httpsFollow : httpFollow;
      }
    }
    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } else {
      options.maxBodyLength = Infinity;
    }
    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }
    req = transport.request(options, function handleResponse(res) {
      if (req.destroyed) return;
      const streams = [res];
      const responseLength = utils_default.toFiniteNumber(res.headers["content-length"]);
      if (onDownloadProgress || maxDownloadRate) {
        const transformStream = new AxiosTransformStream_default({
          maxRate: utils_default.toFiniteNumber(maxDownloadRate)
        });
        onDownloadProgress && transformStream.on(
          "progress",
          flushOnFinish(
            transformStream,
            progressEventDecorator(
              responseLength,
              progressEventReducer(asyncDecorator(onDownloadProgress), true, 3)
            )
          )
        );
        streams.push(transformStream);
      }
      let responseStream = res;
      const lastRequest = res.req || req;
      if (config.decompress !== false && res.headers["content-encoding"]) {
        if (method === "HEAD" || res.statusCode === 204) {
          delete res.headers["content-encoding"];
        }
        switch ((res.headers["content-encoding"] || "").toLowerCase()) {
          /*eslint default-case:0*/
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            streams.push(import_zlib.default.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "deflate":
            streams.push(new ZlibHeaderTransformStream_default());
            streams.push(import_zlib.default.createUnzip(zlibOptions));
            delete res.headers["content-encoding"];
            break;
          case "br":
            if (isBrotliSupported) {
              streams.push(import_zlib.default.createBrotliDecompress(brotliOptions));
              delete res.headers["content-encoding"];
            }
        }
      }
      responseStream = streams.length > 1 ? import_stream4.default.pipeline(streams, utils_default.noop) : streams[0];
      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: new AxiosHeaders_default(res.headers),
        config,
        request: lastRequest
      };
      if (responseType === "stream") {
        response.data = responseStream;
        settle(resolve, reject, response);
      } else {
        const responseBuffer = [];
        let totalResponseBytes = 0;
        responseStream.on("data", function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            rejected = true;
            responseStream.destroy();
            abort(
              new AxiosError_default(
                "maxContentLength size of " + config.maxContentLength + " exceeded",
                AxiosError_default.ERR_BAD_RESPONSE,
                config,
                lastRequest
              )
            );
          }
        });
        responseStream.on("aborted", function handlerStreamAborted() {
          if (rejected) {
            return;
          }
          const err = new AxiosError_default(
            "stream has been aborted",
            AxiosError_default.ERR_BAD_RESPONSE,
            config,
            lastRequest
          );
          responseStream.destroy(err);
          reject(err);
        });
        responseStream.on("error", function handleStreamError(err) {
          if (req.destroyed) return;
          reject(AxiosError_default.from(err, null, config, lastRequest));
        });
        responseStream.on("end", function handleStreamEnd() {
          try {
            let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (responseType !== "arraybuffer") {
              responseData = responseData.toString(responseEncoding);
              if (!responseEncoding || responseEncoding === "utf8") {
                responseData = utils_default.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            return reject(AxiosError_default.from(err, null, config, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }
      abortEmitter.once("abort", (err) => {
        if (!responseStream.destroyed) {
          responseStream.emit("error", err);
          responseStream.destroy();
        }
      });
    });
    abortEmitter.once("abort", (err) => {
      if (req.close) {
        req.close();
      } else {
        req.destroy(err);
      }
    });
    req.on("error", function handleRequestError(err) {
      reject(AxiosError_default.from(err, null, config, req));
    });
    req.on("socket", function handleRequestSocket(socket) {
      socket.setKeepAlive(true, 1e3 * 60);
    });
    if (config.timeout) {
      const timeout = parseInt(config.timeout, 10);
      if (Number.isNaN(timeout)) {
        abort(
          new AxiosError_default(
            "error trying to parse `config.timeout` to int",
            AxiosError_default.ERR_BAD_OPTION_VALUE,
            config,
            req
          )
        );
        return;
      }
      req.setTimeout(timeout, function handleRequestTimeout() {
        if (isDone) return;
        let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = config.transitional || transitional_default;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        abort(
          new AxiosError_default(
            timeoutErrorMessage,
            transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
            config,
            req
          )
        );
      });
    } else {
      req.setTimeout(0);
    }
    if (utils_default.isStream(data)) {
      let ended = false;
      let errored = false;
      data.on("end", () => {
        ended = true;
      });
      data.once("error", (err) => {
        errored = true;
        req.destroy(err);
      });
      data.on("close", () => {
        if (!ended && !errored) {
          abort(new CanceledError_default("Request stream has been aborted", config, req));
        }
      });
      data.pipe(req);
    } else {
      data && req.write(data);
      req.end();
    }
  });
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url2) => {
  url2 = new URL(url2, platform_default.origin);
  return origin2.protocol === url2.protocol && origin2.host === url2.host && (isMSIE || origin2.port === url2.port);
})(
  new URL(platform_default.origin),
  platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)
) : () => true;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/cookies.js
var cookies_default = platform_default.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils_default.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils_default.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils_default.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils_default.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/mergeConfig.js
var headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
      return utils_default.merge.call({ caseless }, target, source);
    } else if (utils_default.isPlainObject(source)) {
      return utils_default.merge({}, source);
    } else if (utils_default.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils_default.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils_default.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils_default.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
    const merge2 = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/resolveConfig.js
var resolveConfig_default = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders_default.from(headers);
  newConfig.url = buildURL(
    buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls),
    config.params,
    config.paramsSerializer
  );
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa(
        (auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : "")
      )
    );
  }
  if (utils_default.isFormData(data)) {
    if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils_default.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform_default.hasStandardBrowserEnv) {
    withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
var xhr_default = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig_default(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders_default.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(
        function _resolve(value) {
          resolve(value);
          done();
        },
        function _reject(err) {
          reject(err);
          done();
        },
        response
      );
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError_default(msg, AxiosError_default.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitional_default;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(
        new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          config,
          request
        )
      );
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils_default.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils_default.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
      reject(
        new AxiosError_default(
          "Unsupported protocol " + protocol + ":",
          AxiosError_default.ERR_BAD_REQUEST,
          config
        )
      );
      return;
    }
    request.send(requestData || null);
  });
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/composeSignals.js
var composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(
          err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err)
        );
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError_default(`timeout of ${timeout}ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils_default.asap(unsubscribe);
    return signal;
  }
};
var composeSignals_default = composeSignals;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/trackStream.js
var streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
var readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
var readStream = async function* (stream4) {
  if (stream4[Symbol.asyncIterator]) {
    yield* stream4;
    return;
  }
  const reader = stream4.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
var trackStream = (stream4, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream4, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/fetch.js
var DEFAULT_CHUNK_SIZE = 64 * 1024;
var { isFunction: isFunction2 } = utils_default;
var globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils_default.global);
var { ReadableStream: ReadableStream2, TextEncoder: TextEncoder2 } = utils_default.global;
var test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
var factory = (env) => {
  env = utils_default.merge.call(
    {
      skipUndefined: true
    },
    globalFetchAPI,
    env
  );
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction2(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction2(Request);
  const isResponseSupported = isFunction2(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction2(ReadableStream2);
  const encodeText = isFetchSupported && (typeof TextEncoder2 === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder2()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const body = new ReadableStream2();
    const hasContentType = new Request(platform_default.origin, {
      body,
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    body.cancel();
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError_default(
          `Response type '${type}' is not supported`,
          AxiosError_default.ERR_NOT_SUPPORT,
          config
        );
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils_default.isBlob(body)) {
      return body.size;
    }
    if (utils_default.isSpecCompliantForm(body)) {
      const _request = new Request(platform_default.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils_default.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils_default.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils_default.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url: url2,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig_default(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals_default(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url2, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils_default.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url2, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url2, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](
        response,
        config
      );
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders_default.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError_default(
            "Network Error",
            AxiosError_default.ERR_NETWORK,
            config,
            request,
            err && err.response
          ),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError_default.from(err, err && err.code, config, request, err && err.response);
    }
  };
};
var seedCache = /* @__PURE__ */ new Map();
var getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [Request, Response, fetch2];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
var adapter = getFetch();

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/adapters/adapters.js
var knownAdapters = {
  http: http_default,
  xhr: xhr_default,
  fetch: {
    get: getFetch
  }
};
utils_default.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
var renderReason = (reason) => `- ${reason}`;
var isResolvedHandle = (adapter2) => utils_default.isFunction(adapter2) || adapter2 === null || adapter2 === false;
function getAdapter(adapters, config) {
  adapters = utils_default.isArray(adapters) ? adapters : [adapters];
  const { length } = adapters;
  let nameOrAdapter;
  let adapter2;
  const rejectedReasons = {};
  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters[i];
    let id;
    adapter2 = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter2 = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter2 === void 0) {
        throw new AxiosError_default(`Unknown adapter '${id}'`);
      }
    }
    if (adapter2 && (utils_default.isFunction(adapter2) || (adapter2 = adapter2.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i] = adapter2;
  }
  if (!adapter2) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError_default(
      `There is no suitable adapter to dispatch the request ` + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter2;
}
var adapters_default = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/dispatchRequest.js
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError_default(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders_default.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter2 = adapters_default.getAdapter(config.adapter || defaults_default.adapter, config);
  return adapter2(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    },
    function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }
  );
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/validator.js
var validators = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
var deprecatedWarnings = {};
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError_default(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError_default.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator ? validator(value, opt, opts) : true;
  };
};
validators.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === void 0 || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError_default(
          "option " + opt + " must be " + result,
          AxiosError_default.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
    }
  }
}
var validator_default = {
  assertOptions,
  validators
};

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/core/Axios.js
var validators2 = validator_default.validators;
var Axios = class {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager_default(),
      response: new InterceptorManager_default()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = (() => {
          if (!dummy.stack) {
            return "";
          }
          const firstNewlineIndex = dummy.stack.indexOf("\n");
          return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
        })();
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack) {
            const firstNewlineIndex = stack.indexOf("\n");
            const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
            const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
            if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
              err.stack += "\n" + stack;
            }
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator_default.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean),
          legacyInterceptorReqResOrdering: validators2.transitional(validators2.boolean)
        },
        false
      );
    }
    if (paramsSerializer != null) {
      if (utils_default.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator_default.assertOptions(
          paramsSerializer,
          {
            encode: validators2.function,
            serialize: validators2.function
          },
          true
        );
      }
    }
    if (config.allowAbsoluteUrls !== void 0) {
    } else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator_default.assertOptions(
      config,
      {
        baseUrl: validators2.spelling("baseURL"),
        withXsrfToken: validators2.spelling("withXSRFToken")
      },
      true
    );
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
    headers && utils_default.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      const transitional3 = config.transitional || transitional_default;
      const legacyInterceptorReqResOrdering = transitional3 && transitional3.legacyInterceptorReqResOrdering;
      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url2, config) {
    return this.request(
      mergeConfig(config || {}, {
        method,
        url: url2,
        data: (config || {}).data
      })
    );
  };
});
utils_default.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url2, data, config) {
      return this.request(
        mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url: url2,
          data
        })
      );
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
var Axios_default = Axios;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/cancel/CancelToken.js
var CancelToken = class _CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError_default(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new _CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
var CancelToken_default = CancelToken;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/spread.js
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/isAxiosError.js
function isAxiosError(payload) {
  return utils_default.isObject(payload) && payload.isAxiosError === true;
}

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
var HttpStatusCode_default = HttpStatusCode;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/lib/axios.js
function createInstance(defaultConfig) {
  const context = new Axios_default(defaultConfig);
  const instance = bind(Axios_default.prototype.request, context);
  utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
  utils_default.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
var axios = createInstance(defaults_default);
axios.Axios = Axios_default;
axios.CanceledError = CanceledError_default;
axios.CancelToken = CancelToken_default;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData_default;
axios.AxiosError = AxiosError_default;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders_default;
axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters_default.getAdapter;
axios.HttpStatusCode = HttpStatusCode_default;
axios.default = axios;
var axios_default = axios;

// node_modules/.pnpm/axios@1.15.0/node_modules/axios/index.js
var {
  Axios: Axios2,
  AxiosError: AxiosError2,
  CanceledError: CanceledError2,
  isCancel: isCancel2,
  CancelToken: CancelToken2,
  VERSION: VERSION2,
  all: all2,
  Cancel,
  isAxiosError: isAxiosError2,
  spread: spread2,
  toFormData: toFormData2,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode: HttpStatusCode2,
  formToJSON,
  getAdapter: getAdapter2,
  mergeConfig: mergeConfig2
} = axios_default;

// apps/electron-backend/src/app/workers/playlist-refresh.worker.ts
var import_worker_threads = require("worker_threads");
var import_iptv_playlist_parser = __toESM(require_src2());
var import_promises = require("node:fs/promises");

// node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-node/rng.js
var import_crypto2 = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto2.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-node/native.js
var import_crypto3 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto3.default.randomUUID
};

// node_modules/.pnpm/uuid@9.0.0/node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// libs/shared/m3u-utils/src/lib/playlist.utils.ts
var getFilenameFromUrl = (value) => {
  if (value && value.length > 1) {
    return value.substring(value.lastIndexOf("/") + 1);
  }
  return "Untitled playlist";
};
var createPlaylistObject = (name, playlist, urlOrPath, uploadType) => {
  return {
    _id: v4_default(),
    filename: name,
    title: name,
    count: playlist.items.length,
    playlist: {
      ...playlist,
      items: playlist.items.map((item) => ({
        ...item,
        id: v4_default()
      }))
    },
    importDate: (/* @__PURE__ */ new Date()).toISOString(),
    lastUsage: (/* @__PURE__ */ new Date()).toISOString(),
    favorites: [],
    autoRefresh: false,
    ...uploadType === "URL" ? { url: urlOrPath } : {},
    ...uploadType === "FILE" ? { filePath: urlOrPath } : {}
  };
};

// apps/electron-backend/src/app/workers/playlist-refresh.worker.ts
var https2 = require("https");
var activeRefreshes = /* @__PURE__ */ new Map();
if (!import_worker_threads.parentPort) {
  throw new Error("Playlist refresh worker must be started with a parent port");
}
function postMessage(message) {
  import_worker_threads.parentPort?.postMessage(message);
}
function serializeError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }
  return {
    message: String(error)
  };
}
function createAbortError(operationId) {
  const error = new Error(`Playlist refresh "${operationId}" was cancelled`);
  error.name = "AbortError";
  return error;
}
function emitEvent(payload, partial) {
  postMessage({
    type: "event",
    event: {
      operationId: payload.operationId,
      playlistId: payload.playlistId,
      ...partial
    }
  });
}
function checkpoint(payload) {
  const active = activeRefreshes.get(payload.operationId);
  if (active?.cancelled) {
    throw createAbortError(payload.operationId);
  }
}
async function fetchPlaylistFromUrl(payload, controller) {
  emitEvent(payload, { status: "started", phase: "fetching" });
  checkpoint(payload);
  const agent = new https2.Agent({
    rejectUnauthorized: false
  });
  const result = await axios_default.get(payload.url, {
    httpsAgent: agent,
    signal: controller.signal,
    timeout: 3e4
  });
  checkpoint(payload);
  emitEvent(payload, { status: "progress", phase: "parsing" });
  const parsedPlaylist = (0, import_iptv_playlist_parser.parse)(result.data);
  checkpoint(payload);
  const extractedName = payload.url && payload.url.length > 1 ? getFilenameFromUrl(payload.url) : "";
  const playlistName = !extractedName || extractedName === "Untitled playlist" ? "Imported from URL" : extractedName;
  return createPlaylistObject(
    payload.title || playlistName,
    parsedPlaylist,
    payload.url,
    "URL"
  );
}
async function fetchPlaylistFromFile(payload) {
  emitEvent(payload, { status: "started", phase: "reading-file" });
  checkpoint(payload);
  const fileContent = await (0, import_promises.readFile)(payload.filePath, "utf-8");
  checkpoint(payload);
  emitEvent(payload, { status: "progress", phase: "parsing" });
  const parsedPlaylist = (0, import_iptv_playlist_parser.parse)(fileContent);
  checkpoint(payload);
  return createPlaylistObject(
    payload.title,
    parsedPlaylist,
    payload.filePath,
    "FILE"
  );
}
async function executeRefresh(payload) {
  const controller = new AbortController();
  activeRefreshes.set(payload.operationId, {
    cancelled: false,
    controller
  });
  try {
    const playlist = payload.url ? await fetchPlaylistFromUrl(payload, controller) : await fetchPlaylistFromFile(payload);
    checkpoint(payload);
    return playlist;
  } finally {
    activeRefreshes.delete(payload.operationId);
  }
}
import_worker_threads.parentPort.on("message", async (message) => {
  if (message.type === "cancel") {
    const active = activeRefreshes.get(message.operationId);
    if (active) {
      active.cancelled = true;
      active.controller.abort();
    }
    return;
  }
  try {
    const result = await executeRefresh(message.payload);
    postMessage({
      type: "response",
      success: true,
      result
    });
  } catch (error) {
    const payload = message.payload;
    if (error instanceof Error && error.name === "AbortError") {
      emitEvent(payload, { status: "cancelled", phase: "parsing" });
    } else {
      emitEvent(payload, {
        status: "error",
        phase: payload.url ? "fetching" : "reading-file",
        error: error instanceof Error ? error.message : String(error)
      });
    }
    postMessage({
      type: "response",
      success: false,
      error: serializeError(error)
    });
  }
});
postMessage({ type: "ready" });
/*! Bundled license information:

mime-db/index.js:
  (*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   *)

mime-types/index.js:
  (*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-invalid-path/index.js:
  (*!
   * is-invalid-path <https://github.com/jonschlinkert/is-invalid-path>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-valid-path/index.js:
  (*!
   * is-valid-path <https://github.com/jonschlinkert/is-valid-path>
   *
   * Copyright (c) 2015 Jon Schlinkert, contributors.
   * Licensed under the MIT license.
   *)
*/
//# sourceMappingURL=playlist-refresh.worker.js.map
