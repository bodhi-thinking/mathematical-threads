import type{Puzzle}from'../../lib/puzzle-types';
export function PuzzleSet({puzzles}:{puzzles:Puzzle[]}){return <section><div className="eyebrow">Puzzles</div><h2>Now try it yourself.</h2>{puzzles.map((p,i)=><article className="card puzzle" key={p.id}><div className="puzzle-number">PUZZLE {i+1} · {p.type.toUpperCase()}</div><h2>{p.title}</h2><p>{p.prompt}</p></article>)}</section>}
