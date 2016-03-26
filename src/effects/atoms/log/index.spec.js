import {expect} from 'chai';
import 'mocha-sinon';

import $log from './index.js';

describe('Effects > Atoms > $log', () => {
    beforeEach(function stubConsoleLog() {
        this.sinon.stub(console, 'log');
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$log :: String -> Object -> Object', () => {
            expect($log('')).to.be.a('function');
            expect($log('')({})).not.to.be.a('function');
            console.log.restore();
        });

        it('$log :: (String, Object) -> Object', () => {
            expect($log('', {})).not.to.be.a('function');
            console.log.restore();
        });

        it('$log :: Object -> Object', () => {
            expect($log({})).not.to.be.a('function');
            console.log.restore();
        });
    });

    describe('Vanilla JS', () => {
        it('should always return the unaltered incoming subject', () => {
            const subject = {
                test: 'value'
            };

            expect($log(subject)).to.equal(subject);
            expect($log('test', subject)).to.equal(subject);
            expect($log('non-existent', subject)).to.equal(subject);
            console.log.restore();
        });

        it('should log the subject if no path was given', () => {
            const subject = {
                test: 'value'
            };

            expect($log(subject)).to.equal(subject);
            expect(console.log.calledTwice).to.equal(true);
            expect(console.log.calledWith('[Plow JS Log]', 'no path given')).to.equal(true);
            expect(console.log.calledWith('[Plow JS Log]', subject)).to.equal(true);
            console.log.restore();
        });

        it('should log the value addressed by the path and the path itself if it was given', () => {
            const subject = {
                test: 'value'
            };

            expect($log('test', subject)).to.equal(subject);
            expect(console.log.calledTwice).to.equal(true);
            expect(console.log.calledWith('[Plow JS Log]', 'test')).to.equal(true);
            expect(console.log.calledWith('[Plow JS Log]', 'value')).to.equal(true);
            console.log.restore();
        });
    });
});
