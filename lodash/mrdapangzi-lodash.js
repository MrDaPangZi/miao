var mrdapangzi = function() {
    function chunk(array, size = 1) {
        var result = []
        for (var i = 0; i < array.length; i += size) {
            result.push(array.slice(i, size + i))
        }
        return result
    }

    function compact(array) {
        return array.filter(item => item)
    }

    function difference(array, ...values) {
        return array.filter(x => ![].concat(...values).includes(x))
    }

    function drop(array, n = 1) {
        var arr = []
        forEach(array, (value, i) => {
            if (i < n) return
            arr.push(value)
        })
        return arr
    }

    function dropRight(array, n = 1) {
        var arr = []
        if (n < array.length) {
            forEach(array, (value, i) => {
                if (i == array.length - n) return false
                arr.push(value)
            })
        }
        return arr
    }

    function unary(func) {
        return (val => func(val))
    }

    function negate(func) {
        return (...arug) => !func(...arug)
    }

    function range(start, end, step) {
        if (arguments.length == 1) {
            end = start
            start = 0
        }
        var arr = []
        if (step === 0) {
            for (var i = start; i < end; i++) {
                arr.push(start)
            }
        } else {
            if (start > end) step = step || -1
            else step = step || 1
            for (var i = start;
            (i < end && step > 0) || (i > end && step < 0); i += step)
            arr.push(i)
        }
        return arr
    }

    function rangeRight(start, end, step) {
        if (arguments.length == 1) {
            end = start
            start = 0
        }
        var arr = []
        if (step === 0) {
            for (var i = start; i < end; i++) {
                arr.push(start)
            }
        } else {
            if (start > end) step = step || -1
            else step = step || 1
            for (var i = end - step;
            (i >= start && step > 0) || (i <= start && step < 0); i -= step)
            arr.push(i)
        }
        return arr
    }

    function sum(array) {
        return array.reduce((a, b) => a + b)
    }

    function keys(obj) {
        return Object.keys(obj)
    }

    function uniq(array) {
        return Array.from(new Set(array))
    }
    //function uniq  array => [... new Set(array)]

    function isEqual(value, other) {
        if (value === other || (value !== value && other !== other)) return true
        if (typeof value === "object" && typeof other === "object") {
            if (Array.isArray(other) !== Array.isArray(value)) return false
            var key1 = keys(value)
            var key2 = keys(other)
            if (key1.length !== key2.length) return false
            for (var i in value) {
                if (!isEqual(value[i], other[i])) return false
            }
            return true
        } else {
            return false
        }
    }

    function map(array, mapper = identity) {
        mapper = iteratee(mapper)
        return reduce(array, (result, value, index, arr) => {
            result.push(mapper(value, index, arr))
            return result
        }, [])
    }

    function forEachRight(array, iteratee) {
        for (var i = array.length - 1; i >= 0; i--) {
            iteratee(array[i], i, array)
        }
        return array
    }

    function forEach(array, iteratee) {
        for (var i in array) {
            if (i == +i) i = i - 0
            if (iteratee(array[i], i, array) === false) break
        }
        return array
    }

    function differenceBy(array, values, itera = identity) {
        itera = iteratee(itera)
        var valuestemp = values.map(itera)
        return array.filter(x => !valuestemp.includes(itera(x)))
    }

    function dropWhile(array, predicate) {
        predicate = iteratee(predicate)
        var flag = 0
        return array.reduce((result, val) => {
            if (!predicate(val)) flag = 1
            if (flag) result.push(val)
            return result
        }, [])
    }

    function dropRightWhile(array, predicate) {
        predicate = iteratee(predicate)
        for (var i = array.length - 1; i >= 0; i--) {
            if (!predicate(array[i])) return array.slice(0, i + 1)
        }
    }

    function identity(value) {
        return value
    }

    function toPath(value) {
        var arr = []
        var temp = ""
        for (var i = 0; i < value.length; i++) {
            if (value[i] === "." || value[i] === "[") {
                arr.push(temp)
                temp = ""
            } else if (value[i] === "]") {} else temp += value[i]
        }
        arr.push(temp)
        return arr
    }

    function get(object, path, defaultValue) {
        if (!Array.isArray(path)) path = toPath(path)
        var flag = true
        forEach(path, value => {
            if (object[value] === undefined) return flag = false
            object = object[value]
        })
        return flag == true ? object : defaultValue
    }

    function property(path) {
        return object => get(object, path)
        // return bind(flip(ary(get,2)), path)
    }

    function sumBy(array, itera = identity) {
        itera = iteratee(itera)
        return array.map(itera).reduce((a, b) => a + b)
    }

    function isMatch(obj, src) {
        for (var i in src) {
            var flag = 1
            for (var j in obj) {
                if (i == j && isEqual(src[i], obj[j])) {
                    flag = 0
                    break
                }
            }
            if (flag) return false
        }
        return true
    }

    function matches(source) {
        // return bind(flip(isMatch), source)
        return obj => isMatch(obj, source)
    }

    function toArray(value) {
        if (Array.isArray(value)) return value
        var arr = []
        if (typeof value == "object" || typeof value == "string") {
            for (var i in value)
            arr.push(value[i])
        }
        return arr
    }

    function flip(func) {
        return (...argu) => func(...argu.reverse())
    }

    function ary(func, n = func.length) {
        return (...argu) => func(...argu.slice(0, n))
    }

    function fromPairs(pairs) {
        var obj = {}
        forEach(pairs, ([index, val]) => obj[index] = val)
        return obj
    }

    function toPairs(object) {
        var arr = []
        for (var i in object)
        arr.push([i, object[i]])
        return arr
    }

    function matchesProperty(path, srcValue) {
        return matches(fromPairs([
            [path, srcValue]
        ]))
    }

    function iteratee(func = identity) {
        var type = typeof func
        if (type === "function") return func
        else if (Array.isArray(func)) return matchesProperty(func[0], func[1])
        else if (type === "string") return property(func)
        else if (type === "object") return matches(func)
    }

    function fill(array, value, start = 0, end = array.length) {
        return array.fill(value, start, end)
    }

    function findIndex(array, predicate = identity, fromIndex = 0) {
        predicate = iteratee(predicate)
        for (var i = fromIndex; i < array.length; i++)
        if (predicate(array[i])) return i
        return -1
    }

    function findLastIndex(array, predicate = identity, fromIndex = array.length - 1) {
        predicate = iteratee(predicate)
        for (var i = fromIndex; i >= 0; i--)
        if (predicate(array[i])) return i
        return -1
    }

    function flatten(array) {
        return [].concat(...array)
        // return [].concat.apply.bind([].concat,[])
    }

    function flattenDepth(array, depth = 1) {
        if (depth == 0) return array.slice()
        var result = []
        for (var i = 0; i < array.length; i++) {
            if (array[i].length !== undefined) result.push(...flattenDepth(array[i], depth - 1))
            else result.push(array[i])
        }
        return result
    }

    function flattenDeep(array) {
        return flattenDepth(array, Infinity)
    }

    function reduce(collection, iterat = identity, accumulator = 0) {
        iterat = iteratee(iterat)
        var result = accumulator
        for (var i in collection) {
            if (i == +i) i = i - 0
            result = iterat(result, collection[i], i, collection)
        }
        return result
    }

    function head(array) {
        return array[0]
    }

    function indexOf(array, value, fromIndex = 0) {
        return array.indexOf(value, fromIndex)
    }

    function lastIndexOf(array, value, fromIndex = array.length - 1) {
        return array.lastIndexOf(value, fromIndex)
    }

    function initial(array) {
        return array.slice(0, array.length - 1)
    }

    function intersection(...arrays) {
        return intersectionBy(...arrays)
    }

    function intersectionBy(...arrays) {
        if (!Array.isArray(arrays[arrays.length - 1])) {
            var iterat = iteratee(arrays.pop())
        } else var iterat = identity
        var arr = arrays.shift()
        return reduce(arrays, (result, val) => {
            if (result.length == 0) return []
            var sub = []
            forEach(result, values => {
                if (map(val, iterat).includes(iterat(values))) sub.push(values)
            })
            return sub
        }, arr)
    }

    function differenceWith(array, values, comparator) {
        return filter(array, val => !isEqual(val, values[0]))
    }


    function join(array, sep) {
        return array.join(sep)
    }

    function last(array) {
        return array[array.length - 1]
    }

    function nth(array, n = 0) {
        n = n < 0 ? array.length + n : n
        return array[n]
    }

    function filter(collection, predicate = identity) {
        var result = []
        predicate = iteratee(predicate)
        for (var i in collection) {
            if (predicate(collection[i], i, collection)) result.push(collection[i])
        }
        return result
    }

    function bind(f, ...argu1) {
        return (...argu2) => f(...argu1, ...argu2)
    }

    function pull(array, ...values) {
        return array.filter(it => !values.includes(it))
    }

    function pullAll(array, values) {
        return array.filter(it => !values.includes(it))
    }

    function pullAllBy(array, values, iterat = identity) {
        iterat = iteratee(iterat)
        return array.filter(it => !map(values, iterat).includes(iterat(it)))
    }

    function pullAllWith(array, values, comparator = isEqual) {
        return array.filter(it => !values.some(val => comparator(val, it)))
    }

    function reverse(array) {
        return array.reverse()
    }







    return {
        chunk: chunk,
        compact: compact,
        difference: difference,
        drop: drop,
        dropRight: dropRight,
        unary: unary,
        negate: negate,
        range: range,
        rangeRight: rangeRight,
        sum: sum,
        keys: keys,
        uniq: uniq,
        isEqual: isEqual,
        map: map,
        forEachRight: forEachRight,
        forEach: forEach,
        differenceBy: differenceBy,
        dropWhile: dropWhile,
        dropRightWhile: dropRightWhile,
        identity: identity,
        toPath: toPath,
        get: get,
        property: property,
        sumBy: sumBy,
        isMatch: isMatch,
        toArray: toArray,
        flip: flip,
        fromPairs: fromPairs,
        toPairs: toPairs,
        matches: matches,
        matchesProperty: matchesProperty,
        iteratee: iteratee,
        ary: ary,
        fill: fill,
        findLastIndex: findLastIndex,
        findIndex: findIndex,
        flatten: flatten,
        flattenDepth: flattenDepth,
        flattenDeep: flattenDeep,
        reduce: reduce,
        head: head,
        indexOf: indexOf,
        lastIndexOf: lastIndexOf,
        initial: initial,
        intersection: intersection,
        join: join,
        last: last,
        nth: nth,
        intersectionBy: intersectionBy,
        filter: filter,
        bind: bind,
        differenceWith: differenceWith,
        pull: pull,
        pullAll: pullAll,
        pullAllBy: pullAllBy,
        pullAllWith: pullAllWith,
    }


}()