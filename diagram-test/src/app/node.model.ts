export class Nodes {
    constructor(
        public id: string,
        public offsetX: number,
        public offsetY: number,
        public width: number,
        public height: number,
        public title?: string
    ) {}
}

export class Connectors {
    constructor(
        public id: string,
        public pipeName?: string,
        public from?: {action: string, outputPort: string},
        public to?: {action: string, inputPort: string}
    ) {}
}