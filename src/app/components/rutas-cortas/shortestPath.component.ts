import { Component, OnInit } from '@angular/core';
import { Graph } from './Floyd/Graph';
import { shortestPathService } from './shortestPath.service';

@Component({
  selector: 'app-rutas-cortas',
  templateUrl: './shortestPath.component.html',
  styleUrls: ['./shortestPath.component.css']
})
export class shortestPathComponent implements OnInit {

  graph: shortestPathService;
  vertex: string[];
  table: number[];
  linkWeight = "";

  constructor(graph: shortestPathService) { 
    this.graph = new shortestPathService();
    this.vertex = this.graph.getVertex();
    this.table = this.graph.getTable();
  }

  ngOnInit(): void {
  }

  addVertex(newVertex: string) {
    console.log("BUTTON CLICKED: " + newVertex);
    this.graph.addVertex(newVertex);
    this.vertex = this.graph.getVertex();
  }
  
  addVertexLink(vertexOrigin: string, vertexDestiny: string, weight: string) {
    console.log("LINK FROM " + vertexOrigin + " TO " + vertexDestiny);
    this.graph.addLink(vertexOrigin, vertexDestiny, weight);
    this.table = this.graph.getTable();
  }

  getVertex() {
    return this.graph.getVertex();
  }

  getNodeQuantity() {
    return this.graph.getNodeQuantity();
  }
}
