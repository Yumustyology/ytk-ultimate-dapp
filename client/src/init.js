import * as process from "process";
import {Buffer} from "buffer";
window["process"] = process;

window.global ||= window

// (window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || Buffer;
// window.Buffer = window.Buffer || require('buffer').Buffer;