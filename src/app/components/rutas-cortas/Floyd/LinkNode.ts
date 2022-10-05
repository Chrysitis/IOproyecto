import { GraphNode } from "./GraphNode";

export class LinkNode {

  private originNode: GraphNode;
  private targetNode: GraphNode;
  private weight: number;
  private nextLink: LinkNode;

  public constructor(originNode: GraphNode, targetNode: GraphNode, weight: number) {

    this.originNode = originNode;
    this.targetNode = targetNode;
    this.weight = weight;
    this.nextLink = {} as LinkNode;
  }

  public getLinkWeight() {
    return this.weight;
  }

  public getOriginNode() {
    return this.originNode;
  }

  public getTargetNode() {
    return this.targetNode
  }

  public getNextLink() {
    return this.nextLink;
  }

  public setNextLink(newLink: LinkNode) {
    this.nextLink = newLink;
  }

}