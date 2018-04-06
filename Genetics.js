var Genetics = function()
{
	this.generation = 0;

	this.nextGeneration = function()
	{
		this.neat.sort();
		var newPopulation = [];

		// Elitism
		for(var i = 0; i < this.neat.elitism; i++){
		  newPopulation.push(this.neat.population[i]);
		}

		// Breed the next individuals
		for(var i = 0; i < this.neat.popsize - this.neat.elitism; i++){
		  newPopulation.push(this.neat.getOffspring());
		}

		// Replace the old population with the new population
		this.neat.population = newPopulation;
		this.neat.mutate();

		this.generation++;
		//startEvaluation();
	}

}