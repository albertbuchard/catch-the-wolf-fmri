(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("experiment-js"), require("experiment-babylon-js"), require("lodash"), require("experiment-boxes"), require("experiment-mathjs"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("cwfmri", ["experiment-js", "experiment-babylon-js", "lodash", "experiment-boxes", "experiment-mathjs", "jQuery"], factory);
	else if(typeof exports === 'object')
		exports["cwfmri"] = factory(require("experiment-js"), require("experiment-babylon-js"), require("lodash"), require("experiment-boxes"), require("experiment-mathjs"), require("jQuery"));
	else
		root["cwfmri"] = factory(root["experiment"], root["BABYLON"], root["_"], root["experimentBoxes"], root["math"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAspectRatio = exports.getBaseGraphMatrices = exports.computeValidStateSpace = exports.getTransitionMatrixFromBase = exports.getRandomTransitionMatrix = exports.getZeroOrderTransitionMatrix = exports.positionToVector = exports.vectorToPosition = exports.sampleTransitions = exports.sampleNextTransition = exports.getValidTransitionArray = exports.getDominantCellByRow = exports.getDominantProbabilityByRow = exports.matrixKlDivergence = exports.getObservedArrays = exports.getObservedAndDistanceMatrix = exports.smoothSequenceDistribution = exports.promiseSequenceFromTransitionMatrix = exports.promiseMultipleSequences = exports.promiseMultipleRandomSequences = exports.promiseSegmentsAndProbesByBlock = exports.getFullSequenceObjectForRandomBlackoutBlock = exports.promiseFullSequenceForIntermitentPrediction = exports.promiseFullSequenceForOneLevel = exports.getFullSequenceObjectForClassicLevels = exports.insertSequenceObjectAtBlock = exports.promiseBestSequencesForAllBlocksAndSave = exports.getDensity = exports.randomColor = exports.computeDurationEstimate = exports.learnerPredict = exports.updateWithRule = exports.prediction = exports.softMaxByRow = exports.sampleExponential = undefined;

var _experimentMathjs = __webpack_require__(15);

var _experimentMathjs2 = _interopRequireDefault(_experimentMathjs);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentJs = __webpack_require__(0);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /** @module taskUtilities */


/* ======= Texture Functions ======= */
var getAspectRatio = function getAspectRatio() {
  var surfaceObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  if (surfaceObject.constructor === _experimentBabylonJs2.default.Texture) {
    var _surfaceObject$getBas = surfaceObject.getBaseSize(),
        w = _surfaceObject$getBas.width,
        h = _surfaceObject$getBas.height;

    return w / h;
  }

  throw new Error('getAspectRatio: object type not valid.');
};

/* =============== Task specific functions =============== */
/**
 * Returns an array of the four possible main transition matrices
 * @return {Array} Each of the four entry is a 16*16 matrix with either 0 or 1
 */
var getBaseGraphMatrices = function getBaseGraphMatrices() {
  /* --- Graph setup --- */
  var graphMatrix1 = (0, _experimentJs.matrix)(4, 4, 0);
  var graphMatrix2 = (0, _experimentJs.matrix)(4, 4, 0);
  graphMatrix1[0][1] = graphMatrix1[1][2] = graphMatrix1[2][3] = graphMatrix1[3][0] = 1; //eslint-disable-line
  graphMatrix2[0][2] = graphMatrix2[1][3] = graphMatrix2[2][1] = graphMatrix2[3][0] = 1; //eslint-disable-line

  var baseMatrices = {
    A: graphMatrix1,
    B: _experimentMathjs2.default.transpose(graphMatrix1),
    C: graphMatrix2,
    D: _experimentMathjs2.default.transpose(graphMatrix2)
  };

  return baseMatrices;
};

/**
 * Computes one valid stateSpace store them in the taskObject.parameters.validStateSpaces
 * @param  {TaskObject} taskObject Object of class TaskObject
 * @param  {object} options      object with optional arguments: maxNumberOfCycles default to 2
 */
var computeValidStateSpace = function computeValidStateSpace() {
  var taskObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)('taskObject');
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    if (taskObject.constructor !== _experimentJs.TaskObject) {
      reject('computeValidGraphs promise: taskObject is not of class TaskObject.');
    }

    var optionsBase = {
      maxNumberOfCycles: 2,
      stateSpace: null
    };

    options = _lodash2.default.extend(optionsBase, options);

    // const maxNumberOfCycles = options.maxNumberOfCycles
    var stateSpace = options.stateSpace;

    // get a reference to the scene and the taskObject

    var rules = taskObject.parameters.rules;
    var rulesProportions = taskObject.parameters.rulesProportions;

    /* --- buid rule proportion array with threshold *** TODO generalize and use in the task --- */
    var proportionThreshold = 0;
    var rulesData = [];
    for (var i = 0; i < rules.length; i++) {
      // associate target with rule and rulesProportion (one entry for each rule)
      rulesData.push({
        rule: rules[i],
        proportion: rulesProportions[i],
        threshold: proportionThreshold
      });

      // add proportion to shift threshold (used by drawTargetDistribution)
      proportionThreshold += rulesProportions[i];
    }

    var numberOfRows = taskObject.parameters.numberOfRows;
    var numberOfTargets = Math.pow(taskObject.parameters.numberOfRows, 2);

    /* --- Create array of rules without random and oneBackThenRight --- */
    // const rulesWithoutRandom = _.without(taskObject.parameters.rules, 'random')
    var linearRules = _lodash2.default.without(taskObject.parameters.rules, 'random', 'oneBackThenRight');

    if (stateSpace === null) {
      /**
       * The stateSpace array hold position information as well as the rule associated to each observable state (position on the screen).
       * Arugments:
       * {closestTargets: Object {down:1,left:2,right:2,up:1},
       * nextPosition:2, next observed position
       * position:3, observed position
       * rule:"right"}
       *
       * @type {Array}
       */
      stateSpace = [];

      var _loop = function _loop(_i) {
        /* --- setup the current target  --- */
        var currentTarget = {};
        currentTarget.position = _i;

        /* --- Calculate the neihgbours indices mapped to a spherical space
        (going up on the top row bring you to the last row on the same column)--- */
        var beginLineIndex = Math.floor(_i / numberOfRows) * numberOfRows;

        var downIndex = (_i + numberOfRows * (numberOfRows - 1)) % (numberOfRows * numberOfRows);
        var upIndex = (_i + numberOfRows) % (numberOfRows * numberOfRows);

        var rightIndex = (_i - (beginLineIndex + 1)) % numberOfRows + beginLineIndex;
        var leftIndex = (_i - beginLineIndex + (numberOfRows - 1)) % numberOfRows + beginLineIndex;

        currentTarget.closestTargets = {
          up: upIndex,
          left: leftIndex,
          down: downIndex,
          right: rightIndex

          // draw a random number and select a target-rule based on the result
        };var randomNumber = Math.random();

        // find the one target-rule depending on the proportionThreshold
        var currentRuleData = _lodash2.default.clone(_lodash2.default.find(rulesData, function (e) {
          var d = randomNumber - e.threshold;
          return d <= e.proportion && d > 0;
        }));

        // if target-rule is "random" pick a non-random time independant rule: up down right left
        if (currentRuleData.rule === 'random') {
          currentRuleData.rule = _lodash2.default.sample(linearRules);
        }

        currentTarget.rule = currentRuleData.rule;

        switch (currentTarget.rule) {
          case 'up':
            currentTarget.nextPosition = upIndex;
            break;
          case 'down':
            currentTarget.nextPosition = downIndex;
            break;
          case 'left':
            currentTarget.nextPosition = leftIndex;
            break;
          case 'right':
            currentTarget.nextPosition = rightIndex;
            break;
          case 'oneBackThenRight':
            currentTarget.nextPosition = 'last';
            break;
          default:
            throw new Error('getHiddenStateMatrixFromDistribution: state at ' + currentTarget.position + ' of the distribution aray has an invalid rule ' + currentTarget.rule);
        }

        // populate the array
        stateSpace.push(currentTarget);
      };

      for (var _i = 0; _i < numberOfTargets; _i++) {
        _loop(_i);
      }
    }

    var sampleNewRule = function sampleNewRule() {
      var lStateSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
      var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();

      if (typeof lStateSpace[position] === 'undefined') {
        throw new Error('sampleNewRule: lStateSpace[' + position + '] is undefined.');
      }

      // get the reference to the particular state to change
      var state = lStateSpace[position];

      // draw a random number and select a target-rule based on the result
      var randomNumber = Math.random();

      // find the one target-rule depending on the proportionThreshold
      var currentRuleData = _lodash2.default.clone(_lodash2.default.find(rulesData, function (e) {
        var d = randomNumber - e.threshold;
        return d <= e.proportion && d > 0;
      }));

      // if target-rule is "random" pick a non-random time independant rule: up down right left
      if (currentRuleData.rule === 'random') {
        currentRuleData.rule = _lodash2.default.sample(linearRules);
      }

      state.rule = currentRuleData.rule;

      switch (state.rule) {
        case 'up':
          state.nextPosition = state.closestTargets.up;
          break;
        case 'down':
          state.nextPosition = state.closestTargets.down;
          break;
        case 'left':
          state.nextPosition = state.closestTargets.left;
          break;
        case 'right':
          state.nextPosition = state.closestTargets.right;
          break;
        case 'oneBackThenRight':
          state.nextPosition = 'last';
          break;
        default:
          throw new Error('getHiddenStateMatrixFromDistribution: state at ' + position + ' of the distribution aray has an invalid rule ' + state.rule);
      }

      return lStateSpace;
    };

    /**
     * From a sized n state space, the function returns a sized p memoryless state space (array of state objects) where time dependant
     * state rules have been translsated to a number of hidden states.
     * The oneBackThenRight rule is non linear and the system cannot be represented by a transition matrix (with size the initial number of state squared)
     * We need to create a space of hidden states in order to linearize the system so it could be represented as a transition matrix.
     * Linearize the space is only useful for time dependant rules. This function creates the hidden state matrix by creating as many states as necessary
     * e.g for the 'oneBackThenRight' rule, if the state is of degree 3, meaning that 3 states are transitioning to it
     * to linearize the space you would that unique state to be represented by 7 states :
     * * 3 states, one for each incoming states, and 3 states for the excape to the right 90 degrees, and one state in case you start at this position
     * And and each incoming state as 2 states :
     * * one going to the first state, the other to the excape state
     *
     * To the initial state object the function adds arguments : nextHiddenState and hiddenStateIndex. It changes the nextPosition value for oneBackThenRight states to a random
     * target from the closestTargets property of the state object.
     *
     * @param  {array} lStateSpace Array of state objects
     * @param  {numeric} loopIndex  the number of time the function was recursively called (stops recursion at 50 and returns false)
     * @return {array|false}            Array with new hidden states allowing to describe the task as a linear system (Hidden markov model).
     *                                  Returns false if more than 50 recursive call were made.
     */
    var recursivelyExpandStateSpace = function recursivelyExpandStateSpace() {
      var lStateSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
      var loopIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();

      var timeIndependantRules = ['up', 'right', 'down', 'left'];
      if (loopIndex > 50) {
        return false;
      }

      var newSpace = [];
      var recurse = false;

      var _loop2 = function _loop2(k) {
        var state = _lodash2.default.clone(lStateSpace[k]);
        if (typeof state.nextHiddenState === 'undefined') {
          state.nextHiddenState = state.nextPosition;
        }
        if (typeof state.hiddenStateIndex === 'undefined') {
          state.hiddenStateIndex = state.position;
        }
        if (state.nextHiddenState === 'last') {
          // if you start on the oneBackThenRight state it select a random nextHiddenState
          // TODO: discuss how it should be handled
          state.nextHiddenState = _lodash2.default.sample(state.closestTargets);
          state.nextPosition = state.nextHiddenState;
        }

        if (lStateSpace[state.nextHiddenState].rule === 'oneBackThenRight') {
          var firstTargetHiddenState = _lodash2.default.clone(lStateSpace[state.nextHiddenState]);
          firstTargetHiddenState.hiddenStateIndex = lStateSpace.length;
          firstTargetHiddenState.rule = _lodash2.default.findKey(firstTargetHiddenState.closestTargets, function (p) {
            return p === state.position;
          });

          var secondTargetHiddenState = _lodash2.default.clone(state);
          secondTargetHiddenState.hiddenStateIndex = lStateSpace.length + 1;

          var thirdTargetHiddenState = _lodash2.default.clone(lStateSpace[state.nextHiddenState]);
          thirdTargetHiddenState.hiddenStateIndex = lStateSpace.length + 2;
          // next rule direction is 90 degrees from the last rule
          thirdTargetHiddenState.rule = timeIndependantRules[(timeIndependantRules.indexOf(firstTargetHiddenState.rule) + 1) % 4];
          thirdTargetHiddenState.nextPosition = thirdTargetHiddenState.closestTargets[thirdTargetHiddenState.rule];

          // set the nextHiddenState for each new states
          state.nextHiddenState = firstTargetHiddenState.hiddenStateIndex;
          firstTargetHiddenState.nextHiddenState = secondTargetHiddenState.hiddenStateIndex;
          secondTargetHiddenState.nextHiddenState = thirdTargetHiddenState.hiddenStateIndex;
          thirdTargetHiddenState.nextHiddenState = thirdTargetHiddenState.nextPosition;

          newSpace.push(state);
          newSpace = _lodash2.default.concat(newSpace, _lodash2.default.slice(lStateSpace, k + 1));

          newSpace.push(firstTargetHiddenState);
          newSpace.push(secondTargetHiddenState);
          newSpace.push(thirdTargetHiddenState);

          recurse = true;

          return 'break';
        } else {
          newSpace.push(state);
        }
      };

      for (var k = 0; k < lStateSpace.length; k++) {
        var _ret2 = _loop2(k);

        if (_ret2 === 'break') break;
      }
      (0, _experimentJs.debuglog)('recursivelyExpandStateSpace: loopIndex ' + loopIndex + ' recurse ' + recurse);
      (0, _experimentJs.debuglog)(newSpace);
      if (recurse) {
        // (_.keys(_.filter(newSpace, function(state) { return(newSpace[state.nextHiddenState].rule == "oneBackThenRight"); })).length) {
        return recursivelyExpandStateSpace(newSpace, loopIndex + 1);
      }
      (0, _experimentJs.debuglog)('were here god damnit');
      return newSpace;
    };
    /**
     * Returns a p*p math.matrix object from a stateSpace array of size p. A stateSpace array contains object with protperties :
     * e.g. stateSpace = {closestTargets: Object {down:1,left:2,right:2,up:1},
     * hiddenStateIndex: 9, true state
     * nextHiddenState: 2, next true state
     * nextPosition:2, next observed position
     * position:3, observed position
     * rule:"right"}
     * @param  {array} lStateSpace array of p state objects.
     * @return {math.matrix}            matrix of p*p size
     */
    var transitionMatrixFromStateSpace = function transitionMatrixFromStateSpace() {
      var lStateSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

      if (lStateSpace.constructor !== Array) {
        (0, _experimentJs.debuglog)(lStateSpace);
        throw new Error('transitionMatrixFromStateSpace: stateSpace is not an array.');
      }

      var transitionMatrix = _experimentMathjs2.default.zeros(lStateSpace.length, lStateSpace.length);

      for (var _i2 = 0; _i2 < lStateSpace.length; _i2++) {
        if (typeof lStateSpace[_i2].nextHiddenState === 'undefined') {
          throw new Error('transitionMatrixFromStateSpace: state ' + _i2 + ' has an undefined nextHiddenState');
        }

        transitionMatrix.subset(_experimentMathjs2.default.index(_i2, lStateSpace[_i2].nextHiddenState), 1);
      }

      return transitionMatrix;
    };

    /**
     * Returns the number of cycle present in the graph by using the transition matrix.
     * @param  {math.matrix} transitionMatrix transitionMatrix from which you want to extract cycles
     * @return {numeric} the number of cycles in the graph
     */
    var getCyclesFromTransitionMatrix = function getCyclesFromTransitionMatrix() {
      var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
      var maxTransitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 64;

      /* if X is the position vector and A the transitionMatrix
       * x*(A)^n = x means that X is an eigen vector of the transitionMatrix raised to the nth power
       * and it also means you return to the same position after n movements starting from x
       */
      if (typeof transitionMatrix._size === 'undefined') {
        throw new Error('getCyclesFromTransitionMatrix: transitionMatrix._size is undefined.');
      }

      var spaceSize = transitionMatrix._size;
      if (spaceSize[0] !== spaceSize[1]) {
        throw new Error('getCyclesFromTransitionMatrix: transitionMatrix is not square.');
      }

      var positionsInCycle = [];
      var cycles = [];

      for (var _i3 = 0; _i3 < spaceSize[0]; _i3++) {
        if (positionsInCycle.indexOf(_i3) === -1) {
          // this position is part of a previously detected cycle

          var currentCyclePositions = [];
          var startingPosition = _experimentMathjs2.default.zeros(1, spaceSize[0]);
          startingPosition.subset(_experimentMathjs2.default.index(0, _i3), 1);

          var currentPositionVector = _lodash2.default.clone(startingPosition);
          var currentPosition = _experimentMathjs2.default.flatten(currentPositionVector)._data.indexOf(1);
          currentCyclePositions.push(currentPosition);
          var numberOfTransitions = 1;

          while (numberOfTransitions < maxTransitions) {
            // let newPosition = math.multiply(startingPosition, math.pow(transitionMatrix,numberOfTransitions))
            currentPositionVector = _experimentMathjs2.default.multiply(currentPositionVector, transitionMatrix);
            currentPosition = _experimentMathjs2.default.flatten(currentPositionVector)._data.indexOf(1);

            var currentPositionIndexInCycle = currentCyclePositions.indexOf(currentPosition);
            if (currentPositionIndexInCycle !== -1) {
              // this position was visited before
              // close the cycle store it and get out of the loop
              var cycle = _lodash2.default.slice(currentCyclePositions, currentPositionIndexInCycle);
              positionsInCycle = _lodash2.default.union(positionsInCycle, cycle);
              cycles.push(cycle);
              break;
            }

            if (positionsInCycle.indexOf(currentPosition) !== -1) {
              // this position was visited in a previous cycle - the trajectory will be absorbed by it - no need to store new info
              break;
            }

            currentCyclePositions.push(currentPosition);
            numberOfTransitions += 1;
          }
        }
      }

      return cycles;
    };

    var loopOnStateSpace = 0;
    while (loopOnStateSpace < 110) {
      // count the number of cycle
      var hiddenSpace = recursivelyExpandStateSpace(stateSpace, 0);
      if (hiddenSpace === false) {
        resolve('computeValidGraphs: could not expand state space.');
        break;
      } else {
        (0, _experimentJs.debuglog)('were past hiddenSpace loopOnStateSpace' + loopOnStateSpace);
        var transitionMatrix = transitionMatrixFromStateSpace(hiddenSpace);
        var cycles = getCyclesFromTransitionMatrix(transitionMatrix);

        if (cycles.length > options.maxNumberOfCycles) {
          (0, _experimentJs.debuglog)('too many cycles');
          loopOnStateSpace += 1;
          // find smallest cycle
          var smallestSize = -1;
          var smallestCycleIndex = 0;
          for (var _i4 = 0; _i4 < cycles.length; _i4++) {
            if (smallestSize === -1 || cycles[_i4].length < smallestSize) {
              smallestSize = cycles[_i4].length;
              smallestCycleIndex = _i4;
            }
          }
          var positionToChange = hiddenSpace[_lodash2.default.sample(cycles[smallestCycleIndex])].position;
          // let positionToChange = _.sample(_.range(0, hiddenSpace.length));
          stateSpace = sampleNewRule(stateSpace, positionToChange);
        } else {
          break;
        }

        if (loopOnStateSpace > 100) {
          resolve('computeValidGraphs: could not converge to a valid graph');
          break;
        }
      }
    }

    // store the targetRules in the stateManager
    var validStateSpaces = taskObject.parameters.validStateSpaces;
    validStateSpaces.push(stateSpace);

    resolve('computeValidGraphs: a valid stateSpace was stored in taskObject.parameters.validStateSpaces array.');
  });
};

var getTransitionMatrixFromBase = function getTransitionMatrixFromBase() {
  var baseMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var mainTransitionProbability = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();
  var noSelfTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  // make sure baseMatrix is in math.matrix format
  baseMatrix = _experimentMathjs2.default.matrix(baseMatrix);
  var size = baseMatrix.size()[0] - 1;
  var transitionMatrix = baseMatrix.map(function (value, index) {
    if (noSelfTransition && index[0] === index[1]) {
      return 0;
    }
    switch (value) {
      case 0:
        return (1 - mainTransitionProbability) / (size - (noSelfTransition ? 1 : 0));
      case 1:
        return mainTransitionProbability;
      default:
        throw new Error('taskObject.getTransitionMatrix: mainTransitionProbability is not 0 or 1');
    }
  });

  return transitionMatrix;
};

var getValidTransitionArray = function getValidTransitionArray() {
  var transitionArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  if (transitionArray.constructor !== Array) {
    if (typeof transitionArray.toArray === 'function') {
      transitionArray = transitionArray.toArray();
    } else {
      throw new Error('TaskObject.getValidTransitionArray: transitionArray is not an array and cannot be coerced to array.');
    }
  }

  if (!transitionArray.length) {
    throw new Error('TaskObject.getValidTransitionArray: transitionArray is empty.');
  }

  var lengths = [];
  for (var i = 0; i < transitionArray.length; i++) {
    lengths[i] = transitionArray[i].length;
  }

  var uniqueLengths = lengths.uniqueValues();
  if (uniqueLengths.length !== 1) {
    throw new Error('TaskObject.getValidTransitionArray: rows are of multiple lengths.');
  }

  if (transitionArray.length !== uniqueLengths[0]) {
    throw new Error('TaskObject.getValidTransitionArray: transition array is not square.');
  }

  /* --- Transition array passed the checks, return it --- */
  return transitionArray;
};

/**
 * Returns a 0 order n*n transition matrix from a one dimensional size n array with a probability for each state
 * @param  {array} stateProbabilities eg [0.1 0.2 0.2 0.5] for a 10% chance of transition to state 1 at any time t, 50% chance for state 4
 * @return {object} transition matrix (math.matrix) or two dimensional array depending on outputType
 */
var getRandomTransitionMatrix = function getRandomTransitionMatrix(stateProbabilities) {
  var outputType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'array';

  var size = stateProbabilities.length;
  var baseMatrix = _experimentMathjs2.default.matrix((0, _experimentJs.matrix)(size, size, 0));

  var transitionMatrix = baseMatrix.map(function (value, index) {
    return stateProbabilities[index[1]];
  });

  if (outputType === 'array') {
    // return an array
    return getValidTransitionArray(transitionMatrix);
  }
  // return a math.matrix
  return transitionMatrix;
};

var getZeroOrderTransitionMatrix = function getZeroOrderTransitionMatrix() {
  var dominantPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var dominantProbability = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();
  var numberOfStates = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

  var nonDominantProbability = Math.round((1 - dominantProbability) / (numberOfStates - 1) * 100) / 100;
  var rowValue = (0, _experimentJs.rep)(nonDominantProbability, numberOfStates);
  rowValue[dominantPosition] = dominantProbability;
  var randomTransitionMatrix = getRandomTransitionMatrix(rowValue);

  return randomTransitionMatrix;
};

var positionToVector = function positionToVector() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var numberOfPositions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  // const maxIndex = numberOfPositions - 1
  if (Number.isInteger(position)) {
    var vectorPosition = (0, _experimentJs.rep)(0, numberOfPositions);
    vectorPosition[position] = 1;
    vectorPosition = _experimentMathjs2.default.matrix(vectorPosition);

    return vectorPosition;
  }
  throw new Error('taskObject.positionToVector: position is not numeric.');
};

var vectorToPosition = function vectorToPosition() {
  var vector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  if (vector.constructor !== _experimentMathjs2.default.matrix().constructor) {
    if (vector.constructor === Array) {
      vector = _experimentMathjs2.default.matrix(vector);
    } else {
      throw new Error('taskObject.vectorToPosition: vector is not of type math.matrix() or Array');
    }
  }

  if (vector.size().length > 1) {
    throw new Error('taskObject.vectorToPosition: vector has more than one dimension.');
  }

  var position = null;
  vector.forEach(function (value, index) {
    switch (value) {
      case 1:
        if (position === null) {
          position = index[0];
        } else {
          throw new Error('taskObject.vectorToPosition: vector has more than one entry equal to 1.');
        }
        break;
      case 0:
        break;
      default:
        throw new Error('taskObject.vectorToPosition: vector has at least one entry not equal to 0 or 1. Entry ' + value);
    }
  });

  if (position === null) {
    throw new Error('taskObject.vectorToPosition: no entry equal to one was found in vector, position is null.');
  }

  return position;
};

var sampleNextTransition = function sampleNextTransition() {
  var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var currentPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();

  /* currentPosition is :
   * * either a vector of same size m as transitionMatrix (m*p)
   * * or a number that will be transformed into a vector
   */
  if (Number.isInteger(currentPosition)) {
    currentPosition = positionToVector(currentPosition, _experimentMathjs2.default.size(transitionMatrix)[0]);
  }

  transitionMatrix = _experimentMathjs2.default.matrix(transitionMatrix);

  if (currentPosition.size()[0] !== transitionMatrix.size()[0]) {
    throw new Error('taskObject.sampleNextTransition: currentPosition vector is not of same size as transitionMatrix');
  }

  var nextPositionProbabilities = _experimentMathjs2.default.multiply(_experimentMathjs2.default.transpose(currentPosition), transitionMatrix);

  /* --- Draw a random position --- */
  var count = 0;
  var randomNumber = Math.random();
  var nextPosition = null;
  nextPositionProbabilities.map(function (value, index) {
    if (randomNumber > count) {
      nextPosition = index[0];
    }
    count += value;
    return count;
  });

  if (nextPosition === null) {
    throw new Error('taskObject.sampleNextTransition: nextPosition is null');
  }

  return nextPosition;
};

var sampleTransitions = function sampleTransitions() {
  var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var startPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();
  var numberOfTransitions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _experimentJs.mandatory)();
  var includeStart = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var vectorPosition = void 0;
  if (Number.isInteger(startPosition)) {
    vectorPosition = positionToVector(startPosition);
  } else {
    vectorPosition = startPosition;
    startPosition = vectorToPosition(vectorPosition);
  }
  var transitions = [];

  if (includeStart) {
    transitions.push(startPosition);
  }

  for (var j = transitions.length; j < numberOfTransitions; j++) {
    var sampledPosition = sampleNextTransition(transitionMatrix, vectorPosition);
    transitions.push(sampledPosition);
    vectorPosition = positionToVector(sampledPosition);
  }

  return transitions;
};

var getDominantCellByRow = function getDominantCellByRow() {
  var transitionArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  transitionArray = getValidTransitionArray(transitionArray);

  var dominantArray = (0, _experimentJs.matrix)(transitionArray.length, transitionArray.length, 0);
  for (var i = 0; i < transitionArray.length; i++) {
    // sample one of the max index if ex aequo
    var indicesOfMaxValue = transitionArray[i].indicesOf(_lodash2.default.max(transitionArray[i]));
    if (indicesOfMaxValue.length > 1) {
      console.warn('TaskObject.getDominantCellByRow: ' + indicesOfMaxValue.length + ' cells in row ' + i + ' of transition matrix are ex-aequo. Sampling one of them as dominant.');
    }
    var maxIndex = _lodash2.default.sample(indicesOfMaxValue);
    dominantArray[i][maxIndex] = 1;
  }

  return dominantArray;
};

var getDominantProbabilityByRow = function getDominantProbabilityByRow() {
  var transitionArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  transitionArray = getValidTransitionArray(transitionArray);

  var dominantArray = _lodash2.default.map(transitionArray, function (value) {
    return _lodash2.default.max(value);
  });

  return dominantArray;
};

var matrixKlDivergence = function matrixKlDivergence() {
  var qMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var pMatrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();

  if (qMatrix.constructor !== _experimentMathjs2.default.matrix().constructor) {
    if (qMatrix.constructor === Array) {
      qMatrix = _experimentMathjs2.default.matrix(qMatrix);
    } else {
      throw new Error('taskObject.vectorToPosition: qMatrix is not of type math.matrix() or Array');
    }
  }

  if (pMatrix.constructor !== _experimentMathjs2.default.matrix().constructor) {
    if (pMatrix.constructor === Array) {
      pMatrix = _experimentMathjs2.default.matrix(pMatrix);
    } else {
      throw new Error('taskObject.vectorToPosition: pMatrix is not of type math.matrix() or Array');
    }
  }

  /* --- Get unidimensional distributions --- */
  var flattenQDistribution = _experimentMathjs2.default.flatten(qMatrix);
  var flattenPDistribution = _experimentMathjs2.default.flatten(pMatrix);

  var klDivergence = _experimentMathjs2.default.kldivergence(flattenQDistribution, flattenPDistribution);

  // symetric would be math.kldivergence(q, p) + math.kldivergence(p, q)

  return klDivergence;
};

/**
 * Return a vector or matrix of same size as absolutes, each cells being the proportion of the absolutes values by row. In array format.
 * @param  {array|object} absolutes Array or math.js matrix containing the absolute values
 * @return {array}           Matrix in array format of same dimension as absolutes, converted to proportions.
 */
var getProportionArray = function getProportionArray() {
  var absolutes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  var sumRow = [];
  var proportionArray = [];
  for (var i = 0; i < absolutes.length; i++) {
    if (absolutes[i].constructor === Array) {
      sumRow[i] = _experimentMathjs2.default.sum(absolutes[i]);
      proportionArray[i] = [];
      for (var j = 0; j < absolutes[i].length; j++) {
        proportionArray[i][j] = absolutes[i][j] / sumRow[i];
      }
    } else {
      sumRow[i] = _experimentMathjs2.default.sum(absolutes);
      proportionArray[i] = absolutes[i] / sumRow[i];
    }
  }

  return proportionArray;
};

/**
 * From a particular sequence of consequent position in a unidimensional array. Returns an object with two properties. First property "absolutes" is an array containing the number of observed transition in absolute values,
 * "proportions" is the proportions of observed transition for each position (row).
 * @param  {array} sequence         unidimensional array containing the sequence of positions
 * @param  {array|object} transitionMatrix optional: array or math.js matrix containing the true transition matrix (only used for the number of positions)
 * @return {[object}                  Object with absolutes and proportions property
 */
var getObservedArrays = function getObservedArrays() {
  var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var transitionMatrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var size = 4;
  if (transitionMatrix !== null) {
    size = getValidTransitionArray(transitionMatrix).length;
  }

  /* --- Create observation matrix from sequence using array (not math.js matrix object) --- */

  var observedTransitionArray = (0, _experimentJs.matrix)(size, size, 0);
  for (var i = 0; i < sequence.length - 1; i++) {
    observedTransitionArray[sequence[i]][sequence[i + 1]] += 1;
  }

  return {
    absolutes: observedTransitionArray,
    proportions: getProportionArray(observedTransitionArray)
  };
};

var getObservedAndDistanceMatrix = function getObservedAndDistanceMatrix() {
  var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var transitionMatrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();

  transitionMatrix = getValidTransitionArray(transitionMatrix);
  // const size = (math.size(transitionMatrix))[0]

  var observedArrays = getObservedArrays(sequence, transitionMatrix);

  var observedMatrix = _experimentMathjs2.default.matrix(observedArrays.proportions);

  var distanceMatrix = _experimentMathjs2.default.subtract(transitionMatrix, observedMatrix); // math.dotDivide(math.subtract(transitionMatrix, observedMatrix), transitionMatrix);

  return {
    observedMatrix: observedMatrix,
    distanceMatrix: distanceMatrix,
    totalError: _experimentMathjs2.default.sum(_experimentMathjs2.default.abs(distanceMatrix))
  };
};

/* ======== Full sequence generators ======== */
/**
 * Returns a transition sequence where the transition probabilities are equal to the given transitionMatrix with an error under the errorThreshold
 * @param  {array} sequence               Array of positions
 * @param  {array} transitionMatrix       transition matrix of the model
 * @param  {Number} errorThreshold         threshold under which the sequence is validated
 * @param  {Number} numberOfNewTransitions Number of transitions added every time the algorithms modify a previous transition
 * @return {array}                        New sequence
 */
var smoothSequenceDistribution = function smoothSequenceDistribution(sequence, transitionMatrix) {
  var errorThreshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;
  var numberOfNewTransitions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  transitionMatrix = getValidTransitionArray(transitionMatrix);

  /* --- Get the distance matrix between observed transitions and true transition matrix --- */
  var resultObject = getObservedAndDistanceMatrix(sequence, transitionMatrix);
  // const observedMatrix = resultObject.observedMatrix
  var distanceMatrix = resultObject.distanceMatrix;

  /* --- Find the positions with distance from true transition probability above the errorThreshold --- */
  var size = _experimentMathjs2.default.size(transitionMatrix)[0];
  var unevenPosition = [];
  for (var i = 0; i < size; i++) {
    if ((0, _experimentJs.rowSum)(_experimentMathjs2.default.abs(distanceMatrix), i) > errorThreshold) {
      var rowArray = (0, _experimentJs.getRow)(distanceMatrix, i).toArray();
      rowArray = rowArray[0];
      var maxVariations = _lodash2.default.sortBy(rowArray);
      // const minVariation = _.min(rowArray)

      // [positionIndex, maxVariationPositionIndex, maxVariationValue, minVariationPositionIndex, minVariationValue]
      var positionInformations = [i, rowArray.indexOf(maxVariations[0]), maxVariations[0], rowArray.indexOf(maxVariations[size - 1]), maxVariations[size - 1]];

      unevenPosition.push(positionInformations);
    }
  }

  // debuglog(unevenPosition);
  var newSequence = sequence;
  if (unevenPosition.length > 0) {
    // smooth it
    // const addAtTheEnd = null

    var pickedUneven = unevenPosition[_lodash2.default.random(0, unevenPosition.length - 1)];

    var smoothedPosition = pickedUneven[0];
    // debuglog(pickedUneven);
    var allIndices = sequence.indicesOf(smoothedPosition);
    var highTransitionIndices = _lodash2.default.filter(allIndices, function (i) {
      if (sequence[i + 1] === pickedUneven[1]) {
        return true;
      }
      return false;
    });

    var replacedIndex = _lodash2.default.sample(highTransitionIndices);

    var addedTransitions = [pickedUneven[3]];
    var vectorPosition = positionToVector(pickedUneven[3]);
    for (var j = 1; j < numberOfNewTransitions; j++) {
      var sampledPosition = sampleNextTransition(transitionMatrix, vectorPosition);
      addedTransitions.push(sampledPosition);
      vectorPosition = positionToVector(sampledPosition);
    }

    var restSequence = _lodash2.default.slice(sequence, replacedIndex + 2);
    var restartAt = restSequence.indexOf(addedTransitions[addedTransitions.length - 1]);

    if (restartAt === -1) {
      restSequence = sampleTransitions(transitionMatrix, addedTransitions[addedTransitions.length - 1], restSequence.length);
    } else {
      restSequence = _lodash2.default.slice(restSequence, restartAt + 1);
    }

    newSequence = _lodash2.default.concat(_lodash2.default.slice(sequence, 0, replacedIndex + 1), addedTransitions, _lodash2.default.slice(restSequence, restartAt + 1));

    if (newSequence.length !== sequence.length) {
      if (newSequence.length > sequence.length) {
        newSequence = _lodash2.default.slice(newSequence, newSequence.length - sequence.length);
      } else {
        var finishSequence = sampleTransitions(transitionMatrix, newSequence[newSequence.length - 1], sequence.length - newSequence.length);
        newSequence = _lodash2.default.concat(newSequence, finishSequence);
      }
      // debuglog(newSequence.length, " restarted at " + restartAt + " addAtTheEnd " + addAtTheEnd + " replacedIndex " + replacedIndex);
    }

    return newSequence;
  }
  return null;
};

var promiseSequenceFromTransitionMatrix = function promiseSequenceFromTransitionMatrix() {
  var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  transitionMatrix = getValidTransitionArray(transitionMatrix);
  return new Promise(function (resolve) {
    var baseOptions = {
      sequenceLength: 50,
      errorThreshold: 0.06,
      numberOfNewTransitions: 4,
      maxLoop: 100
    };

    options = _lodash2.default.extend(baseOptions, options);

    /* --- Infer number of state from the size of the transition matrix --- */
    var numberOfStates = _experimentMathjs2.default.size(transitionMatrix)[0];

    /* --- Generate a starting sequence based on transition probabilities --- */
    var sequence = [];
    var startPosition = _lodash2.default.random(0, numberOfStates - 1);
    sequence.push(startPosition);
    var positionVector = positionToVector(startPosition);
    for (var i = 0; i < options.sequenceLength - 1; i++) {
      var nextPosition = sampleNextTransition(transitionMatrix, positionVector);
      positionVector = positionToVector(nextPosition);
      sequence.push(nextPosition);
    }

    /* ---
      Start the loop to get a sequence as close as possible to the true transition probabilities
      With a limit the number of cycles at 1000
    --- */
    var loop = 0;
    var maxLoop = options.maxLoop;

    var bestSequence = null;
    var bestError = 100;
    while (loop < maxLoop) {
      var newSequence = smoothSequenceDistribution(sequence, transitionMatrix, options.errorThreshold, options.numberOfNewTransitions);

      // newSequence is null if no better sequence was found by smoothSequenceDistribution -> loop breaks
      if (newSequence !== null) {
        var resultObject = getObservedAndDistanceMatrix(newSequence, transitionMatrix);
        var totalError = resultObject.totalError;

        if (bestSequence === null || bestError > totalError) {
          bestSequence = {
            sequence: newSequence,
            observedMatrix: resultObject.observedMatrix,
            distanceMatrix: resultObject.distanceMatrix
          };
          bestError = totalError;
        }

        sequence = newSequence;
      } else {
        break;
      }
      loop += 1;
    }

    /* --- After the loop if a better sequence was found return it, else return the start sequence sample from the transition probabilites --- */
    if (bestSequence !== null) {
      resolve(bestSequence.sequence);
    } else {
      resolve(sequence);
    }
  });
};

var promiseMultipleSequences = function promiseMultipleSequences() {
  var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return new Promise(function (resolve) {
    transitionMatrix = getValidTransitionArray(transitionMatrix);

    var baseOptions = {
      numberOfSequences: 6,
      sequenceLength: 130,
      sequenceArray: []
    };

    options = _lodash2.default.extend(baseOptions, options);

    (0, _experimentJs.debuglog)('Generated ' + options.sequenceArray.length + ' sequences');

    if (options.sequenceArray.length < options.numberOfSequences) {
      (0, _experimentJs.debuglog)(options.sequenceArray);
      promiseSequenceFromTransitionMatrix(transitionMatrix, {
        sequenceLength: options.sequenceLength
      }).then(function (sequence) {
        options.sequenceArray.push(sequence);
        promiseMultipleSequences(transitionMatrix, options).then(function (sequences) {
          resolve(sequences);
        });
      });
    } else {
      resolve(options.sequenceArray);
    }
  });
};

var promiseMultipleRandomSequences = function promiseMultipleRandomSequences() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return new Promise(function (resolve) {
    var baseOptions = {
      numberOfSequences: 4,
      sequenceLength: 30,
      dominantProbability: 0.4,
      dominantPositions: [0, 1, 2, 3],
      errorThreshold: 0.02,
      maxLoop: 10000,
      numberOfNewTransitions: 4,
      sequenceArray: []
    };

    options = _lodash2.default.extend(baseOptions, options);

    (0, _experimentJs.debuglog)('Generated ' + options.sequenceArray.length + ' sequences');

    if (options.sequenceArray.length < options.numberOfSequences) {
      // get the zero order transitionMatrix corresponds to the dominantPositions
      var transitionMatrix = getZeroOrderTransitionMatrix(options.sequenceArray.length, options.dominantProbability);

      promiseSequenceFromTransitionMatrix(transitionMatrix, {
        sequenceLength: options.sequenceLength,
        errorThreshold: options.errorThreshold,
        numberOfNewTransitions: options.numberOfNewTransitions,
        maxLoop: options.maxLoop
      }).then(function (sequence) {
        options.sequenceArray.push(sequence);
        promiseMultipleRandomSequences(options).then(function (sequences) {
          resolve(sequences);
        });
      });
    } else {
      resolve(options.sequenceArray);
    }
  });
};

var promiseSegmentsAndProbesByBlock = function promiseSegmentsAndProbesByBlock() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return new Promise(function (resolve) {
    var baseOptions = {
      segmentSizes: [3, 4, 5],
      observationSegmentRepetitionPerBlock: 2,
      numberOfBlocks: 6,
      dominantProbability: 0.75,
      positions: [0, 1, 2, 3]
    };

    options = _lodash2.default.extend(baseOptions, options);

    var numberOfTimeAProbeIsRepeated = options.segmentSizes.length * options.observationSegmentRepetitionPerBlock;
    var positions = options.positions;

    // Number of dominant transition by probe position
    var numberOfDominant = _experimentMathjs2.default.floor(options.dominantProbability * numberOfTimeAProbeIsRepeated);

    // let segmentSizeSequences = [];
    var segmentSizeSequencesEvenlyDistributed = [];
    var probeSequences = [];
    var transitionTypes = [];
    var blockArray = [];
    for (var i = 0; i < options.numberOfBlocks; i++) {
      /* --- Generate the segment size sequence for the block --- */
      var segmentPermutations = (0, _experimentJs.samplePermutation)((0, _experimentJs.rep)(options.segmentSizes, positions.length * options.observationSegmentRepetitionPerBlock));
      // segmentSizeSequences = segmentSizeSequences.concat(segmentPermutations);
      blockArray = blockArray.concat((0, _experimentJs.rep)(i, segmentPermutations.length));

      // Each position sees the same number of segment sizes
      var probeSequence = (0, _experimentJs.samplePermutation)((0, _experimentJs.rep)(options.positions, numberOfTimeAProbeIsRepeated));

      // make sure there is no repeated probe just one after the other
      // const previousProbe = null
      var loop = 0;
      while (loop < 100) {
        if (probeSequence.hasNeighbouringRepeat()) {
          probeSequence = (0, _experimentJs.samplePermutation)((0, _experimentJs.rep)(options.positions, numberOfTimeAProbeIsRepeated));
        } else {
          break;
        }
        loop += 1;
      }

      // Distribute uniformely position with segment sizes.
      // You have the right number of probes but now but not association with segment length
      var segmentEvenlyPermutated = [];
      var leftSegmentPermutations = positions.map(function () {
        return (0, _experimentJs.samplePermutation)((0, _experimentJs.rep)(options.segmentSizes, options.observationSegmentRepetitionPerBlock));
      });

      for (var _i5 = 0; _i5 < probeSequence.length; _i5++) {
        segmentEvenlyPermutated[_i5] = leftSegmentPermutations[probeSequence[_i5]].pop();
        if (typeof segmentEvenlyPermutated[_i5] === 'undefined') {
          throw new Error('promiseSegmentsAndProbesByBlock: leftSegmentPermutations is empty cannot pop !');
        }
      }
      segmentSizeSequencesEvenlyDistributed = segmentSizeSequencesEvenlyDistributed.concat(segmentEvenlyPermutated);

      /* --- Concat the probe sequence to the array for all blocks --- */
      probeSequences = probeSequences.concat(probeSequence);

      /* --- Compute dominant transitions --- */
      var indices = _lodash2.default.range(probeSequence.length);
      var transitionType = (0, _experimentJs.rep)(0, probeSequence.length);
      var dominantCount = [0, 0, 0, 0];
      while (indices.length) {
        var r = _lodash2.default.random(0, indices.length - 1);
        var index = indices.splice(r, 1);
        var position = probeSequences[index];
        if (dominantCount[position - 1] >= numberOfDominant) {
          transitionType[index] = 0;
        } else {
          dominantCount[position - 1] += 1;
          transitionType[index] = 1;
        }
      }

      /* --- Concat dominant transitions --- */

      transitionTypes = transitionTypes.concat(transitionType);
    }

    resolve({
      segmentSizeSequences: segmentSizeSequencesEvenlyDistributed,
      block: blockArray,
      probeSequences: probeSequences,
      transitionTypes: transitionTypes,
      numberOfProbePerBlock: options.segmentSizes.length * options.observationSegmentRepetitionPerBlock * options.positions.length,
      numberOfObservationPerBlock: _lodash2.default.sum(options.segmentSizes) * options.observationSegmentRepetitionPerBlock * options.positions.length
    });
  });
};

var getFullSequenceObjectForRandomBlackoutBlock = function getFullSequenceObjectForRandomBlackoutBlock() {
  var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var baseOptions = {
    observePredictionPerBlock: 16,
    block: 0,
    blockType: 'random',
    segmentLength: {
      A: [5, 2, 3, 4, 2],
      B: [2, 3, 4, 5]
    },
    trialTypes: {
      o: 'observation',
      oP: 'observation_prediction',
      pBP: 'post_blackout_prediction',
      blackout: 'blackout'
    }
  };

  options = _lodash2.default.extend(baseOptions, options);

  var segAPermutations = (0, _experimentJs.samplePermutation)(options.segmentLength.A);
  var segBPermutations = (0, _experimentJs.samplePermutation)(options.segmentLength.B);
  var segmentSequence = [];
  segAPermutations.map(function (v, i) {
    //eslint-disable-line
    segmentSequence.push(segAPermutations[i]);
    if (i < segBPermutations.length) {
      segmentSequence.push(segBPermutations[i]);
    }
  });

  var blockSize = options.segmentLength.A.sum() + options.segmentLength.B.sum();
  var blackoutIndices = segmentSequence.integrate();
  var addPostBlackout = [];
  var predictionIndices = _lodash2.default.range(0, blockSize).filter(function (v) {
    if (blackoutIndices.indexOf(v) !== -1) {
      return false;
    } else if (blackoutIndices.indexOf(v - 1) !== -1) {
      addPostBlackout.push(v);
      return false;
    }
    return true;
  });
  predictionIndices = (0, _experimentJs.samplePermutation)(predictionIndices).slice(0, options.observePredictionPerBlock);

  var fullSequence = sequence.slice();
  var fullBlockType = (0, _experimentJs.rep)(options.blockType, blockSize);
  var fullBlock = (0, _experimentJs.rep)(options.block, blockSize);
  var fullTrial = _lodash2.default.range(1, blockSize + 1);
  var fullTrialType = [];
  for (var i = 0; i < sequence.length; i++) {
    if (predictionIndices.indexOf(i) !== -1) {
      fullTrialType.push(options.trialTypes.oP);
    } else if (addPostBlackout.indexOf(i) !== -1) {
      fullTrialType.push(options.trialTypes.pBP);
    } else if (blackoutIndices.indexOf(i) !== -1) {
      fullTrialType.push(options.trialTypes.blackout);
    } else {
      fullTrialType.push(options.trialTypes.o);
    }
  }

  return {
    fullSequence: fullSequence,
    blockType: fullBlockType,
    block: fullBlock,
    trial: fullTrial,
    trialType: fullTrialType
  };
};

var promiseFullSequenceForIntermitentPrediction = function promiseFullSequenceForIntermitentPrediction() {
  var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  transitionMatrix = getValidTransitionArray(transitionMatrix);
  return new Promise(function (resolve) {
    var baseOptions = {
      sequenceLength: 180,
      sequenceALength: 96,
      sequenceBLength: 84,
      observePredictionPerBlock: 16,
      errorThreshold: 0.06,
      numberOfNewTransitions: 4,
      maxLoop: 100,
      segmentLength: {
        A: [5, 2, 3, 4, 2],
        B: [2, 3, 4, 5]
      },
      protectFirstBlock: true,
      trialTypes: {
        o: 'observation',
        oP: 'observation_prediction',
        pBP: 'post_blackout_prediction',
        blackout: 'blackout'
      }
    };

    options = _lodash2.default.extend(baseOptions, options);

    var sequenceA = void 0;
    var sequenceB = void 0;

    options.sequenceLength = options.sequenceALength;
    return promiseSequenceFromTransitionMatrix(transitionMatrix, options).then(function (result) {
      var resultObject = getObservedAndDistanceMatrix(result, transitionMatrix);
      // const observedMatrix = resultObject.observedMatrix
      var distanceMatrix = resultObject.distanceMatrix;

      (0, _experimentJs.debugWarn)('promiseFullSequenceForIntermitentPrediction.sequenceA', _experimentMathjs2.default.sum(_experimentMathjs2.default.abs(distanceMatrix)));

      sequenceA = result;
      options.sequenceLength = options.sequenceBLength;

      return promiseSequenceFromTransitionMatrix(transitionMatrix, options);
    }).then(function (result) {
      var resultObject = getObservedAndDistanceMatrix(result, transitionMatrix);
      // const observedMatrix = resultObject.observedMatrix
      var distanceMatrix = resultObject.distanceMatrix;

      (0, _experimentJs.debugWarn)('promiseFullSequenceForIntermitentPrediction.sequenceB', _experimentMathjs2.default.sum(_experimentMathjs2.default.abs(distanceMatrix)));

      sequenceB = _lodash2.default.clone(result);

      // start loop for blackouts
      var currentBlock = -1;
      var currentTrial = 0;
      var segAIndex = 0;
      var indicesBlackout = [];

      var fullSequence = [];
      var fullTrialType = []; // fill it in the end of each block
      var fullTrial = [];
      var fullBlock = [];

      var segmentsA = _lodash2.default.clone(options.segmentLength.A);
      var segmentsB = _lodash2.default.clone(options.segmentLength.B);
      var lenghtBlockA = segmentsA.sum();
      var blockLength = lenghtBlockA + segmentsB.sum();
      var lenghtSegmentB = (0, _experimentJs.samplePermutation)(segmentsB);
      for (var i = 0; i < sequenceA.length; i++) {
        var tempBlock = Math.floor(i / lenghtBlockA);

        if (tempBlock !== currentBlock) {
          segmentsA = _lodash2.default.clone(options.segmentLength.A);
          segmentsB = _lodash2.default.clone(options.segmentLength.B);
          currentBlock = tempBlock;
          currentTrial = 0;
          segAIndex = 0;
          if (currentBlock === 0 && options.protectFirstBlock) {
            var first = segmentsA.shift();
            segmentsA[0] += first;
            indicesBlackout = segmentsA.integrate();
            lenghtSegmentB = (0, _experimentJs.samplePermutation)(segmentsB);
            first = lenghtSegmentB.shift();
            lenghtSegmentB[0] += first;
          } else {
            indicesBlackout = (0, _experimentJs.samplePermutation)(segmentsA).integrate();
            lenghtSegmentB = (0, _experimentJs.samplePermutation)(segmentsB);
          }
        }

        fullTrial.push(currentTrial);
        fullSequence.push(sequenceA[i]);
        fullBlock.push(currentBlock);
        segAIndex += 1;
        currentTrial += 1;

        if (segAIndex !== lenghtBlockA && indicesBlackout.indexOf(segAIndex) !== -1) {
          fullTrialType.push(options.trialTypes.blackout);
          var addedSegmentLenght = lenghtSegmentB.shift();
          var addedSegment = sequenceB.splice(0, addedSegmentLenght);
          var addTrials = _lodash2.default.range(currentTrial, currentTrial + addedSegmentLenght);
          var addedTrialType = (0, _experimentJs.rep)(options.trialTypes.o, addedSegmentLenght);
          addedTrialType[0] = options.trialTypes.pBP;
          var addedBlock = (0, _experimentJs.rep)(currentBlock, addedSegmentLenght);

          fullSequence = fullSequence.concat(addedSegment);
          fullTrial = fullTrial.concat(addTrials);
          fullTrialType = fullTrialType.concat(addedTrialType);
          fullBlock = fullBlock.concat(addedBlock);

          currentTrial += addedSegment.length;
        } else {
          fullTrialType.push(options.trialTypes.o);
        }
      }

      // Add observation_prediction to each block
      var nblocks = Math.floor(fullSequence.length / blockLength);
      for (var _i6 = 0; _i6 < nblocks; _i6++) {
        var blockTrialType = fullTrialType.slice(_i6 * blockLength, (_i6 + 1) * blockLength);
        var indicesPrediction = (0, _experimentJs.samplePermutation)(blockTrialType.indicesOf(options.trialTypes.o)).slice(0, options.observePredictionPerBlock);
        for (var j = 0; j < indicesPrediction.length; j++) {
          var index = _i6 * (blockLength + indicesPrediction[j]);
          fullTrialType[index] = options.trialTypes.oP;
        }
      }

      resolve({
        fullSequence: fullSequence,
        trial: fullTrial,
        trialType: fullTrialType,
        block: fullBlock,
        blockType: (0, _experimentJs.rep)('normal', fullSequence.length)
      });
    });
  });
};

/**
 * From a transitionMatrix returns an object with two properties sequence and trialType. Each position is either learning, probe, or feedback.
 * @param  {array} transitionMatrix Array or matrix
 * @param  {[type]} options          [description]
 * @return {[type]}                  [description]
 */
var promiseFullSequenceForOneLevel = function promiseFullSequenceForOneLevel() {
  var transitionMatrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  return new Promise(function (resolve) {
    /* --- Make sure the transitionMatrix is valid --- */
    transitionMatrix = getValidTransitionArray(transitionMatrix);
    var numberOfStates = _experimentMathjs2.default.size(transitionMatrix)[0];

    var baseOptions = {
      numberOfSequences: 8,
      insertRandomBlocksAt: [2, 6],
      randomBlocksDominantStates: [2, 2],
      randomBlocksDominantStateProbability: 0.4
    };

    options = _lodash2.default.extend(baseOptions, options);

    /* --- Create random matrix --- */

    var randomBlocksNonDominantProbability = (1 - options.randomBlocksDominantStateProbability) / (numberOfStates - 1);
    var randomTransitionMatrix = getRandomTransitionMatrix((0, _experimentJs.rep)(randomBlocksNonDominantProbability, numberOfStates));
    randomTransitionMatrix[options.randomBlocksDominantStates] = options.randomBlocksDominantStateProbability;

    /* ---
      Get the dominant transitions and non dominant transitions for each position
      This will help build the feedback sequence
     --- */

    // for random blocks
    var randomBlocksDominantState = (0, _experimentJs.matrix)(options.randomBlocksDominantStates.length, numberOfStates, 0);
    var randomBlocksNonDominantStates = (0, _experimentJs.matrix)(options.randomBlocksDominantStates.length, numberOfStates, (0, _experimentJs.rep)(0, numberOfStates - 1));

    var _loop3 = function _loop3(i) {
      for (var j = 0; j < numberOfStates; j++) {
        randomBlocksDominantState[i][j] = options.randomBlocksDominantStates[i];
        randomBlocksNonDominantStates[i][j] = _lodash2.default.range(0, numberOfStates).filter(function (v) {
          return v !== options.randomBlocksDominantStates[i];
        });
      }
    };

    for (var i = 0; i < options.randomBlocksDominantStates.length; i++) {
      _loop3(i);
    }

    // for non random blocks
    var dominantMatrix = getDominantCellByRow(transitionMatrix);
    var dominantTransition = [];
    var nonDominantTransitions = [];
    _lodash2.default.forEach(dominantMatrix, function (value, index) {
      dominantTransition[index] = vectorToPosition(value);
      nonDominantTransitions[index] = _lodash2.default.range(0, dominantMatrix.length).filter(function (v) {
        return v !== index && v !== dominantTransition[index];
      });
    });

    promiseSegmentsAndProbesByBlock(options).then(function (segments) {
      var numberOfRandomBlocks = options.insertRandomBlocksAt.constructor === Array ? options.insertRandomBlocksAt.length : 0;

      promiseMultipleSequences(randomTransitionMatrix, { // TODO: replace by a specific randomsequencegenerator able to change the main state
        numberOfSequences: numberOfRandomBlocks,
        sequenceLength: segments.numberOfObservationPerBlock
      }).then(function (randomSequences) {
        promiseMultipleSequences(transitionMatrix, {
          numberOfSequences: options.numberOfSequences - numberOfRandomBlocks,
          sequenceLength: segments.numberOfObservationPerBlock
        }).then(function (smoothedSequences) {
          var numberOfBlocks = segments.block.uniqueValues().length;
          if (smoothedSequences.length > numberOfBlocks) {
            // More sequences than block, select the best sequences
            var observedData = [];
            var errors = [];
            var kls = [];
            var sequenceObjects = [];
            var bestSequence = null; // eslint-disable-line
            var bestError = null;
            for (var i = 0; i < _smoothedSequences.length; i++) {
              observedData[i] = getObservedAndDistanceMatrix(_smoothedSequences[i], transitionMatrix); // eslint-disable-line
              errors[i] = observedData[i].totalError;
              kls[i] = matrixKlDivergence(observedData[i].observedMatrix, transitionMatrix);
              sequenceObjects.push({
                sequence: _smoothedSequences[i], // eslint-disable-line
                error: errors[i]
              });
              if (bestError === null || errors[i] < bestError) {
                bestSequence = _smoothedSequences[i]; // eslint-disable-line
                bestError = errors[i];
              }
            }

            console.warn(_lodash2.default.sortBy(errors));
            var _smoothedSequences = _lodash2.default.sortBy(sequenceObjects, 'error').map(function (o) {
              return o.sequence;
            });
          }

          (0, _experimentJs.debuglog)(segments);

          // in case the array is not ordered properly do a by block iteration
          var blocksNumber = segments.block.uniqueValues();
          var fullSequenceBlock = [];
          var fullSequenceBlockType = [];
          var completeSequence = [];
          var trialType = [];
          var trials = [];

          var smoothedSequencesIndex = 0;
          var randomSequencesIndex = 0;
          var sequence = void 0;
          var block = void 0;
          var blockIndices = void 0;
          var probeTransitions = void 0;
          var blockType = void 0;
          var nonDominantIndices = void 0;
          var currentDominantTransitions = void 0;
          var currentNonDominantTransitions = void 0;

          var _loop4 = function _loop4(_i7) {
            if (options.insertRandomBlocksAt.indexOf(_i7) !== -1) {
              /* --- Random sequence processing --- */
              sequence = randomSequences[randomSequencesIndex];

              currentDominantTransitions = randomBlocksDominantState[randomSequencesIndex];
              currentNonDominantTransitions = randomBlocksNonDominantStates[randomSequencesIndex];

              blockType = 'random';

              randomSequencesIndex += 1;
            } else {
              /* --- Non random sequence processing --- */
              sequence = smoothedSequences[smoothedSequencesIndex];

              currentDominantTransitions = dominantTransition;
              currentNonDominantTransitions = nonDominantTransitions;

              blockType = 'normal';

              smoothedSequencesIndex += 1;
            }

            block = blocksNumber[_i7];
            blockIndices = segments.block.indicesOf(block);
            var segmentSizesOfBlock = _lodash2.default.clone(segments.segmentSizeSequences) // eslint-disable-line
            .filter(function (value, index) {
              return blockIndices.indexOf(index) !== -1;
            });

            // Creates the probeTransitions feedback sequence
            probeTransitions = [];
            nonDominantIndices = [_lodash2.default.random(0, 1), _lodash2.default.random(0, 1), _lodash2.default.random(0, 1), _lodash2.default.random(0, 1)];
            var probeSequenceRemaining = _lodash2.default.clone(segments.probeSequences).filter(function (value, index) {
              // checks that the probe is part of the block
              if (blockIndices.indexOf(index) !== -1) {
                // checks wether the transition is dominant or non dominant
                if (segments.transitionTypes[index] === 1) {
                  // transition is dominant, pushing a dominant feedback
                  probeTransitions.push(currentDominantTransitions[value]);
                } else {
                  // transition is non dominant, make sure to switch the non dominant transition so it is never twice the same consecutivelly
                  probeTransitions.push(currentNonDominantTransitions[value][nonDominantIndices[value]]);

                  nonDominantIndices[value] += 1;
                  if (nonDominantIndices[value] >= currentNonDominantTransitions[value].length) {
                    nonDominantIndices[value] = 0;
                  }
                }
                return true;
              }
              return false;
            });

            var currentObservationIndex = 0;
            var lastTrial = 0;
            for (var j = 0; j < blockIndices.length; j++) {
              var segmentIndex = blockIndices[j];
              var endIndex = currentObservationIndex + segments.segmentSizeSequences[segmentIndex];
              if (endIndex > sequence.length) {
                throw new Error('StateManager.getFullSequenceForBlock: sequence length is not equal to the total number of observation generated by segment for block');
              }

              var segment = sequence.slice(currentObservationIndex, endIndex);
              completeSequence = completeSequence.concat(segment);
              trialType = trialType.concat((0, _experimentJs.rep)('learning', segment.length));
              currentObservationIndex = endIndex;

              // let probeIndex = segmentIndex;
              var probePosition = probeSequenceRemaining[j];
              var feedback = probeTransitions[j];

              // old way ... why ??
              // TODO think of a way to separate probesequence indx and segment index?? why...
              // let probeIndex = _.random(0, probeSequenceRemaining.length - 1);
              // let probePosition = probeSequenceRemaining.splice(probeIndex, 1);
              // let feedback = probeTransitions.splice(probeIndex, 1);

              completeSequence = completeSequence.concat(probePosition).concat(feedback);
              trialType = trialType.concat(['probe', 'feedback']);

              fullSequenceBlock = fullSequenceBlock.concat((0, _experimentJs.rep)(block, segment.length + 2));
              fullSequenceBlockType = fullSequenceBlockType.concat((0, _experimentJs.rep)(blockType, segment.length + 2));
              // get trials
              var N = segment.length + 2;
              var addTrials = Array.apply(undefined, _toConsumableArray(new Array(N))).map(function (_, i) {
                return i + lastTrial + 1;
              });
              lastTrial = addTrials[addTrials.length - 1];
              trials = trials.concat(addTrials);

              // trial = trial.concat([...Array(segment.length + 2).keys()].map(x => x+lastTrial))
            }
          };

          for (var _i7 = 0; _i7 < blocksNumber.length; _i7++) {
            _loop4(_i7);
          }

          resolve({
            fullSequence: completeSequence,
            trialType: trialType,
            block: fullSequenceBlock,
            blockType: fullSequenceBlockType,
            trial: trials
          });
        });
      });
    });
  });
};

var getFullSequenceObjectForClassicLevels = function getFullSequenceObjectForClassicLevels(sequence) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var baseOptions = {
    trialType: 'classic',
    blockType: 'normal',
    block: 0
  };

  options = _lodash2.default.extend(baseOptions, options);

  var t = 0;
  return {
    fullSequence: sequence,
    block: (0, _experimentJs.rep)([options.block], sequence.length),
    blockType: (0, _experimentJs.rep)([options.blockType], sequence.length),
    trialType: (0, _experimentJs.rep)([options.trialType], sequence.length),
    trial: (0, _experimentJs.rep)([0], sequence.length).map(function () {
      t += 1;
      return t;
    })
  };
};

var insertSequenceObjectAtBlock = function insertSequenceObjectAtBlock() {
  var baseObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var insertedObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();
  var atBlocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _experimentJs.mandatory)();

  var newObject = {
    fullSequence: [],
    block: [],
    trial: [],
    trialType: [],
    blockType: []
  };

  if (atBlocks.constructor === Number) {
    atBlocks = [atBlocks];
  }

  var offset = 0;
  var currentBlock = baseObject.block[0];
  var baseCurrentBlock = currentBlock;

  var _loop5 = function _loop5(i) {
    if (atBlocks.indexOf(baseObject.block[i]) !== -1) {
      // Get rid of this insert marker
      atBlocks = atBlocks.filter(function (v) {
        return v !== baseObject.block[i];
      });
      var _insertedBlock = insertedObject.block[offset];

      if (baseObject.block[i] !== 0) {
        currentBlock += 1;
      } // Allows to start at 0 if marker was at 0

      while (insertedObject.block[offset] === _insertedBlock) {
        newObject.fullSequence.push(insertedObject.fullSequence[offset]);
        newObject.block.push(currentBlock);
        newObject.trial.push(insertedObject.trial[offset]);
        newObject.trialType.push(insertedObject.trialType[offset]);
        newObject.blockType.push(insertedObject.blockType[offset]);
        offset += 1;
      }
    }

    if (baseObject.block[i] !== baseCurrentBlock) {
      currentBlock += 1;
      baseCurrentBlock = baseObject.block[i];
    }

    newObject.fullSequence.push(baseObject.fullSequence[i]);
    newObject.block.push(currentBlock);
    newObject.trial.push(baseObject.trial[i]);
    newObject.trialType.push(baseObject.trialType[i]);
    newObject.blockType.push(baseObject.blockType[i]);
  };

  for (var i = 0; i < baseObject.block.length; i++) {
    _loop5(i);
  }

  // Take care of an addition at the end - all remaining blocks of inserted object will be added
  if (atBlocks.indexOf(baseObject.block.max() + 1) !== -1 && offset < insertedObject.block.length) {
    var insertedBlock = -1;
    while (offset < insertedObject.block.length) {
      if (insertedBlock !== insertedObject.block[offset]) {
        currentBlock += 1;
        insertedBlock = insertedObject.block[offset];
      }

      newObject.fullSequence.push(insertedObject.fullSequence[offset]);
      newObject.block.push(currentBlock);
      newObject.trial.push(insertedObject.trial[offset]);
      newObject.trialType.push(insertedObject.trialType[offset]);
      newObject.blockType.push(insertedObject.blockType[offset]);
      offset += 1;
    }
  }

  return newObject;
};

var promiseBestSequencesForAllBlocksAndSave = function promiseBestSequencesForAllBlocksAndSave() {
  // / NOT IMPLEMENTED
  // return new Promise(function (resolve, reject) {

  //   // Recovers options
  //   // Prepare to generate x amount of sequence and select the best one

  //   let baseOptions = {
  //     levelOne: {
  //       numberOfSequences: 1,
  //       sequenceLength: 75,
  //       dominantProbability: 1
  //     },
  //     levelTwo: {
  //       numberOfSequences: 500,
  //       sequenceLength: 120,
  //       dominantProbability: 0.95
  //     },
  //     levelThree: {
  //       numberOfSequences: 500,
  //       sequenceLength: 150,
  //       dominantProbability: 0.85
  //     },
  //     levelFour: {
  //       numberOfSequences: 500,
  //       sequenceLength: 120
  //     }
  //   };

  //   // Generate level 1
  //   taskObject.promiseMultipleSequences(transitionMatrix, {
  //       numberOfSequences: 6,
  //       sequenceLength: segments.numberOfObservationPerBlock
  //     })
  //     .then(function (smoothedSequences) {
  //       debuglog(segments);
  //       let observedData = [];
  //       let errors = [];
  //       let kls = [];
  //       let sequenceObjects = [];
  //       let bestSequence = null;
  //       let bestError = null;
  //       for (let i = 0; i < smoothedSequences.length; i++) {
  //         observedData[i] = taskObject.getObservedAndDistanceMatrix(smoothedSequences[i], transitionMatrix);
  //         errors[i] = observedData[i].totalError;
  //         kls[i] = taskObject.matrixKlDivergence(observedData[i].observedMatrix, transitionMatrix);
  //         sequenceObjects.push({
  //           sequence: smoothedSequences[i],
  //           error: errors[i]
  //         });
  //         if ((bestError === null) || (errors[i] < bestError)) {
  //           bestSequence = smoothedSequences[i];
  //           bestError = errors[i];
  //         }
  //       }
  //     });

  //   // Generate level 2
  //   // Generate level 3
  //   // Generate level 4
  //   resolve([{}, {}, {}, {}]);
  // });
};

var getDensity = function getDensity(elements) {
  var nsteps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var windowSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  // eslint-disable-line
  if (elements.some(isNaN)) {
    throw new Error('TaskObject.getDensity: elements are not all numeric.');
  }

  var range = [_experimentMathjs2.default.min(elements), _experimentMathjs2.default.max(elements)];

  var stepSize = (range[1] - range[0]) / nsteps;
  // const windowLenght = stepSize * windowSize

  var elementsInWindow = [];
  var windowPosition = [];
  var density = [];
  var points = [];

  var _loop6 = function _loop6(i) {
    var subset = _lodash2.default.filter(elements, function (e) {
      var centered = e - range[0] - i * stepSize;
      return centered >= 0 && centered < stepSize;
    });

    windowPosition[i] = (i + 0.5) * stepSize;
    elementsInWindow[i] = subset.length;
    density[i] = elementsInWindow[i] / elements.length;
    points[i] = {
      x: windowPosition[i],
      y: density[i]
    };
  };

  for (var i = 0; i < nsteps; i++) {
    _loop6(i);
  }

  return {
    windows: {
      position: windowPosition,
      numberOfElements: elementsInWindow,
      density: density
    },
    points: points,
    chartOptions: {
      type: 'line',
      data: {
        datasets: [{
          label: 'Density',
          data: points
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    }
  };
};

var randomColor = function randomColor(opacity) {
  return 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + (opacity || '.3') + ')';
};

var computeDurationEstimate = function computeDurationEstimate() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var parametersBase = {
    dominantProbability: 0.76,
    minNumberOfObservationsPerLearning: 3,
    maxNumberOfObservationsPerLearning: 7,
    observationDuration: 500,
    interObservationDuration: 50, // to add ?
    minTimeToPredict: 2000,
    maxTimeToPredict: 5000,
    feedbackDuration: 500,
    minISIAfterLearning: 1000,
    maxISIAfterLearning: 1500,
    minISIAfterFeedback: 3000,
    maxISIAfterFeedback: 5000,
    rabbitAutoTransition: false,
    rabbitDominantProbability: 0.6,
    observationSegmentSizes: [3, 4, 5],
    observationSegmentRepetitionPerBlock: 2,
    numberOfBlocks: 6,
    numberOfRandomBlocks: 2,
    feedbackType: 'transition'
  };

  options = _lodash2.default.extend(parametersBase, options);

  // number of observation = sum(segment sizes) * segment repetition per block
  var numberOfObservationPerLevel = _experimentMathjs2.default.sum(options.observationSegmentSizes) * options.observationSegmentRepetitionPerBlock;

  // duration of one observation = observationDuration (add inter observation duration ?)
  var oneObservationDuration = options.observationDuration;

  // observation duration for one block
  var observationsDurationPerBlock = numberOfObservationPerLevel * oneObservationDuration;

  // number of prediction per block
  var numberOfPredictionEventsPerBlock = options.observationSegmentSizes.length * options.observationSegmentRepetitionPerBlock;

  // min max and mean duration of one prediction event stored in a matrix
  // timeDurationMatrix 4*2 min, max
  var timeDurationMatrix = _experimentMathjs2.default.matrix([[options.minISIAfterLearning, options.maxISIAfterLearning], [options.minTimeToPredict, options.maxTimeToPredict], [options.feedbackDuration, options.feedbackDuration], [options.maxISIAfterFeedback, options.maxISIAfterFeedback]]);

  // factorMatrix 2*3 min max mean
  var factorMatrix = _experimentMathjs2.default.matrix([[1, 0, 1 / 2], [0, 1, 1 / 2]]);

  // predictionDurationMatrix 4*3
  var predictionDurationMatrix = _experimentMathjs2.default.multiply(timeDurationMatrix, factorMatrix);

  // sumPredictionDurationVector 1*3
  var sumPredictionDurationVector = _experimentMathjs2.default.multiply(_experimentMathjs2.default.matrix([1, 1, 1, 1]), predictionDurationMatrix);

  var predictionsDurationPerBlock = _experimentMathjs2.default.multiply(sumPredictionDurationVector, numberOfPredictionEventsPerBlock);

  // duration of one block
  var observationDurationMatrix = _experimentMathjs2.default.matrix((0, _experimentJs.rep)(observationsDurationPerBlock, 3));

  var durationPerBlock = _experimentMathjs2.default.add(observationDurationMatrix, predictionsDurationPerBlock);

  // let total duration for one level min max mean in miliseconds
  var totalDuration = _experimentMathjs2.default.multiply(durationPerBlock, options.numberOfBlocks + options.numberOfRandomBlocks).toArray();

  return {
    min: totalDuration[0],
    max: totalDuration[1],
    mean: totalDuration[2]
  };
};

// Object.defineProperty(TaskObject, "durationLevelOne", {
//     get: function durationLevelOne() {
//         return(this.computeDurationEstimate(this.))
//     }
// });

var softMaxByRow = function softMaxByRow() {
  var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var temperature = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.2;

  var proportionArray = [];
  var sumRow = [];
  for (var i = 0; i < model.length; i++) {
    if (model[i].constructor === Array) {
      sumRow[i] = _experimentMathjs2.default.sum(_experimentMathjs2.default.exp(_experimentMathjs2.default.divide(model[i], temperature)));
      proportionArray[i] = [];
      for (var j = 0; j < model[i].length; j++) {
        proportionArray[i][j] = _experimentMathjs2.default.exp(model[i][j] / temperature) / sumRow[i];
      }
    } else {
      sumRow[i] = _experimentMathjs2.default.sum(_experimentMathjs2.default.exp(_experimentMathjs2.default.divide(model, temperature)));
      proportionArray[i] = _experimentMathjs2.default.exp(model[i] / temperature) / sumRow[i];
    }
  }

  return proportionArray;
};

var prediction = function prediction() {
  var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  model = getValidTransitionArray(model);
  var modelProportions = void 0;

  var optionsBase = {
    algorithm: 'SOFTMAX',
    temperature: 2
  };

  options = _lodash2.default.extend(optionsBase, options);

  if (options.algorithm === 'SOFTMAX') {
    modelProportions = softMaxByRow(model);
  } else if (options.algorithm === 'MAX') {
    modelProportions = getDominantCellByRow(getProportionArray(model));
  } else {
    modelProportions = getProportionArray(model);
  }

  return sampleNextTransition(modelProportions, position);
};

var learnerPredict = function learnerPredict() {
  var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var optionsBase = {
    learnerType: 'structural',
    rules: ['mainTransitionOut', 'mainTransitionIn'], // noSquare, noBack, noSelf, or All
    offset: 0.01,
    learningRate: 0.2,
    temperature: 2,
    trueModel: null, // if set to a transition matrix the function also returns accuracy compared to optimal performer
    trialType: null,
    algorithm: 'SOFTMAX'
  };

  options = _lodash2.default.extend(optionsBase, options);

  /* --- Check if the offset to prefill action values [0,1] bording values --- */

  if (options.offset > 1 || options.offset < 0) {
    throw new Error('TaskObject.learnerPredict: offset needs to be between 0 and 1.');
  }

  var algorithm = options.algorithm;
  if (['SOFTMAX', 'MAX', 'PROPORTIONAL'].indexOf(algorithm) === -1) {
    throw new Error('TaskObject.learnerPredict: algorithm is of invalid type (SOFTMAX, MAX or PROPORTIONAL).');
  }

  if (options.rules.indexOf('dominantStructure') !== -1 && options.trueModel === null) {
    throw new Error('TaskObject.learnerPredict: using the dominantStructure rule necessitate options.trueModel to be set.');
  }

  /* --- constants --- */
  // const trialLearning = 'learning'
  // const trialProbe = 'probe'
  // const trialFeedback = 'feedback'

  /* --- Check if trial type is null or of the correct format --- */
  if (options.trialType !== null) {
    if (options.trialType.constructor !== Array) {
      throw new Error('TaskObject.learnerPredict: options.trialType should be an array or null');
    }

    if (options.trialType.length !== sequence.length) {
      throw new Error('TaskObject.learnerPredict: options.trialType should be of same length');
    }
  }

  var observedMatrix = (0, _experimentJs.matrix)(4, 4, 0);
  var model = (0, _experimentJs.matrix)(4, 4, options.offset);
  var predictions = [];
  var optimalPredictions = [];
  var sameAsOptimal = [];
  var sameAsOptimalProbability = [];
  var sameAsSequence = [];
  var sameAsSequenceProbability = [];

  /* --- Has the learner learned that there is no self transition ? --- */
  if (options.learnerType === 'structural' && options.rules.indexOf('noSelf') !== -1) {
    // set auto transition to 0
    (0, _experimentJs.diag)(model, 0);
  }

  /* --- Start learning --- */

  var _loop7 = function _loop7(i) {
    var currentPosition = sequence[i];

    /* --- Do first prediction --- */
    var predictionPosition = prediction(model, currentPosition, {
      algorithm: algorithm
    });
    predictions.push(predictionPosition);

    var dominantArray = null;
    if (options.trueModel !== null) {
      dominantArray = getDominantCellByRow(options.trueModel);
      var optimalPrediction = sampleNextTransition(dominantArray, currentPosition);
      optimalPredictions.push(optimalPrediction);
      sameAsOptimal.push(optimalPrediction === predictionPosition ? 1 : 0);
      sameAsOptimalProbability.push(model[currentPosition][optimalPrediction]);
    }

    /* --- At the end of the sequence stop learning --- */

    if (i === sequence.length - 1) {
      return 'break';
    }

    /*
     * If position is a feedback or a learning that leads to a probe,
     * do not learn (probe and observation sequence are independant)
     */
    if (options.trialType !== null) {
      // if trial type is not set do not fill the array to limit the risk of false conclusions
      if (options.trialType[i + 1] === 'probe' || options.trialType[i] === 'feedback') {
        sameAsSequence.push(null);
        sameAsSequenceProbability.push(null);
        return 'continue';
      } else {
        sameAsSequence.push(predictionPosition === sequence[i + 1] ? 1 : 0);
        sameAsSequenceProbability.push(model[currentPosition][sequence[i + 1]]);
      }
    }

    /* --- Learn from next transition --- */

    /*
     * Reinforcement learning derived from Q Learning,
     * discout factor of 0 due to the design of the task (markov chain ergodic and graph strongly connected)
     */
    var targetPosition = sequence[i + 1];
    observedMatrix[currentPosition][targetPosition] += 1;
    // debuglog("options.trialType i+1: " + options.trialType[i + 1]);
    // debuglog("options.trialType i: " + options.trialType[i]);
    console.warn('' + currentPosition + sequence[i + 1]);
    /* --- learnerType determine the update --- */
    switch (options.learnerType) {
      case 'structural':
        if (options.rules.indexOf('dominantStructure') !== -1) {
          (function () {
            // check if the transition is dominant
            var dominant = false;
            if (dominantArray[currentPosition][targetPosition] === 1) {
              dominant = true;
            }
            // update model

            var _loop9 = function _loop9(positionIndex) {
              model[positionIndex] = _lodash2.default.map(model[positionIndex], function (value, index) {
                if (dominant && dominantArray[positionIndex][index] === 1) {
                  return value + options.learningRate * (1 - value) / 4;
                } else if (!dominant && dominantArray[positionIndex][index] !== 1) {
                  return value + options.learningRate * (1 - value) / 12;
                }
                return value;
              });
            };

            for (var positionIndex = 0; positionIndex < model.length; positionIndex++) {
              _loop9(positionIndex);
            }
          })();
        } else {
          if (options.rules.indexOf('mainTransitionOut') !== -1) {
            // penalize other transitions from same origin state i
            model[currentPosition] = _lodash2.default.map(model[currentPosition], function (value, index) {
              if (index !== targetPosition) {
                return value * (1 - options.learningRate);
              }
              return value + options.learningRate * (1 - value);
            });
          }

          if (options.rules.indexOf('mainTransitionIn') !== -1) {
            // penalize other transitions going to same target state i+1
            for (var positionIndex = 0; positionIndex < model.length; positionIndex++) {
              if (positionIndex !== currentPosition && positionIndex !== targetPosition) {
                model[positionIndex][targetPosition] *= 1 - options.learningRate;
              }
            }
          }
        }

        break;
      case 'nonStructural':
        {
          var value = model[currentPosition][targetPosition];
          model[currentPosition][targetPosition] = value + options.learningRate * (1 - value);
          break;
        }
      default:
        throw new Error('TaskObject.learnerPredict: invalid learner type ' + options.learnerType);
    }
  };

  _loop8: for (var i = 0; i < sequence.length; i++) {
    var _ret7 = _loop7(i);

    switch (_ret7) {
      case 'break':
        break _loop8;

      case 'continue':
        continue;}
  }

  /* --- Transform the model into proportions after learning --- */


  var modelProportions = getProportionArray(model);

  /* --- Setup return object --- */
  var returnObject = {
    finalModel: modelProportions,
    predictions: predictions,
    sameAsSequence: sameAsSequence,
    sameAsSequenceProbability: sameAsSequenceProbability
  };

  if (optimalPredictions.length > 0) {
    returnObject.optimalPredictions = optimalPredictions;
    returnObject.sameAsOptimal = sameAsOptimal;
    returnObject.sameAsOptimalProbability = sameAsOptimalProbability;
  }

  return returnObject;
};

// usefull for unittest ?
var updateWithRule = function updateWithRule() {
  var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();
  var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _experimentJs.mandatory)();
  var learningRate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _experimentJs.mandatory)();
  // eslint-disable-line
  switch (rule) {
    case 'mainTransitionOut':
    case 'mainTransitionIn':
    case 'noSelf':
    case 'noSquare':
    case 'noBack':
    case 'all':
      break;
    default:
      throw new Error('taskObject.updateWithRule: invalid rule');
  }
};

/* ======= Sampling functions ======= */

/**
 * sampleExponential - Function that return a random sample from an exponential
 * distribution of the form
 *    P(x,lambda) = lambda * exp (-lambda*x)
 *
 * With the rate parameter lambda = 1 / mean
 *
 * @param {number} [mean=1]     Mean of the distribution
 * @param {null}   [min=null]   Min value returned
 * @param {null}   [max=null]   Max value returned
 * @param {null}   [jitter=null] If max or min value reached, to avoid a heap up on the boundaries. If null, default to 5% of mean.
 * @param {array}  [pWindow=[]] Window to restrict the probability default to [0.001,0.999]
 *
 * @returns {numeric} Sample value
 */
var sampleExponential = function sampleExponential() {
  var mean = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var jitter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var pWindow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [0.001, 0.999];

  var p = _experimentMathjs2.default.random(pWindow[0], pWindow[1]);
  var lambda = 1 / mean;
  // p = math.min(Math.max(p, ), );
  jitter = jitter === null ? mean * 0.05 : jitter;

  var sample = -Math.log(1 - p) / lambda;

  sample = min === null ? sample : Math.max(sample, min + Math.random() * jitter);
  sample = max === null ? sample : Math.min(sample, max - Math.random() * jitter);

  // Consider p as the CDF to return a sample value
  return sample;
};

exports.sampleExponential = sampleExponential;
exports.softMaxByRow = softMaxByRow;
exports.prediction = prediction;
exports.updateWithRule = updateWithRule;
exports.learnerPredict = learnerPredict;
exports.computeDurationEstimate = computeDurationEstimate;
exports.randomColor = randomColor;
exports.getDensity = getDensity;
exports.promiseBestSequencesForAllBlocksAndSave = promiseBestSequencesForAllBlocksAndSave;
exports.insertSequenceObjectAtBlock = insertSequenceObjectAtBlock;
exports.getFullSequenceObjectForClassicLevels = getFullSequenceObjectForClassicLevels;
exports.promiseFullSequenceForOneLevel = promiseFullSequenceForOneLevel;
exports.promiseFullSequenceForIntermitentPrediction = promiseFullSequenceForIntermitentPrediction;
exports.getFullSequenceObjectForRandomBlackoutBlock = getFullSequenceObjectForRandomBlackoutBlock;
exports.promiseSegmentsAndProbesByBlock = promiseSegmentsAndProbesByBlock;
exports.promiseMultipleRandomSequences = promiseMultipleRandomSequences;
exports.promiseMultipleSequences = promiseMultipleSequences;
exports.promiseSequenceFromTransitionMatrix = promiseSequenceFromTransitionMatrix;
exports.smoothSequenceDistribution = smoothSequenceDistribution;
exports.getObservedAndDistanceMatrix = getObservedAndDistanceMatrix;
exports.getObservedArrays = getObservedArrays;
exports.matrixKlDivergence = matrixKlDivergence;
exports.getDominantProbabilityByRow = getDominantProbabilityByRow;
exports.getDominantCellByRow = getDominantCellByRow;
exports.getValidTransitionArray = getValidTransitionArray;
exports.sampleNextTransition = sampleNextTransition;
exports.sampleTransitions = sampleTransitions;
exports.vectorToPosition = vectorToPosition;
exports.positionToVector = positionToVector;
exports.getZeroOrderTransitionMatrix = getZeroOrderTransitionMatrix;
exports.getRandomTransitionMatrix = getRandomTransitionMatrix;
exports.getTransitionMatrixFromBase = getTransitionMatrixFromBase;
exports.computeValidStateSpace = computeValidStateSpace;
exports.getBaseGraphMatrices = getBaseGraphMatrices;
exports.getAspectRatio = getAspectRatio;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkIdleAndConnection = exports.showAll = exports.hideAll = exports.setBlackScreen = exports.setAgentOpacity = exports.getAgentPositionOnTile = exports.animateAgentToTile = exports.moveAgentToTile = exports.setMargins = exports.setAgent = exports.getAgentMarginsOnTile = exports.drawPredictionTiles = exports.highlightPosition = exports.getTileSize = exports.getTileMargins = exports.getTilePositions = exports.clearTiles = exports.disposeOfButtons = exports.addButton = exports.drawTiles = exports.redrawAssets = undefined;

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

var _taskUtilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* --- Redraw assets due to bug when resize NOTE bug origin Babylon --- */
var redrawAssets = function redrawAssets() {
  var rabbitFaceTexture = this.taskObject.cloneAssetIntoScene(this.R.get.rabbitFace, this.scene);
  var wolfFaceTexture = this.taskObject.cloneAssetIntoScene(this.R.get.wolfFace, this.scene);
  var crossSheet = this.taskObject.cloneAssetIntoScene(this.R.get.crossSheet, this.scene);
  wolfFaceTexture.hasAlpha = true;
  rabbitFaceTexture.hasAlpha = true;
  crossSheet.hasAlpha = true;

  var elements2D = this.stateManager.get('elements2D');

  var crossSprite = this.R.get.cross_predict;
  var crossOpacity = 0;
  var loaderOpacity = 1;
  var loaderValue = 0;
  var wolfOpacity = 0;
  var rabbitOpacity = 0;
  var agentType = 'wolf';
  var tiles = [];
  if (elements2D !== null) {
    crossOpacity = elements2D.cross.opacity;
    crossSprite = elements2D.cross.spriteFrame;
    elements2D.cross.levelVisible = false;

    wolfOpacity = elements2D.wolfFaceSprite.opacity;
    elements2D.wolfFaceSprite.levelVisible = false;

    rabbitOpacity = elements2D.rabbitFaceSprite.opacity;
    elements2D.rabbitFaceSprite.levelVisible = false;

    agentType = elements2D.agentType;

    loaderOpacity = elements2D.loader.opacity;
    loaderValue = elements2D.loader.value;
    elements2D.loader.levelVisible = false;

    if (elements2D.tiles && elements2D.tiles.length && 'levelVisible' in elements2D.tiles[0]) {
      var levelV = elements2D.tiles[0].levelVisible;
      this.stateManager.call('drawTiles');
      elements2D.tiles.forEach(function (e) {
        e.levelVisible = levelV;
      });
    }
    tiles = elements2D.tiles;
  }

  var cross = new _experimentBabylonJs2.default.Sprite2D(crossSheet, {
    parent: this.scene.initialCanvas,
    id: 'cross',
    marginAlignment: 'v: center, h: center',
    spriteSize: new _experimentBabylonJs2.default.Size(20, 20),
    spriteLocation: new _experimentBabylonJs2.default.Vector2(0, 0)
  });

  cross.spriteFrame = crossSprite;
  cross.opacity = crossOpacity;

  /* --- Setup the loader --- */
  var loader = new _experimentJs.Loader({ parent: this.scene.initialCanvas, size: new _experimentBabylonJs2.default.Size(25, 25), border: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0.7, 0.7, 0.7, 1)), borderThickness: 2 });
  loader.value = loaderValue;
  loader.opacity = loaderOpacity;
  loader.margin.leftPixels = 1;
  loader.margin.rightPixels = 0;
  loader.margin.topPixels = 0;
  loader.margin.bottomPixels = 0.5;

  /* --- Create Sprites --- */
  var minSize = Math.min(this.taskObject.renderSize.width, this.taskObject.renderSize.height);
  var wolfFaceSprite = new _experimentBabylonJs2.default.Sprite2D(wolfFaceTexture, {
    parent: this.scene.initialCanvas,
    id: 'wolfFaceSprite',
    origin: _experimentBabylonJs2.default.Vector2.Zero(),
    marginAlignment: 'v: center, h: center',
    zOrder: 1,
    size: new _experimentBabylonJs2.default.Size(minSize * this.R.get.agent_scale, minSize * this.R.get.agent_scale / (0, _taskUtilities.getAspectRatio)(wolfFaceTexture))
  });

  wolfFaceSprite.opacity = wolfOpacity;

  var rabbitFaceSprite = new _experimentBabylonJs2.default.Sprite2D(rabbitFaceTexture, {
    parent: this.scene.initialCanvas,
    id: 'rabbitFaceSprite',
    origin: _experimentBabylonJs2.default.Vector2.Zero(),
    marginAlignment: 'v: center, h: center',
    size: new _experimentBabylonJs2.default.Size(minSize * this.R.get.agent_scale, minSize * this.R.get.agent_scale / (0, _taskUtilities.getAspectRatio)(rabbitFaceTexture)),
    zOrder: 1
  });

  rabbitFaceSprite.opacity = rabbitOpacity; // TODO Make that levelVisible = false

  var agent = agentType === 'wolf' ? wolfFaceSprite : rabbitFaceSprite;

  /* --- Set up the resize hook --- */
  // scene.updateContentFrame = () => {
  //   wolfFaceSprite.size = new BABYLON.Size(taskObject.renderSize.width * R.get.agent_scale, (taskObject.renderSize.width * R.get.agent_scale) / getAspectRatio(wolfFaceTexture))
  //   rabbitFaceSprite.size = new BABYLON.Size(taskObject.renderSize.width * R.get.agent_scale, (taskObject.renderSize.width * R.get.agent_scale) / getAspectRatio(rabbitFaceTexture))
  // }

  /* --- Setup stateManager globals --- */
  elements2D = {
    canvas: this.scene.initialCanvas,
    cross: cross,
    wolfFaceSprite: wolfFaceSprite,
    rabbitFaceSprite: rabbitFaceSprite,
    agent: agent,
    agentType: 'wolf',
    tiles: tiles,
    loader: loader
  };

  this.stateManager.setGlobal('elements2D', elements2D);
  this.stateManager.call('moveAgentToTile', { tile: this.stateManager.get('lastMove', 1) });
};

/* --- Setup stateManager functions --- */
var clearTiles = function clearTiles() {
  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.clearTiles: this.taskObject is undefined');
  }

  var stateManager = this.stateManager;

  var elements2D = stateManager.get('elements2D');
  var canvas = elements2D.canvas;

  if (elements2D.tiles.length > 0) {
    var ntile = elements2D.tiles.length;
    for (var j = 0; j < ntile; j++) {
      elements2D.tiles[j].dispose();
    }
    elements2D.tiles = [];

    for (var i = 0; i < ntile; i++) {
      var tileOpacity = 0;

      elements2D.tiles[i] = new _experimentBabylonJs2.default.Rectangle2D({
        parent: canvas,
        id: 'tile' + i,
        position: new _experimentBabylonJs2.default.Vector2(1, 1),
        width: new _experimentBabylonJs2.default.Vector2(1, 1),
        height: new _experimentBabylonJs2.default.Vector2(1, 1),
        border: null,
        opacity: 0,
        borderThickness: null,
        fill: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0.8, 0.8, 0.8, tileOpacity)),
        zOrder: 0.1
      });
    }

    (0, _experimentJs.debuglog)('stateManager.clearTiles: resolved');
  } else {
    (0, _experimentJs.debugWarn)('stateManager.clearTiles: resolved - no tile to clear');
  }

  return elements2D.tiles;
};

var addButton = function addButton() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.addButton: this.taskObject is undefined');
  }

  var stateManager = this.stateManager;
  var canvas = stateManager.get('elements2D').canvas;

  var baseOptions = {
    id: 'button' + stateManager.timeInMs,
    text: 'text',
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0.8, 0.8, 0.8, 1)),
    clickEventData: null,
    fontName: '30pt Arial',
    baseOpacity: 0.8,
    hoverOpacity: 1,
    zOrder: -0.5,
    marginAlignment: null,
    fontSignedDistanceField: true,
    margin: {},
    padding: {},
    parent: canvas
  };

  baseOptions.margin.leftPixels = 0;
  baseOptions.margin.rightPixels = 0;
  baseOptions.margin.topPixels = 0;
  baseOptions.margin.bottomPixels = 0;
  baseOptions.padding.leftPixels = 0;
  baseOptions.padding.rightPixels = 0;
  baseOptions.padding.topPixels = 0;
  baseOptions.padding.bottomPixels = 0;
  baseOptions.margin = _lodash2.default.extend(baseOptions.margin, options.margin);
  baseOptions.padding = _lodash2.default.extend(baseOptions.padding, options.padding);
  options.margin = baseOptions.margin;
  options.padding = baseOptions.padding;

  // extend options
  options = _lodash2.default.extend(baseOptions, options);

  var buttonOptions = {};
  var margin = {};
  var padding = {};
  if (options.marginAlignment === null) {
    buttonOptions = {
      parent: options.parent,
      id: options.id,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      fill: options.fill,
      zOrder: options.zOrder,
      roundRadius: 0,
      children: [new _experimentBabylonJs2.default.Text2D(options.text, {
        fontName: options.fontName,
        marginVAlignment: 'v: center',
        fontSignedDistanceField: options.fontSignedDistanceField,
        marginHAlignment: 3
      })]
    };
  } else {
    buttonOptions = {
      parent: options.parent,
      id: options.id,
      width: options.width,
      height: options.height,
      fill: options.fill,
      zOrder: options.zOrder,
      marginAlignment: options.marginAlignment,
      roundRadius: 0,
      children: [new _experimentBabylonJs2.default.Text2D(options.text, {
        fontName: options.fontName,
        marginVAlignment: 'v: center',
        fontSignedDistanceField: options.fontSignedDistanceField,
        marginHAlignment: 3
      })]
    };
    margin = options.margin;
    padding = options.padding;
  }

  // create button and add to canvas
  var buttonRect = new _experimentBabylonJs2.default.Rectangle2D(buttonOptions);

  buttonRect.opacity = options.baseOpacity;

  if (margin !== null) {
    buttonRect.margin.rightPixels = options.margin.rightPixels; // TODO make that a specific function in the framework
    buttonRect.margin.leftPixels = options.margin.leftPixels;
    buttonRect.margin.topPixels = options.margin.topPixels;
    buttonRect.margin.bottomPixels = options.margin.bottomPixels;
  }

  if (padding !== null) {
    buttonRect.padding.rightPixels = padding.rightPixels;
    buttonRect.padding.leftPixels = padding.leftPixels;
    buttonRect.padding.topPixels = padding.topPixels;
    buttonRect.padding.bottomPixels = padding.bottomPixels;
  }

  // Add an observable for hovering
  buttonRect.pointerEventObservable.add(function () {
    buttonRect.opacity = options.hoverOpacity;
  }, _experimentBabylonJs2.default.PrimitivePointerInfo.PointerOver);

  buttonRect.pointerEventObservable.add(function () {
    buttonRect.opacity = options.baseOpacity;
  }, _experimentBabylonJs2.default.PrimitivePointerInfo.PointerOut);

  // Add an observable for clicking
  if (options.clickEventData !== null && options.clickEventData.constructor === _experimentJs.EventData) {
    buttonRect.pointerEventObservable.add(function () {
      options.clickEventData.happenedAt = stateManager.timeInMs;
      options.clickEventData.data.button = buttonRect.id;

      stateManager.addEvent(options.clickEventData);
    }, _experimentBabylonJs2.default.PrimitivePointerInfo.PointerUp);
  }

  return buttonRect;
};

var disposeOfButtons = function disposeOfButtons() {
  var elements2D = this.stateManager.get('elements2D');

  if (typeof elements2D.levelButtons !== 'undefined') {
    if (elements2D.levelButtons.constructor === _experimentJs.Array) {
      for (var i = 0; i < elements2D.levelButtons.length; i++) {
        elements2D.levelButtons[i].dispose();
      }
      elements2D.levelButtons = [];
    }
  }

  return 'disposeOfButtons: buttons disposed.';
};

var getTileSize = function getTileSize() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'normal';
  // eslint-disable-line
  if (typeof this.taskObject === 'undefined') {
    return 'stateManager.drawTiles: this.taskObject is undefined';
  }

  var taskObject = this.taskObject;
  var R = this.R;

  var greaterLength = Math.min(taskObject.renderSize.width * R.get.agent_scale * R.get.tile_scale, taskObject.renderSize.height * R.get.agent_scale * R.get.tile_scale);

  return new _experimentBabylonJs2.default.Vector2(greaterLength, greaterLength);
  // TODO ?
  // if (type == "normal") {
  //
  // } else {
  //
  // }
};

var setMargins = function setMargins(prim, margin) {
  prim.margin.rightPixels = margin.rightPixels; // TODO make that a specific function in the framework
  prim.margin.leftPixels = margin.leftPixels;
  prim.margin.topPixels = margin.topPixels;
  prim.margin.bottomPixels = margin.bottomPixels;
};

var drawTiles = function drawTiles() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.taskObject === 'undefined') {
    return 'stateManager.drawTiles: this.taskObject is undefined';
  }

  var baseOptions = {
    hightlight: -1,
    type: 'learning',
    withKeys: false,
    fontName: '14pt Verdana'
  };

  options = _lodash2.default.extend(baseOptions, options);

  var stateManager = this.stateManager;
  var R = this.R;

  var elements2D = stateManager.get('elements2D');
  var canvas = elements2D.canvas;

  // stateManager.call('clearTiles')

  /* --- Show cross --- */
  elements2D.cross.opacity = R.get.cross_opacity;

  /* --- Set default infobox value --- */
  if (!elements2D.keysInfoboxText || !elements2D.keysInfobox) {
    elements2D.keysInfobox = [];
    elements2D.keysInfoboxText = [];
  }

  /* --- Build Tiles --- */
  var tilePositions = stateManager.call('getTilePositions');
  var normalSize = stateManager.call('getTileSize');
  var tileMargins = stateManager.call('getTileMargins');

  // const infoboxMargins = null
  if (!(0, _experimentJs.hasConstructor)(_experimentJs.String, options.withKeys) || options.withKeys.length !== 4) {
    options.withKeys = null;
  } else {
    // infoboxMargins = _.clone(tileMargins)
    // infoboxMargins[0].rightPixels += normalSize.x/2
    // infoboxMargins[0].bottomPixels += normalSize.y/2
    //
    // infoboxMargins[1].left += normalSize.x/2
    // infoboxMargins[1].bottomPixels += normalSize.y/2
    //
    // infoboxMargins[2].left += normalSize.x/2
    // infoboxMargins[2].topPixels -= normalSize.y/2
    //
    // infoboxMargins[3].right += normalSize.x/2
    // infoboxMargins[3].topPixels -= normalSize.y/2
  }

  var fullOpacity = R.get.tile_fullOpacity;
  var lowOpacity = R.get.tile_lowOpacity;
  // var highlightedSize = normalSize.scale(1.3);

  var fontSuperSample = false;
  var fontSignedDistanceField = true;

  var tileOpacity = lowOpacity;

  // const predictionColor = [0.9, 0.7, 0, tileOpacity]
  var normalColor = [0.8, 0.8, 0.8, 1];

  for (var i = 0; i < 4; i++) {
    if (elements2D.tiles.length <= i) {
      (0, _experimentJs.debuglog)('loop' + options.type);
      tileOpacity = lowOpacity;
      if (options.hightlight === i) {
        tileOpacity = fullOpacity;
      }
      console.warn('NORMAL SIZE:', normalSize);
      var normalTile = new _experimentBabylonJs2.default.Rectangle2D({
        parent: canvas,
        id: 'tile' + i,
        marginAlignment: 'h: center, v: center',
        // position: tilePositions[i].subtract(normalSize.scale(0.5)),
        width: normalSize.x,
        height: normalSize.y,
        border: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new (Function.prototype.bind.apply(_experimentBabylonJs2.default.Color4, [null].concat(normalColor)))()),
        borderThickness: 2,
        fill: null, // BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.8, 0.8, 0.8, tileOpacity)),
        zOrder: 0.1
      });
      elements2D.tiles[i] = normalTile;
    } else {
      elements2D.tiles[i].width = normalSize.x;
      elements2D.tiles[i].height = normalSize.y;
    }

    setMargins(elements2D.tiles[i], tileMargins[i]);

    if ((0, _experimentJs.hasConstructor)(_experimentBabylonJs2.default.Rectangle2D, elements2D.keysInfobox[i]) && !(0, _experimentJs.hasConstructor)(_experimentJs.String, options.withKeys)) {
      elements2D.keysInfobox[i].levelVisible = false;
    } else if ((0, _experimentJs.hasConstructor)(_experimentBabylonJs2.default.Rectangle2D, elements2D.keysInfobox[i]) && (0, _experimentJs.hasConstructor)(_experimentJs.String, options.withKeys)) {
      if ((0, _experimentJs.hasConstructor)(_experimentBabylonJs2.default.Text2D, elements2D.keysInfoboxText[i])) {
        elements2D.keysInfoboxText[i] = options.withKeys[i];
      }
      elements2D.keysInfobox[i].levelVisible = true;
    } else if (!(0, _experimentJs.hasConstructor)(_experimentBabylonJs2.default.Rectangle2D, elements2D.keysInfobox[i]) && (0, _experimentJs.hasConstructor)(_experimentJs.String, options.withKeys)) {
      elements2D.keysInfobox[i] = new _experimentBabylonJs2.default.Rectangle2D({
        parent: elements2D.tiles[i],
        id: 'keyInfoBackground' + i,
        width: 50,
        height: 50,
        marginAlignment: 'h: center, v: top',
        fill: _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0.64, 0.64, 0.64, 0.5))
      });

      elements2D.keysInfoboxText[i] = new _experimentBabylonJs2.default.Text2D(options.withKeys[i], {
        parent: elements2D.keysInfobox[i],
        fontName: options.fontName,
        marginAlignment: 'h: center, v: center',
        fontSuperSample: fontSuperSample,
        fontSignedDistanceField: fontSignedDistanceField
      });
    }

    // switch (options.type) {
    //   case 'learning':
    //     elements2D.tiles[i] = normalTile
    //     break
    //   case 'prediction':
    //     debuglog('prediction')
    //     elements2D.tiles[i] = new BABYLON.Rectangle2D({
    //       parent: canvas,
    //       id: `tile${i}`,
    //       position: tilePositions[i].subtract(normalSize.scale(0.5)),
    //       width: normalSize.x,
    //       height: normalSize.y,
    //       border: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(...predictionColor)),
    //       borderThickness: 10,
    //       fill: null, // options.hightlight === i ? BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.8, 0.8, 0.8, tileOpacity)) : null,
    //       zOrder: 0.1,
    //     })
    //     break
    //   case 'noAnswer':
    //     debuglog('drawTiles: noAnswer')
    //     elements2D.tiles[i] = new BABYLON.Rectangle2D({
    //       parent: canvas,
    //       id: `tile${i}`,
    //       position: tilePositions[i].subtract(normalSize.scale(0.5)),
    //       width: normalSize.x,
    //       height: normalSize.y,
    //       border: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.9, 0, 0, tileOpacity)),
    //       borderThickness: 10,
    //       fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.3, 0, 0, tileOpacity)),
    //       zOrder: 0.1,
    //     })
    //     break
    //   default:
    //     throw new Error(`stateManager.drawTiles: options.type ${options.type} is not a valid type.`)
    // }
  }

  return elements2D.tiles;
};

var getTileMargins = function getTileMargins() {
  var stateManager = this.stateManager;
  var R = this.R;

  var canvas = stateManager.get('elements2D').canvas;

  var tileSize = stateManager.call('getTileSize');

  var offset = R.get.tile_offset;

  if (typeof canvas === 'undefined') {
    throw new Error('StateManager.getTilePositions: canvas is undefined.');
  }

  var margins = [{ leftPixels: 0, topPixels: 0, rightPixels: tileSize.x / 2 + offset, bottomPixels: tileSize.y / 2 + offset }, // top left 0
  { rightPixels: 0, topPixels: 0, leftPixels: tileSize.x / 2 + offset, bottomPixels: tileSize.y / 2 + offset }, // top right 1
  { rightPixels: 0, bottomPixels: 0, leftPixels: tileSize.x / 2 + offset, topPixels: tileSize.y / 2 + offset }, // bottom right 2
  { leftPixels: 0, bottomPixels: 0, rightPixels: tileSize.x / 2 + offset, topPixels: tileSize.y / 2 + offset }];

  return margins;
};

var getTilePositions = function getTilePositions() {
  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.getTilePositions: this.taskObject is undefined');
  }
  var stateManager = this.stateManager;
  var R = this.R;

  var canvas = stateManager.get('elements2D').canvas;

  var tileSize = stateManager.call('getTileSize');
  var center = {
    w: canvas.width / 2,
    h: canvas.height / 2
  };
  var offset = R.get.tile_offset;

  if (typeof canvas === 'undefined') {
    throw new Error('StateManager.getTilePositions: canvas is undefined.');
  }

  var positions = [new _experimentBabylonJs2.default.Vector2(center.w - (tileSize.x / 2 + offset), center.h + (tileSize.y / 2 + offset)), // one is top left
  new _experimentBabylonJs2.default.Vector2(center.w + (tileSize.x / 2 + offset), center.h + (tileSize.y / 2 + offset)), new _experimentBabylonJs2.default.Vector2(center.w + (tileSize.x / 2 + offset), center.h - (tileSize.y / 2 + offset)), new _experimentBabylonJs2.default.Vector2(center.w - (tileSize.x / 2 + offset), center.h - (tileSize.y / 2 + offset))];

  return positions;
};

var highlightPosition = function highlightPosition() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.stateManager === 'undefined') {
    throw new Error('stateManager.highlightPosition: this.stateManager is undefined');
  }

  if (typeof options.position === 'undefined') {
    throw new Error('stateManager.highlightPosition: options.position is undefined');
  }

  return this.stateManager.promise('drawTiles', {
    hightlight: options.position,
    type: typeof options.type !== 'undefined' ? options.type : 'prediction'
  });
};

var drawPredictionTiles = function drawPredictionTiles() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { withKeys: false },
      _ref$withKeys = _ref.withKeys,
      withKeys = _ref$withKeys === undefined ? false : _ref$withKeys;

  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: this.taskObject is undefined');
  } else {
    return this.stateManager.promise('drawTiles', {
      type: 'prediction',
      withKeys: withKeys
    });
  }
};

var setAgent = function setAgent() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.taskObject === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: this.taskObject is undefined');
  }

  if (typeof options.agent === 'undefined') {
    throw new Error('stateManager.setAgent: options.agent is undefined');
  }

  var stateManager = this.stateManager;

  var elements2D = stateManager.get('elements2D');
  // const currentPosition = elements2D.agent.position
  var currentMargin = elements2D.agent.margin;

  elements2D.agent.opacity = 0;
  switch (options.agent) {
    case 'wolf':
      elements2D.agent = elements2D.wolfFaceSprite;
      break;
    case 'rabbit':
      elements2D.agent = elements2D.rabbitFaceSprite;
      break;
    default:
      throw new Error('stateManager.setAgent: options.agent ' + options.agent + ' is of invalid type.');
  }

  elements2D.agentType = options.agent;
  // elements2D.agent.position = currentPosition
  elements2D.agent.margin = currentMargin;

  return elements2D.tiles[options.positions];
};

var getAgentPositionOnTile = function getAgentPositionOnTile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.stateManager === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: stateManager is undefined');
  }

  if (typeof options.tile === 'undefined') {
    throw new Error('stateManager.setAgent: tile is undefined');
  }

  var stateManager = this.stateManager;

  var elements2D = stateManager.get('elements2D');
  var agent = elements2D.agent;

  var scaledAgentSize = new _experimentBabylonJs2.default.Vector2(agent.size.width, agent.size.height).scaleInPlace(agent.scale);

  var tilePositions = stateManager.call('getTilePositions');

  var newPosition = tilePositions[options.tile].subtract(scaledAgentSize.scale(0.5));

  return newPosition;
};

var getAgentMarginsOnTile = function getAgentMarginsOnTile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.stateManager === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: stateManager is undefined');
  }

  if (typeof options.tile === 'undefined') {
    throw new Error('stateManager.setAgent: tile is undefined');
  }

  var stateManager = this.stateManager;

  var elements2D = stateManager.get('elements2D');
  var agent = elements2D.agent;

  // const scaledAgentSize = (new BABYLON.Vector2(agent.size.width, agent.size.height)).scaleInPlace(agent.scale)

  var offsetH = 0; // no need ... it is based on the center of the sprite... (stateManager.call('getTileSize').y - agent.size.height) / 4
  var offsetW = 0; // (stateManager.call('getTileSize').x - agent.size.width) / 4

  var tileMargins = stateManager.call('getTileMargins')[options.tile];

  var newMargins = {
    leftPixels: tileMargins.leftPixels === 0 ? 0 : tileMargins.leftPixels + offsetW,
    rightPixels: tileMargins.rightPixels === 0 ? 0 : tileMargins.rightPixels + offsetW,
    topPixels: tileMargins.topPixels === 0 ? 0 : tileMargins.topPixels + offsetH,
    bottomPixels: tileMargins.bottomPixels === 0 ? 0 : tileMargins.bottomPixels + offsetH

    // const newPosition = tilePositions[options.tile].subtract(scaledAgentSize.scale(0.5))

  };return newMargins;
};

var moveAgentToTile = function moveAgentToTile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.stateManager === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: stateManager is undefined');
  }

  if (typeof options.tile === 'undefined') {
    throw new Error('stateManager.setAgent: tile is undefined');
  }
  var elements2D = this.stateManager.get('elements2D');
  var agent = elements2D.agent;
  // agent.position = this.stateManager.call('getAgentPositionOnTile', options)
  agent.margin = _lodash2.default.extend(agent.margin, this.stateManager.call('getAgentMarginsOnTile', options));
  this.stateManager.set('lastMove', options.tile);

  if (typeof options.opacity !== 'undefined') {
    this.stateManager.call('setAgentOpacity', {
      opacity: options.opacity
    });
  }

  return agent;
};

var animateAgentToTile = function animateAgentToTile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.stateManager === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: stateManager is undefined');
  }

  if (typeof options.tile === 'undefined') {
    throw new Error('stateManager.setAgent: tile is undefined');
  }
  var elements2D = this.stateManager.get('elements2D');
  var agent = elements2D.agent;
  var newPosition = this.stateManager.call('getAgentPositionOnTile', options);

  if (typeof options.opacity !== 'undefined') {
    this.stateManager.call('setAgentOpacity', {
      opacity: options.opacity
    });
  }
  // TODO Do not dispose of the tiles, just play on opacity. TODO fix the animations

  var deferred = new _experimentJs.Deferred();
  /* --- Create an animation that lasts 100ms of the target sliding to new position --- */
  var animation = new _experimentBabylonJs2.default.Animation('slideToPosition', 'position', 100, _experimentBabylonJs2.default.Animation.ANIMATIONTYPE_VECTOR2, _experimentBabylonJs2.default.Animation.ANIMATIONLOOPMODE_CONSTANT);

  var keys = [];
  keys.push({
    frame: 0,
    value: agent.position
  });
  keys.push({
    frame: 10,
    value: newPosition
  });

  animation.setKeys(keys);
  var end = new _experimentBabylonJs2.default.AnimationEvent(10, function () {
    deferred.resolve();
  }, true);

  animation.addEvent(end);
  agent.animations.push(animation);
  this.scene.beginAnimation(agent, 0, 11);
  return deferred.promise;
  // TODO create a this.animate(object, property, keys, loop)
};

var setAgentOpacity = function setAgentOpacity() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.stateManager === 'undefined') {
    throw new Error('stateManager.drawPredictionTiles: this.stateManager is undefined');
  }

  if (typeof options.opacity === 'undefined') {
    throw new Error('stateManager.setAgent: options.opacity is undefined');
  }

  var elements2D = this.stateManager.get('elements2D');
  var agent = elements2D.agent;

  agent.opacity = options.opacity;

  return agent;
};

var setBlackScreen = function setBlackScreen() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var baseOptions = { // TODO create a defaultOptions()
    on: true
  };

  options = _lodash2.default.extend(baseOptions, options);
  var elements2D = this.stateManager.getGlobal('elements2D');
  var canvas = elements2D.canvas;

  if (!_lodash2.default.has(elements2D, 'blackScreen')) {
    var blackScreen = new _experimentBabylonJs2.default.Rectangle2D({
      parent: canvas,
      id: 'blackScreen',
      position: new _experimentBabylonJs2.default.Vector2(0, 0),
      width: canvas.size.width,
      height: canvas.size.height,
      zOrder: 0
    });

    elements2D.blackScreen = blackScreen;
  }

  if (options.on) {
    elements2D.blackScreen.opacity = 1;
  } else {
    elements2D.blackScreen.opacity = 0;
  }
};

var hideAll = function hideAll() {
  var stateManager = this.stateManager;

  var elements2D = stateManager.get('elements2D');

  elements2D.agent.levelVisible = false;
  elements2D.cross.levelVisible = false;
  elements2D.loader.levelVisible = false;
  elements2D.tiles.forEach(function (t) {
    t.levelVisible = false;
  });
};

var showAll = function showAll() {
  var stateManager = this.stateManager;

  var elements2D = stateManager.get('elements2D');

  elements2D.agent.levelVisible = true;
  elements2D.cross.levelVisible = true;
  elements2D.loader.levelVisible = true;
  elements2D.tiles.forEach(function (t) {
    t.levelVisible = true;
  });
};

var checkIdleAndConnection = function checkIdleAndConnection() {
  var _this = this;

  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { deferred: new _experimentJs.Deferred(), returnToState: null },
      _ref2$deferred = _ref2.deferred,
      deferred = _ref2$deferred === undefined ? new _experimentJs.Deferred() : _ref2$deferred,
      _ref2$returnToState = _ref2.returnToState,
      returnToState = _ref2$returnToState === undefined ? null : _ref2$returnToState;

  var stateManager = this.stateManager;
  var R = this.R;
  var dataManager = this.dataManager;
  var connection = this.connection;
  returnToState = returnToState || stateManager.currentStateKey;

  dataManager.query('getLastInteraction', null, connection, deferred);
  return deferred.promise.then(function (r) {
    var delay = stateManager.timeInMs - r.lastInteraction;
    var delayMin = delay / 60000;
    if (delay > 30 * 60 * 1000) {
      // TODO idle for too long
      (0, _experimentJs.debugWarn)('running.goToNextPosition: idle for too long');
      stateManager.set('endReason', 'You were idle for more than 30 min: ' + delayMin + ' min');
      stateManager.goToState(R.get.states_end);
    } else if (stateManager.currentStateKey !== returnToState) {
      stateManager.goToState(returnToState);
    }
  }).catch(function () {
    // TODO lost connection
    (0, _experimentJs.debugWarn)('running.goToNextPosition: lost connection');

    if (stateManager.currentStateKey !== R.get.states_idle) {
      stateManager.call('hideAll');
      stateManager.onNext(_this.R.get.events_unfrozen, function () {
        stateManager.call('showAll');
      });
      _this.state.freeze();
      stateManager.goToState(R.get.states_idle);
    }

    _this.taskObject.modal({ type: 'centralLarge', title: R.get.lostConnectionTitle, content: R.get.lostConnectionContent }).then(function () {
      return (0, _experimentJs.delay)(50);
    }).then(function () {
      stateManager.call('checkIdleAndConnection', { returnToState: returnToState });
    });
  });
};

exports.redrawAssets = redrawAssets;
exports.drawTiles = drawTiles;
exports.addButton = addButton;
exports.disposeOfButtons = disposeOfButtons;
exports.clearTiles = clearTiles;
exports.getTilePositions = getTilePositions;
exports.getTileMargins = getTileMargins;
exports.getTileSize = getTileSize;
exports.highlightPosition = highlightPosition;
exports.drawPredictionTiles = drawPredictionTiles;
exports.getAgentMarginsOnTile = getAgentMarginsOnTile;
exports.setAgent = setAgent;
exports.setMargins = setMargins;
exports.moveAgentToTile = moveAgentToTile;
exports.animateAgentToTile = animateAgentToTile;
exports.getAgentPositionOnTile = getAgentPositionOnTile;
exports.setAgentOpacity = setAgentOpacity;
exports.setBlackScreen = setBlackScreen;
exports.hideAll = hideAll;
exports.showAll = showAll;
exports.checkIdleAndConnection = checkIdleAndConnection;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorials = exports.awakeTutorial = exports.showModal = exports.showNextPage = undefined;

var _experimentJs = __webpack_require__(0);

var intro = {
  title: { en: 'Catch the wolf' },
  content: {
    en: '\n    <h5>Welcome ! \uD83D\uDC4B\uD83C\uDFFD \uD83D\uDE04 </h5>\n    The members of Bavelier lab extend a warm welcome to you from Geneva! We are very grateful that you took interest in our experiment !<br>\n    This short tutorial will go over the mechanics of the task to make sure all is clear before you start !<br><br>\n    <h5>General description</h5>\n    The goal of the task is to look at how a wolf moves across four positions of the screen,\n    and predict where it is going to appear next using the keyboard.<br>\n    Each trial will be composed of an observation phase and most of the times a prediction phase.<br>\n    You will go through <b>four levels</b> of increasing difficulty.<br>\n    The task will last between \u23F1<b>1 and 2 hours</b>\u23F1  depending on the breaks you will take.<br><br>'
  }
};

var disclaimer = {
  title: { en: '⚠️ IMPORTANT ⚠️ ' },
  content: {
    en: '<b>After you complete the four levels of the task you will receive your HIT code.</b>\n  Some behavior will lead to a premature stop of the task without possibility to pass it again:\n  <ul>\n    <li>Taking breaks over the allowed time limit: no breaks during levels and maximum 15min between levels</li>\n    <li>If you do not answer more than 5 times in a row or if the window is out of focus the game will pause for maximum 30sec per level before stopping</li>\n    <li>Loosing connection to the server for more than 15min*</li>\n    <li>Not answering on more than 20% of trials</li>\n    <li>Cheating or obvious behavior showing lack of engagement</li>\n  </ul>\n  A countdown will appear before the task is stopped to warn you (* except if you lose connection).<br>\n  If you accept those conditions please do proceed. \u270C\uD83C\uDFFD\uD83D\uDE09 '
  }
};

var trialInstruction = {
  title: { en: 'Observation and Prediction' },
  content: { en: '<h5>Observation phase</h5>\n    When a trial starts you will first observe the position of the wolf for a split second before he disapears,\n    then there is a short delay when you do not need to press any key.\n    During this phase the center square will be full:\n    <br>\n      <center><img src=\'./assets/sprites/cross/fullSquare.svg\'></center>\n    <br><br>\n    <h5>Prediction phase</h5>\n    Then there will be a sudden modification of the cross at the center of\n    the screen, with dotted border:\n    <br>\n      <center><img src=\'./assets/sprites/cross/predictionSquare.svg\'></center>\n    <br>\n\n    This modification marks the begining of the prediction phase. As soon as you see this open square you will have to predict\n    as fast as you can the next position of the wolf using the keyboard. After you have predicted, you will wait for a short while\n    until the wolf appears to his new position. Failling to answer 5 times in a row will pause the task.\n    <br>' }
};

var fourLevels = {
  title: { en: 'Four levels' },
  content: { en: '\n    <h5>The levels</h5>\n    There will be <b>four levels</b> in this task, the first three levels are relatively short and will last around 10min each.\n    The fourth level is supposed to be passed in an MRI and will be slower, it will last for around 30min.\n    <br><br>\n    <h5>Breaks</h5>\n    You cannot pause the game during levels and if you open another page/program, or if you do not respond for too long the game will pause.\n    If the game is pause for more than 30sec total on a level the experiment will stop. <br>\n    Breaks are allowed between levels, but as it is the case in all experiments involving learning, long pauses may have a strong\n    and uncontrolled impact on your ability to learn and may affect our results in unpredictable ways. That is why we will allow for breaks no longer than 15 minutes.<br>\n    To complete the tasks it will take you between 1 and 2 hours depending on the length of the break you will take<br><br>' }
};

var progressInstruction = {
  title: { en: 'Progress' },
  content: { en: '\n    During each level you will be able to evaluate your progress through the progress indicator around the central square,\n    as you progress the square will gradually get fuller:\n    <br><br>\n      <center><img width="20" height="20" src=\'./assets/sprites/cross/predictionSquareWithLoader.gif\'></center>\n    <br>' }
};

var keyboardInstruction = {
  title: { en: 'Keyboard keys' },
  content: { en: 'To complete this task you will use the keyboard only.\n    <br>\n    <center><img src="./assets/sprites/keyboard/fullsize_color_legend.png"></center>\n    <br>\n    The keys you will be using are :\n    <ul>\n      <li>D - to pick the top left position</li>\n      <li>C - to pick the bottom left position</li>\n      <li>K - to pick the top right position</li>\n      <li>M - to pick the bottom right position</li>\n      <li>Space bar - to pause and reach the menu</li>\n    </ul>\n    ' }
};

var introToTryout = {
  title: { en: "Let's try!" },
  content: { en: 'Ok. You will now try a short sequence of trials so you can familiarize yourself with the task.\n        <br>\n        Good luck, and thank you for your participation ! \uD83D\uDC4D\uD83C\uDFFD\n        <br><br>\n        The Bavelier Lab team\n        ' }
};

var correctPrediction = {
  title: { en: 'Correct !' },
  content: { en: 'Well done, this prediction was correct ! <br>\n    No signal will explicitely tell you wether you were right or wrong. But if you see the wolf appear where you predicted,\n    it will count as a correct trial.\n        ' }
};

var incorrectPrediction = {
  title: { en: 'Incorrect !' },
  content: { en: 'Well done, this prediction was correct ! <br>\n    No signal will explicitely tell you wether you were right or wrong. But if you see the wolf appear where you predicted,\n    it will count as a correct trial.\n        ' }
};

var askContinue = {
  title: { en: 'End tutrial ?' },
  content: { en: 'Do you feel confident you understand the task ? <br>\n    If not you can restart the tutorial by clicking here: <button class="btn btn-secondary dragbox-button smartmodal-closebutton" onClick="window.taskObject.context.stateManager.newEvent(\'restartTutorial\')">Restart tutorial</button>\n    <br><br>\n      Please be aware that too much missing values (when you do not respond) makes our data unusable, cheating risk altering our results and might make us draw wrong conclusions.<br>\n      For this reason at the end of the task an algorithm will check the validity of the data.\n      If the data is not valid you will not receive the bonus payment for adequate completion and we will refrain from using your service in future studies.\n\n      <br><br>\n      If you feel confident, close the window to start the task !\n        ' }
};

var fmriIntro = {
  title: { en: 'Last Level' },
  content: { en: '\n      <h5>The next part will be slower</h5>\n      Thank you and congratulations for finishing the first three parts ! <br>\n      The next part is adapted for a future study in the lab where we will have to use an MRI machine to\n      image the brain of our subjects as they perform the task. Because of this, this next part will be slower.<br>\n      It is not a bug, and the goal remains the same: predict the next position correctly ! <br>\n      Because it is slower, the task is segmented in <b>three "blocks"</b> of 50 trials, between which you can take a short break of max 5 minutes.<br>\n      <br>\n      <h5>You will sometime have to catch a rabbit !</h5>\n      The rabbit does not behave like the wolf, it will be your job to find how to best predict its next position.<br>\n      You will go through a short tutorial so you can familliarize yourself with the rabbit.<br>\n      The rabbit will appear in the second block and you will have to predict its movement for 50 trials.' }
};

var fmriDelay = {
  title: { en: 'New feature: delays' },
  content: { en: 'A new change is that you will not predict right after observing the new position of the agent (wolf or rabbit).<br>\n    The agent will appear for a short time, then disapear. You will have to wait a short delay before predicting. <br>\n    As before the signal for you to hit the keyboard will be given by the central cross change to an open square:\n    <br>\n      <center><img src=\'./assets/sprites/cross/predictionSquare.svg\'></center>\n    <br>\n    ' }
};

var lockedCross = {
  title: { en: 'New feature: Locked state' },
  content: { en: 'You will have a certain amount of time to predict, like in previous state. But in this level after the prediction time is over, you will get into a short "locked state".\n  <br>During this state you will not be able to predict and you will have to wait for the next position of the agent.<br>\n    In locked mode the center cross will be a full square if you did not predict:\n    <br>\n      <center><img src=\'./assets/sprites/cross/fullSquare.svg\'></center>\n    <br><br>\n    Or will be locked in the position you picked, here it is locked top-left:\n    <br>\n      <center><img src=\'./assets/sprites/cross/lockedTopLeft.svg\'></center>\n    <br><br>' }
};

var catchRabbit = {
  title: { en: 'New feature: Trials without prediction' },
  content: { en: 'On some of the trials you will not be asked to answer. The central square will stay with continuous borders, and the wolf or the rabbit will just move without any prediction phase.' }
};

var askfMRIContinue = {
  title: { en: 'End tutorial ?' },
  content: { en: 'Do you feel confident you understand this new part of the task ? <br>\n    If not you can restard the tutorial by clicking here: <button class="btn btn-secondary dragbox-button smartmodal-closebutton" onClick="window.taskObject.context.stateManager.newEvent(\'restartTutorial\')">Restart tutorial</button>\n    <br><br>\n      If you feel confident, close the window to start the task !' }
};

var noResponse = {
  title: { en: 'Are you still here ??' },
  content: { en: 'You did not answer for a while, the game was paused to make sure you were still paying attention.<br>\n    Too much missing values makes our data unusable, cheating risk altering our results and might make us draw wrong conclusions.<br>\n    For this reason at the end of the task an algorithm will check the validity of the data. If the data is not valid you will not receive the bonus payment for adequate completion and we will refrain from using your service in future studies.\n        ' }
};

var level2Start = {
  title: { en: 'Start level 2 !' },
  content: { en: 'Congratulations on finishing level 1 ! <br>\n    You will now start level 2, it is a bit harder ! ' }
};

var level3Start = {
  title: { en: 'Start level 3 !' },
  content: { en: 'Congratulations on finishing level 1 and level 2 ! <br>\n    You will now start level 3. This level is, again, a little harder.<br>\n    <br>\n    Good luck ! ' }
};

var tutorials = { disclaimer: disclaimer,
  intro: intro,
  trialInstruction: trialInstruction,
  keyboardInstruction: keyboardInstruction,
  introToTryout: introToTryout,
  correctPrediction: correctPrediction,
  incorrectPrediction: incorrectPrediction,
  askContinue: askContinue,
  fmriIntro: fmriIntro,
  askfMRIContinue: askfMRIContinue,
  level2Start: level2Start,
  level3Start: level3Start,
  noResponse: noResponse,
  progressInstruction: progressInstruction,
  fourLevels: fourLevels,
  catchRabbit: catchRabbit,
  fmriDelay: fmriDelay,
  lockedCross: lockedCross };

var pageOrderTutorialOne = ['intro', 'disclaimer', 'trialInstruction', 'fourLevels', 'progressInstruction', 'keyboardInstruction', 'introToTryout'];
var pageOrderTutorialFMRI = ['fmriIntro', 'catchRabbit', 'fmriDelay', 'lockedCross'];

var awakeTutorial = function awakeTutorial() {
  var currentTutorial = this.stateManager.get('currentTutorial', 1);

  var pageOrder = currentTutorial === 1 ? pageOrderTutorialOne : pageOrderTutorialFMRI;

  this.stateManager.set('currentPage', pageOrder[0]);

  var showIntro = new _experimentJs.EventData(this.R.get.events_showModal, this.stateManager.timeInMs + 100, { page: pageOrder[0] });
  this.stateManager.addTimeTriggerEvent(showIntro);
};

var showModal = function showModal(_ref) {
  var _this = this;

  var _ref$data$page = _ref.data.page,
      page = _ref$data$page === undefined ? 'intro' : _ref$data$page;

  if (this.taskObject.currentModal !== null) {
    try {
      this.taskObject.currentModal.modalBox.destroy(); // TODO think about wether callback or not etc.
    } catch (e) {
      (0, _experimentJs.debugWarn)(e);
    }
  }

  (0, _experimentJs.delay)(50).then(function () {
    // TODO Check why you have to do that ...
    if (tutorials.hasOwnProperty(page)) {
      var tutorial = tutorials[page];
      var event = new _experimentJs.EventData(_this.R.get.events_modalDismissed, { page: page });
      _this.taskObject.modal({ type: 'centralLarge', title: tutorial.title.en, content: tutorial.content.en, event: event });
    }
  });
};

var showNextPage = function showNextPage(_ref2) {
  var _ref2$data$page = _ref2.data.page,
      currentPage = _ref2$data$page === undefined ? this.stateManager.get('currentPage', 'intro') : _ref2$data$page;

  var currentTutorial = this.stateManager.get('currentTutorial', 1);
  var pageOrder = currentTutorial === 1 ? pageOrderTutorialOne : pageOrderTutorialFMRI;
  var R = this.R;

  var currentIndex = pageOrder.indexOf(currentPage);
  if (currentIndex !== -1) {
    if (currentIndex !== pageOrder.length - 1) {
      var showEvent = new _experimentJs.EventData(R.get.events_showModal, { page: pageOrder[currentIndex + 1] });
      this.stateManager.addEvent(showEvent);
    } else {
      (0, _experimentJs.debuglog)('state.showNextPage: end of tutorial.');
      this.stateManager.goToState(R.get.states_tryout, true); // TODO make it able to use the state object as well
    }
  } else {
    throw new Error('state.showNextPage: invalid currentPage.');
  }
};

exports.showNextPage = showNextPage;
exports.showModal = showModal;
exports.awakeTutorial = awakeTutorial;
exports.tutorials = tutorials;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * startUp.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This file holds the code that should run on your HTML page after all the framework and page is loaded.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Here you should :
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - create the taskObject
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - set up the parameters of the task
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - register loading promise
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - register the scenes generators
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - start the task
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * - bind the task paramBox with relevant parameters
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Do not pollute the global space with too much variables.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Here two global variables are created : taskObject and calibrator.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


// import LoadingScene from './scenes/LoadingScene' Using default loading


var _jquery = __webpack_require__(16);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentJs = __webpack_require__(0);

var _experimentBoxes = __webpack_require__(14);

var _MainScene = __webpack_require__(8);

var _MainScene2 = _interopRequireDefault(_MainScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.taskObject = null;
window.calibrator = null;

// When page is loaded, initiate the task
var defferedDomLoaded = new _experimentJs.Deferred();
document.addEventListener('DOMContentLoaded', function () {
  defferedDomLoaded.resolve();
});

if (typeof window !== 'undefined') {
  /* === Get the absolute path of the library === */
  var scripts = document.getElementsByTagName('script');
  if (scripts.length) {
    var assetsFolderFullpath = scripts[scripts.length - 1].src;
    var delimiterIndices = assetsFolderFullpath.indicesOf('/');
    window.assetsFolderFullpath = assetsFolderFullpath.substr(0, delimiterIndices[delimiterIndices.length - 2]);
  } else {
    window.assetsFolderFullpath = './';
  }
}

var R = new _experimentJs.RessourceManager();
window.p1 = defferedDomLoaded.promise;
window.p2 = R.addFiles(window.assetsFolderFullpath + '/assets/sequences/sequencesJune2017.json', window.assetsFolderFullpath + '/assets/json/ressources.json');

var imageToPreload = [window.assetsFolderFullpath + '/assets/sprites/cross/predictionSquare.svg', window.assetsFolderFullpath + '/assets/sprites/keyboard/fullsize_color_legend.png', window.assetsFolderFullpath + '/assets/sprites/cross/fullSquare.svg', window.assetsFolderFullpath + '/assets/sprites/cross/predictionSquareWithLoader.gif'];

var _preloadImages = _experimentJs.preloadImages.apply(undefined, imageToPreload),
    _preloadImages2 = _slicedToArray(_preloadImages, 2),
    p3 = _preloadImages2[0],
    preloadedImages = _preloadImages2[1];

Object.assign(window, { p3: p3, preloadedImages: preloadedImages });

window.loadingPromise = Promise.all([window.p1, window.p2, window.p3]);

window.loadingPromise.then(function () {
  var taskObject = new _experimentJs.TaskObject((0, _jquery2.default)('.task-canvas'));
  taskObject.R.mergeWith(R);

  /* --- Setup custom parameters --- */

  // Setup sequences and get sequence objects for each levels
  //  Model level 1 : 1, 4, 2, 3 -- 51 positions (50 trials) 0.9
  var fullSequenceObjectLevel1 = R.get['fullSequenceObjectLevel1Classic0.90-1423-0.08errorTotal']; // getFullSequenceObjectForClassicLevels(R.get.sequenceLevel1)

  //  Model level 2 : 1, 2, 4, 3 -- 76 positions (75 trials) 0.85
  var fullSequenceObjectLevel2 = R.get['fullSequenceObjectLevel2Classic0.85-1243-0.25errorTotal']; // getFullSequenceObjectForClassicLevels(R.get.sequenceLevel2)

  // Model level 3 : 1, 3, 4, 2 -- 101 positions 0.75
  var fullSequenceObjectLevel3 = R.get['fullSequenceObjectLevel3Classic0.75-1342-0.096errorTotal']; // getFullSequenceObjectForClassicLevels(R.get.sequenceLevel3)

  // Level 4 is 1, 3, 2, 4 -- 0.75 -- 20% no go -- 51 positions * 2 (wolf) + 50 positons * 2 (rabbit) = 150 transitions
  var fullSequenceObjectLevel4 = R.get['levelFourWithRandomAndNogoDependant-1324-0.75-0.32TotalError'];
  // const levelFourJSON = R.get.sequenceObjectLevel4
  //
  // const levelFourJSONNolearning = R.get.sequenceObjectLevel4NoLearning
  //
  // const levelFourJSONBlackouts = R.get.sequenceObjectLevel4Blackouts
  //
  // const levelFourJSONIndependant = R.get.sequenceObjectLevel4Independant

  var baseLevel = {
    level: 0,
    sequence: null,
    numberOfBlocks: 0,
    sequenceObject: null,
    dominantProbability: 0.9,
    dominantStructure: '1423',
    observationDuration: 500,
    interObservationDuration: 50, // to add ?
    probeObservationDuration: 1000,
    predictionDuration: 2500,
    feedbackDuration: 1500,
    minISIAfterLearning: 2500,
    maxISIAfterLearning: 3500,
    minISIAfterFeedback: 2500,
    maxISIAfterFeedback: 3500,
    observationSegmentSizes: [1],
    observationSegmentRepetitionPerBlock: 75,
    feedbackType: 'transition'
  };

  var levelOne = {
    level: 1,
    dominantProbability: 0.9,
    dominantStructure: '1423',
    numberOfBlocks: 1,
    sequenceObject: fullSequenceObjectLevel1
  };

  levelOne = _lodash2.default.extend(baseLevel, levelOne);

  taskObject.parameters.levelOne = levelOne;

  var levelTwo = {
    level: 2,
    dominantProbability: 0.85,
    dominantStructure: '1243',
    sequenceObject: fullSequenceObjectLevel2
  };

  taskObject.parameters.levelTwo = _lodash2.default.extend(_lodash2.default.clone(baseLevel), levelTwo);

  var levelThree = {
    level: 3,
    dominantProbability: 0.75,
    dominantStructure: '1342',
    sequenceObject: fullSequenceObjectLevel3
  };

  taskObject.parameters.levelThree = _lodash2.default.extend(_lodash2.default.clone(baseLevel), levelThree);

  // taskObject.parameters.levelFour = {
  //   level: 4,
  //   dominantProbability: 0.75,
  //   dominantStructure: 1324,
  //   observationDuration: 500,
  //   probeObservationDuration: 3000,
  //   predictionDuration: 2500,
  //   interObservationDuration: 50, // to add ? but different than block 1-3
  //   feedbackDuration: 1500,
  //   minISIAfterLearning: 2500,
  //   maxISIAfterLearning: 3500,
  //   minISIAfterFeedback: 2500,
  //   maxISIAfterFeedback: 3500,
  //   feedbackType: 'transition',
  //   sequenceObject: levelFourJSON,
  // }
  //
  // taskObject.parameters.levelFourNoLearning = {
  //   level: 4,
  //   dominantProbability: 0.75,
  //   observationDuration: 500,
  //   fixedISIAfterObservation: 2500,
  //   sampleMeanISIAfterObservation: 3000,
  //   predictionDuration: 2000,
  //   fixedISIAfterPrediction: 1000,
  //   sampleMeanISIAfterPrediction: 3000,
  //   fixedBlackScreenDuration: 1500,
  //   sampleMeanBlackScreen: 500,
  //   maxSampleAfterPrediction: 4000,
  //   maxSampleAfterObservation: 4000,
  //   maxSampleBlackScreen: 1000,
  //   feedbackType: 'transition',
  //   sequenceObject: levelFourJSONBlackouts,
  // }

  taskObject.parameters.levelFour = {
    level: 4,
    dominantProbability: 0.75,
    observationDuration: 500,
    dominantStructure: '1324',
    fixedISIAfterObservation: 2500,
    sampleMeanISIAfterObservation: 3000,
    predictionDuration: 2000,
    fixedISIAfterPrediction: 1000,
    sampleMeanISIAfterPrediction: 3000,
    fixedBlackScreenDuration: 1500,
    sampleMeanBlackScreen: 500,
    maxSampleAfterPrediction: 4000,
    maxSampleAfterObservation: 4000,
    maxSampleBlackScreen: 1000,
    feedbackType: 'transition',
    sound: false,
    sequenceObject: fullSequenceObjectLevel4
  };

  taskObject.parameters.levels = [taskObject.parameters.levelOne, taskObject.parameters.levelTwo, taskObject.parameters.levelThree, taskObject.parameters.levelFour];

  /* --- Setup task variables --- */
  taskObject.variables.shouldSeeInformation = true;

  /* --- Register loading scene generator --- */
  // taskObject.registerLoadingFunction(LoadingScene)
  taskObject.assetsToLoad = {
    rabbitFace: {
      path: '/assets/sprites/rabbit/rabbitFace.png',
      type: 'texture'
    },
    wolfFace: '/assets/sprites/wolf/wolfFace.png',
    crossSheet: {
      path: '/assets/sprites/cross/squareSheetMargin.svg',
      type: 'texture'
    },
    observation: {
      path: '/assets/sounds/observation.mp3',
      type: 'sound'
    },
    predict: {
      path: '/assets/sounds/predict.mp3',
      type: 'sound'
    }

    /* --- Register scene generators --- */
  };var options = {
    level: null
  };

  taskObject.registerSceneGenerator(_MainScene2.default, options);

  var sceneNames = ['loading', 'main'];

  taskObject.R.add({
    agent: {
      scale: 0.15, // compared to the minimum dimension
      predictionOpacity: 0,
      animate: false
    },
    tile: {
      scale: 2, // compared to the agent size
      offset: 40,
      fullOpacity: 0.2,
      lowOpacity: 0.2
    },
    cross: {
      opacity: 1
    }
  });

  /* list of tweakable variables from the paramBox */
  var parametersNames = ['parameters.levelFour.observationDuration', 'parameters.levelFour.fixedISIAfterObservation', 'parameters.levelFour.sampleMeanISIAfterObservation', 'parameters.levelFour.predictionDuration', 'parameters.levelFour.fixedISIAfterPrediction', 'parameters.levelFour.sampleMeanISIAfterPrediction', 'parameters.levelFour.fixedBlackScreenDuration', 'parameters.levelFour.sampleMeanBlackScreen', 'parameters.levelFour.maxSampleAfterPrediction', 'parameters.levelFour.maxSampleAfterObservation', 'parameters.levelFour.maxSampleBlackScreen'];

  var parametersConstraints = {
    feedbackType: ['transition', 'sound'],
    currentScene: sceneNames
  };

  var rParams = ['agent.scale', 'agent.predictionOpacity', 'tile.scale', 'tile.offset', 'cross.opacity'];

  taskObject.paramBox.bind(taskObject, parametersNames, parametersConstraints);
  taskObject.paramBox.bind(taskObject.R.data, rParams);

  /* --- Login --- */
  window.taskObject = taskObject;
  var tempMaxNumberOfRetry = taskObject.dataManager.MAX_NUMBER_OF_RETRY;
  var endpoint = window.assetsFolderFullpath + '/api/php/mysql/index.php';

  /**
   * This function in a form generator that is called automatically by the DataManager when the user needs to login
   * @method loginForm
   * @return {SmartForm}  a SmartForm
   */
  function loginForm() {
    var fields = {
      userId: {
        type: 'input',
        constraints: 'length:10,300', // list of constraints that will be automatically verified: mandatory; alpha; numeric; length:XX; contains:a,b,@,.;
        authorizedValues: null, // athorized values
        parent: null,
        title: 'Enter your MTurk WorkerID:'
      },
      password: {
        type: 'password', // field type: input, select, textaera, slider, radio, password
        constraints: 'length:6,300; score: 30', // list of constraints that will be automatically verified: mandatory; alpha; numeric; length:XX; contains:a,b,@,.;
        authorizedValues: null, // athorized values
        parent: null,
        title: 'Enter your password, if you are new here you are free to pick one !' // you can control auto-create account in the php api config
      }
    };
    var options = { fields: fields, title: 'Login Form', format: 'topCentralSmall', callback: function callback(fields) {
        (0, _experimentJs.debuglog)({ endpoint: endpoint, credentials: { userId: fields.userId.value, password: fields.password.value } });
      }
    };
    var form = new _experimentBoxes.SmartForm(options);
    form.buttonText = 'OK';

    var R = taskObject.context.R;
    var stateManager = taskObject.context.stateManager;

    if (stateManager) {
      stateManager.goToState(R.get.states_active);
    }

    return form;
  }

  //  If you do not want to store the credentials for the connections localy set this variable to false (the password is not stored in any case, only a logging key)
  // taskObject.dataManager.useLocalStorageCredentials = false
  taskObject.setConnection({ endpoint: endpoint, signInForm: loginForm }) // credentials: { userId: 'John', password: 'wrong' } })
  .then(function (connection) {
    return connection.loggedIn ? true : taskObject.dataManager.login(connection);
  }).then(function () {
    // reset the retry limit to its original value
    taskObject.dataManager.MAX_NUMBER_OF_RETRY = tempMaxNumberOfRetry;

    /* --- Start task --- */
    return taskObject.startTask();
  }).then(function (message) {
    (0, _experimentJs.debuglog)(message);
    taskObject.paramBox.bind(taskObject, 'currentScene', parametersConstraints);

    if (typeof taskObject.paramBox.queryString.generateSequence !== 'undefined') {
      taskObject.currentScene = 'sequenceGeneratorScene';
    } else if (sceneNames.length === 1 || typeof taskObject.paramBox.queryString.currentScene === 'undefined') {
      taskObject.currentScene = 'main';
    }
  });
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Experiment.js
 * Created. 2016
 *
 * Experiment.js toolbox.
 *
 * Authors. Albert Buchard
 *
 * Requires: lodash, BABYLON.js, mathjs, jQuery
 *
 * LICENSE Apache-2
 */

/* --- Import the framework --- */

/* add it to the global space in case user want to import in a script tag */
if (typeof window !== 'undefined') {
  __webpack_require__(6);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (_experimentJs.Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = MainScene;

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

var _globalFunctions = __webpack_require__(4);

var _active = __webpack_require__(9);

var _tutorial = __webpack_require__(5);

var _tryout = __webpack_require__(13);

var _running = __webpack_require__(12);

var _pause = __webpack_require__(11);

var _end = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* =============== Main scene =============== */
function MainScene() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // option base
  var optionsBase = {
    sceneKey: 'main',
    canvasBackground: new _experimentBabylonJs2.default.Color4(0, 0, 0, 1),
    backgroundRoundRadius: 0,
    clearColor: new _experimentBabylonJs2.default.Color4(0, 0, 0, 1),
    canvasPercentWidth: 1,
    canvasPercentHeight: 1,
    mode: 'central',
    level: null
  };

  options = _lodash2.default.extend(optionsBase, options);

  /* --- Get taskObject from context --- */
  var taskObject = this.taskObject;

  /* --- Create a basic 2D scene using a Canvas2D as background --- */
  var scene = taskObject.create2DScene(options);

  /* --- Get stateManager --- */
  var stateManager = scene.stateManager;

  /* --- Get canvas --- */
  // const canvas = scene.initialCanvas

  // const camera = scene.initialCamera

  var R = taskObject.R;

  /* --- Load assets --- */

  scene.onResize = [_globalFunctions.redrawAssets];

  var sounds = {
    observation: taskObject.cloneAssetIntoScene(R.get.sounds_observation, scene),
    prediction: taskObject.cloneAssetIntoScene(R.get.sounds_predict, scene)
  };

  stateManager.setGlobal('sounds', sounds);

  stateManager.register(_globalFunctions.drawTiles, _globalFunctions.addButton, _globalFunctions.disposeOfButtons, _globalFunctions.clearTiles, _globalFunctions.getTilePositions, _globalFunctions.getTileSize, _globalFunctions.getTileMargins, _globalFunctions.highlightPosition, _globalFunctions.drawPredictionTiles, _globalFunctions.setAgent, _globalFunctions.moveAgentToTile, _globalFunctions.animateAgentToTile, _globalFunctions.getAgentPositionOnTile, _globalFunctions.getAgentMarginsOnTile, _globalFunctions.setAgentOpacity, _globalFunctions.setBlackScreen, _globalFunctions.hideAll, _globalFunctions.showAll, _globalFunctions.redrawAssets, _globalFunctions.checkIdleAndConnection);

  stateManager.call('redrawAssets');

  /* --- Setup data --- */
  var dataManager = this.dataManager;

  /* --- Add cwData table that will hold a summary of the data --- */
  var cwDataFields = ['subject_id', 'level', 'block', 'block_type', 'dominant_structure', 'dominant_transition_probability', 'trial', 'trial_type', 'position', 'observation_duration', 'observed_transition_was_dominant', // NA for first transition in a sublevel and after prediction
  'transition_to', // NA for GO trials (non blackouts)
  'subject_choice', // NA for NOGO
  'correct', 'response_time', // NA for NOGO or no response
  'key_hits', // ['key', 'time'], [k,t], ...
  'clicks', 'has_paused', 'start_observation', 'responded_at', 'start_prediction', 'end_prediction'];

  dataManager.addTable('cwData', cwDataFields);
  dataManager.addTable('tryoutData', cwDataFields);

  var userId = 'unknown' + this.timeInMs;
  try {
    userId = dataManager.connections[0].credentials.userId;
  } catch (e) {
    (0, _experimentJs.debugError)(e);
  }

  stateManager.set('subject_id', userId);

  /* --- Add the logs for each level --- */
  var eventFields = ['id', 'flag', 'happenedAt', 'handledAt', 'data'];
  dataManager.addTable('stateRunningEventsLvl1', eventFields);
  dataManager.addTable('stateRunningEventsLvl2', eventFields);
  dataManager.addTable('stateRunningEventsLvl3', eventFields);
  dataManager.addTable('stateRunningEventsLvl4', eventFields);
  dataManager.addTable('stateActiveEvents', eventFields);

  /* --- Store scene level inside the stateManager --- */
  stateManager.setGlobal('positionData', {
    indexOnTransitionSequence: -1,
    indexOnPredictionSequence: -1,
    fullSequenceIndex: -1
  });

  stateManager.setGlobal('hasSeenLearningInfo', false);
  stateManager.setGlobal('hasSeenPredictionInfo', false);
  /* --- Setup states --- */

  /* --- Set state key and store them in the stateManager --- */
  R.add({
    states: {
      running: 'running',
      tutorial: 'tutorial',
      tryout: 'tryout',
      tryoutFMRI: 'tryoutFMRI',
      end: 'end'
    },
    checkpoint: {
      tutorialDone: ['tutorialOneDone', 'tutorialTwoDone'],
      levelDone: ['levelOneDone', 'levelTwoDone', 'levelThreeDone', 'levelFourDone'],
      taskDone: 'taskDone',
      taskEndNoComeback: 'taskEndNoComeback'
    },
    flags: {
      levelDefined: 'levelDefined'
    },
    events: {
      sequenceGenerated: 'sequenceGenerated',
      goNextPosition: 'goNextPosition',
      endObservation: 'endObservation',
      startPrediction: 'startPrediction',
      responseTimeEnded: 'responseTimeEnded',
      isiAfterLearningEnded: 'isiAfterLearningEnded',
      feedbackEnded: 'feedbackEnded',
      isiAfterFeedbackEnded: 'isiAfterFeedbackEnded',
      pauseTransition: 'pauseTransition',
      forcePause: 'forcePause',
      predictionStartBlackout: 'predictionStartBlackout',
      blackoutEnds: 'blackoutEnds',
      predictionEndsBlackout: 'predictionEndsBlackout',
      isiAfterPredictionEndsBlackout: 'isiAfterPredictionEndsBlackout',
      screenWentBlack: 'screenWentBlack',
      playPredictionSound: 'playPredictionSound',
      playObservationSound: 'playObservationSound',
      showModal: 'showModal',
      goToTutorial: 'goToTutorial',
      hasResponded: 'hasResponded',
      restartTutorial: 'restartTutorial',
      goToLevel1: 'goToLevel1',
      goToLevel2: 'goToLevel2',
      goToLevel3: 'goToLevel3',
      goToLevel4: 'goToLevel4',
      tic: 'tic',
      moreThanFiveNA: 'moreThanFiveNA',
      aknowledgedEnding: 'aknowledgedEnding'
    }
  });

  // eslint-disable-next-line

  var _stateManager$addStat = stateManager.addState(R.get.states_tutorial, R.get.states_running, R.get.states_tryout, R.get.states_end),
      _stateManager$addStat2 = _slicedToArray(_stateManager$addStat, 4),
      tutorialState = _stateManager$addStat2[0],
      runningState = _stateManager$addStat2[1],
      tryoutState = _stateManager$addStat2[2],
      endState = _stateManager$addStat2[3];

  var pauseState = stateManager.states.pause;

  /* ======== State Active ======== */
  if (options.level !== null) {
    var eventData = new _experimentJs.EventData(R.get.flags_levelDefined, scene.stateManager.timeInMs, {
      belongsTo: ['globalLog', 'stateActiveEvents'],
      handledAt: null,
      storedAt: null,
      level: options.level
    });
    stateManager.addEvent(eventData);
  } else {
    stateManager.states.active.addAwakeningFunctions(_active.selectLevel);
  }

  stateManager.states.active.addEndingFunctions(_active.endActive);

  stateManager.states.active.addEventFunctions(R.get.flags_levelDefined, _active.startLevel);
  stateManager.states.active.addEventFunctions(R.get.events_goToTutorial, function (_ref) {
    var tutorial = _ref.data.tutorial;

    stateManager.setGlobal('currentTutorial', tutorial);
    stateManager.goToState(R.get.states_tutorial);
  });

  /* ======== State RUNNING ======== */
  var goToPause = function goToPause() {
    if (this.state.shouldPause) {
      this.state.freeze();
      this.stateManager.goToState(this.R.get.states_pause);
    }
  };

  /* --- Register functions --- */
  runningState.addAwakeningFunctions(_running.startRunning);

  runningState.addEventFunctions(R.get.events_goNextPosition, _running.goToNextPosition);
  runningState.addEventFunctions(R.get.events_endObservation, _running.endObservation);

  runningState.addEventFunctions(R.get.events_startPrediction, _running.startPrediction);
  runningState.addEventFunctions(R.get.events_responseTimeEnded, _running.endPrediction);

  runningState.addEventFunctions(R.get.events_pauseTransition, _running.pauseTransition);

  runningState.addEventFunctions(R.get.events_unfrozen, _running.stateUnfrozen);
  runningState.addEventFunctions(R.get.events_forcePause, goToPause);
  runningState.addEventFunctions(R.get.events_windowBlur, goToPause);
  runningState.addEventFunctions(R.get.events_moreThanFiveNA, goToPause);

  runningState.addEventFunctions(R.get.events_click, _running.checkForClickPrediction);
  runningState.addEventFunctions(R.get.events_keydown, _running.checkKeyStrokeForPrediction);

  runningState.addEventFunctions(R.get.events_playPredictionSound, _running.playSound);
  runningState.addEventFunctions(R.get.events_playObservationSound, _running.playSound);

  /* ======= State Tutorial ======= */
  tutorialState.addAwakeningFunctions(_tutorial.awakeTutorial);

  tutorialState.addEventFunctions(R.get.events_modalDismissed, _tutorial.showNextPage);
  tutorialState.addEventFunctions(R.get.events_showModal, _tutorial.showModal);

  tutorialState.addEventFunctions(R.get.events_playPredictionSound, _running.playSound);
  tutorialState.addEventFunctions(R.get.events_playObservationSound, _running.playSound);

  /* ======= State Tryout ======= */
  dataManager.addTable('stateTryout1', eventFields);
  dataManager.addTable('stateTryout2', eventFields);

  tryoutState.addAwakeningFunctions(_tryout.awakeTryout);
  tryoutState.addEndingFunctions(_tryout.tryoutEnd);

  tryoutState.addEventFunctions(R.get.events_goNextPosition, _tryout.tryoutGoToNextPosition);
  tryoutState.addEventFunctions(R.get.events_endObservation, _running.endObservation);

  tryoutState.addEventFunctions(R.get.events_startPrediction, _tryout.tryoutStartPrediction);
  tryoutState.addEventFunctions(R.get.events_responseTimeEnded, _tryout.tryoutEndPrediction);
  tryoutState.addEventFunctions(R.get.flags_levelDefined, _active.startLevel);
  tryoutState.addEventFunctions(R.get.events_restartTutorial, function () {
    stateManager.goToState(R.get.states_tutorial);
  });

  tryoutState.addEventFunctions(R.get.events_keydown, _tryout.tryoutCheckKeyStrokeForPrediction);
  tryoutState.addEventFunctions(R.get.events_click, _running.checkForClickPrediction);

  /* ======== State Pause ======== */
  // stateManager.setPauseKeyStroke()
  pauseState.addAwakeningFunctions(_pause.awakenPause);
  pauseState.addEndingFunctions(_pause.endPause);
  pauseState.addEventFunctions(R.get.events_keydown, _pause.pauseKeyDown);
  pauseState.addEventFunctions(R.get.events_windowFocus, _pause.pauseKeyDown);
  // pauseState.addEventFunctions(R.get.flags_levelDefined, startLevel)
  // pauseState.addEndingFunctions(function () { this.stateManager.promise('disposeOfButtons') })

  /* ======= prematureEnd State ======= */
  endState.addAwakeningFunctions(_end.awakenEnd);

  return scene;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endActive = exports.selectLevel = exports.startLevel = undefined;

var _experimentJs = __webpack_require__(0);

var selectLevel = function selectLevel() {
  var _this = this;

  if (typeof this.state === 'undefined') {
    throw new Error('state.selectLevel: state is undefined');
  }

  var stateManager = this.stateManager;
  var dataManager = this.dataManager;
  // const elements2D = stateManager.get('elements2D')
  // const GUI = stateManager.get('GUI')
  var R = this.R;

  var checkTaskDone = dataManager.query('hasCheckpoint', { checkpoint: R.get.checkpoint_taskDone }, this.connection);
  var checkTaskEndNoComeback = dataManager.query('hasCheckpoint', { checkpoint: R.get.checkpoint_taskEndNoComeback }, this.connection);

  stateManager.call('hideAll');
  var deferred = new _experimentJs.Deferred();

  Promise.all([checkTaskDone, checkTaskEndNoComeback]).then(function (results) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var result = _step.value;

        if (typeof result.code === 'undefined') {
          if (stateManager.currentStateKey !== R.get.states_idle) {
            stateManager.goToState(R.get.states_idle);
          }

          _this.taskObject.modal({ type: 'centralLarge', title: R.get.lostConnectionTitle, content: R.get.lostConnectionContent }).then(function () {
            return (0, _experimentJs.delay)(50);
          }).then(function () {
            stateManager.call('checkIdleAndConnection', { returnToState: 'active' });
          });
        } else if (result.code === R.get.checkpoint_taskDone || result.code === R.get.checkpoint_taskEndNoComeback) {
          stateManager.set('endReason', result.message);
          stateManager.goToState(R.get.states_end);

          deferred.resolve('active.selectLevel: end of task');
          return false;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _this.dataManager.query('getCheckpoint', null, _this.connection);
  }).then(function (result) {
    if (result !== false) {
      if (typeof result.code === 'undefined') {
        if (stateManager.currentStateKey !== R.get.states_active) {
          stateManager.goToState(R.get.states_idle);
        }

        _this.taskObject.modal({ type: 'centralLarge', title: R.get.lostConnectionTitle, content: R.get.lostConnectionContent }).then(function () {
          return (0, _experimentJs.delay)(50);
        }).then(function () {
          stateManager.call('checkIdleAndConnection', { returnToState: 'active' });
        });
      }

      var eventLevel = void 0;
      switch (result.code) {
        case R.get.checkpoint_tutorialDone[0]:
          eventLevel = new _experimentJs.EventData(R.get.flags_levelDefined, stateManager.timeInMs, { level: 1 });
          break;
        case R.get.checkpoint_tutorialDone[1]:
          eventLevel = new _experimentJs.EventData(R.get.flags_levelDefined, stateManager.timeInMs, { level: 4 });
          break;
        case R.get.checkpoint_levelDone[0]:
          eventLevel = new _experimentJs.EventData(R.get.flags_levelDefined, stateManager.timeInMs, { level: 2 });
          break;
        case R.get.checkpoint_levelDone[1]:
          eventLevel = new _experimentJs.EventData(R.get.flags_levelDefined, stateManager.timeInMs, { level: 3 });
          break;
        case R.get.checkpoint_levelDone[2]:
          eventLevel = new _experimentJs.EventData(R.get.events_goToTutorial, stateManager.timeInMs, { tutorial: 2 });
          break;
        case R.get.checkpoint_levelDone[3]:
          stateManager.set('endReason', 'You finished the task finished');
          stateManager.goToState(R.get.states_end);
          break;
        case R.get.checkpoint_taskDone:
          stateManager.set('endReason', result.message);
          stateManager.goToState(R.get.states_end);
          break;
        case R.get.checkpoint_taskEndNoComeback:
          stateManager.set('endReason', result.message);
          stateManager.goToState(R.get.states_end);
          break;
        default:
          // Start tutorial
          eventLevel = new _experimentJs.EventData(R.get.flags_levelDefined, stateManager.timeInMs, { level: 4 }); // TODO TAKE THAT BACk
        // eventLevel = new EventData(R.get.events_goToTutorial, stateManager.timeInMs, { tutorial: 1 })
      }

      (0, _experimentJs.delay)(150).then(function () {
        stateManager.addEvent(eventLevel);
      });
      deferred.resolve('active.selectLevel: level selected - resolved');
    }
  }).catch(function () {
    if (stateManager.currentStateKey !== R.get.states_active) {
      stateManager.goToState(R.get.states_idle);
    }

    _this.taskObject.modal({ type: 'centralLarge', title: R.get.lostConnectionTitle, content: R.get.lostConnectionContent }).then(function () {
      return (0, _experimentJs.delay)(50);
    }).then(function () {
      stateManager.call('checkIdleAndConnection', { returnToState: 'active' });
    });
  });

  // GUI.levelVisible = true
  // /* --- Delete buttons --- */
  // stateManager.promise('disposeOfButtons')
  //
  // const eventButtonOne = new EventData(R.get.flags_levelDefined, stateManager.timeInMs, {
  //   level: 1,
  // })
  // const eventButtonTwo = new EventData(R.get.flags_levelDefined, stateManager.timeInMs, {
  //   level: 2,
  // })
  // const eventButtonThree = new EventData(R.get.flags_levelDefined, stateManager.timeInMs, {
  //   level: 3,
  // })
  // const eventButtonFour = new EventData(R.get.flags_levelDefined, stateManager.timeInMs, {
  //   level: 4,
  // })
  //
  // const eventButtonTutorialOne = new EventData(R.get.events_goToTutorial, stateManager.timeInMs, {
  //   tutorial: 1,
  // })
  // const eventButtonTutorialFour = new EventData(R.get.events_goToTutorial, stateManager.timeInMs, {
  //   tutorial: 2,
  // })
  //
  // const width = 220
  // const height = 40
  // const widthOffset = width / 2
  //
  // const buttonOptionLevelOne = {
  //   id: 'levelOne',
  //   parent: GUI,
  //   text: 'Level 1',
  //   marginAlignment: 'h: center, v: bottom',
  //   margin: {
  //     rightPixels: (width) + widthOffset,
  //     topPixels: 0,
  //   },
  //   width,
  //   height,
  //   fill: BABYLON.Canvas2D.GetSolidColorBrush(new BABYLON.Color4(0.8, 0.8, 0.8, 1)),
  //   clickEventData: eventButtonOne,
  //   callbackFunction: null,
  //   fontName: '20pt Arial',
  //   baseOpacity: 0.8,
  //   hoverOpacity: 1,
  // }
  //
  // const buttonOptionTutorialOne = _.extend(_.clone(buttonOptionLevelOne), {
  //   id: 'buttonTutorialLevelFour',
  //   text: 'Tutorial 1',
  //   margin: {
  //     rightPixels: (width) + widthOffset,
  //     bottomPixels: height,
  //   },
  //   clickEventData: eventButtonTutorialOne,
  // })
  //
  //
  // const buttonOptionLevelTwo = _.extend(_.clone(buttonOptionLevelOne), {
  //   id: 'buttonLevelTwo',
  //   text: 'Level 2',
  //   margin: {
  //     rightPixels: widthOffset,
  //     topPixels: 0,
  //   },
  //   clickEventData: eventButtonTwo,
  // })
  //
  // const buttonOptionLevelThree = _.extend(_.clone(buttonOptionLevelOne), {
  //   id: 'buttonLevelThree',
  //   text: 'Level 3',
  //   margin: {
  //     leftPixels: widthOffset,
  //     topPixels: 0,
  //   },
  //   clickEventData: eventButtonThree,
  // })
  //
  // const buttonOptionLevelFour = _.extend(_.clone(buttonOptionLevelOne), {
  //   id: 'buttonLevelFour',
  //   text: 'Level 4',
  //   margin: {
  //     leftPixels: (width) + widthOffset,
  //     topPixels: 0,
  //   },
  //   clickEventData: eventButtonFour,
  // })
  //
  // const buttonOptionTutorialFour = _.extend(_.clone(buttonOptionLevelOne), {
  //   id: 'buttonTutorialLevelFour',
  //   text: 'Tutorial 4',
  //   margin: {
  //     leftPixels: (width) + widthOffset,
  //     bottomPixels: height,
  //   },
  //   clickEventData: eventButtonTutorialFour,
  // })
  //
  // Promise.all([stateManager.promise('addButton', buttonOptionLevelOne),
  //   stateManager.promise('addButton', buttonOptionLevelTwo),
  //   stateManager.promise('addButton', buttonOptionLevelThree),
  //   stateManager.promise('addButton', buttonOptionLevelFour),
  //   stateManager.promise('addButton', buttonOptionTutorialOne),
  //   stateManager.promise('addButton', buttonOptionTutorialFour),
  // ])
  //   .then((buttons) => {
  //     elements2D.levelButtons = buttons
  //     for (const button of buttons) {
  //       button.levelVisible = true
  //     }
  //     deferred.resolve('stateManager.selectLevel: resolved')
  //   })

  return deferred.promise;
};

var startLevel = function startLevel() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (typeof this.taskObject === 'undefined') {
    throw new Error('state.startLevel: this.taskObject is undefined');
  }

  if (typeof options.data.level === 'undefined') {
    throw new Error('state.startLevel: options.level is undefined');
  }

  /* --- Get context --- */
  var taskObject = this.taskObject;
  var stateManager = this.stateManager;
  var R = this.R;
  var elements2D = stateManager.get('elements2D');
  stateManager.emptyTimeTriggerEvents();
  elements2D.agent.opacity = 0;

  /* --- Delete buttons --- */
  stateManager.promise('disposeOfButtons');

  stateManager.setGlobal('level', options.data.level);
  stateManager.setGlobal('levelObject', taskObject.parameters.levels[options.data.level - 1]);

  stateManager.set('positionData', {
    indexOnTransitionSequence: -1,
    indexOnPredictionSequence: -1,
    fullSequenceIndex: taskObject.parameters.levels[options.data.level - 1].sequenceObject.fullSequence.length - 3 // TODO PUT IT BACK -1,
  });

  if (stateManager.currentStateKey !== R.get.states_running) {
    stateManager.goToState(R.get.states_running);
  }

  return 'state.startLevel: resolved';
};

var endActive = function endActive() {
  this.stateManager.promise('disposeOfButtons');
};
exports.startLevel = startLevel;
exports.selectLevel = selectLevel;
exports.endActive = endActive;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awakenEnd = undefined;

var _experimentJs = __webpack_require__(0);

var awakenEnd = function awakenEnd() {
  var _this = this;

  var R = this.R;
  var scene = this.scene;
  this.stateManager.call('hideAll');
  scene.initialGui.levelVisible = false;
  this.dataManager.query('hasCheckpoint', { checkpoint: R.get.checkpoint_taskDone }, this.connection).then(function (r) {
    var event = new _experimentJs.EventData(_this.R.get.events_aknowledgedEnding);
    var reason = 'You completed the task !';
    var title = R.get.taskFinishedTitle;
    var content = R.get.taskFinishedContent;

    if (r.code !== R.get.checkpoint_taskDone) {
      reason = _this.stateManager.get('endReason', '');
      title = R.get.taskStoppedTitle;
      content = R.get.taskStoppedMessage;
      if (reason !== '') {
        content += R.get.taskStoppedReason.replace('{t}', reason);
      }
      _this.taskObject.setCheckpoint(R.get.checkpoint_taskEndNoComeback, reason);

      _this.taskObject.modal({ type: 'centralLarge', title: title, content: content, event: event });
    } else {
      _this.dataManager.query('getFinalCode', null, _this.connection).then(function (r) {
        content = content.replace('{c}', r.code);
        _this.taskObject.modal({ type: 'centralLarge', title: title, content: content, event: event });
      });
    }
  });
};

exports.awakenEnd = awakenEnd; //eslint-disable-line

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pauseKeyDown = exports.endPause = exports.awakenPause = undefined;

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

var _globalFunctions = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var awakenPause = function awakenPause() {
  var stateManager = this.stateManager;
  var levelObject = stateManager.get('levelObject');
  var GUI = stateManager.get('GUI');
  var R = this.R;
  var state = this.state;
  var pauseTime = stateManager.timeInMs;
  var threshold = 30 * 1000;
  state.hitKeyTime = null;
  state.initialGuiVisible = GUI.levelVisible;

  GUI.backgroundFill = _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(0, 0, 0, 1));
  GUI.levelVisible = true;

  var lastPauseInfo = stateManager.get('lastPauseInfo', { level: levelObject.level, time: pauseTime });
  if (lastPauseInfo.level !== levelObject.level) {
    stateManager.set('pauseTimeLeft', threshold);
  }

  var currentTimeLeft = stateManager.get('pauseTimeLeft', threshold);
  stateManager.set('lastPauseInfo', { level: levelObject.level, time: pauseTime });

  // datamanager get pause left
  var options = { id: 'pauseText',
    parent: GUI,
    marginAlignment: 'h: center, v: center',
    fontName: '30pt Arial',
    fontSignedDistanceField: true
  };

  state.timerText = function () {
    var timeLeft = parseInt((currentTimeLeft - stateManager.timeInMs + pauseTime) / 1000, 10);
    if (timeLeft < 0) {
      return false;
    }
    return R.get.timeLimitText.replace('{n}', (0, _experimentJs.String)(timeLeft));
  };

  state.tic = function () {
    state.centerText.levelVisible = true;
    var text = state.timerText();
    if (text === false) {
      stateManager.set('endReason', 'You were idle for more than ' + threshold / 1000 + ' min during level ' + levelObject.level);
      stateManager.goToState(R.get.states_end);
    } else {
      state.centerText.text = text;
      (0, _experimentJs.delay)(200).then(function () {
        if (stateManager.currentStateKey === R.get.states_pause) {
          state.tic();
        }
      });
    }
  };

  if (!(0, _experimentJs.hasConstructor)(_experimentBabylonJs2.default.Text2D, state.centerText)) {
    state.topText = new _experimentBabylonJs2.default.Text2D(R.get.pauseText, options);
    (0, _globalFunctions.setMargins)(state.topText, { topPixels: 0, bottomPixels: 40, leftPixels: 0, rightPixels: 0 });
    state.centerText = new _experimentBabylonJs2.default.Text2D(state.timerText(), options);
  } else {
    state.topText.levelVisible = true;
    state.centerText.levelVisible = true;
    state.centerText.text = state.timerText;
  }

  (0, _experimentJs.delay)(200).then(function () {
    if (stateManager.currentStateKey === R.get.states_pause) {
      state.tic();
    }
  });
};

var pauseKeyDown = function pauseKeyDown() {
  var state = this.state;
  var stateManager = this.stateManager;
  var levelObject = stateManager.get('levelObject');
  var R = this.R;
  var context = this;

  if (state.hitKeyTime === null) {
    state.hitKeyTime = stateManager.timeInMs;
  }

  state.timerText = function () {
    var timeLeft = Math.ceil((3000 - stateManager.timeInMs + state.hitKeyTime) / 1000, 10);
    if (timeLeft < 0) {
      return false;
    }
    return R.get.pauseRestart.replace('{n}', (0, _experimentJs.String)(timeLeft));
  };

  state.tic = function () {
    var text = state.timerText();
    if (text !== false) {
      state.centerText.text = text;
      (0, _experimentJs.delay)(200).then(function () {
        if (!document.hasFocus()) {
          var lastPauseInfo = stateManager.get('lastPauseInfo', { level: levelObject.level, time: stateManager.timeInMs });
          var previousTimeLeft = stateManager.get('pauseTimeLeft', 5 * 60 * 1000);
          var currentTimeLeft = previousTimeLeft - stateManager.timeInMs + lastPauseInfo.time;
          stateManager.set('pauseTimeLeft', currentTimeLeft);
          awakenPause.bind(context)();
        } else if (stateManager.currentStateKey === R.get.states_pause) {
          state.tic();
        }
      });
    } else if (stateManager.frozenState) {
      stateManager.goToState(stateManager.frozenState);
    }
  };

  (0, _experimentJs.delay)(200).then(function () {
    if (!document.hasFocus()) {
      awakenPause.bind(context)();
    } else if (stateManager.currentStateKey === R.get.states_pause) {
      state.tic();
    }
  });
};

var endPause = function endPause() {
  var stateManager = this.stateManager;
  var state = this.state;
  var levelObject = stateManager.get('levelObject');
  var GUI = stateManager.get('GUI');
  var R = this.R;

  GUI.backgroundFill = _experimentBabylonJs2.default.Canvas2D.GetSolidColorBrush(new _experimentBabylonJs2.default.Color4(1, 1, 1, 0));
  GUI.levelVisible = state.initialGuiVisible;

  state.hitKeyTime = null;
  state.topText.levelVisible = false;
  state.centerText.levelVisible = false;

  var lastPauseInfo = stateManager.get('lastPauseInfo', { level: levelObject.level, time: stateManager.timeInMs });
  var previousTimeLeft = stateManager.get('pauseTimeLeft', 5 * 60 * 1000);
  var currentTimeLeft = previousTimeLeft - stateManager.timeInMs + lastPauseInfo.time;

  if (currentTimeLeft < 0) {
    stateManager.call('prematureEnd', { reason: R.get.prematureEndPauseAboveThreshold });
  } else {
    stateManager.set('pauseTimeLeft', currentTimeLeft);
  }
};

exports.awakenPause = awakenPause;
exports.endPause = endPause;
exports.pauseKeyDown = pauseKeyDown;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pauseTransition = exports.endObservation = exports.playSound = exports.endPrediction = exports.checkKeyStrokeForPrediction = exports.checkForClickPrediction = exports.startPrediction = exports.goToNextPosition = exports.startRunning = exports.stateUnfrozen = undefined;

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

var _taskUtilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* --- State function --- */

var stateUnfrozen = function stateUnfrozen() {
  if (_lodash2.default.has(this.state, 'currentTrialData.hasPaused')) {
    this.state.currentTrialData.hasPaused = true;
  }
};

var pauseTransition = function pauseTransition() {
  var _this = this;

  var stateManager = this.stateManager;
  var state = this.state;
  var R = this.R;
  var level = stateManager.get('levelObject') ? stateManager.get('levelObject').level : '';

  try {
    var levelObject = stateManager.get('levelObject');
    var sequenceObject = levelObject.sequenceObject;
    var positionData = stateManager.get('positionData');
    var startTransitionTime = stateManager.timeInMs;

    stateManager.call('hideAll');
    var text2d = void 0;
    if (level <= 3) {
      this.taskObject.setCheckpoint(R.get.checkpoint_levelDone[level - 1]);
      var maxTransitionTime = 15 * 60 * 1000;
      var promise = stateManager.resolveOnKey();
      var shouldtic = true;

      var transitionText = function transitionText() {
        var timeLeft = Math.ceil((maxTransitionTime - stateManager.timeInMs + startTransitionTime) / 1000, 10);
        if (timeLeft < 0) {
          return false;
        }
        return R.get.finishedLevelTransition.replace('{n}', (0, _experimentJs.String)(timeLeft)).replace('{l}', level);
      };

      state.tic = function () {
        if (!shouldtic) {
          return;
        }
        var text = transitionText();
        if (text !== false) {
          text2d.text = text;
          state.tooltipPause.box.levelVisible = true;
          (0, _experimentJs.delay)(200).then(function () {
            state.tooltipPause.box.levelVisible = false;
            state.tic();
          });
        } else {
          stateManager.set('endReason', 'You were idle for more than 15 min');
          stateManager.goToState(R.get.states_end);
        }
      };

      var centerPosition = (0, _experimentJs.sizeToVec)(this.taskObject.renderSize).scale(0.5);

      state.tooltipPause = stateManager.tooltip({ position: centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, this.taskObject.renderSize.height / 2 - 100)), text: transitionText(), duration: promise });
      text2d = state.tooltipPause.text;
      this.state.shouldPause = false;
      state.tic();

      promise.then(function () {
        shouldtic = false;
        stateManager.goToState(R.get.states_active);
        // stateManager.newEvent(R.get.flags_levelDefined, null, { level: level + 1 }, ['globalLog', `stateRunningEventsLvl${level}`])
      });
    } else if (level === 4 && positionData.fullSequenceIndex >= sequenceObject.block.length - 1) {
      this.taskObject.setCheckpoint(R.get.checkpoint_levelDone[level - 1]);
      this.taskObject.setCheckpoint(R.get.checkpoint_taskDone).promise.then(function () {
        stateManager.goToState(R.get.states_end);
      });
    } else if (level === 4) {
      var blockDone = sequenceObject.block[positionData.fullSequenceIndex - 1];
      var _startTransitionTime = stateManager.timeInMs;
      var _maxTransitionTime = 5 * 60 * 1000;
      var _promise = stateManager.resolveOnKey();
      var _shouldtic = true;

      var _transitionText = function _transitionText() {
        var timeLeft = Math.ceil((_maxTransitionTime - stateManager.timeInMs + _startTransitionTime) / 1000, 10);
        if (timeLeft < 0) {
          return false;
        }
        return R.get.finishedBlockTransition.replace('{n}', (0, _experimentJs.String)(timeLeft)).replace('{b}', blockDone + 1);
      };

      state.tic = function () {
        if (!_shouldtic) {
          return;
        }
        var text = _transitionText();
        if (text !== false) {
          text2d.text = text;
          state.tooltipPause.box.levelVisible = true;
          (0, _experimentJs.delay)(200).then(function () {
            state.tooltipPause.box.levelVisible = false;
            state.tic();
          });
        } else {
          stateManager.set('endReason', 'You were idle for more than 5 min');
          stateManager.goToState(R.get.states_end);
        }
      };

      var _centerPosition = (0, _experimentJs.sizeToVec)(this.taskObject.renderSize).scale(0.5);

      state.tooltipPause = stateManager.tooltip({ position: _centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, this.taskObject.renderSize.height / 2 - 100)), text: _transitionText(), duration: _promise });
      text2d = state.tooltipPause.text;
      this.state.shouldPause = false;
      state.tic();

      _promise.then(function () {
        _shouldtic = false;
        _this.state.shouldPause = true;
        stateManager.call('showAll');
        var nextTransitionTime = _this.stateManager.timeInMs + 100;
        stateManager.newEvent(R.get.events_goNextPosition, nextTransitionTime, null, ['globalLog', 'stateRunningEventsLvl' + levelObject.level]);
      });
    }
  } catch (e) {
    (0, _experimentJs.debugError)('running.pauseTransition: error with the level data.');
    stateManager.set('endReason', 'There was an error with the task. We are sorry.');
    stateManager.goToState(R.get.states_end);
  }
};

var startRunning = function startRunning() {
  var _this2 = this;

  if (typeof this.taskObject === 'undefined') {
    throw new Error('state.startRunning: this.taskObject is undefined');
  }

  var stateManager = this.stateManager;
  var state = this.state;
  var R = stateManager.R;

  if (!document.hasFocus()) {
    stateManager.newEvent(R.get.forcePause);
  }

  state.shouldPause = true;
  state.pausedBetween = [];
  var levelObject = stateManager.get('levelObject');
  var elements2D = stateManager.get('elements2D');
  stateManager.call('showAll');
  elements2D.loader.value = 0;

  /* --- Setup state variables --- */
  if (typeof state.data === 'undefined') {
    state.data = [];
  }
  state.numberOfMissed = 0;
  state.isPredicting = false;

  // TODO function that stores data from the states
  // TODO function that transform state data into cwData

  /* --- Store the data --- */

  var centerPosition = (0, _experimentJs.sizeToVec)(this.taskObject.renderSize).scale(0.5);
  var promise = stateManager.resolveOnKey();
  stateManager.tooltip({ position: centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, this.taskObject.renderSize.height / 2 - 100)), text: 'You are about to start level ' + levelObject.level + '\nHit a key to start', duration: promise });

  promise.then(function () {
    // show the first position
    var nextTransitionTime = _this2.stateManager.timeInMs + 100;
    var nextTransitionEvent = new _experimentJs.EventData(R.get.events_goNextPosition, nextTransitionTime, {
      belongsTo: ['globalLog', 'stateRunningEventsLvl' + levelObject.level],
      handledAt: null,
      storedAt: null
    });
    stateManager.addTimeTriggerEvent(nextTransitionEvent);
  });

  // Wait after learning
  // Start prediction
  // Wait predictionDuration - look for valid click

  /* --- Redraw tiles --- */

  return 'state.startRunning: resolved';
};

var storeData = function storeData() {
  var state = this.state;
  var stateManager = this.stateManager;
  var levelObject = stateManager.get('levelObject');
  var sequenceObject = levelObject.sequenceObject;
  var positionData = stateManager.get('positionData');
  var index = positionData.fullSequenceIndex;

  /* --- If currentTrialData is already set, send it to the dataManager to be stored before handling new position --- */
  var dataToStore = state.currentTrialData;
  try {
    if (typeof state.currentTrialData !== 'undefined' && stateManager.get('subject_id')) {
      var _state$currentTrialDa = state.currentTrialData,
          level = _state$currentTrialDa.level,
          block = _state$currentTrialDa.block,
          blockType = _state$currentTrialDa.blockType,
          trial = _state$currentTrialDa.trial,
          trialType = _state$currentTrialDa.trialType,
          position = _state$currentTrialDa.position,
          choice = _state$currentTrialDa.choice,
          responseTime = _state$currentTrialDa.responseTime,
          startObservation = _state$currentTrialDa.startObservation,
          _startPrediction = _state$currentTrialDa.startPrediction,
          respondedAt = _state$currentTrialDa.respondedAt,
          _endPrediction = _state$currentTrialDa.endPrediction,
          keysHits = _state$currentTrialDa.keysHits,
          hasPaused = _state$currentTrialDa.hasPaused,
          clicks = _state$currentTrialDa.clicks,
          _endObservation = _state$currentTrialDa.endObservation;

      /* --- Check if the transition observed was dominant --- */

      var dominant = null;
      if (levelObject.dominantStructure) {
        if (!(0, _experimentJs.hasConstructor)(_experimentJs.String, levelObject.dominantStructure)) {
          levelObject.dominantStructure = (0, _experimentJs.String)(levelObject.dominantStructure);
        }
        dominant = 0;
        if (index - 1 >= 0 && sequenceObject.fullSequence[index - 1] && sequenceObject.fullSequence[index]) {
          var positionIndexInStructure = levelObject.dominantStructure.indexOf(sequenceObject.fullSequence[index - 1]);
          if (positionIndexInStructure !== -1) {
            var nextIndex = positionIndexInStructure === 3 ? 0 : positionIndexInStructure + 1;
            if (parseInt(levelObject.dominantStructure[nextIndex], 10) === sequenceObject.fullSequence[index]) {
              dominant = 1;
            }
          }
        }
      }

      // check if next position is not end of sequence
      var correct = null;
      var transitionTo = null;
      if (index + 1 < sequenceObject.fullSequence.length) {
        correct = parseInt(sequenceObject.fullSequence[index + 1], 10) === parseInt(choice, 10);
        transitionTo = sequenceObject.fullSequence[index + 1];
      }

      /* --- Store the data --- */
      dataToStore = {
        subject_id: stateManager.get('subject_id'),
        level: level,
        block: block,
        block_type: blockType,
        dominant_structure: levelObject.dominantStructure,
        dominant_transition_probability: levelObject.dominantProbability,
        trial: trial,
        trial_type: trialType,
        position: position,
        observation_duration: _startPrediction ? _startPrediction - startObservation : this.timeInMs - startObservation,
        observed_transition_was_dominant: dominant, // NA for first transition in a sublevel and after prediction
        transition_to: transitionTo, // NA for GO trials (non blackouts)
        subject_choice: choice, // NA for NOGO
        response_time: responseTime, // NA for NOGO or no response
        correct: correct,
        key_hits: JSON.stringify(keysHits), // ['key', 'time'], [k,t], ...
        clicks: JSON.stringify(clicks),
        has_paused: hasPaused,
        start_observation: startObservation,
        end_observation: _endObservation,
        start_prediction: _startPrediction,
        responded_at: respondedAt,
        end_prediction: _endPrediction,
        belongsTo: ['cwData']
      };
      stateManager.storeData(dataToStore);
    }
  } catch (e) {
    var message = 'runningState.goToNextPosition: could not store cwData.';
    (0, _experimentJs.debugError)(message);
    stateManager.storeInErrorLog({ message: message, timestamp: stateManager.timeInMs, data: dataToStore });
    // TODO check that the stateManager will store it in the DB
  }
};

var goToNextPosition = function goToNextPosition() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof this.state === 'undefined') {
    throw new Error('state.goToNextPosition: state is undefined');
  }
  var stateManager = this.stateManager;
  var state = this.state;
  var R = stateManager.R;
  var levelObject = stateManager.get('levelObject');

  /* --- Check the participant is doing the task and has valid connection --- */
  if (!document.hasFocus()) {
    stateManager.newEvent(R.get.events_windowBlur, null, null, ['stateRunningEventsLvl' + levelObject.level]);
  }

  var checkConnection = false;
  if ((0, _experimentJs.hasConstructor)(_experimentJs.Deferred, this.state.checkLastInteraction)) {
    if (!this.state.checkLastInteraction.pending) {
      this.state.checkLastInteraction = new _experimentJs.Deferred();
      checkConnection = true;
    }
  } else {
    this.state.checkLastInteraction = new _experimentJs.Deferred();
    checkConnection = true;
  }
  if (checkConnection) {
    stateManager.call('checkIdleAndConnection', { deferred: this.state.checkLastInteraction });
  }

  /* --- Setup next position --- */
  var elements2D = stateManager.get('elements2D');
  var sounds = stateManager.get('sounds');
  var cross = elements2D.cross;

  var sequenceObject = levelObject.sequenceObject;
  var positionData = stateManager.get('positionData');

  var souldPlaySound = levelObject.sound === true;

  // Check if the agent should animate to its new position
  var moveFunction = 'moveAgentToTile';
  if (typeof event.data !== 'undefined' && typeof event.data.data !== 'undefined' && typeof event.data.data.animate !== 'undefined') {
    // TODO think of an easier way to access this
    moveFunction = event.data.data.animate ? 'animateAgentToTile' : 'moveAgentToTile';
  }

  /* --- Store Data --- */
  storeData.bind(this)();

  /* --- Set index --- */
  positionData.fullSequenceIndex += 1;
  var index = positionData.fullSequenceIndex;

  /* --- Check if end of level --- */
  if (index >= sequenceObject.fullSequence.length) {
    positionData.fullSequenceIndex -= 1;
    // go to endBlock -> pause - wait for next level to start
    var nextTransitionEvent = new _experimentJs.EventData(R.get.events_pauseTransition, stateManager.timeInMs, {
      belongsTo: ['globalLog', 'stateRunningEventsLvl' + levelObject.level],
      handledAt: null,
      storedAt: null
    });
    stateManager.addTimeTriggerEvent(nextTransitionEvent);
    return 'goToNextPosition: resolved. End of sequence.';
  } else if (index > 0 && sequenceObject.block[index - 1] !== sequenceObject.block[index] && state.pausedBetween.indexOf(sequenceObject.block[index - 1]) === -1) {
    /* --- End of block --- */
    state.pausedBetween.push(sequenceObject.block[index - 1]);
    // go to endBlock -> pause - wait for next block to start
    stateManager.newEvent(R.get.events_pauseTransition, null, null, ['globalLog', 'stateRunningEventsLvl' + levelObject.level]);
    return 'goToNextPosition: resolved. Changing block.';
  }

  var agentType = 'rabbit';
  if (levelObject.level !== 4 || sequenceObject.blockType[index] === 'normal') {
    // either classic levels or a normal block == choose the wolf agent
    agentType = 'wolf';
  }

  if (elements2D.agentType !== agentType) {
    stateManager.promise('setAgent', { agent: agentType });
  }

  /* --- Check if data is set and if subject had not been idle  --- */
  if (state.numberOfMissed >= 5) {
    stateManager.newEvent(R.get.events_moreThanFiveNA, null, null, ['stateRunningEventsLvl' + levelObject.level]);
  }
  // setup the trialData for this specific trial
  var trialData = {
    level: levelObject.level,
    fullSequenceIndex: index,
    block: sequenceObject.block[index],
    blockType: sequenceObject.blockType[index],
    trial: sequenceObject.trial[index],
    trialType: sequenceObject.trialType[index],
    state: state.stateKey,
    position: sequenceObject.fullSequence[index],
    choice: null,
    responseTime: null,
    startObservation: null,
    endObservation: null,
    respondedAt: null,
    startPrediction: null,
    endPrediction: null,
    nextPosition: null,
    observedTransitionWasDominant: null,
    keysHits: [],
    clicks: [],
    hasPaused: false
  };
  state.data.push(trialData);

  // Change the currentTrialData to match new index
  // keep the currentTrialData reference directly in the state
  state.currentTrialData = trialData;

  // start from a new position - set the prediction phase to false
  state.isPredicting = false;

  // set up a deferred object to return and catch promises resolution
  var deferred = new _experimentJs.Deferred();

  elements2D.loader.value = 100 * positionData.fullSequenceIndex / sequenceObject.fullSequence.length;

  // Redraw tiles and move to next position
  stateManager.call('drawTiles');
  stateManager.call('setBlackScreen', { on: false });
  cross.spriteFrame = R.get.cross_base;
  stateManager.call('drawTiles');
  stateManager.promise(moveFunction, { tile: trialData.position - 1, opacity: 1 }).then(function () {
    if (souldPlaySound) {
      sounds.observation.play();
    }
    trialData.startObservation = stateManager.timeInMs;
    stateManager.newEvent(R.get.events_endObservation, levelObject.observationDuration, null, ['stateRunningEventsLvl' + levelObject.level]);

    /* --- Presentation will depends on the trial type --- */
    if (trialData.trialType === 'classic') {
      // Classic trials are a treated separately
      // Each position is both a learning example and a feedback
      // Wait observationDuration then start prediction
      (0, _experimentJs.debugWarn)('classic trial: moved to ' + trialData.position);
      var startPredictionTime = levelObject.observationDuration + _lodash2.default.random(levelObject.minISIAfterLearning, levelObject.maxISIAfterLearning);
      stateManager.newEvent(R.get.events_startPrediction, startPredictionTime, null, ['globalLog', 'stateRunningEventsLvl' + levelObject.level]);
    } else if (trialData.trialType === 'observation_prediction') {
      (0, _experimentJs.debugWarn)('observation_prediction trial: moved to ' + trialData.position);
      // set the time until prediction phase
      var observationTime = levelObject.observationDuration + levelObject.fixedISIAfterObservation + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanISIAfterObservation, 0, levelObject.maxSampleAfterObservation, levelObject.maxSampleAfterObservation);
      (0, _experimentJs.debugWarn)('Observation Time', (observationTime - stateManager.timeInMs) / 1000);

      // create prediction event
      stateManager.newEvent(R.get.events_startPrediction, parseInt(observationTime, 10), null, ['stateRunningEventsLvl' + levelObject.level]);
    } else if (trialData.trialType === 'blackout') {
      (0, _experimentJs.debugWarn)('Blackout trial: moved to ' + trialData.position);

      // set the time until prediction phase
      var _observationTime = levelObject.observationDuration + levelObject.fixedISIAfterObservation + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanISIAfterObservation, 0, levelObject.maxSampleAfterObservation, levelObject.maxSampleAfterObservation);

      (0, _experimentJs.debugWarn)('Observation Time', _observationTime / 1000);

      var blackoutTime = _observationTime + levelObject.fixedBlackScreenDuration + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanBlackScreen, 0, levelObject.maxSampleBlackScreen, levelObject.maxSampleBlackScreen);

      // create prediction event
      stateManager.newEvent(R.get.events_goNextPosition, blackoutTime, null, ['stateRunningEventsLvl' + levelObject.level]);
      (0, _experimentJs.debugWarn)('blackout Time', blackoutTime / 1000);
    }

    deferred.resolve('stateManager.goToNextPosition: resolved');
  });

  return deferred.promise;
};

var endObservation = function endObservation() {
  this.state.currentTrialData.endObservation = this.stateManager.timeInMs;
  this.stateManager.call('setAgentOpacity', { opacity: 0 });
  return 'endObservation resolved';
};

var startPrediction = function startPrediction() {
  if (typeof this.state.currentTrialData === 'undefined') {
    throw new Error('state.startPrediction: state.currentTrialData is undefined');
  }

  var state = this.state;
  var stateManager = this.stateManager;
  var R = stateManager.R;

  state.numberOfMissed += 1;

  var levelObject = stateManager.get('levelObject');
  stateManager.promise('setAgentOpacity', { opacity: R.get.agent_predictionOpacity });

  stateManager.call('drawPredictionTiles');

  var cross = this.stateManager.get('elements2D').cross;
  cross.spriteFrame = R.get.cross_predict;
  if (levelObject.sound === true) {
    this.stateManager.get('sounds').prediction.play();
  }

  state.isPredicting = true;
  state.currentTrialData.startPrediction = stateManager.timeInMs;
  var endResponse = levelObject.predictionDuration;

  this.stateManager.newEvent(R.get.events_responseTimeEnded, endResponse, null, ['stateRunningEventsLvl' + levelObject.level]);
};

var endPrediction = function endPrediction() {
  if (typeof this.state.currentTrialData === 'undefined') {
    throw new Error('state.startPrediction: currentTrialData is undefined');
  }

  var stateManager = this.stateManager;
  var state = this.state;
  var R = stateManager.R;

  var levelObject = stateManager.get('levelObject');
  var cross = this.stateManager.get('elements2D').cross;

  /* --- End prediction - store data --- */

  state.isPredicting = false;
  if (levelObject.level === 4) {
    // fMRI levels
    state.currentTrialData.endPrediction = stateManager.timeInMs;
    if (this.state.currentTrialData.choice !== null) {
      cross.spriteFrame = R.get.crossLockByPosition[this.state.currentTrialData.choice - 1];
    } else {
      cross.spriteFrame = R.get.cross_base;
    }
    var _endPrediction2 = levelObject.fixedISIAfterPrediction + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanISIAfterPrediction, null, levelObject.maxSampleAfterPrediction, levelObject.maxSampleAfterPrediction);

    this.stateManager.newEvent(R.get.events_goNextPosition, _endPrediction2, null, ['stateRunningEventsLvl' + levelObject.level]);
  } else {
    // classic levels
    state.currentTrialData.endPrediction = stateManager.timeInMs;
    this.stateManager.newEvent(R.get.events_goNextPosition, null, null, ['stateRunningEventsLvl' + levelObject.level]);
  }

  return 'state.endPrediction: resolved';
};

var checkForClickPrediction = function checkForClickPrediction() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  try {
    if (typeof this.taskObject === 'undefined') {
      throw new Error('state.checkForClickPrediction: this.taskObject is undefined');
    }

    // todo with click detection Canvas2D
    if (typeof event.data.clientY === 'undefined') {
      throw new Error('state.checkForClickPrediction: event.data.clientY is undefined.');
    }

    if (typeof this.state.currentTrialData === 'undefined') {
      throw new Error('state.checkForClickPrediction: options.trialData is undefined');
    }

    var stateManager = this.stateManager;
    var state = this.state;

    state.currentTrialData.clicks.push([event.data.engineX, event.data.engineY, stateManager.timeInMs]);
  } catch (e) {
    (0, _experimentJs.debugError)(e);
  }
  return 'checkForClickPrediction resolved';
};

var checkKeyStrokeForPrediction = function checkKeyStrokeForPrediction() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  try {
    if (typeof this.taskObject === 'undefined') {
      throw new Error('state.checkKeyStrokeForPrediction: this.taskObject is undefined');
    }

    if (typeof event.data.keyCode === 'undefined') {
      throw new Error('state.startPrediction: event.data.keyCode is undefined');
    }

    if (typeof this.state.currentTrialData === 'undefined') {
      throw new Error('state.startPrediction: state.currentTrialData is undefined');
    }

    var stateManager = this.stateManager;
    var state = this.state;
    var R = this.R;

    var levelObject = stateManager.get('levelObject');

    var keyCode = event.data.keyCode;
    var key = event.data.key;

    if (_lodash2.default.has(state, 'currentTrialData.keysHits')) {
      if (!(0, _experimentJs.hasConstructor)(_experimentJs.Array, state.currentTrialData.keysHits)) {
        state.currentTrialData.keysHits = [];
      }

      state.currentTrialData.keysHits.push([key, keyCode, stateManager.timeInMs]);
    }

    var keys = {
      m: [77, 3, R.get.cross_bottomRight],
      d: [68, 1, R.get.cross_topLeft],
      c: [67, 4, R.get.cross_bottomLeft],
      k: [75, 2, R.get.cross_topRight]

      /* --- Check if the subjects click was during the prediction phase and that he did not already chose  --- */

    };if (state.isPredicting === true && state.currentTrialData.startPrediction !== null && state.currentTrialData.choice === null) {
      var position = null;
      var cross = 1;
      _lodash2.default.forEach(keys, function (keyPosition) {
        if (keyCode === keyPosition[0]) {
          position = keyPosition[1];
          cross = keyPosition[2];
        }
      });
      /* --- If the key was one of the specified store the corresponding position, responseTime and choice --- */

      if (position !== null) {
        // Store the choice of the subject and responseTime

        state.currentTrialData.choice = position;
        state.currentTrialData.responseTime = stateManager.timeInMs - state.currentTrialData.startPrediction;
        state.currentTrialData.respondedAt = stateManager.timeInMs;

        this.stateManager.get('elements2D').cross.spriteFrame = cross;
        stateManager.call('highlightPosition', {
          position: position - 1
        });

        // reset the number of missed trials
        state.numberOfMissed = 0;

        stateManager.newEvent(R.get.events_hasResponded, null, null, ['stateRunningEventsLvl' + levelObject.level]);

        (0, _experimentJs.debuglog)('state.checkKeyStrokeForPrediction: has chosen position ' + position + '.');
        return position;
      }
      (0, _experimentJs.debuglog)('state.checkKeyStrokeForPrediction: key did not correspond to state selection keys.');
      return false;
    }
    (0, _experimentJs.debuglog)('state.checkKeyStrokeForPrediction: already chosen');
    return false;
  } catch (e) {
    (0, _experimentJs.debugError)(e);
    return false;
  }
};

var playSound = function playSound(event) {
  var sounds = this.stateManager.getGlobal('sounds');
  sounds[event.data.name].play();
};

exports.stateUnfrozen = stateUnfrozen;
exports.startRunning = startRunning;
exports.goToNextPosition = goToNextPosition;
exports.startPrediction = startPrediction;
exports.checkForClickPrediction = checkForClickPrediction;
exports.checkKeyStrokeForPrediction = checkKeyStrokeForPrediction;
exports.endPrediction = endPrediction;
exports.playSound = playSound;
exports.endObservation = endObservation;
exports.pauseTransition = pauseTransition;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tryoutEnd = exports.tryoutStartPrediction = exports.tryoutGoToNextPosition = exports.tryoutCheckKeyStrokeForPrediction = exports.tryoutEndPrediction = exports.awakeTryout = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = __webpack_require__(2);

var _lodash2 = _interopRequireDefault(_lodash);

var _experimentBabylonJs = __webpack_require__(1);

var _experimentBabylonJs2 = _interopRequireDefault(_experimentBabylonJs);

var _experimentJs = __webpack_require__(0);

var _tutorial = __webpack_require__(5);

var _taskUtilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var awakeTryout = function awakeTryout() {
  var taskObject = this.taskObject;
  var state = this.state;
  var currentTutorial = this.stateManager.get('currentTutorial', 1);
  var stateManager = this.stateManager;
  var elements2D = stateManager.get('elements2D');
  var R = this.R;

  elements2D.loader.value = 0;
  stateManager.call('showAll');

  state.data = state.data || [];
  state.isPredicting = false;
  state.index = -1;
  stateManager.setGlobal('level', 'tryout-' + currentTutorial);

  // Test list
  state.tests = {
    wolfFirstAppears: {
      title: 'Four possible positions',
      message: 'The wolf may appear at any of the four position on the screen.',
      passed: false
    },
    wolfHasAppeared: {
      title: 'Predict wolf\'s next position',
      message: 'The wolf has appeared on the top left position. With the keyboard keys predict its next position.<br>\n      D for top left, C for bottom left, K for top right, and M for bottom right.',
      passed: false
    },
    predictionTest: {
      title: 'Prediction phase',
      message: 'Predict the next position of the wolf {n}/3.',
      passed: false,
      numberOfPrediction: 0
    },
    realTimeTest: {
      title: 'Now try with the real timing',
      message: 'Congratulations ! Now that you got the gist of it, you will have to predict as fast as possible.',
      passed: false
    },
    rabbitFirstAppear: {
      title: 'Predict the next position of the Rabbit',
      message: 'Use the keyboard to predict the next position of the rabbit.',
      passed: false
    },
    rabbitFirstDisapear: {
      title: R.get.rabbitFirstDisapearTitle,
      message: R.get.rabbitFirstDisapearMessage,
      passed: false
    },
    wolfFmriFirstAppear: {
      title: R.get.wolfFmriFirstAppearTitle,
      message: R.get.wolfFmriFirstAppearMessage,
      passed: false
    },
    blackoutFirstAppear: {
      title: R.get.blackoutFirstAppearTitle,
      message: R.get.blackoutFirstAppearMessage,
      passed: false
    }
  };

  state.hasPassedAllTest = function () {
    for (var key in state.tests) {
      if (state.tests.hasOwnProperty(key)) {
        var test = state.tests[key];
        if (!test.passed) {
          return false;
        }
      }
    }
    return true;
  };

  if (currentTutorial === 1) {
    // set classic sequence object with 10 transition
    state.sequenceObject = (0, _taskUtilities.getFullSequenceObjectForClassicLevels)([1, 3, 4, 2, 1, 3, 4, 2, 1, 3, 2, 4, 2, 1, 3]);
    stateManager.setGlobal('levelObject', this.taskObject.parameters.levels[0]);
  } else {
    // set fMRI sequence object with 5 transition wolf and 5 transition rabbit
    state.sequenceObject = {
      fullSequence: [1, 2, 1, 3, 4, 2, 1, 3, 4, 3],
      trial: _lodash2.default.range(1, 10),
      trialType: (0, _experimentJs.rep)(['observation_prediction', 'blackout'], 5),
      block: (0, _experimentJs.rep)(1, 5).concat((0, _experimentJs.rep)(2, 5)),
      blockType: (0, _experimentJs.rep)('random', 5).concat((0, _experimentJs.rep)('normal', 5))
    };
    stateManager.setGlobal('levelObject', taskObject.parameters.levels[3]);
  }

  this.stateManager.newEvent(this.R.get.events_goNextPosition, null, null, ['stateTryout' + currentTutorial]);
};

var tryoutGoToNextPosition = function tryoutGoToNextPosition() {
  var _this = this;

  // TODO experiment-boxes penser a faire dans un tooltip tool qui permet de focus sur un element et fait un modal en dessous pour expliquer

  var stateManager = this.stateManager;
  var state = this.state;
  state.index += 1;

  var elements2D = stateManager.get('elements2D');
  var levelObject = stateManager.get('levelObject');
  var cross = elements2D.cross;
  var R = this.R;

  var currentTutorial = stateManager.get('currentTutorial', 1);
  var index = state.index;
  var sequenceObject = state.sequenceObject;

  stateManager.hideTooltip();

  var ntransition = sequenceObject.fullSequence.length;
  // Check if finished
  if (index > ntransition - 1) {
    // show finished tryout
    stateManager.call('hideAll');

    if (currentTutorial === 1) {
      var event = new _experimentJs.EventData(this.R.get.flags_levelDefined, stateManager.timeInMs, { level: 1 });
      this.taskObject.modal({ title: _tutorial.tutorials.askContinue.title.en, content: _tutorial.tutorials.askContinue.content.en, event: event });
    } else {
      var _event = new _experimentJs.EventData(this.R.get.flags_levelDefined, stateManager.timeInMs, { level: 4 });
      this.taskObject.modal({ title: _tutorial.tutorials.askfMRIContinue.title.en, content: _tutorial.tutorials.askfMRIContinue.content.en, event: _event });
    }

    return 'state.tryoutGoToNextPosition: finished tryout';
  }

  elements2D.loader.value = 100 * index / ntransition;

  var lastChoice = null;
  if (_typeof(state.currentTrialData) === 'object' && typeof state.currentTrialData.choice === 'number') {
    lastChoice = parseInt(state.currentTrialData.choice, 10);
  }

  // setup the trialData for this specific trial
  var trialData = {
    level: levelObject.level,
    fullSequenceIndex: index,
    block: sequenceObject.block[index],
    blockType: sequenceObject.blockType[index],
    trial: sequenceObject.trial[index],
    trialType: sequenceObject.trialType[index],
    state: state.stateKey,
    position: sequenceObject.fullSequence[index],
    choice: null,
    responseTime: null,
    startObservation: null,
    endObservation: null,
    respondedAt: null,
    startPrediction: null,
    endPrediction: null,
    nextPosition: null,
    observedTransitionWasDominant: null,
    keysHits: [],
    clicks: [],
    hasPaused: null
  };
  state.data.push(trialData);

  /* --- If currentTrialData is already set, send it to the dataManager to be stored before handling new position --- */
  var dataToStore = state.currentTrialData;
  try {
    if (typeof state.currentTrialData !== 'undefined' && stateManager.get('subject_id')) {
      var _state$currentTrialDa = state.currentTrialData,
          block = _state$currentTrialDa.block,
          blockType = _state$currentTrialDa.blockType,
          trial = _state$currentTrialDa.trial,
          trialType = _state$currentTrialDa.trialType,
          position = _state$currentTrialDa.position,
          choice = _state$currentTrialDa.choice,
          responseTime = _state$currentTrialDa.responseTime,
          startObservation = _state$currentTrialDa.startObservation,
          startPrediction = _state$currentTrialDa.startPrediction,
          respondedAt = _state$currentTrialDa.respondedAt,
          endPrediction = _state$currentTrialDa.endPrediction,
          keysHits = _state$currentTrialDa.keysHits,
          hasPaused = _state$currentTrialDa.hasPaused,
          clicks = _state$currentTrialDa.clicks,
          endObservation = _state$currentTrialDa.endObservation;

      /* --- Check if the transition observed was dominant --- */

      var dominant = null;

      /* --- Store the data --- */
      dataToStore = {
        subject_id: stateManager.get('subject_id'),
        level: currentTutorial,
        block: block,
        block_type: blockType,
        dominant_structure: levelObject.dominantStructure,
        dominant_transition_probability: levelObject.dominantProbability,
        trial: trial,
        trial_type: trialType,
        position: position,
        observation_duration: startPrediction ? startPrediction - startObservation : this.timeInMs - startObservation,
        observed_transition_was_dominant: dominant, // NA for first transition in a sublevel and after prediction
        transition_to: sequenceObject.fullSequence[index], // NA for GO trials (non blackouts)
        subject_choice: choice, // NA for NOGO
        response_time: responseTime, // NA for NOGO or no response
        correct: parseInt(sequenceObject.fullSequence[index], 10) === parseInt(choice, 10),
        key_hits: JSON.stringify(keysHits), // ['key', 'time'], [k,t], ...
        clicks: JSON.stringify(clicks),
        has_paused: hasPaused,
        start_observation: startObservation,
        end_observation: endObservation,
        start_prediction: startPrediction,
        responded_at: respondedAt,
        end_prediction: endPrediction,
        belongsTo: ['tryoutData']
      };
      stateManager.storeData(dataToStore);
    }
  } catch (e) {
    var message = 'runningState.goToNextPosition: could not store cwData.';
    (0, _experimentJs.debugError)(message);
    stateManager.storeInErrorLog({ message: message, timestamp: stateManager.timeInMs, data: dataToStore });
    // TODO check that the stateManager will store it in the DB
  }

  // keep the currentTrialData reference directly in the state
  state.currentTrialData = trialData;

  // start from a new position - set the prediction phase to false
  state.isPredicting = false;

  // set up a deferred object to return and catch promises resolution
  // const deferred = new Deferred()

  var agentType = 'wolf';
  if (sequenceObject.blockType[index] === 'random') {
    agentType = 'rabbit';
  }
  if (elements2D.agentType !== agentType) {
    stateManager.call('setAgent', { agent: agentType });
  }

  cross.spriteFrame = this.R.get.cross_base;
  stateManager.call('drawTiles', { withKeys: false });
  stateManager.call('moveAgentToTile', { tile: trialData.position - 1, opacity: 1 });
  var promise = Promise.resolve();
  if (currentTutorial === 1 && !state.tests.wolfFirstAppears.passed) {
    promise = this.taskObject.modal({ title: state.tests.wolfFirstAppears.title, content: state.tests.wolfFirstAppears.message });
    state.tests.wolfFirstAppears.passed = true;
  } else if (currentTutorial === 2 && !state.tests.rabbitFirstAppear.passed) {
    promise = this.taskObject.modal({ title: state.tests.rabbitFirstAppear.title, content: state.tests.rabbitFirstAppear.message });
    state.tests.rabbitFirstAppear.passed = true;
  } else if (currentTutorial === 2 && sequenceObject.trialType[index - 1] === 'blackout' && !state.tests.blackoutFirstAppear.passed) {
    promise = this.taskObject.modal({ title: state.tests.blackoutFirstAppear.title, content: state.tests.blackoutFirstAppear.message });
    state.tests.blackoutFirstAppear.passed = true;
  } else if (currentTutorial === 2 && sequenceObject.blockType[index] === 'normal' && !state.tests.wolfFmriFirstAppear.passed) {
    promise = this.taskObject.modal({ title: state.tests.wolfFmriFirstAppear.title, content: state.tests.wolfFmriFirstAppear.message });
    state.tests.wolfFmriFirstAppear.passed = true;
  }

  promise.then(function () {
    trialData.startObservation = stateManager.timeInMs;

    var promise = Promise.resolve();

    var centerPosition = (0, _experimentJs.sizeToVec)(_this.taskObject.renderSize).scale(0.5);

    if (index !== 0 && sequenceObject.trialType[index - 1] !== 'blackout' && sequenceObject.blockType[index - 1] === sequenceObject.blockType[index]) {
      if (lastChoice === sequenceObject.fullSequence[index]) {
        // Correct
        var background = new _experimentBabylonJs2.default.Color4(0.1, 0.7, 0.1, 0.9);
        var text = 'Correct!';
        var duration = 2000;
        if (currentTutorial === 1 && !state.tests.predictionTest.passed) {
          text += '\nHit a key to continue';
          promise = stateManager.resolveOnKey();
          duration = promise;
        }

        var _position = centerPosition;
        var tilePosition = stateManager.call('getTilePositions')[lastChoice - 1];
        _position = tilePosition;
        stateManager.tooltip({ position: _position, background: background, text: text, duration: duration });
      } else {
        // Incorrect
        var _background = new _experimentBabylonJs2.default.Color4(0.7, 0.1, 0.1, 0.9);

        var _position2 = centerPosition; // TODO this.taskObject.center
        if ((0, _experimentJs.hasConstructor)(Number, lastChoice)) {
          var _tilePosition = stateManager.call('getTilePositions')[lastChoice - 1];
          // const sign = Math.sign(position.subtract(tilePosition).x)
          _position2 = _tilePosition;
        }

        var _text = 'Incorrect!';
        var _duration = 2000;
        if (currentTutorial === 1 && !state.tests.predictionTest.passed) {
          _text += '\nHit a key to continue';
          promise = stateManager.resolveOnKey();
          _duration = promise;
        }

        stateManager.tooltip({ position: _position2, background: _background, text: _text, duration: _duration });
      }
    }

    if (currentTutorial === 1 && !state.tests.predictionTest.passed && state.tests.predictionTest.numberOfPrediction >= 3) {
      state.tests.predictionTest.passed = true;
      promise = stateManager.resolveOnKey();
      stateManager.tooltip({ position: centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, centerPosition.y - 100)), text: state.tests.realTimeTest.message + '\nHit a key to continue', duration: promise });
    }

    return promise;
  }).then(function () {
    trialData.startObservation = stateManager.timeInMs;
    stateManager.newEvent(R.get.events_endObservation, levelObject.observationDuration, null, ['stateRunningEventsLvl' + levelObject.level]);

    if (currentTutorial === 1) {
      var nextTransitionTime = trialData.startObservation + levelObject.observationDuration + _lodash2.default.random(levelObject.minISIAfterLearning, levelObject.maxISIAfterLearning);
      stateManager.newEvent(_this.R.get.events_startPrediction, nextTransitionTime, null, ['stateTryout' + currentTutorial]);
    } else if (sequenceObject.trialType[index] === 'blackout') {
      var observationTime = levelObject.observationDuration + levelObject.fixedISIAfterObservation + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanISIAfterObservation, 0, levelObject.maxSampleAfterObservation, levelObject.maxSampleAfterObservation);

      // add a blackout delay
      (0, _experimentJs.delay)(observationTime).then(function () {
        stateManager.newEvent(R.get.events_screenWentBlack, null, ['stateRunningEventsLvl' + levelObject.level]);
        stateManager.call('setAgentOpacity', { opacity: 0 });
      });

      var blackoutTime = observationTime + levelObject.fixedBlackScreenDuration + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanBlackScreen, 0, levelObject.maxSampleBlackScreen, levelObject.maxSampleBlackScreen);

      // create prediction event
      stateManager.newEvent(R.get.events_goNextPosition, blackoutTime, null, ['stateRunningEventsLvl' + levelObject.level]);
    } else if (sequenceObject.trialType[index] === 'observation_prediction') {
      var _observationTime = stateManager.timeInMs + levelObject.observationDuration + levelObject.fixedISIAfterObservation;
      _observationTime += (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanISIAfterObservation, 0, levelObject.maxSampleAfterObservation, levelObject.maxSampleAfterObservation);

      (0, _experimentJs.debugWarn)('Observation Time', (_observationTime - stateManager.timeInMs) / 1000);
      // create prediction event
      stateManager.newEvent(R.get.events_startPrediction, _observationTime, ['stateRunningEventsLvl' + levelObject.level]);
    } else {
      (0, _experimentJs.debugError)('Error in sequence', sequenceObject);
    }
  });

  return 'tryoutGoToNextPosition: finish sync call';
};

var tryoutStartPrediction = function tryoutStartPrediction() {
  var _this2 = this;

  var state = this.state;
  var stateManager = this.stateManager;
  var R = stateManager.R;

  var currentTutorial = stateManager.get('currentTutorial', 1);

  var levelObject = stateManager.get('levelObject');
  stateManager.promise('setAgentOpacity', { opacity: R.get.agent_predictionOpacity });

  var cross = stateManager.get('elements2D').cross;
  cross.spriteFrame = R.get.cross_predict;

  var centerPosition = (0, _experimentJs.sizeToVec)(this.taskObject.renderSize).scale(0.5);

  var npred = state.tests.predictionTest.numberOfPrediction;

  var promise = Promise.resolve();
  if (currentTutorial === 1 && !state.tests.predictionTest.passed) {
    stateManager.call('drawPredictionTiles', { withKeys: 'dkmc' });
    promise = stateManager.resolveOnKey();
    stateManager.tooltip({
      position: centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, centerPosition.y - 100)),
      text: state.tests.predictionTest.message.replace('{n}', npred + 1) + '\n' + R.get.hitAKeyToContinue,
      duration: promise,
      event: new _experimentJs.EventData('predictionTextDismissed')
    });

    var text = R.get.changeCenterSquare;
    stateManager.tooltip({ position: centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, -50)), text: text, duration: promise });
  } else {
    stateManager.call('drawPredictionTiles');
  }

  promise.then(function () {
    state.isPredicting = true;
    state.currentTrialData.startPrediction = stateManager.timeInMs;

    if (currentTutorial === 1 && !state.tests.predictionTest.passed) {
      var background = null; // new BABYLON.Color4(0.6, 100 / 255, 0, 0.9)
      var choiceDeferred = new _experimentJs.Deferred();
      state.choiceDeferred = choiceDeferred;

      var _text2 = R.get.chooseNextPosition;
      stateManager.tooltip({ position: centerPosition, background: background, text: _text2, duration: choiceDeferred.promise });
      choiceDeferred.promise.then(function () {
        stateManager.newEvent(R.get.events_responseTimeEnded, stateManager.timeInMs + levelObject.predictionDuration, null, ['stateTryout' + currentTutorial]);
      });
    } else if (currentTutorial === 1) {
      stateManager.newEvent(R.get.events_responseTimeEnded, stateManager.timeInMs + levelObject.predictionDuration, null, ['stateTryout' + currentTutorial]);
    } else {
      stateManager.call('setAgentOpacity', { opacity: 0 });
      var endResponse = levelObject.predictionDuration;
      (0, _experimentJs.delay)(endResponse).then(function () {
        _this2.state.isPredicting = false;
        if (_this2.state.currentTrialData.choice !== null) {
          cross.spriteFrame = R.get.crossLockByPosition[_this2.state.currentTrialData.choice - 1];
        } else {
          cross.spriteFrame = R.get.cross_base;
        }
      });
      var endPrediction = endResponse + levelObject.fixedISIAfterPrediction + (0, _taskUtilities.sampleExponential)(levelObject.sampleMeanISIAfterPrediction, null, levelObject.maxSampleAfterPrediction, levelObject.maxSampleAfterPrediction);

      _this2.stateManager.newEvent(R.get.events_goNextPosition, endPrediction, null, ['stateTryout' + currentTutorial]);
    }
  });
};

var tryoutCheckKeyStrokeForPrediction = function tryoutCheckKeyStrokeForPrediction() {
  var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _experimentJs.mandatory)();

  if (typeof event.data.keyCode === 'undefined') {
    throw new Error('state.checkKeyStrokeForPrediction: event.data.keyCode is undefined');
  }

  var stateManager = this.stateManager;
  var state = this.state;
  var R = this.R;

  var currentTutorial = stateManager.get('currentTutorial', 1);

  var keyCode = event.data.keyCode;
  var key = event.data.key;
  var keys = {
    m: [77, 3, R.get.cross_bottomRight],
    d: [68, 1, R.get.cross_topLeft],
    c: [67, 4, R.get.cross_bottomLeft],
    k: [75, 2, R.get.cross_topRight]
  };

  if (_lodash2.default.has(state, 'currentTrialData.keysHits')) {
    if (!(0, _experimentJs.hasConstructor)(_experimentJs.Array, state.currentTrialData.keysHits)) {
      state.currentTrialData.keysHits = [];
    }

    state.currentTrialData.keysHits.push([key, keyCode, stateManager.timeInMs]);
  }

  /* --- Check if the subjects hit was during the prediction phase and that he did not already chose  --- */

  if (state.isPredicting === true && state.currentTrialData.startPrediction !== null && state.currentTrialData.choice === null) {
    var position = null;
    var cross = 1;
    var chosenKey = null;
    for (var _key in keys) {
      if (keys.hasOwnProperty(_key)) {
        var keyPosition = keys[_key];
        if (keyCode === keyPosition[0]) {
          position = keyPosition[1];
          cross = keyPosition[2];
          chosenKey = _key;
        }
      }
    }
    /* --- If the key was one of the specified store the corresponding position, responseTime and choice --- */

    if (position !== null) {
      // Store the choice of the subject and responseTime
      if ((0, _experimentJs.hasConstructor)(_experimentJs.Deferred, state.choiceDeferred)) {
        state.choiceDeferred.resolve();
        state.choiceDeferred = null;
      }

      state.currentTrialData.choice = position;
      state.currentTrialData.responseTime = stateManager.timeInMs - state.currentTrialData.startPrediction;
      state.currentTrialData.respondedAt = stateManager.timeInMs;

      this.stateManager.get('elements2D').cross.spriteFrame = cross;
      if (!state.tests.predictionTest.passed) {
        state.tests.predictionTest.numberOfPrediction += 1;

        var centerPosition = (0, _experimentJs.sizeToVec)(this.taskObject.renderSize).scale(0.5);
        var tilePosition = stateManager.call('getTilePositions')[position - 1];
        var sign = Math.sign(centerPosition.subtract(tilePosition).x);
        tilePosition = tilePosition.add(new _experimentBabylonJs2.default.Vector2(sign * 50, sign * 50));
        stateManager.tooltip({ position: tilePosition, text: R.get.youSelectedThisTile + ' (' + chosenKey + ')', duration: (0, _experimentJs.delay)(2000) });
        var text = R.get.aLittleSquareShowsYourChoice;
        stateManager.tooltip({ position: centerPosition.add(new _experimentBabylonJs2.default.Vector2(0, -50)), text: text, duration: 2000 });
      }

      // reset the number of missed trials
      state.numberOfMissed = 0;

      stateManager.newEvent(R.get.events_hasResponded, null, null, ['stateTryout' + currentTutorial]);
      (0, _experimentJs.debuglog)('state.checkKeyStrokeForPrediction: has chosen position ' + position + '.');
      return position;
    }
    (0, _experimentJs.debuglog)('state.checkKeyStrokeForPrediction: key did not correspond to state selection keys.');
    return false;
  }
  (0, _experimentJs.debuglog)('state.checkKeyStrokeForPrediction: not a valid time to choose or already chosen');
  return false;
};

var tryoutEndPrediction = function tryoutEndPrediction() {
  var stateManager = this.stateManager;
  var state = this.state;
  var R = this.R;

  var currentTutorial = stateManager.get('currentTutorial', 1);

  /* --- End prediction - store data --- */
  state.isPredicting = false;
  state.currentTrialData.endPrediction = stateManager.timeInMs;

  stateManager.newEvent(R.get.events_goNextPosition, null, null, ['stateTryout' + currentTutorial]);
  return 'state.endPrediction: resolved';
};

var tryoutEnd = function tryoutEnd() {
  var stateManager = this.stateManager;
  var R = this.R;

  var currentTutorial = stateManager.get('currentTutorial', 1);
  this.taskObject.setCheckpoint(R.get.checkpoint_tutorialDone[currentTutorial - 1]);
};

exports.awakeTryout = awakeTryout;
exports.tryoutEndPrediction = tryoutEndPrediction;
exports.tryoutCheckKeyStrokeForPrediction = tryoutCheckKeyStrokeForPrediction;
exports.tryoutGoToNextPosition = tryoutGoToNextPosition;
exports.tryoutStartPrediction = tryoutStartPrediction;
exports.tryoutEnd = tryoutEnd;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=cwfmri.max.js.map