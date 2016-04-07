/*jshint node:true, laxcomma:true */
/*global describe:true, it:true */
"use strict";

var assert = require('assert');
var tokenizer = require('../lib/tokenizer');

describe('HTML markup', function () {

    describe('HTML markup is ignored', function () {
        var entry = "<p>Hello this is my first sentence.</p> <br><br>There is also a second down the page.";
        var sentences = tokenizer.sentences(entry, { "sanitize": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
    });

    describe('Non-markup is not interfered with', function () {
        var entry = "We find that a < b works. But in turn, c > x.";
        var sentences = tokenizer.sentences(entry, { "sanitize": false });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });
        it("should not be escaped", function () {
            assert(!/&lt;/.test(sentences[0]));
            assert(!/&gt;/.test(sentences[1]));
        });
    });


    describe('Closing html boundaries (br, p, div) split sentences.', function () {
        var entry = "What the Experts Say <br />In certain circumstances, “working for a manager who’s task-oriented and has a high need for achievement can be motivating,” says Linda Hill";
        var sentences = tokenizer.sentences(entry, { sanitize: false, "html_boundaries": true });

        it("should get 2 sentences", function () {
            assert.equal(sentences.length, 2);
        });

    });
});
