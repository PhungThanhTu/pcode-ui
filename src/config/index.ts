export const JudgerId = 'C4B424E3-7C17-417E-96D8-890B3F4A26F1';

export const createExerciseDefault = {
	runtimeLimit: 2000,
	memoryLimit: 50000,
	scoreWeight: 1,
	manualPercentage: 0,
	judgerId: JudgerId
};

export const contentTypeId = {
	markDown: 0,
	pdf: 1,
	file: 2
};
export const status = {
	markDown: 0,
	pdf: 1,
	file: 2
};

export const TestResultStatus = {
	Pending: { status: 0, message: 'Pending' },
	Accepted: { status: 1, message: 'Accepted' },
	Wrong: { status: 2, message: 'Wrong' },
	CompilationError: { status: 3, message: 'Compilation Error' },
	RuntimeError: { status: 4, message: 'Runtime Error' },
	MemoryLimitExceeded: { status: 5, message: 'MemoryLimit Exceeded' },
	TimeLimitExceeded: { status: 6, message: 'TimeLimit Exceeded' },
	Others: { status: 7, message: 'Others' }
};
