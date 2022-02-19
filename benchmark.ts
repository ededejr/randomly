import Randomly from './src';
import { runNTimes, timeTaken } from '@ededejr/utils';

const randomly = new Randomly({ refreshInterval: 60000 });

function main() {
	runIterations(1);
	runIterations(100);
	runIterations(1000);
	runIterations(10_000);
	runIterations(100_000);
	runIterations(1_000_000);
	runIterations(10_000_000);
	runIterations(50_000_000);
	runIterations(150_000_000);
	runIterations(500_000_000);
	runIterations(1_000_000_000);
	process.exit();
}

function runIterations(count: number) {
	console.log(`[${sc(count)}]----------------------------`);
	measureRun(() => Math.random(), count, 'Math.Random');
	measureRun(() => randomly.get(), count, 'Randomly.get');
	console.log(' ');
}

function measureRun(candidate: () => void, count?: number, name?: string) {
	const _count = count || 100000;

	const measuringFunc = () => runNTimes(_count, candidate);
	Object.defineProperty(measuringFunc, 'name', {
		value: name || candidate.name,
	});

	timeTaken(measuringFunc);
}

// https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
function sc(value: number) {
	let newValue = String(value);
	if (value >= 1000) {
		const suffixes = ['', 'K', 'M', 'B', 'T'];
		const suffixNum = Math.floor(('' + value).length / 3);
		let shortValue = 0;
		let shortValueString = '';
		for (let precision = 2; precision >= 1; precision--) {
			shortValue = parseFloat(
				(suffixNum != 0
					? value / Math.pow(1000, suffixNum)
					: value
				).toPrecision(precision)
			);
			shortValueString = String(shortValue);
			const dotLessShortValue = (shortValueString + '').replace(
				/[^a-zA-Z 0-9]+/g,
				''
			);
			if (dotLessShortValue.length <= 2) {
				break;
			}
		}

		if (shortValue % 1 != 0) {
			shortValueString = shortValue.toFixed(1);
		}

		newValue = shortValueString + suffixes[suffixNum];
	}
	return newValue;
}

main();
