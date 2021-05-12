import { Injectable } from '@angular/core';
import { ConnectorModel, NodeModel } from '@syncfusion/ej2-diagrams';

@Injectable({
  providedIn: 'root'
})
export class CentralDataService {

  constructor() { }

  public flowshapes: NodeModel[] = [
    { id: 'Terminator', shape: { type: 'Flow', shape: 'Terminator' } },
    { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
    { id: 'Decision', shape: { type: 'Flow', shape: 'Decision' } },
    { id: 'Document', shape: { type: 'Flow', shape: 'Document' } },
    { id: 'PreDefinedProcess', shape: { type: 'Flow', shape: 'PreDefinedProcess' } },
    { id: 'PaperTap', shape: { type: 'Flow', shape: 'PaperTap' } },
    { id: 'DirectData', shape: { type: 'Flow', shape: 'DirectData' } },
    { id: 'SequentialData', shape: { type: 'Flow', shape: 'SequentialData' } },
    { id: 'Sort', shape: { type: 'Flow', shape: 'Sort' } },
    { id: 'MultiDocument', shape: { type: 'Flow', shape: 'MultiDocument' } },
    { id: 'Collate', shape: { type: 'Flow', shape: 'Collate' } },
    { id: 'SummingJunction', shape: { type: 'Flow', shape: 'SummingJunction' } },
    { id: 'Or', shape: { type: 'Flow', shape: 'Or' } },
    {
      id: 'InternalStorage',
      shape: { type: 'Flow', shape: 'InternalStorage' }
    },
    { id: 'Extract', shape: { type: 'Flow', shape: 'Extract' } },
    {
      id: 'ManualOperation',
      shape: { type: 'Flow', shape: 'ManualOperation' }
    },
    { id: 'Merge', shape: { type: 'Flow', shape: 'Merge' } },
    {
      id: 'OffPageReference',
      shape: { type: 'Flow', shape: 'OffPageReference' }
    },
    {
      id: 'SequentialAccessStorage',
      shape: { type: 'Flow', shape: 'SequentialAccessStorage' }
    },
    
    { id: 'Annotation', shape: { type: 'Flow', shape: 'Annotation' } },
    { id: 'Annotation2', shape: { type: 'Flow', shape: 'Annotation2' } },
    { id: 'Data', shape: { type: 'Flow', shape: 'Data' } },
    { id: 'Card', shape: { type: 'Flow', shape: 'Card' } },
    { id: 'Delay', shape: { type: 'Flow', shape: 'Delay' } },
  ];

  //Initializes connector symbols for the symbol palette
  public connectorSymbols: ConnectorModel[] = [
    {
      id: 'Link1',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link3',
      type: 'Orthogonal',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'Link21',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      targetDecorator: { shape: 'Arrow', style: {strokeColor: '#757575', fill: '#757575'} },
      style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
      id: 'link23',
      type: 'Straight',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    },
    {
      id: 'link33',
      type: 'Bezier',
      sourcePoint: { x: 0, y: 0 },
      targetPoint: { x: 60, y: 60 },
      style: { strokeWidth: 1, strokeColor: '#757575' },
      targetDecorator: { shape: 'None' }
    }
  ];
}
