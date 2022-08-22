export class Graph {
    private size: number;
    private matrix: any[];

    constructor(size = 1) {
        this.size = size;
        this.matrix = [];
        for (let i = 0; i < size; i++) {
            this.matrix.push([]);
            for (let j = 0; j < size; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    addEdge(vertex1, vertex2, weight = 1) {
        if (vertex1 > this.size - 1 || vertex2 > this.size - 1) {
            console.log('invalid vertex');
        } else if (vertex1 === vertex2) {
            console.log('same vertex');
        } else {
            this.matrix[vertex1][vertex2] = weight;
            this.matrix[vertex2][vertex1] = weight;
        }
    }

    removeEdge(vertex1, vertex2) {
        if (vertex1 > this.size - 1 || vertex2 > this.size - 1) {
            console.log('invalid vertex');
        } else if (vertex1 === vertex2) {
            console.log('same vertex');
        } else {
            this.matrix[vertex1][vertex2] = 0;
            this.matrix[vertex2][vertex1] = 0;
        }
    }

    addVertex() {
        this.size++;
        this.matrix.push([]);
        for (let i = 0; i < this.size; i++) {
            this.matrix[i][this.size - 1] = 0;
            this.matrix[this.size - 1][i] = 0;
        }
    }

    removeVertex(vertex) {
        if (vertex < 0 || vertex > this.size - 1) {
            console.log('Invalid vertex');
        } else {
            while ( vertex < this.size - 1) {
                for (let i = 0; i < this.size; i++) {
                    this.matrix[i][vertex] = this.matrix[i][vertex + 1];
                }
                for (let i = 0; i < this.size; i++) {
                    this.matrix[vertex][i] = this.matrix[vertex + 1][i];
                }
                vertex++;
            }
            this.matrix.pop();
            this.size--;
        }
    }

    printMatrix() {
        for (let i = 0; i < this.size; i++) {
            let row = '';
            for (let j = 0; j < this.size; j++) {
                row += ` ${this.matrix[i][j]}`;
            }
            console.log(row);
        }
    }

    dijkstra(start) {

        //This contains the distances from the start node to all other nodes
        var distances = [];
        //Initializing with a distance of "Infinity"
        for (let i = 0; i < this.matrix.length; i++) {
            distances[i] = Number.MAX_VALUE;
        }
        //The distance from the start node to itself is of course 0
        distances[start] = 0;

        //This contains whether a node was already visited
        var visited = [];

        //While there are nodes left to visit
        while (true) {
            //find the node with the currently shortest distance from the start node...
            var shortestDistance = Number.MAX_VALUE;
            var shortestIndex = -1;
            for (let i = 0; i < this.matrix.length; i++) {
                //by going through all nodes that haven't been visited yet
                if (distances[i] < shortestDistance && !visited[i]) {
                    shortestDistance = distances[i];
                    shortestIndex = i;
                }
            }

            console.log("Visiting node " + shortestDistance + " with current distance " + shortestDistance);

            if (shortestIndex === -1) {
                // There was no node not yet visited --> We are done
                return distances;
            }

            for (let i = 0; i < this.matrix[shortestIndex].length; i++) {
                //if the path over this edge is shorter...
                if (this.matrix[shortestIndex][i] !== 0 && distances[i] > distances[shortestIndex] + this.matrix[shortestIndex][i]) {
                    //Save this path as new shortest path.
                    distances[i] = distances[shortestIndex] + this.matrix[shortestIndex][i];
                    console.log("Updating distance of node " + i + " to " + distances[i]);
                }
            }
            // Lastly, note that we are finished with this node.
            visited[shortestIndex] = true;
            console.log("Visited nodes: " + visited);
            console.log("Currently lowest distances: " + distances);

        }
    }
}


