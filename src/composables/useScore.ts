import { ref, Ref, inject, provide } from 'vue';

const scoreProviderKey = "score";

interface ScoreContext {
  score: Ref<number>;
  incrementScore: () => {};
}

export function initScoreProvider() {
  const score = ref(0);
  const incrementScore = () => {
    score.value +=1;
    console.log('test me :'+ score.value);
  };

  provide(scoreProviderKey,{
    score,
    incrementScore,
  });
}

export function useScore(): ScoreContext{
  const scoreContext = inject(scoreProviderKey);
  
  if (!scoreContext) {
    throw new Error('useScore must be used with initScoreProvider');
  }
  return scoreContext as ScoreContext;
}