import type {Puzzle} from '../../lib/puzzle-types';
export const puzzles: Puzzle[]=Array.from({length:10},(_,i)=>({id:`dummy-${i+1}`,title:`Dummy Puzzle ${i+1}`,type:i===0?'notice':'reasoning',prompt:'A placeholder puzzle. The real Series 1 puzzle will replace this.'}));
