class Coroutines {
    constructor() {
        this.coroutines = [];
    }

    clear() {
        this.coroutines = [];
    }

    runCoroutine(coroutine) {
        this.coroutines.push(this.coroutine(coroutine));
    }

    update() {
        for (let i = 0; i < this.coroutines.length;) {
            let routine = this.coroutines[i];
            if (routine.next().done) {
                this.coroutines.splice(i, 1);
                continue;
            }
            ++i;
        }
    }
    
    *coroutine(coroutineFunc) {
        const GeneratorFunction = function*(){}.constructor;
        const co = coroutineFunc();
        let yielded;
        let nextResult;
        do {
            yielded = co.next(nextResult);
            nextResult = null;
            if (yielded.value instanceof GeneratorFunction) {
                const subCo = coroutine(yielded.value);
                let subYielded;
                do {
                    subYielded = subCo.next();
                    yield;
                } while (!subYielded.done);
                nextResult = subYielded.value;
            } else if (Promise.resolve(yielded.value) === yielded.value) {
                let completed = false;
                yielded.value.then((result) => {
                    completed = true;
                    nextResult = result;
                })
                while (!completed) {
                    yield;
                }
            } else if (yielded.value instanceof Array) {
                nextResult = [];
                for (let item of yielded.value) {
                    if (Promise.resolve(item) === item) {
                        let completed = false;
                        item.then((result) => {
                            completed = true;
                            nextResult.push(result);
                        })
                        while (!completed) {
                            yield;
                        }
                    }
                } 
            } else {
                nextResult = yielded.value;
                yield;
            }
        } while (!yielded.done);
        return yielded.value;
    }
}

module.exports = Coroutines;
