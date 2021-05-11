import { Component, ViewChild } from '@angular/core';
import { ConnectorModel, DiagramComponent, NodeModel, PointPortModel, PortVisibility } from '@syncfusion/ej2-angular-diagrams';
import { Connectors, Nodes } from './node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'diagram-test';
  @ViewChild("diagram")
  public diagram: DiagramComponent;

  public nodes: Nodes[] = [];
  public connectors: Connectors[] = [];

  public node: NodeModel = {
    // Position of the node
    offsetX: 100,
    offsetY: 100,
    // Size of the node
    width: 150,
    height: 75,
    style: {
        fill: '#6BA5D7',
        strokeColor: 'white'
    },
  };

  public connector: ConnectorModel = {
    style: {
        strokeColor: '#6BA5D7',
        fill: '#6BA5D7',
        strokeWidth: 2
    },
    targetDecorator: {
        style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
        }
    },
    sourcePoint: {
        x: 100,
        y: 100
    },
    targetPoint: {
        x: 200,
        y: 100
    }
  }



  public addNode() {
    this.node.ports = getPorts(this.node);
    this.diagram.add(this.node);
  }

  public addConnector() {
    this.diagram.add(this.connector);
  }

  public checkObjectValue() {
    console.log(this.nodes);
    console.log(this.connectors);
  }

  public propertyChange() {
    this.nodes = [];
    this.connectors = [];
    for(let node of this.diagram.nodes) {
      let nodeTemp = new Nodes('',0,0,0,0,'');
      nodeTemp.id = node['properties'].id;
      nodeTemp.offsetX = node['properties'].offsetX;
      nodeTemp.offsetY = node['properties'].offsetY;
      nodeTemp.width = node['properties'].width;
      nodeTemp.height = node['properties'].height;
      if(node.annotations.length > 0) {
        nodeTemp.title = node['properties'].annotations[0].properties.content;
      }
      this.nodes.push(nodeTemp);
    }

    for(let connector of this.diagram.connectors) {
      let connectorTemp = new Connectors('','',{action: '', outputPort: ''},{action: '', inputPort: ''});
      connectorTemp.id = connector['properties'].id;
      connectorTemp.from.action = connector['properties'].sourceID;
      connectorTemp.from.outputPort = connector['properties'].sourcePortID;
      connectorTemp.to.action = connector['properties'].targetID;
      connectorTemp.to.inputPort = connector['properties'].targetPortID;
      if(connector.annotations.length > 0) {
        connectorTemp.pipeName = connector.annotations[0]['properties'].content;
      }
      this.connectors.push(connectorTemp);
    }    
  }


}
function getPorts(obj: NodeModel): PointPortModel[] {
  let ports: PointPortModel[] = [
    { id: 'port1', shape: 'Circle', offset: { x: 0, y: 0.5 } },
    { id: 'port2', shape: 'Circle', offset: { x: 0.5, y: 1 } },
    { id: 'port3', shape: 'Circle', offset: { x: 1, y: 0.5 } },
    { id: 'port4', shape: 'Circle', offset: { x: 0.5, y: 0 } }
  ];
  return ports;
}