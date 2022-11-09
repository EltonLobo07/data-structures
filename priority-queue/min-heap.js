class Heapq {
    constructor(comparatorFn) { 
        //    The comparator function should return true if childNode should be above the parentNode
        this.comparatorFn = comparatorFn ?? ((childNodeVal, parentNodeVal) => childNodeVal < parentNodeVal);
    }

    heappush(arr, v) {
        arr.push(v);

        let nodeIdx = arr.length - 1;
        let parentIdx = this.#getParentIdx(nodeIdx);

        while (parentIdx != -1 && this.comparatorFn(arr[nodeIdx], arr[parentIdx])) {
            [arr[nodeIdx], arr[parentIdx]] = [arr[parentIdx], arr[nodeIdx]];
            nodeIdx = parentIdx;
            parentIdx = this.#getParentIdx(nodeIdx);
        }
    }

    heappop(arr) {
        const res = arr[0];

        arr[0] = arr.at(-1);
        arr.pop();
        
        this.#miniHeapify(arr, 0);

        return res;
    }

    heapify(arr) {
        for (let i = arr.length - 1; i > -1; i--)
            this.#miniHeapify(arr, i);
    }

    #getParentIdx(nodeIdx) {
        if (nodeIdx % 2 == 0) 
            return (nodeIdx - 2) / 2;  // nodeIdx = 2 * parentIdx + 2
    
        return (nodeIdx - 1) / 2;
    }

    #getMinInfo(arr, nodeIdx) {
        const leftChildIdx = 2 * nodeIdx + 1;
        
        if (leftChildIdx >= arr.length)
            return [null, true];

        const rightChildIdx = 2 * nodeIdx + 2;

        if (rightChildIdx < arr.length && this.comparatorFn(arr[rightChildIdx], arr[leftChildIdx]))
            return [arr[rightChildIdx], false];

        return [arr[leftChildIdx], true];
    }

    #miniHeapify(arr, nodeIdx) {
        let [minVal, isLeftChild] = this.#getMinInfo(arr, nodeIdx);
        
        while (minVal !== null && this.comparatorFn(minVal, arr[nodeIdx])) {
            const minChildIdx = isLeftChild ? 2 * nodeIdx + 1 : 2 * nodeIdx + 2;
            [arr[nodeIdx], arr[minChildIdx]] = [arr[minChildIdx], arr[nodeIdx]];
            nodeIdx = minChildIdx;
            [minVal, isLeftChild] = this.#getMinInfo(arr, nodeIdx);
        }        
    }
}
