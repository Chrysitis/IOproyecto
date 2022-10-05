
import { LinkNode } from "./LinkNode";

export class GraphNode {
  
  private name: string;
  private id: number;
  private nextNode: GraphNode | null;
  private prevNode: GraphNode | null;
  private nextLink: LinkNode | null;
  private prevLink: LinkNode | null;
  private linkQuantity: number;

  public constructor(name: string, id: number) {

    this.name = name;
    this.id = id;
    this.linkQuantity = 0;
    this.nextNode = {} as GraphNode;
    this.prevNode = {} as GraphNode;
    this.nextLink = {} as LinkNode;
    this.prevLink = {} as LinkNode;
  }

  public setNextNode(nextNode: GraphNode) {
    this.nextNode = nextNode;
  }

  public setPrevNode(prevNode: GraphNode) {
    this.prevNode = prevNode;
  }

  public setNextLink(nextLinkNode: LinkNode) {
    this.nextLink = nextLinkNode;
  }

  public getNextNode() {
    return this.nextNode;
  }

  public getPrevNode() {
    return this.prevNode;
  }

  public getNextLink() {
    return this.nextLink;
  }

  public getPrevLink() {
    return this.prevLink;
    
  }

  public getName() {
    return this.name;
  }

  public getID() {
    return this.id;
  }

  public increaseLinkQuantity() {
    this.linkQuantity += 1;
  }

}

