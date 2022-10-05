
import { GraphNode } from "./GraphNode";
import { LinkNode } from "./LinkNode";

export class Graph {

  private nodeQuantity: number;
  private mainNode: GraphNode | null;
  //private tempNode: GraphNode | null;

  public constructor() {

    this.nodeQuantity = 0;
    this.mainNode = {} as GraphNode;
    //this.tempNode = new GraphNode(".", 99);
  }

  public addNode(newNode: GraphNode) {

    let tempNode;
    if(this.mainNode == null) {//(this.nodeQuantity === 0) {
      console.log("IF. SETTING THE MAIN NODE.");
      this.mainNode = newNode;
    } else {
      console.log("ELSE. SETTING AS NEXT NODE.");
      tempNode = this.mainNode;
      while(tempNode?.getNextNode() != null) {
        tempNode = tempNode.getNextNode();
      }
      tempNode?.setNextNode(newNode);
    }
    this.nodeQuantity += 1;
  }

  public addLink(originNode: GraphNode, targetNode: GraphNode, weight: number) {
    
    let tempLink = originNode.getNextLink();
    if(tempLink == null) {
      console.log("IF. SETTING THE FIRST LINK.");
      let newLink = new LinkNode(originNode, targetNode, weight);
      originNode.setNextLink(newLink);
      originNode.increaseLinkQuantity();
    } else {
      console.log("ELSE. SETTING THE NEXT LINK.");
      while(tempLink.getNextLink() != null) {
        tempLink = tempLink.getNextLink();
      }
      let newLink = new LinkNode(originNode, targetNode, weight);
      tempLink.setNextLink(newLink);
      originNode.increaseLinkQuantity();
    }
  }

  public getNodeByName(name: string) {

    let tempNode = this.mainNode;
    let resNode = this.mainNode;
    while(tempNode?.getNextNode() != null) {
      if(tempNode.getName() == name) {
        resNode = tempNode;
        break;
      }
      if(tempNode != null) {
        tempNode = tempNode?.getNextNode();
      }
    }
    return resNode;
  }
  public getNodeQuantity() {
    return this.nodeQuantity;
  }

  public getLinkWeight(originNode: GraphNode, targetNode: GraphNode) : number {

    let tempLink = originNode.getNextLink();
    if(originNode == targetNode) {
      return 0;
    }
    else if(tempLink != null) {
      while(tempLink != null) {
        if(tempLink.getTargetNode() === targetNode) {
          return tempLink.getLinkWeight();
        }
        tempLink = tempLink.getNextLink();
      }
    }
    return -1;

  }

  public initMatriz(num: number) {

    let defaultTable: number[][] = new Array(this.nodeQuantity);

    let row: number[] = new Array(this.nodeQuantity);
    for(let i = 0; i < defaultTable.length; i++) {
      for(let j = 0; j < defaultTable.length; j++) {
        if(i == j) {
          row[j] = 0;
        } else {
          row[j] = num;
        }
      }
      console.log(row)
      defaultTable[i] = row;
    }
    this.printStateTable(defaultTable);
    return defaultTable;
  }

  public fillArray(num: number) {

    let res: number[] = new Array(this.nodeQuantity);
    let limit = this.nodeQuantity * this.nodeQuantity;
    for(let i = 0; i < limit; i++) {
      res[i] = num;
    }
    return res;
  }

  public testTable() {
    let stateTables: number[] = [];
    let defaultTable = this.initMatriz(-1);
    let tempNodeOrigin = this.mainNode;
    let tempNodeTarget;
    let i = 0;
    let j = 0;
    let row: number[] = new Array(this.nodeQuantity);

    while(tempNodeOrigin != null) {
      tempNodeTarget = this.mainNode;
      //j = 0;
      while(tempNodeTarget != null) {
        console.log("POSITION IS: " + i + " - " + j + " WITH VAL: " + this.getLinkWeight(tempNodeOrigin, tempNodeTarget));
        console.log(this.getLinkWeight(tempNodeOrigin, tempNodeTarget));
        defaultTable[i][j] = this.getLinkWeight(tempNodeOrigin, tempNodeTarget);
        row[j] = this.getLinkWeight(tempNodeOrigin, tempNodeTarget);
        j++;
        tempNodeTarget = tempNodeTarget.getNextNode();
      }
      //console.log("ROW TO INSERT IS: " + row);
      //defaultTable[i] = row;
      console.log("CURRENT TABLE AT POS: " + i + " IS: ");
      this.printStateTable(defaultTable);
      i++;
      tempNodeOrigin = tempNodeOrigin.getNextNode();
    }
    let k = 0;
    for(let i = 0; i < defaultTable.length; i++) {
      for(let j = 0; j < defaultTable.length; j++) {
        defaultTable[i][j] = row[k];
        k += 1;
        console.log("INSERTION AT " + i + " - " + j + " DONE.");
        //this.printStateTable(defaultTable);
      }
    }
    //this.printStateTable(defaultTable);

    console.log("ROW TO RETURN IS: " + row);
    this.printArrayAsMatrix(row);
    this.floydWarshallAlgorithm(row);
    return row;
  }

  public printArrayAsMatrix(row: number[]) {

    console.log("---------- ARRAY DEFAULT TABLE ----------")
    this.printNodeRow();
    let tempNodeCol = this.mainNode;
    let nodeName = tempNodeCol?.getName();
    let res = "";
    for (let i = 0; i < this.nodeQuantity; i++) {
      res += nodeName + "\t";
      for (let j = 0; j < this.nodeQuantity; j++) {
        res += row[i * this.nodeQuantity + j] + "\t";
      }
      res += "\n";
      tempNodeCol = tempNodeCol != null? tempNodeCol.getNextNode() : this.mainNode;
      nodeName = tempNodeCol?.getName();
    }
    console.log(res);
  }

  public printStateTable(table: number[][]) {

    console.log("---------- DEFAULT TABLE ----------")
    this.printNodeRow();
    let tempNodeCol = this.mainNode;
    let nodeName = tempNodeCol?.getName();
    let res = "";
    for (let i = 0; i < table.length; i++) {
      res += nodeName + "\t";
      for (let j = 0; j < this.nodeQuantity; j++) {
        res += table[i][j] + "\t";
      }
      res += "\n";
      tempNodeCol = tempNodeCol != null? tempNodeCol.getNextNode() : this.mainNode;
      nodeName = tempNodeCol?.getName();
    }
    console.log(res);
  }
  
  public printNodeRow() {
    let tempNodeRow = this.mainNode;
    let res = "\t";
    while(tempNodeRow != null) {
      res += tempNodeRow.getName() + "\t";
      tempNodeRow = tempNodeRow.getNextNode();
    }
    console.log(res);
  }
  
  public floydWarshallAlgorithm(row: number[]) {
    console.log("************************* ---------- FLOYD ALGORITHM ---------- *************************");
    this.printArrayAsMatrix(row);
    let pTable = this.fillArray(0);

    let k;
    let i;
    let j;
    let p = 0;
    //let row: number[] = new Array(this.nodeQuantity);
    for (k = 0; k < this.nodeQuantity; k++) {
      p += 1;
      console.log("TABLE STATE: " + p);
      // Pick all vertices as source
      // one by one
      for (i = 0; i < this.nodeQuantity; i++) {
        // Pick all vertices as destination
        // for the above picked source
        for (j = 0; j < this.nodeQuantity; j++) {
          // If vertex k is on the shortest
          // path from i to j, then update
          // the value of dist[i][j]
           let path = row[i * this.nodeQuantity + k] + row[k * this.nodeQuantity + j];
           console.log("Comparando: " + row[i * this.nodeQuantity + k] + " + " + row[k * this.nodeQuantity + j]
           + " = " + path
           + " < " + row[i * this.nodeQuantity + j]);
          if(row[i * this.nodeQuantity + j] == -1) {
            if(row[i * this.nodeQuantity + k] != -1 && row[k * this.nodeQuantity + j] != -1 ) {
              console.log("COMPARES TO -1. KEEPS THE OTHER NUMBER AND PUTS IT IN POS: " + i + " - " + j);
              row[i * this.nodeQuantity + j] = row[i * this.nodeQuantity + k] + row[k * this.nodeQuantity + j];
              pTable[i * this.nodeQuantity + j] = p;
            }
          }
          else if (row[i * this.nodeQuantity + k] + row[k * this.nodeQuantity + j] < row[i * this.nodeQuantity + j]
            && (row[k * this.nodeQuantity + j] != -1 && row[i * this.nodeQuantity + k] != -1 && row[i * this.nodeQuantity + j] != -1)
            ) {
            console.log("FOUND A SHORTER PATH. KEEPS THE NEW NUMBER AND PUTS IT IN POS: " + i + " - " + j);
            row[i * this.nodeQuantity + j] = row[i * this.nodeQuantity + k] + row[k * this.nodeQuantity + j];
            pTable[i * this.nodeQuantity + j] = p;
          }
        }
      }
      console.log("***********************************************");
      this.printArrayAsMatrix(row);
      console.log("***********************************************");
    }
    this.printArrayAsMatrix(row);
    this.printArrayAsMatrix(pTable);
  }

  public printGraph() {
    let tempNode = this.mainNode;
    let graphInfo = "";
    if(tempNode != null) {
      while(tempNode != null) {
        graphInfo += tempNode.getName() + ": ";
        let tempLink = tempNode.getNextLink();
        while(tempLink != null) {
          graphInfo += tempLink.getTargetNode().getName() + " <" + tempLink.getLinkWeight() + ">" + " | ";
          tempLink = tempLink.getNextLink();
        }
        tempNode = tempNode.getNextNode();
        graphInfo += "\n";
      }
    }
    //console.log(graphInfo);
    return graphInfo;
  }
}