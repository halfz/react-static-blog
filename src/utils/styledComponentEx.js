/* eslint-disable no-nested-ternary */
import isCallable from 'is-callable';
/* stylelint-disable */
import map from 'lodash/map';

export const propsIf = (property, generator, notGenerator) => (props) => (props[property] ? (isCallable(generator) ? generator(props[property], props) : generator) : (isCallable(notGenerator) ? notGenerator(props) : notGenerator));
export const propWith = (property, generator) => (props) => isCallable(generator) ? generator(props[property]) : generator;
export const propsIfNot = (property, generator, notGenerator) => (props) => (!props[property] ? (isCallable(generator) ? generator(props[property], props) : generator) : (isCallable(notGenerator) ? notGenerator(props) : notGenerator));

export const propsWith = (properties, generator) => (props) => generator(map(properties, (each) => props[each]));
export const propValue = (property) => (props) => props[property];

export const relativeCalc = (originalValue, div, mul = '100%') => `calc((${originalValue} / ${div}) * ${mul})`;
