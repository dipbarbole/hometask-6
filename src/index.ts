import { Graph } from "./Dijkstra";

let g = new Graph();

g.addVertex();
g.addVertex();
g.addVertex();
g.addVertex();

g.addEdge(0, 1, 3);
g.addEdge(0, 2, 2);
g.addEdge(1, 4, 2);
g.addEdge(3, 4, 6);

g.dijkstra(0);
