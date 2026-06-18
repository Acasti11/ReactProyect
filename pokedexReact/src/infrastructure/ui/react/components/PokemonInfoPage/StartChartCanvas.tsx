import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { PokemonDetailDto } from '../../../application/dto/PokemonDto';
import '../../../../styles/nomalStyles/pokeinfo.css';
import '../../../../styles/nomalStyles/pokeType.css';

type Props = {
  pokemon: PokemonDetailDto;
};

export const StatsChartCanvas: React.FC<Props> = ({ pokemon }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: ['PS', 'ATQ', 'DEF', 'SPA', 'SPD', 'SPE'],
        datasets: [
          {
            label: 'Stats',
            data: pokemon.stats.map((stat) => stat.baseValue),
          },
        ],
      },
    });

    return () => {
      chart.destroy();
    };
  }, [pokemon]);

  return <canvas ref={canvasRef} />;
};
