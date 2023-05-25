class ScriptLogger {
	constructor(private name: string) {}

	private format(str: string) {
		return `[${this.name}] ${str}`;
	}

	log(message: string) {
		console.log(this.format(message));
	}

	error(message: string) {
		console.error(this.format(message));
	}

	warn(message: string) {
		console.warn(this.format(message));
	}

	table(data: any) {
		console.table(data);
	}
}

interface Services {
	logger: ScriptLogger;
}

export interface Script {
	name: string;
	run: (services: Services) => Promise<void | boolean>;
}

export async function runScript(script: Script) {
	console.log(`[runner] Running script: ${script.name}`);

	const logger = new ScriptLogger(script.name);
	let shouldExit: boolean;
	try {
		const res = await script.run({ logger });
		if (typeof res === 'boolean') {
			shouldExit = res;
		}
	} catch (e) {
		logger.error(`Error: ${e.message}`);
		logger.error(e.stack);
	}

	console.log(`[runner] Finished script: ${script.name}`);

	if (shouldExit) {
		process.exit(0);
	}
}
