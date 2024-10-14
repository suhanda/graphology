import { UndirectedGraph } from 'graphology';
import erdosRenyi from 'graphology-generators/random/erdos-renyi';
import randomLayout from 'graphology-layout/random';
import chroma from 'chroma-js';
import { faker } from '@faker-js/faker';

const graph = erdosRenyi(UndirectedGraph, { n: 100, probability: 0.2 });
randomLayout.assign(graph);

graph.nodes().forEach((node) => {
  const attr = graph.getNodeAttributes(node);

  graph.mergeNodeAttributes(node, {
    label: faker.internet.displayName(),
    size: Math.max(4, Math.random() * 10),
    color: chroma.random().hex(),
  });
});

graph.edges().forEach((edge) => {
  graph.setEdgeAttribute(edge, 'color', '#ccc');
});

const width = 800,
  height = 800,
  margin = 150,
  w = width - margin,
  h = height - margin;

const Graphology = () => (
  <svg width={width} height={height}>
    <g className="edges">
      {graph.edges().map((e) => {
        const attr = graph.getEdgeAttributes(e);
        const source = graph.getNodeAttributes(graph.source(e));
        const target = graph.getNodeAttributes(graph.target(e));
        return (
          <line
            key={e}
            x1={source.x * w}
            y1={source.y * h}
            x2={target.x * w}
            y2={target.y * h}
            style={{ stroke: attr.color, strokeWidth: 1 }}
          />
        );
      })}
    </g>
    <g className="nodes">
      {graph.nodes().map((n) => {
        const attr = graph.getNodeAttributes(n);
        return (
          <g
            key={n}
            className="node"
            transform={`translate(${attr.x * w},${attr.y * h})`}
          >
            <circle cx={-10} cy={-5} r={attr.size} fill={attr.color} />
            <text>{attr.label}</text>
          </g>
        );
      })}
    </g>
  </svg>
);
export default Graphology;
