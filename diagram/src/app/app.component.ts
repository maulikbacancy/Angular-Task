import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { Connector, IDragEnterEventArgs,  MarginModel, NodeModel, PaletteModel, PointPortModel, SymbolInfo} from '@syncfusion/ej2-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';
import { paletteIconClick } from '../script/diagram-common';
import { CentralDataService } from './central-data.service';
import { Connectors, JsonData, Nodes } from './node.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'diagram';

  constructor(private dataService: CentralDataService) {}

  @ViewChild("diagram")
    public diagram: DiagramComponent;

    public nodes: Nodes[] = [];
    public connectors: Connectors[] = [];
    public diagramData = new JsonData(this.nodes,this.connectors);

  
    public nodeDefaults(node: NodeModel): NodeModel {
      let obj: NodeModel = {};
      if (obj.width === undefined) {
        obj.width = 145;
      } else {
        let ratio: number = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
      }
      obj.style = { fill: '#357BD2', strokeColor: 'white' };
      obj.annotations = [{ style: { color: 'white', fill: 'transparent' } }];
      obj.ports = getPorts(node);
      return obj;
    }

    public connDefaults(obj: Connector): void {
      if (obj.id.indexOf('connector') !== -1) {
        obj.type = 'Orthogonal';
        obj.targetDecorator = { shape: 'Arrow', width: 10, height: 10 };
      }
    }

    public getSymbolDefaults(symbol: NodeModel): void {
      symbol.style.strokeColor = '#757575';
      if (symbol.id === 'Terminator' || symbol.id === 'Process') {
        symbol.width = 80;
        symbol.height = 40;
      } else if (
        symbol.id === 'Decision' ||
        symbol.id === 'Document' ||
        symbol.id === 'PreDefinedProcess' ||
        symbol.id === 'PaperTap' ||
        symbol.id === 'DirectData' ||
        symbol.id === 'MultiDocument' ||
        symbol.id === 'Data'
      ) {
        symbol.width = 50;
        symbol.height = 40;
      } else {
        symbol.width = 50;
        symbol.height = 50;
      }      
    }

    
    //SymbolPalette Properties
    public symbolMargin: MarginModel = { left: 15, right: 15, top: 15, bottom: 15 };
    public expandMode: ExpandMode = 'Multiple';
    
  //SymbolPalette symbols
    public palettes: PaletteModel[] = [
      {
        id: 'flow',
        expanded: true,
        symbols: this.dataService.flowshapes,
        iconCss: 'shapes',
        title: 'Flow Shapes'
      },
      {
        id: 'connectors',
        expanded: true,
        symbols: this.dataService.connectorSymbols,
        iconCss: 'shapes',
        title: 'Connectors'
      }
    ];
 
  
    public dragEnter(args: IDragEnterEventArgs): void {
      let obj: NodeModel = args.element as NodeModel;
      if (obj && obj.width && obj.height) {
        let oWidth: number = obj.width;
        let oHeight: number = obj.height;
        let ratio: number = 100 / obj.width;
        obj.width = 100;
        obj.height *= ratio;
        obj.offsetX += (obj.width - oWidth) / 2;
        obj.offsetY += (obj.height - oHeight) / 2;
        obj.style = { fill: '#357BD2', strokeColor: 'white' };
      }
    }
  
    
  
    public getSymbolInfo(symbol: NodeModel): SymbolInfo {
      return { fit: true };
    }
  
    
  
    
  
    public diagramCreate(args: Object): void {
      paletteIconClick();
    }

    public created(): void {
      this.diagram.fitToPage();
    }

    public checkObjectValue() {
      console.log(this.diagramData);
    }

    public propertyChange() {
      this.diagramData.nodes = [];
      this.diagramData.connectors = [];
      this.diagram.nodes.forEach((element) => {
        const nodeTemp: Nodes = {
          id: element.id,
          offsetX: element.offsetX,
          offsetY: element.offsetY,
          width: element.width,
          height: element.height,
          title: element.annotations.length > 0 ? element.annotations[0].content : ''
        };
        this.diagramData.nodes.push(nodeTemp);
      });

      this.diagram.connectors.forEach((element) => {
        const connectorTemp: Connectors = {
          id: element.id,
          from: {action: element.sourceID, outputPort: element.sourcePortID},
          to: {action: element.targetID, inputPort: element.targetPortID},
          pipeName: element.annotations.length > 0 ? element.annotations[0].content : ''
        };
        this.diagramData.connectors.push(connectorTemp);
      });
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