class Heapq {
    static heappush(arr, v) {
        arr.push(v);

        let nodeIdx = arr.length - 1;
        let parentIdx = this.#getParentIdx(nodeIdx);

        while (parentIdx != -1 && arr[parentIdx] > arr[nodeIdx]) {
            [arr[nodeIdx], arr[parentIdx]] = [arr[parentIdx], arr[nodeIdx]];
            nodeIdx = parentIdx;
            parentIdx = this.#getParentIdx(nodeIdx);
        }
    }

    static heappop(arr) {
        const res = arr[0];

        arr[0] = arr.at(-1);
        arr.pop();
        
        let nodeIdx = 0;
        let [minVal, isLeftChild] = this.#getMinInfo(arr, nodeIdx);

        while (minVal < arr[nodeIdx]) {
            const minChildIdx = isLeftChild ? 2 * nodeIdx + 1 : 2 * nodeIdx + 2;
            [arr[nodeIdx], arr[minChildIdx]] = [arr[minChildIdx], arr[nodeIdx]];
            nodeIdx = minChildIdx;
            [minVal, isLeftChild] = this.#getMinInfo(arr, nodeIdx);
        }

        return res;
    }

    static #getParentIdx(nodeIdx) {
        let parentIdx = -1;

        if (nodeIdx % 2 == 0) 
            parentIdx = (nodeIdx - 2) / 2;  // nodeIdx = 2 * parentIdx + 2
        else
            parentIdx = (nodeIdx - 1) / 2;

        return parentIdx;
    }

    static #getMinInfo(arr, nodeIdx) {
        const leftChildIdx = 2 * nodeIdx + 1;
        
        if (leftChildIdx >= arr.length)
            return [Infinity, true];

        const rightChildIdx = 2 * nodeIdx + 2;

        if (rightChildIdx >= arr.length || arr[leftChildIdx] <= arr[rightChildIdx])
            return [arr[leftChildIdx], true];

        return [arr[rightChildIdx], false];
    }
}
