import {expect} from 'chai';

import $or from './index.js';

describe('Projections > Atoms > $or', () => {
    describe('Common', () => {
        it('$or :: ...Function -> Object -> *', () => {
            expect($or).to.be.a('function');
            expect($or(() => {})).to.be.a('function');
            expect($or(() => {}, () => {})).to.be.a('function');
            expect($or(() => {}, () => {}, () => {})).to.be.a('function');
            expect($or(() => {})({})).not.to.be.a('function');
            expect($or(() => {}, () => {})({})).not.to.be.a('function');
            expect($or(() => {}, () => {}, () => {})({})).not.to.be.a('function');
        });

        it('$or :: (...Function, Object) -> *', () => {
            expect($or(() => {}, {})).not.to.be.a('function');
            expect($or(() => {}, () => {}, {})).not.to.be.a('function');
            expect($or(() => {}, () => {}, () => {}, {})).not.to.be.a('function');
            expect($or(() => {}, () => {}, () => {}, () => {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should call all passed functions with the passed subject until the first function returns a truthy value', () => {
            const subject = 'mySubject';
            const falsy1 = () => false;
            const falsy2 = () => undefined;
            const falsy3 = () => null;
            const falsy4 = () => '';
            const falsy5 = () => 0;
            const falsy6 = () => {};
            const truthy1 = () => '0';
            const truthy2 = () => [];
            const truthy3 = () => 1;
            const truthy4 = () => true;

            expect($or(truthy1, truthy2, truthy3, subject)).to.equal(true);
            expect($or(falsy1, falsy2, falsy3, falsy4, falsy5, falsy6, truthy4, subject)).to.equal(true);
            expect($or(falsy1, falsy2, truthy1, falsy4, falsy5, falsy6, subject)).to.equal(true);
            expect($or(falsy1, falsy2, truthy2, falsy4, falsy5, falsy6, subject)).to.equal(true);
            expect($or(falsy1, falsy2, truthy3, falsy4, falsy5, falsy6, subject)).to.equal(true);
            expect($or(falsy1, falsy2, truthy4, falsy4, falsy5, falsy6, subject)).to.equal(true);
        });

        it('should return false, if all of the functions return false', () => {
            const subject = 'mySubject';
            const falsy1 = () => false;
            const falsy2 = () => undefined;
            const falsy3 = () => null;
            const falsy4 = () => '';
            const falsy5 = () => 0;
            const falsy6 = () => {};

            expect($or(falsy1, falsy2, falsy3, falsy4, falsy5, falsy6, subject)).to.equal(false);
        });
    });
});
